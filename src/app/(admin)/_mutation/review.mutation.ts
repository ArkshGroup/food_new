"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";
import { adminActionClient } from "@/lib/next-safe-action";
import z from "zod";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reviewDelegate = (prisma as any).review;

export const deleteReviewMutation = adminActionClient
  .inputSchema(z.object({ id: z.string().min(1) }))
  .action(async ({ parsedInput }) => {
    const { id } = parsedInput;
    await reviewDelegate.delete({
      where: { id },
    });
    revalidatePath("/admin/reviews");
    return {
      message: "Review deleted successfully",
      success: true,
    };
  });
