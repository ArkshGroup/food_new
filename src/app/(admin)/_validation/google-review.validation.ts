import { z } from "zod";

export const createGoogleReviewValidationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  starRating: z
    .number()
    .int()
    .min(1, "Rating must be 1–5")
    .max(5, "Rating must be 1–5"),
  reviewText: z.string().min(1, "Review text is required"),
  sortOrder: z.number().int().min(0).default(0),
});

export const updateGoogleReviewValidationSchema =
  createGoogleReviewValidationSchema.extend({
    id: z.string(),
  });

export type CreateGoogleReviewFormData = z.infer<
  typeof createGoogleReviewValidationSchema
>;

export type UpdateGoogleReviewFormData = z.infer<
  typeof updateGoogleReviewValidationSchema
>;
