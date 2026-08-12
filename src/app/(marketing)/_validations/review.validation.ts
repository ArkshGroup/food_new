import z from "zod";

export const createReviewValidation = z.object({
  productId: z.string().min(1, "Product is required"),
  rating: z.number().min(1, "Rating must be at least 1").max(5, "Rating must be at most 5"),
  comment: z.string().max(2000, "Comment cannot exceed 2000 characters").optional(),
});

export type CreateReviewFormData = z.infer<typeof createReviewValidation>;
