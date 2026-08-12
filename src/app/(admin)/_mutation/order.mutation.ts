"use server";

import prisma from "@/lib/db";
import { adminActionClient } from "@/lib/next-safe-action";
import { IPrismaResponse } from "@/types";
import { ORDER_STATUS, PAYMENT_STATUS } from "@prisma/client";
import { revalidatePath } from "next/cache";
import z from "zod";
import { adminNavigationPath } from "../_config/admin.config";
import { Decimal } from "@prisma/client/runtime/library";
import { pathaoApi } from "@/lib/axios";
import { PathaoOrderResponse } from "../types/order";
import { sendEmail } from "@/lib/nodemailer";
import SendTrackingNumberEmail from "@/emails/pathoo/send-tracking-no";
import { pathaoConfig } from "@/config/pathao.config";

export const updateOrderMutation = adminActionClient
  .inputSchema(
    z.object({
      orderId: z.string(),
      orderStatus: z.enum(ORDER_STATUS),
      paymentStatus: z.enum(PAYMENT_STATUS),
    })
  )
  .action(async ({ parsedInput }): Promise<IPrismaResponse<any>> => {
    const { orderId, orderStatus, paymentStatus } = parsedInput;

    const existingOrder = await prisma.order.findUnique({
      where: { id: orderId },
      select: { subTotalAmount: true, deliveryCharge: true },
    });

    if (!existingOrder) {
      return {
        message: "Order not found",
        data: null,
        success: false,
      };
    }

    await prisma.order.update({
      where: { id: orderId },
      data: {
        orderStatus,
        paymentStatus,
      },
    });
    revalidatePath(`${adminNavigationPath.orders}/${orderId}`);
    return {
      message: "Order updated successfully",
      data: null,
      success: true,
    };
  });

export const createPathaoOrderMutation = adminActionClient
  .inputSchema(
    z.object({
      orderNumber: z.number(),
      paymentScreenShot: z.string().optional().nullable(),
      storeLocation: z.enum(["balagu", "lazimpath"]).optional(),
    })
  )
  .action(async ({ parsedInput }) => {
    const storeLocation = {
      balagu: "356775",
      // here while in development we are using staging store id
      lazimpath: process.env.NODE_ENV === "production" ? "357240" : "130903",
    };
    try {
      const existingOrder = await prisma.order.findUnique({
        where: { orderNumber: parsedInput.orderNumber },
        include: {
          orderShippingDetails: true,
          customer: true,
          items: true,
        },
      });
      if (!existingOrder) {
        return {
          message: "Order not found",
          data: null,
          success: false,
        };
      }
      const calculatedTotalWeight =
        existingOrder.items.reduce(
          (total, item) =>
            total + (Number(item.productApproxWeight) || 0) * item.quantity,
          0
        ) / 1000;

      let amountToCollect = Math.round(existingOrder.totalAmount.toNumber());

      // if payment screen shot is provided then amount to collect will be 0
      const paymentScreenShot = parsedInput.paymentScreenShot;
      if (paymentScreenShot) {
        amountToCollect = 0;
      }

        const payload = {
        store_id: storeLocation[parsedInput.storeLocation || "balagu"],
        delivery_type: 48,
        item_type: 2,
        merchant_order_id: parsedInput.orderNumber,
        recipient_name:
          existingOrder?.orderShippingDetails?.recipientName ||
          existingOrder?.customer.userName ||
          "",
        recipient_phone:
          existingOrder?.orderShippingDetails?.phoneNumber ||
          existingOrder?.customer.phoneNumber ||
          "",
        recipient_address:
          existingOrder?.orderShippingDetails?.addressLine1 || "",
        recipient_city: existingOrder?.orderShippingDetails?.cityId || "",
        recipient_zone: existingOrder?.orderShippingDetails?.zoneId || "",
        item_quantity: existingOrder.items.length,
        item_weight: calculatedTotalWeight || 1,
        item_description: `Order #${parsedInput.orderNumber}`,
        amount_to_collect: amountToCollect,
        special_instruction: `${paymentScreenShot ? "Customer has already paid the delivery Charge" : ""}`,
      };

      const pathooOrderResponse = await createPathaoOrder({
        ...payload,
      });

      await prisma.order.update({
        where: { orderNumber: parsedInput.orderNumber },
        data: {
          trackingNumber: `https://parcel.pathao.com/tracking?consignment_id=${pathooOrderResponse.data.consignment_id}`,
        },
      });

      sendEmail({
        to: existingOrder.customer.email,
        subject: "Your Order has been assigned to Pathao",
        reactComponent: SendTrackingNumberEmail({
          order: {
            orderNumber: parsedInput.orderNumber,
            trackingNumber: `https://parcel.pathao.com/tracking?consignment_id=${pathooOrderResponse.data.consignment_id}`,
          },
        }),
      });

      revalidatePath(`${adminNavigationPath.orders}/${existingOrder.id}`);
      return {
        message: "Pathao order created successfully",
        data: pathooOrderResponse,
        success: true,
      };
    } catch (error: any) {
      console.error(
        "Error in createPathaoOrderMutation:",
        error.response?.data || error.message
      );
      return {
        message: error.message || "Failed to create Pathao order",
        data: null,
        success: false,
      };
    }
  });

async function createPathaoOrder({
  store_id,
  merchant_order_id,
  recipient_name,
  recipient_phone,
  recipient_address,
  recipient_city,
  recipient_zone,
  delivery_type,
  item_type,
  item_quantity,
  item_weight,
  item_description,
  amount_to_collect,
}: {
  store_id: number | string;
  merchant_order_id: number;
  recipient_name: string;
  recipient_phone: string;
  recipient_address: string;
  recipient_city: number | string;
  recipient_zone: number | string;
  delivery_type: number;
  item_type: number;
  item_quantity: number;
  item_weight: number;
  item_description: string;
  amount_to_collect: number;
}) {
  const payload = {
    store_id,
    merchant_order_id,
    recipient_name,
    recipient_phone,
    recipient_address,
    recipient_city,
    recipient_zone,
    delivery_type,
    item_type,
    item_quantity,
    item_weight,
    item_description,
    amount_to_collect,
  };
  const { data } = await pathaoApi
    .post<PathaoOrderResponse>("/aladdin/api/v1/orders", payload)
    .catch((error) => {
      console.error(
        "Pathao order creation error:",

        error.response?.data || error.message
      );
      throw new Error(JSON.stringify(error.response?.data) || error.message);
    });
  if (data.type === "error") {
    console.error("Pathao API error:", data.message);
    throw new Error(`Pathao API error: ${data.message}`);
  }
  return data;
}
