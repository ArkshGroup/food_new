import z from "zod";

export const paymentScreenShotValidation = z.object({
  orderId: z.string(),
  paymentScreenShot: z.string({
    error: " Payment screenshot is required",
  }),
});
