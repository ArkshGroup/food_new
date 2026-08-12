"use server";

import { customerActionClient } from "@/lib/next-safe-action";
import { createReviewValidation } from "../_validations/review.validation";
import prisma from "@/lib/db";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reviewDelegate = (prisma as any).review;

export const createReviewMutation = customerActionClient
  .inputSchema(createReviewValidation)
  .action(async ({ parsedInput, ctx }) => {
    const { productId, rating, comment } = parsedInput;
    const userId = ctx.user.id;

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      throw new Error("Product not found");
    }

    const existing = await reviewDelegate.findUnique({
      where: {
        productId_userId: { productId, userId },
      },
    });
    if (existing) {
      const updated = await reviewDelegate.update({
        where: { id: existing.id },
        data: { rating, comment },
      });
      return { success: true, review: updated, updated: true };
    }

    const review = await reviewDelegate.create({
      data: {
        productId,
        userId,
        rating,
        comment: comment ?? null,
      },
    });
    return { success: true, review, updated: false };
  });
