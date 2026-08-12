import { z } from "zod";

export const createBannerValidationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  imageUrl: z.union([z.instanceof(File), z.string()]).optional(),
  bannerDetail: z.string(),
});

export const updateBannerValidationSchema = createBannerValidationSchema.extend(
  {
    id: z.number(),
  }
);

export type CreateBannerFormData = z.infer<typeof createBannerValidationSchema>;
export type UpdateBannerFormData = z.infer<typeof updateBannerValidationSchema>;
