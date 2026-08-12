"use server";
import { adminActionClient } from "@/lib/next-safe-action";
import {
  discountCodeCreateSchema,
  discountCodeUpdateSchema,
} from "../_validation/discount.validation";
import prisma from "@/lib/db";

export const createDiscountCodeMutation = adminActionClient
  .inputSchema(discountCodeCreateSchema)
  .action(async ({ parsedInput }) => {
    const {
      code,
      name,
      startDate,
      endDate,
      minOrderAmount,
      value,
      isActive,
      discountPercent,
      discountType,
      maxDiscountAmount,
      usageLimit,
      isDiscountCodeVisibleToPublic,
    } = parsedInput;

    try {
      const doesDiscountExist = await prisma.discountCode.findUnique({
        where: {
          code: code.toUpperCase(),
        },
      });

      if (doesDiscountExist) {
        return {
          message: "Discount code already exists.",
          success: false,
        };
      }

      const startOfDay = new Date(startDate);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(endDate);
      endOfDay.setHours(23, 59, 59, 999);

      await prisma.discountCode.create({
        data: {
          code: code.toUpperCase(),
          name,
          startDate: startOfDay,
          endDate: endOfDay,
          minOrderAmount,
          value,
          isActive,
          usageLimit,
          discountType,
          maxDiscountAmount,
          discountPercent,
          isDiscountCodeVisibleToPublic,
        },
      });

      return {
        message: "Discount code created successfully.",
        success: true,
      };
    } catch (error) {
      console.error("Error creating discount code:", error);
      throw new Error("Failed to create discount code.");
    }
  });

export const updateDiscountCodeMutation = adminActionClient
  .inputSchema(discountCodeUpdateSchema)
  .action(async ({ parsedInput }) => {
    const {
      id,
      code,
      name,
      startDate,
      endDate,
      minOrderAmount,
      value,
      isActive,
      usageLimit,
      discountPercent,
      discountType,
      maxDiscountAmount,
      isDiscountCodeVisibleToPublic,
    } = parsedInput;
    try {
      const doesCodeExistOnAnother = await prisma.discountCode.findFirst({
        where: {
          code: code.toUpperCase(),
          NOT: {
            id: +id,
          },
        },
      });

      if (doesCodeExistOnAnother) {
        return {
          message: "A discount code with this name already exists.",
          success: false,
        };
      }

      const discountToUpdate = await prisma.discountCode.findUnique({
        where: { id: +id },
      });

      if (!discountToUpdate) {
        return {
          message: "Discount code not found.",
          success: false,
        };
      }

      const startOfDay = new Date(startDate);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(endDate);
      endOfDay.setHours(23, 59, 59, 999);

      await prisma.discountCode.update({
        where: { id: +id },
        data: {
          code: code.toUpperCase(),
          name,
          startDate: startOfDay,
          endDate: endOfDay,
          minOrderAmount,
          value,
          isActive,
          usageLimit,
          discountType,
          discountPercent,
          maxDiscountAmount,
          isDiscountCodeVisibleToPublic,
        },
      });

      return {
        message: "Discount code updated successfully.",
        success: true,
      };
    } catch (error) {
      console.error("Error updating discount code:", error);
      throw new Error("Failed to update discount code");
    }
  });
