import { z } from "zod";

export const createBlogValidationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  summary: z.string(),
  imageUrl: z.union([z.instanceof(File), z.string()]),
  author: z.string().min(1, "Author is required"),
  metaTitle: z.string(),
  metaDescription: z.string(),
  metaKeywords: z.string(),
  isPublished: z.boolean().optional(),
});

export const updateBlogValidationSchema = createBlogValidationSchema.extend({
  id: z.string(),
});

export type CreateBlogFormData = z.infer<typeof createBlogValidationSchema>;
export type UpdateBlogFormData = z.infer<typeof updateBlogValidationSchema>;

export const blogSearchFilterSchema = z.object({
  page: z.number().int().min(1),
  limit: z.number().int().min(1),

  title: z.string().nullable(),
  author: z.string().nullable(),

  isPublished: z.boolean().optional().nullable(),

  // createdAt range: "from|to"
  createdAt: z
    .string()
    .nullable()
    .transform((val) => {
      if (!val) {
        return null;
      }
      const [from, to] = val.split("|");
      return {
        from: from?.trim() ? new Date(from.trim()) : undefined,
        to: to?.trim() ? new Date(to.trim()) : undefined,
      };
    }),

  // publishedAt range: "from|to"
  publishedAt: z
    .string()
    .nullable()
    .transform((val) => {
      if (!val) {
        return null;
      }
      const [from, to] = val.split("|");
      return {
        from: from?.trim() ? new Date(from.trim()) : undefined,
        to: to?.trim() ? new Date(to.trim()) : undefined,
      };
    }),
});
