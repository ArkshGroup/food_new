import { z } from "zod";

export const createCategoryValidationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  imageUrl: z.union([z.instanceof(File), z.string()]).optional(),
  categoryDetail: z.string(),
  isVisible: z.boolean(),
  position: z.number().optional(),
});

export const updateCategoryValidationSchema =
  createCategoryValidationSchema.extend({
    id: z.number(),
  });

export type CreateCategoryFormData = z.infer<
  typeof createCategoryValidationSchema
>;
export type UpdateCategoryFormData = z.infer<
  typeof updateCategoryValidationSchema
>;
