"use server";

import { customerActionClient } from "@/lib/next-safe-action";
import prisma from "@/lib/db";
import z from "zod";
import { sendEmail } from "@/lib/nodemailer";
import OrderConfirmationMail from "@/emails/order/order-response";
import AdminNewOrderMail from "@/emails/order/order-notification";
import { PAYMENT_METHOD } from "@prisma/client";

export const confirmPaymentMethod = customerActionClient
  .inputSchema(
    z
      .object({
        id: z.string(),
        paymentType: z.enum(PAYMENT_METHOD),
        paymentScreenShot: z.string().optional(),
      })
      .superRefine(async (data, ctx) => {
        if (data.paymentType === "ONLINE_PAYMENT" && !data.paymentScreenShot) {
          ctx.addIssue({
            code: "custom",
            message: "Payment screenshot is required for online payment",
          });
        }
      }),
  )
  .action(async ({ parsedInput, ctx }) => {
    const { id, paymentType } = parsedInput;

    // 1️⃣ Fetch order once, outside transaction
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        items: true,
        orderShippingDetails: true,
        customer: true,
      },
    });

    if (!order) {
      throw new Error("Order not found");
    }

    const user = await prisma.user.findUnique({
      where: { id: order.customerId },
      select: { arkshFoodPoint: true },
    });

    if (!user) throw new Error("Customer not found");

    await prisma.$transaction(
      async (tx) => {
        await tx.order.update({
          where: { id },
          data: {
            paymentMethod: paymentType,
            paymentScreenShot: parsedInput.paymentScreenShot,
          },
        });
        if (user.arkshFoodPoint.lessThan(order.arkshFoodPoint || 0)) {
          throw new Error(
            "Arksh Food Points already used exceed available points",
          );
        }

        const earnedPoints = Math.round(order.subTotalAmount.toNumber() * 0.03);

        const finalPoints = user.arkshFoodPoint
          .add(earnedPoints)
          .sub(order.arkshFoodPoint || 0);

        await tx.user.update({
          where: { id: order.customerId },
          data: { arkshFoodPoint: finalPoints },
        });

        await tx.cartItem.deleteMany({
          where: {
            cart: { userId: ctx.user.id },
          },
        });

        if (order.discountCode) {
          const discountCode = await tx.discountCode.findUnique({
            where: { code: order.discountCode },
          });

          if (!discountCode) {
            throw new Error("Invalid discount code");
          }

          await tx.discountCodeUsage.create({
            data: {
              userId: ctx.user.id,
              discountCodeId: discountCode.id,
            },
          });

          await tx.discountCode.update({
            where: { id: discountCode.id },
            data: {
              usageCount: { increment: 1 },
            },
          });
        }

        await Promise.all(
          order.items.map((item) =>
            tx.product.update({
              where: {
                id: item.productId!,
              },
              data: {
                stockQuantity: { decrement: item.quantity },
              },
            }),
          ),
        );
      },
      {
        timeout: 15000,
      },
    );

    // 3️⃣ Send emails outside transaction
    sendEmail({
      to: ctx.user.email!,
      subject: "Order Confirmation",
      reactComponent: OrderConfirmationMail({
        order: {
          orderNumber: order.orderNumber,
          orderId: order.id,
          subTotalAmount: order.subTotalAmount.toNumber(),
          deliveryCharge: order.deliveryCharge.toNumber(),
          discountAmount: order.discountAmount.toNumber(),
          totalAmount: order.totalAmount.toNumber(),
          orderStatus: order.orderStatus,
          currency: "NPR",
          items: order.items.map((item) => ({
            productName: item.productName,
            productImage: item.productImage,
            productApproxWeight: item.productApproxWeight.toNumber(),
            quantity: item.quantity,
            unitSellingPrice: item.unitSellingPrice.toNumber(),
            specialPrice: item.specialPrice.toNumber(),
            totalPrice: item.totalPrice.toNumber(),
          })),
          paymentStatus: order.paymentStatus,
          shippingDetails: {
            addressLine1: order.orderShippingDetails?.addressLine1!,
            city: order.orderShippingDetails?.city || "",
            phoneNumber: order.orderShippingDetails?.phoneNumber || "",
            recipientName:
              order.orderShippingDetails?.recipientName ||
              order.customer.userName ||
              "",
          },
          customerName: order.customer.userName || "Valued Customer",
          deliveryMethod: order.deliveryMethod,
        },
      }),
    }).catch(console.error);

    // todo update email with actual email
    const adminEmails = [
      "digital.marketing@arkshgroup.com",
      "order@arkshfood.com",
      "foodbilling@arkshgroup.com",
      "ceo@arkshgroup.com",
      "knkjnjrkvbtrmg3@gmail.com",
    ];
    const devEmails = ["knkjnjrkvbtrmg3@gmail.com"];
    sendEmail({
      to: process.env.NODE_ENV === "production" ? adminEmails : devEmails,
      subject: `Order ${order.orderNumber}`,
      reactComponent: AdminNewOrderMail({
        order: {
          orderNumber: order.orderNumber,
          orderId: order.id,
          subTotalAmount: order.subTotalAmount.toNumber(),
          deliveryCharge: order.deliveryCharge.toNumber(),
          discountAmount: order.discountAmount.toNumber(),
          totalAmount: order.totalAmount.toNumber(),
          orderStatus: order.orderStatus,
          currency: "NPR",
          items: order.items.map((item) => ({
            productName: item.productName,
            productImage: item.productImage,
            productApproxWeight: item.productApproxWeight.toNumber(),
            quantity: item.quantity,
            unitSellingPrice: item.unitSellingPrice.toNumber(),
            specialPrice: item.specialPrice.toNumber(),
            totalPrice: item.totalPrice.toNumber(),
          })),
          paymentStatus: order.paymentStatus,
          shippingDetails: {
            addressLine1: order.orderShippingDetails?.addressLine1!,
            city: order.orderShippingDetails?.city || "",
            phoneNumber: order.orderShippingDetails?.phoneNumber || "",
            zone: order.orderShippingDetails?.zone || "",
            recipientName:
              order.orderShippingDetails?.recipientName ||
              order.customer.userName ||
              "",
          },
          customerName: order.customer.userName || "Valued Customer",
          deliveryMethod: order.deliveryMethod,
        },
      }),
    }).catch(console.error);

    return {
      success: true,
      message: "Payment screenshot uploaded successfully",
    };
  });
