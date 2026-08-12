"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";
import { adminActionClient } from "@/lib/next-safe-action";
import z from "zod";
import {
  createGoogleReviewValidationSchema,
  updateGoogleReviewValidationSchema,
} from "../_validation/google-review.validation";

export const createGoogleReviewMutation = adminActionClient
  .inputSchema(createGoogleReviewValidationSchema)
  .action(async ({ parsedInput }) => {
    const review = await prisma.googleReview.create({
      data: parsedInput,
    });
    revalidatePath("/admin/google-reviews");
    revalidatePath("/");
    return { message: "Google review added", data: review, success: true };
  });

export const updateGoogleReviewMutation = adminActionClient
  .inputSchema(updateGoogleReviewValidationSchema)
  .action(async ({ parsedInput }) => {
    const { id, ...data } = parsedInput;
    const review = await prisma.googleReview.update({
      where: { id },
      data,
    });
    revalidatePath("/admin/google-reviews");
    revalidatePath("/");
    return { message: "Google review updated", data: review, success: true };
  });

export const deleteGoogleReviewMutation = adminActionClient
  .inputSchema(z.object({ id: z.string() }))
  .action(async ({ parsedInput }) => {
    await prisma.googleReview.delete({ where: { id: parsedInput.id } });
    revalidatePath("/admin/google-reviews");
    revalidatePath("/");
    return { message: "Google review deleted", success: true };
  });
