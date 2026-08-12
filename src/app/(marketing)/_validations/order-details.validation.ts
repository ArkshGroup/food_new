import {
  CURRENCY,
  DELIVERY_TYPE,
  DELIVERY_METHOD,
  PAYMENT_METHOD,
} from "@prisma/client";
import z from "zod";

export const orderDetailsValidation = z
  .object({
    currency: z.enum(CURRENCY).default("NPR"),
    deliveryCharge: z.number().min(0, "Delivery charge cannot be negative"),
    deliveryType: z.enum(DELIVERY_TYPE),
    discountCode: z.string().optional(),
    discountAmount: z.number().min(0, "Invalid discount amount").optional(),
    deliveryMethod: z.enum(DELIVERY_METHOD),
    paymentMethod: z.enum(
      [PAYMENT_METHOD.CASH_ON_DELIVERY, PAYMENT_METHOD.ONLINE_PAYMENT],
      {
        error: "Please Select a payment method",
      },
    ),
    paymentScreenShot: z.string().optional(),
    arkshFoodPoint: z.number().min(0).optional(),
    items: z
      .array(
        z.object({
          productId: z.string().min(1, "Product ID is required"),
          quantity: z.number().int().min(1, "Quantity must be at least 1"),
        }),
      )
      .min(1, "At least one item is required"),
    shippingAddress: z.object({
      recipientName: z.string().optional(),
      addressLine1: z.string().min(1, "Address is required"),
      addressLine2: z.string().optional(),
      city: z.string().optional(),
      cityId: z.string().optional(),
      zone: z.string().optional(),
      zoneId: z.string().optional(),
      state: z.string().optional(),
      postalCode: z.string().optional(),
      country: z.string().optional(),
      phoneNumber: z.string().optional(),
      email: z.string().optional(),
      latitude: z.number().optional(),
      longitude: z.number().optional(),
    }),
  })
  .superRefine((data, ctx) => {
    if (
      data.deliveryType === "OUTSIDE_VALLEY" &&
      data.deliveryMethod == "INSTANT_DELIVERY"
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Instant delivery is not available for outside valley.",
        path: ["deliveryMethod"],
      });
    }
    if (data.deliveryType === "INTERNATIONAL") {
      if (
        !data.shippingAddress.country ||
        data.shippingAddress.country.trim().length === 0
      ) {
        ctx.addIssue({
          code: "custom",
          message: "Country is required for international delivery.",
          path: ["shippingAddress", "country"],
        });
      }
      if (data.deliveryMethod == "INSTANT_DELIVERY") {
        ctx.addIssue({
          code: "custom",
          message:
            "Please select SELF_COURIER or NORMAL_DELIVERY for international delivery.",
          path: ["deliveryMethod"],
        });
      }
    }
  });
