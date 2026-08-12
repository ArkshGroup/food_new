import { z } from "zod";

export const discountCodeCreateSchema = z.object({
  name: z.string().min(1, "Discount name is required"),
  code: z.string().min(1, "Discount code is required").toUpperCase(),
  startDate: z.date(),
  endDate: z.date(),
  minOrderAmount: z.number().min(0, "Minimum order amount must be positive"),
  value: z.number().min(0, "Discount value must be positive"),
  discountPercent: z
    .number()
    .min(0)
    .max(100, "Percentage must be between 0-100"),
  discountType: z.enum(["FIXED_AMOUNT", "PERCENTAGE"]),
  maxDiscountAmount: z
    .number()
    .min(0, "Max discount amount must be positive")
    .optional(),
  isActive: z.boolean().default(true),
  usageLimit: z.number().min(0, "Usage limit must be positive"),
  isDiscountCodeVisibleToPublic: z.boolean().optional(),
});

export const discountCodeUpdateSchema = discountCodeCreateSchema.extend({
  id: z.number(),
});

export type DiscountCodeCreateInput = z.infer<typeof discountCodeCreateSchema>;
export type DiscountCodeUpdateInput = z.infer<typeof discountCodeUpdateSchema>;
