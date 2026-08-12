import { z } from "zod";

export const createHeroSliderImageValidationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  image: z.union([z.instanceof(File), z.string()]).optional(),
  order: z.number().min(0).optional(),
  url: z.string().optional(),
  isActive: z.boolean().optional(),
  detail: z.string(),
});

export const updateHeroSliderImageValidationSchema =
  createHeroSliderImageValidationSchema.extend({
    id: z.string(),
  });

export type CreateHeroSliderImageFormData = z.infer<
  typeof createHeroSliderImageValidationSchema
>;
export type UpdateHeroSliderImageFormData = z.infer<
  typeof updateHeroSliderImageValidationSchema
>;
