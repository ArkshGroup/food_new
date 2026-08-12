import { DiscountCodeType, Prisma } from "@prisma/client";

export interface IGetAllDiscountCode extends Prisma.DiscountCodeGetPayload<{}> {
  id: number;
  code: string;
  startDate: Date;
  endDate: Date;
  minOrderAmount: number;
  value: number;
  discountType: DiscountCodeType;
  discountPercent: number | null;
  maxDiscountAmount: number | null;
  isActive: boolean;
  usageLimit: number;
  usageCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IGetCustomerById {
  customer: Prisma.UserGetPayload<{}>;
  orders: (Omit<
    Prisma.OrderGetPayload<{}>,
    "totalAmount" | "deliveryCharge" | "discountAmount" | "subTotalAmount"
  > & {
    totalAmount: number;
    deliveryCharge: number;
    discountAmount: number;
    subTotalAmount: number;
  })[];
}
