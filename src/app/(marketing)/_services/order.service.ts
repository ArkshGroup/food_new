import prisma from "@/lib/db";
import { customerActionClient } from "@/lib/next-safe-action";
import z from "zod";
import { IMyOrdersGetAll } from "../_types/order";

export class OrderClass {
  getOrderById = customerActionClient
    .inputSchema(
      z.object({
        id: z.string(),
      })
    )
    .action(async ({ ctx, parsedInput }) => {
      const order = await prisma.order.findUnique({
        where: {
          id: parsedInput.id,
          customer: {
            id: ctx.user.id,
          },
          paymentMethod: {
            not: "DRAFT",
          },
        },
        include: {
          orderShippingDetails: true,
          items: true,
        },
      });

      if (!order) {
        return {
          success: false,
          message: "Order not found",
          data: null,
        };
      }

      return {
        success: true,
        message: "Order retrieved successfully",
        data: {
          ...order,
          items: order.items.map((item) => ({
            ...item,
            specialPrice: Number(item.specialPrice),
            unitSellingPrice: Number(item.unitSellingPrice),
            totalPrice: Number(item.totalPrice),
            productApproxWeight: Number(item.productApproxWeight),
          })),
          discountAmount: Number(order.discountAmount),
          totalAmount: Number(order.totalAmount),
          deliveryCharge: Number(order.deliveryCharge),
          subTotalAmount: Number(order.subTotalAmount),
          paymentScreenShot: order.paymentScreenShot || null,
        },
      };
    });

  getOrderByIdDuringCheckout = customerActionClient
    .inputSchema(
      z.object({
        id: z.string(),
      })
    )
    .action(async ({ ctx, parsedInput }) => {
      const order = await prisma.order.findUnique({
        where: {
          id: parsedInput.id,
          customer: {
            id: ctx.user.id,
          },
        },
        include: {
          orderShippingDetails: true,
          items: true,
        },
      });

      if (!order) {
        return {
          success: false,
          message: "Order not found",
          data: null,
        };
      }

      return {
        success: true,
        message: "Order retrieved successfully",
        data: {
          ...order,
          items: order.items.map((item) => ({
            ...item,
            specialPrice: Number(item.specialPrice),
            unitSellingPrice: Number(item.unitSellingPrice),
            totalPrice: Number(item.totalPrice),
            productApproxWeight: Number(item.productApproxWeight),
          })),
          discountAmount: Number(order.discountAmount),
          totalAmount: Number(order.totalAmount),
          deliveryCharge: Number(order.deliveryCharge),
          subTotalAmount: Number(order.subTotalAmount),
          paymentScreenShot: order.paymentScreenShot || null,
        },
      };
    });

  getOrdersByCustomer = customerActionClient.action(async ({ ctx }) => {
    const orders = await prisma.order.findMany({
      where: {
        customer: {
          id: ctx.user.id,
        },
        paymentMethod: {
          not: "DRAFT",
        },
      },
      include: {
        orderShippingDetails: true,
        items: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!orders) {
      return {
        success: false,
        message: "No orders found",
        data: null,
      };
    }

    const serializedOrders: IMyOrdersGetAll[] = orders.map((order) => ({
      id: order.id,
      orderNumber: order.orderNumber,
      customerId: order.customerId,
      subTotalAmount: Number(order.subTotalAmount),
      totalAmount: Number(order.totalAmount),
      deliveryCharge: Number(order.deliveryCharge),
      updatedAt: order.updatedAt.toISOString(),
      createdAt: order.createdAt.toISOString(),
      discountAmount: Number(order.discountAmount),
      orderShippingDetails: order.orderShippingDetails,
      itemsCount: order.items.reduce((acc, item) => acc + item.quantity, 0),
    }));

    return {
      success: true,
      message: "Orders retrieved successfully",
      data: serializedOrders,
    };
  });
}
