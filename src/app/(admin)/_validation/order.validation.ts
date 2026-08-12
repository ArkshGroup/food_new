import { ORDER_STATUS, PAYMENT_STATUS } from "@prisma/client";
import z from "zod";

export const ordersSearchFilterSchema = z.object({
  id: z.string().optional(),
  orderNumber: z.number().optional(),
  page: z.number().int().min(1),
  limit: z.number().int().min(4),

  customerName: z.string().nullable(),
  customerEmail: z.string().nullable(),

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

  totalAmount: z
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

  orderStatus: z
    .string()
    .nullable()
    .transform((val) => {
      if (!val) {
        return;
      }
      val.split(",").forEach((status) => {
        if (!Object.values(ORDER_STATUS).includes(status as ORDER_STATUS)) {
          return;
        }
      });
      return val.split(",") as ORDER_STATUS[];
    }),
  paymentStatus: z
    .string()
    .nullable()
    .transform((val) => {
      if (!val) {
        return;
      }
      val.split(",").forEach((status) => {
        if (!Object.values(PAYMENT_STATUS).includes(status as PAYMENT_STATUS)) {
          return;
        }
      });
      return val.split(",") as PAYMENT_STATUS[];
    }),
});

export const ordersMutationSchema = z.object({
  id: z.number().int().min(1),
  status: z.enum(ORDER_STATUS),
  paymentStatus: z.enum(PAYMENT_STATUS),
});
