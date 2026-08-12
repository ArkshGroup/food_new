import z from "zod";

export const customerFilterSchema = z.object({
  page: z.number().int().min(1),
  limit: z.number().int().min(4),
  name: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
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
