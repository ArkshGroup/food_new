import { UNIT } from "@prisma/client";
import z from "zod";
import { isFileLike } from "@/lib/file-utils";

export const createProductValidationSchema = z
  .object({
    // basic info
    name: z.string().min(1, "Product name is required"),
    categoryId: z.number().min(1, "Category is required"),
    bannerId: z.number().optional(),
    brandId: z.number().optional(),
    subBrandId: z.number().optional(),

    // detailed info
    description: z.string().optional(),

    // toggle options
    onSale: z.boolean().optional(),
    isWholeSale: z.boolean().optional(),
    isNewProduct: z.boolean().optional(),
    isFeatured: z.boolean().optional(),
    isVisible: z.boolean().optional(),
    isFlashSale: z.boolean().optional(),

    // pricing & stock
    unitSellingPrice: z.number().min(0, "Price must be positive"),
    specialPrice: z.number().min(0, "Discount must be positive"),
    stockQuantity: z.number().min(0, "Stock quantity must be at least 0"),
    unit: z.enum(UNIT),
    approxWeight: z
      .number()
      .min(0, "Approx weight must be positive")
      .optional(),

    // SEO
    metaTitle: z.string().min(1, "Meta title is required"),
    metaDescription: z.string().min(1, "Meta description is required"),
    metaKeywords: z.string().min(1, "Meta keywords are required"),

    // video
    videoUrl: z.string().optional().or(z.literal("")),
    productPosition: z.number().optional(),
  })
  .refine(
    (data) => {
      if (data.specialPrice) {
        return data.specialPrice <= data.unitSellingPrice;
      }
      return true;
    },
    {
      message: "Discount price must be less or equal than the selling price",
      path: ["specialPrice"],
    }
  );

export const updateProductValidationSchema =
  createProductValidationSchema.extend({
    id: z.string().min(1, "Product ID is required"),
  });

export type CreateProductDTO = z.infer<typeof createProductValidationSchema>;

export type UpdateProductDTO = z.infer<typeof createProductValidationSchema>;

export const productImageValidationSchema = z.object({
  id: z.string().optional(),
  file: z
    .union([
      z.string(),
      z.custom<File>((file) => isFileLike(file), {
        message: "Expected a valid image file",
      }),
    ])
    .optional()
    .refine(
      (file) =>
        !file ||
        typeof file === "string" ||
        (isFileLike(file) && file.size <= 5 * 1024 * 1024),
      { message: "File size must not exceed 5 MB" }
    ),
  sortOrder: z.number().int().min(0),
  isImageRemoved: z.boolean().optional(),
});

export const productsSearchFilterSchema = z.object({
  page: z.number().int().min(1),
  limit: z.number().int().min(4),
  name: z.string().nullable(),

  // toggle options
  onSale: z.boolean().optional().nullable(),
  isWholeSale: z.boolean().optional().nullable(),
  isNewProduct: z.boolean().optional().nullable(),
  isFeatured: z.boolean().optional().nullable(),
  isVisible: z.boolean().optional().nullable(),
  isFlashSale: z.boolean().optional().nullable(),

  // pricing & stock
  stockQuantity: z
    .string()
    .nullable()
    .transform((v) => {
      if (!v) {
        return null;
      }
      const [min, max] = v.split("-");
      return {
        min: Number(min) || undefined,
        max: Number(max) || undefined,
      };
    }),
  unitSellingPrice: z
    .string()
    .nullable()
    .transform((v) => {
      if (!v) {
        return null;
      }
      const [min, max] = v.split("-");
      return {
        min: Number(min) || undefined,
        max: Number(max) || undefined,
      };
    }),

  // date filter
  createdAt: z
    .string()
    .nullable()
    .transform((val) => {
      if (!val) {
        return;
      }
      const [from, to] = val.split("|");
      return {
        from: from?.trim() ? new Date(from.trim()) : undefined,
        to: to?.trim() ? new Date(to.trim()) : undefined,
      };
    }),
});
