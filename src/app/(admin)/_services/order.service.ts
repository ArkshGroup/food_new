import prisma from "@/lib/db";
import { adminActionClient } from "@/lib/next-safe-action";
import { IPrismaResponse } from "@/types";
import z from "zod";
import { IOrderGetAll } from "../types/order";
import { ordersSearchFilterSchema } from "../_validation/order.validation";
import { Prisma } from "@prisma/client";

export class OrderService {
  getOrderById = adminActionClient
    .inputSchema(
      z.object({
        id: z.string(),
      })
    )
    .action(async ({ parsedInput }) => {
      const order = await prisma.order.findUnique({
        where: {
          id: parsedInput.id,
        },
        include: {
          items: true,
          customer: {
            omit: {
              password: true,
              updatedAt: true,
            },
          },
          orderShippingDetails: true,
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
        data: order,
        success: true,
        message: "Order found",
      };
    });

  getAllOrders = adminActionClient
    .inputSchema(ordersSearchFilterSchema)
    .action(
      async ({ parsedInput }): Promise<IPrismaResponse<IOrderGetAll[]>> => {
        const where: Prisma.OrderWhereInput = {
          id: {
            equals: parsedInput.id || undefined,
          },
          orderNumber: {
            equals: parsedInput.orderNumber || undefined,
          },
          createdAt: parsedInput.createdAt
            ? {
                gte: parsedInput.createdAt.from,
                lte: parsedInput.createdAt.to,
              }
            : undefined,
          customer: {
            userName: parsedInput.customerName
              ? { contains: parsedInput.customerName, mode: "insensitive" }
              : undefined,
            email: parsedInput.customerEmail
              ? { contains: parsedInput.customerEmail, mode: "insensitive" }
              : undefined,
          },
          totalAmount: parsedInput.totalAmount
            ? {
                gte: parsedInput.totalAmount.min,
                lte: parsedInput.totalAmount.max,
              }
            : undefined,
          orderStatus: {
            in: parsedInput.orderStatus ? parsedInput.orderStatus : undefined,
          },
          paymentStatus: {
            in: parsedInput.paymentStatus
              ? parsedInput.paymentStatus
              : undefined,
          },
          paymentMethod: {
            notIn: ["DRAFT"],
          },
        };

        const totalCount = await prisma.order.count({ where });
        const totalPage = Math.ceil(totalCount / (parsedInput.limit ?? 10));
        const currentPage =
          parsedInput.page && parsedInput.page > totalPage
            ? 1
            : (parsedInput.page ?? 1);

        const orders = await prisma.order.findMany({
          where,
          take: parsedInput.limit ?? 10,
          skip: parsedInput.limit
            ? (currentPage - 1) * parsedInput.limit
            : undefined,
          orderBy: [{ orderNumber: "desc" }, { createdAt: "desc" }],
          include: {
            customer: {
              omit: {
                password: true,
                updatedAt: true,
                arkshFoodPoint: true,
              },
            },
            items: true,
          },
        });
        const serializedOrders: IOrderGetAll[] = orders.map((order) => ({
          ...order,
          arkshFoodPoint: Number(order.arkshFoodPoint.toFixed(2)),
          items: order.items.map((item) => ({
            ...item,
            totalPrice: Number(item.totalPrice.toFixed(2)),
            unitSellingPrice: Number(item.unitSellingPrice.toFixed(2)),
            specialPrice: Number(item.specialPrice.toFixed(2)),
            productApproxWeight: Number(item.productApproxWeight.toFixed(2)),
          })),
          discountAmount: Number(order.discountAmount.toFixed(2)),
          deliveryCharge: Number(order.deliveryCharge.toFixed(2)),
          subTotalAmount: Number(order.subTotalAmount.toFixed(2)),
          totalItems: Number(
            order.items.reduce((acc, item) => acc + item.quantity, 0)
          ),
          totalAmount: Number(order.totalAmount.toFixed(2)),
        }));

        return {
          data: serializedOrders,
          meta: {
            currentPage,
            totalPage,
          },
          success: true,
          message: "Orders fetched successfully",
        };
      }
    );

  getAllDraftOrders = adminActionClient
    .inputSchema(ordersSearchFilterSchema)
    .action(
      async ({ parsedInput }): Promise<IPrismaResponse<IOrderGetAll[]>> => {
        const where: Prisma.OrderWhereInput = {
          id: {
            equals: parsedInput.id || undefined,
          },
          createdAt: parsedInput.createdAt
            ? {
                gte: parsedInput.createdAt.from,
                lte: parsedInput.createdAt.to,
              }
            : undefined,
          customer: {
            userName: parsedInput.customerName
              ? { contains: parsedInput.customerName, mode: "insensitive" }
              : undefined,
            email: parsedInput.customerEmail
              ? { contains: parsedInput.customerEmail, mode: "insensitive" }
              : undefined,
          },
          totalAmount: parsedInput.totalAmount
            ? {
                gte: parsedInput.totalAmount.min,
                lte: parsedInput.totalAmount.max,
              }
            : undefined,
          orderStatus: {
            in: parsedInput.orderStatus ? parsedInput.orderStatus : undefined,
          },
          paymentStatus: {
            in: parsedInput.paymentStatus
              ? parsedInput.paymentStatus
              : undefined,
          },
          paymentMethod: {
            in: ["DRAFT"],
          },
        };

        const totalCount = await prisma.order.count({ where });
        const totalPage = Math.ceil(totalCount / (parsedInput.limit ?? 10));
        const currentPage =
          parsedInput.page && parsedInput.page > totalPage
            ? 1
            : (parsedInput.page ?? 1);

        const orders = await prisma.order.findMany({
          where,
          take: parsedInput.limit ?? 10,
          skip: parsedInput.limit
            ? (currentPage - 1) * parsedInput.limit
            : undefined,
          orderBy: [{ orderNumber: "desc" }, { createdAt: "desc" }],
          include: {
            customer: {
              omit: {
                password: true,
                updatedAt: true,
              },
            },
            items: true,
          },
        });
        const serializedOrders: IOrderGetAll[] = orders.map((order) => ({
          ...order,
          arkshFoodPoint: Number(order.arkshFoodPoint.toFixed(2)),
          items: order.items.map((item) => ({
            ...item,
            totalPrice: Number(item.totalPrice.toFixed(2)),
            unitSellingPrice: Number(item.unitSellingPrice.toFixed(2)),
            specialPrice: Number(item.specialPrice.toFixed(2)),
            productApproxWeight: Number(item.productApproxWeight.toFixed(2)),
          })),
          discountAmount: Number(order.discountAmount.toFixed(2)),
          deliveryCharge: Number(order.deliveryCharge.toFixed(2)),
          subTotalAmount: Number(order.subTotalAmount.toFixed(2)),
          totalItems: Number(
            order.items.reduce((acc, item) => acc + item.quantity, 0)
          ),
          totalAmount: Number(order.totalAmount.toFixed(2)),
        }));
        return {
          data: serializedOrders,
          meta: {
            currentPage,
            totalPage,
          },
          success: true,
          message: "Orders fetched successfully",
        };
      }
    );
}
