"use server";
import { customerActionClient } from "@/lib/next-safe-action";
import { orderDetailsValidation } from "../_validations/order-details.validation";
import prisma from "@/lib/db";
import { Decimal } from "@prisma/client/runtime/library";
import { ORDER_STATUS } from "@prisma/client";
import { applyDiscountCodeMutation } from "./discount.mutation";

export const orderMutation = customerActionClient
  .inputSchema(orderDetailsValidation)
  .action(async ({ parsedInput, ctx }) => {
    const { user } = ctx;
    if (!user) {
      throw new Error("User not authenticated");
    }
    const productIds = parsedInput.items.map((p) => p.productId);
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
        isVisible: true,
      },
    });
    if (products.length !== productIds.length) {
      throw new Error("Some products not found or not available");
    }
    for (const item of parsedInput.items) {
      if (item.quantity <= 0) {
        throw new Error(`Invalid quantity for product ${item.productId}`);
      }
    }
    let subTotalAmount = new Decimal(0);
    const orderItems: Array<{
      productId: string;
      productName: string;
      productImage: string;
      productApproxWeight: Decimal;
      quantity: number;
      unitSellingPrice: Decimal;
      specialPrice: Decimal;
      totalPrice: Decimal;
    }> = [];

    for (const item of parsedInput.items) {
      const product = products.find((p) => p.id === item.productId);
      if (!product) {
        throw new Error(`Product ${item.productId} not found`);
      }
      // Check stock availability
      if (product.stockQuantity < item.quantity) {
        throw new Error(
          `Insufficient stock for product ${product.name}. Available: ${product.stockQuantity}, Requested: ${item.quantity}`
        );
      }

      const effectivePrice = product.specialPrice;
      const totalPrice = effectivePrice.mul(item.quantity);
      subTotalAmount = subTotalAmount.add(totalPrice);
      const productImages = await prisma.productImage.findMany({
        where: { productId: { in: productIds } },
        orderBy: { sortOrder: "asc" },
      });
      const imageMap = new Map<string, string>();

      for (const img of productImages) {
        if (!imageMap.has(img.productId)) {
          imageMap.set(img.productId, img.imageUrl!);
        }
      }
      orderItems.push({
        productId: product.id,
        productName: product.name,
        productImage: imageMap.get(product.id) || "",
        productApproxWeight: product.approxWeight,
        quantity: item.quantity,
        unitSellingPrice: product.unitSellingPrice,
        specialPrice: product.specialPrice,
        totalPrice: totalPrice,
      });
    }

    const deliveryCharge = new Decimal(parsedInput.deliveryCharge);
    let discountAmount = new Decimal(0);
    let discountCodeId: number;

    if (parsedInput.discountCode) {
      const { data } = await applyDiscountCodeMutation({
        code: parsedInput.discountCode,
      });
      discountCodeId = data?.data?.id!;
      if (data && data.success) {
        discountAmount = new Decimal(data.data?.value || 0);
      } else {
        throw new Error(data?.message || "Failed to apply discount code");
      }
    }
    if ((parsedInput?.arkshFoodPoint ?? 0) > 0) {
      discountAmount = discountAmount.add(
        new Decimal(parsedInput.arkshFoodPoint ?? 0)
      );
    }

    const totalAmount = subTotalAmount.add(deliveryCharge).sub(discountAmount);

    const result = await prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          customerId: user.id,
          subTotalAmount,
          totalAmount,
          deliveryCharge,
          arkshFoodPoint: new Decimal(parsedInput.arkshFoodPoint || 0),
          deliveryType: parsedInput.deliveryType,
          discountAmount,
          discountCode: parsedInput.discountCode,
          orderStatus: ORDER_STATUS.PENDING,
          // if user have selected online payment then mark payment method as DRAFT , which will be updated after payment
          paymentMethod:
            parsedInput.deliveryType === "INTERNATIONAL"
              ? "ONLINE_PAYMENT"
              : "DRAFT",
          paymentStatus: "UNPAID",
          deliveryMethod: parsedInput.deliveryMethod,
        },
      });

      // Create order items
      await tx.orderItem.createMany({
        data: orderItems.map((item) => ({
          orderId: order.id,
          ...item,
        })),
      });

      // only update the cart and discount for international orders
      if (order.deliveryType == "INTERNATIONAL") {
        const user = await tx.user.findUnique({
          where: { id: order.customerId },
          select: { arkshFoodPoint: true },
        });
        if (!user) {
          throw new Error("Customer not found");
        }
        if (user.arkshFoodPoint.lessThan(order.arkshFoodPoint || 0)) {
          throw new Error(
            "Arksh Food Points already used exceed available points"
          );
        }
        const earnedPoints = Math.round(order.subTotalAmount.toNumber() * 0.03);

        await tx.user.update({
          where: { id: order.customerId },
          data: {
            arkshFoodPoint: {
              increment: earnedPoints,
              decrement: order.arkshFoodPoint || 0,
            },
          },
        });
        const cart = await tx.cart.findFirst({
          where: { userId: ctx.user.id },
        });
        if (cart) {
          await tx.cartItem.deleteMany({
            where: { cartId: cart.id },
          });
        }
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
      }

      // Create shipping details
      await tx.orderShippingDetails.create({
        data: {
          orderId: order.id,
          recipientName:
            parsedInput.shippingAddress.recipientName || user.name || "",
          email: parsedInput.shippingAddress.email || user.email || "",
          addressLine1: parsedInput.shippingAddress.addressLine1,
          cityId: parsedInput.shippingAddress.cityId || "",
          city: parsedInput.shippingAddress.city || "",
          zone: parsedInput.shippingAddress.zone || "",
          zoneId: parsedInput.shippingAddress.zoneId || "",
          phoneNumber: parsedInput.shippingAddress.phoneNumber || "",
          country: parsedInput.shippingAddress.country || "",
          latitude: parsedInput.shippingAddress.latitude,
          longitude: parsedInput.shippingAddress.longitude,
        },
      });

      return order;
    });

    return {
      success: true,
      data: {
        orderId: result.id,
        subTotalAmount: result.subTotalAmount.toNumber(),
        deliveryCharge: result.deliveryCharge.toNumber(),
        discountAmount: result.discountAmount.toNumber(),
        totalAmount: result.totalAmount.toNumber(),
        orderStatus: result.orderStatus,
        paymentStatus: result.paymentStatus,
        itemCount: orderItems.length,
      },
      message: "Order created successfully",
    };
  });
