import prisma from "@/lib/db";
import type { IPrismaResponse } from "@/types";
import { IGetAllDiscountCode } from "../types/discount";

export class DiscountService {
  async getAllDiscountCode(): Promise<IPrismaResponse<IGetAllDiscountCode[]>> {
    const discountCodes = await prisma.discountCode.findMany({
      orderBy: {
        name: "asc",
      },
    });
    const mappedDiscountCodes: IGetAllDiscountCode[] = discountCodes.map(
      (discount) => ({
        ...discount,
        startDate: new Date(discount.startDate),
        endDate: new Date(discount.endDate),
        createdAt: new Date(discount.createdAt),
        updatedAt: new Date(discount.updatedAt),
        minOrderAmount: Number(discount.minOrderAmount),
        value: Number(discount.value),
        discountType: discount.discountType,
        discountPercent: Number(discount.discountPercent),
        maxDiscountAmount: Number(discount.maxDiscountAmount),
        usageCount: Number(discount.usageCount),
      })
    );

    return {
      data: mappedDiscountCodes,
      message: "Discount codes fetched successfully",
      success: true,
      meta: { totalPage: 1 },
    };
  }

  async getDiscountCodeById(id: number) {
    const discountCode = await prisma.discountCode.findUnique({
      where: { id: +id },
    });
    if (!discountCode) {
      return {
        data: null,
        message: "Discount code not found",
        success: false,
      };
    }
    return {
      data: {
        ...discountCode,
        startDate: new Date(discountCode.startDate),
        endDate: new Date(discountCode.endDate),
        createdAt: new Date(discountCode.createdAt),
        updatedAt: new Date(discountCode.updatedAt),
        maxDiscountAmount: Number(discountCode.maxDiscountAmount),
        minOrderAmount: Number(discountCode.minOrderAmount),
        discountPercent: Number(discountCode.discountPercent),
        value: Number(discountCode.value),
        usageCount: Number(discountCode.usageCount),
      },
      message: "Discount code fetched successfully",
      success: true,
    };
  }

  async getDiscountUsage({ id }: { id: number }) {
    const usageRecords = await prisma.discountCodeUsage.findMany({
      where: { discountCodeId: +id },
      select: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });
    return {
      data: usageRecords,
      message: "Discount usage records fetched successfully",
      success: true,
    };
  }
}
