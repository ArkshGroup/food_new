"use server";

import prisma from "@/lib/db";
import { customerActionClient } from "@/lib/next-safe-action";
import z from "zod";
import { Decimal } from "@prisma/client/runtime/library";

export const applyDiscountCodeMutation = customerActionClient
  .inputSchema(
    z.object({
      code: z.string().min(1).max(20),
    })
  )
  .action(async ({ parsedInput, ctx }) => {
    const { code } = parsedInput;

    const currentDate = new Date();
    const isCodePresent = await prisma.discountCode.findUnique({
      where: {
        code: code.toUpperCase(),
      },
    });
    if (!isCodePresent) {
      return {
        success: false,
        message: "Invalid Discount Coupon",
      };
    }
    if (!isCodePresent.isActive) {
      return {
        success: false,
        message: "Discount Coupon not stackable during Offers ",
      };
    }

    if (
      currentDate < isCodePresent.startDate ||
      currentDate > isCodePresent.endDate
    ) {
      return { success: false, message: "Discount Coupon is Expired" };
    }

    if (isCodePresent.usageCount >= isCodePresent.usageLimit) {
      return { success: false, message: "Discount Coupon usage limit reached" };
    }

    // #region Percentage Discount Calculation
    if (
      isCodePresent.discountType === "PERCENTAGE" &&
      isCodePresent.discountPercent &&
      isCodePresent.maxDiscountAmount
    ) {
      const maxDiscount = isCodePresent.maxDiscountAmount;
      const cartData = await prisma.cart.findFirst({
        where: {
          userId: ctx.user.id,
        },
        include: {
          items: true,
        },
      });

      const sumAmount =
        cartData?.items.reduce((total, item) => {
          return total.add(new Decimal(item.price).mul(item.quantity));
        }, new Decimal(0)) || new Decimal(0);

      if (!sumAmount.gte(isCodePresent.minOrderAmount)) {
        return {
          success: false,
          message: `Code is only valid over NPR ${isCodePresent.minOrderAmount}`,
        };
      }
      let discountValue = sumAmount.mul(isCodePresent.discountPercent).div(100);

      if (maxDiscount.gte(0) && discountValue.gt(new Decimal(maxDiscount))) {
        discountValue = new Decimal(maxDiscount);
      }

      return {
        success: true,
        message: "Valid Discount Coupon",
        data: {
          value: Number(discountValue),
          valid: true,
          code: isCodePresent.code,
          id: isCodePresent.id,
        },
      };
    }

    //#endregion

    // #region Fixed Amount Discount Calculation
    const cartData = await prisma.cart.findFirst({
      where: {
        userId: ctx.user.id,
      },
      include: {
        items: true,
      },
    });
    const sumAmount =
      cartData?.items.reduce((total, item) => {
        return total.add(new Decimal(item.price).mul(item.quantity));
      }, new Decimal(0)) || new Decimal(0);

    if (!sumAmount.gte(isCodePresent.minOrderAmount)) {
      return {
        success: false,
        message: `Code is only valid over NPR ${isCodePresent.minOrderAmount}`,
      };
    }
    if (sumAmount.lt(new Decimal(isCodePresent.value))) {
      return {
        success: false,
        message: `Discount amount exceeds cart total`,
      };
    }

    return {
      success: true,
      message: "Valid Discount Coupon",
      data: {
        value: Number(isCodePresent.value),
        valid: true,
        id: isCodePresent.id,
        code: isCodePresent.code,
      },
    };
  });

export const applyArkshFoodPointMutation = customerActionClient
  .inputSchema(
    z.object({
      pointsToRedeem: z.number().min(1),
    })
  )
  .action(async ({ parsedInput, ctx }) => {
    const { pointsToRedeem } = parsedInput;

    const user = await prisma.user.findUnique({
      where: {
        id: ctx.user.id,
      },
    });

    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    if (Number(user.arkshFoodPoint) < pointsToRedeem) {
      return {
        success: false,
        message: "Insufficient Arksh Food Points",
      };
    }
    const discountValue = pointsToRedeem;
    return {
      success: true,
      message: "Arksh Food Points applied successfully",
      data: {
        value: discountValue,
        valid: true,
        pointsRedeemed: pointsToRedeem,
      },
    };
  });
