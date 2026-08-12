import { z } from "zod";

export const createFoodInfluencerProgramValidationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  instagramUrl: z.string().url("Instagram URL must be valid"),
  facebookUrl: z.string().url("Facebook URL must be valid"),
  tiktokUrl: z.string().url("TikTok URL must be valid"),
});

export const updateFoodInfluencerProgramValidationSchema =
  createFoodInfluencerProgramValidationSchema.extend({
    id: z.string(),
  });

export type CreateFoodInfluencerProgramFormData = z.infer<
  typeof createFoodInfluencerProgramValidationSchema
>;

export type UpdateFoodInfluencerProgramFormData = z.infer<
  typeof updateFoodInfluencerProgramValidationSchema
>;
