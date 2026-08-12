import { z } from "zod";

export const createBrandValidationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  imageUrl: z.union([z.instanceof(File), z.string()]).optional(),
  brandDetail: z.string(),
  brandPosition: z.number().int().optional(),
  subBrands: z
    .array(
      z.object({
        id: z.number().optional(),
        name: z.string().min(1, "Sub-brand name is required"),
        position: z
          .number()
          .int()
          .min(0, "Position must be a non-negative integer"),
      })
    )
    .optional(),
});

export const updateBrandValidationSchema = createBrandValidationSchema.extend({
  id: z.number(),
});

export type CreateBrandFormData = z.infer<typeof createBrandValidationSchema>;
export type UpdateBrandFormData = z.infer<typeof updateBrandValidationSchema>;
