import { UNIT } from "@prisma/client";
import z from "zod";

export const bulkOrderInquiryValidation = z.object({
  productId: z.string(),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  notes: z.string().max(500, "Notes cannot exceed 500 characters").optional(),
  unit: z.enum(UNIT),
  phoneNumber: z
    .string()
    .min(7, "Phone number must be at least 7 characters")
    .max(15, "Phone number cannot exceed 15 characters"),
});

export type BulkOrderInquiryFormData = z.infer<
  typeof bulkOrderInquiryValidation
>;
