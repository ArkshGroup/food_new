import z from "zod";

export const getAllProductsFilterValidation = z.object({
  name: z.string().optional(),
  sortBy: z.enum(["specialPrice", "productName"]).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
  page: z.coerce.number().min(1).default(1).optional(),
  limit: z.coerce.number().min(1).default(9).optional(),
  categoryNames: z
    .string()
    .optional()
    .transform((val) =>
      typeof val === "undefined" || val === ""
        ? undefined
        : val.split(",").map((name) => name.trim())
    ),
  brandNames: z
    .string()
    .optional()
    .transform((val) =>
      typeof val === "undefined" || val === ""
        ? undefined
        : val.split(",").map((name) => name.trim())
    ),
  isFeatured: z
    .string()
    .optional()
    .transform((val) =>
      typeof val === "undefined" ? undefined : val === "true"
    ),
  onSale: z
    .string()
    .optional()
    .transform((val) =>
      typeof val === "undefined" ? undefined : val === "true"
    ),
  isFlashSale: z
    .string()
    .optional()
    .transform((val) =>
      typeof val === "undefined" ? undefined : val === "true"
    ),
  newArrivals: z
    .string()
    .optional()
    .transform((val) =>
      typeof val === "undefined" ? undefined : val === "true"
    ),
  specialPrice: z
    .string()
    .optional()
    .transform((val) => {
      if (typeof val === "undefined" || val === "") {
        return { minPrice: undefined, maxPrice: undefined };
      }
      const [min, max] = val.split("-").map((v) => Number(v.trim()));
      return {
        minPrice: isNaN(min) ? undefined : min,
        maxPrice: isNaN(max) ? undefined : max,
      };
    })
    .refine(
      (data) =>
        data.minPrice === undefined ||
        data.maxPrice === undefined ||
        data.minPrice <= data.maxPrice,
      {
        message: "minPrice must be less than or equal to maxPrice",
      }
    )
    .transform(
      (data) =>
        data as { minPrice: number | undefined; maxPrice: number | undefined }
    ),
});
