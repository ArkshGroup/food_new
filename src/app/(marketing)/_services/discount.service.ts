import prisma from "@/lib/db";
import { DiscountCode } from "@prisma/client";
import { IPrismaResponse } from "@/types";

export interface IDiscountCode
  extends Omit<
    DiscountCode,
    "minOrderAmount" | "value" | "discountPercent" | "maxDiscountAmount"
  > {
  minOrderAmount: number;
  value: number;
  discountPercent: number;
  maxDiscountAmount: number;
}

export class DiscountService {
  async getAllDiscountCode(): Promise<IPrismaResponse<IDiscountCode[]>> {
    const discountCodes = await prisma.discountCode.findMany({
      where: {
        isDiscountCodeVisibleToPublic: true,
      },
    });
    return {
      data: discountCodes.map((discount): IDiscountCode => {
        return {
          ...discount,
          minOrderAmount: discount.minOrderAmount.toNumber(),
          value: discount.value.toNumber(),
          discountPercent: discount.discountPercent.toNumber(),
          maxDiscountAmount: discount.maxDiscountAmount.toNumber(),
        };
      }),
      message: "Successfully fetched all public and active discount codes.",
      success: true,
    };
  }
}
