"use server";
import prisma from "@/lib/db";
import { publicActionClient } from "@/lib/next-safe-action";
import { revalidatePath } from "next/cache";
import z from "zod";

export const updateViewMutation = publicActionClient
  .inputSchema(
    z.object({
      slug: z.string(),
    })
  )
  .action(async ({ ctx, parsedInput }) => {
    const user = await prisma.blog.update({
      where: { slug: parsedInput.slug },
      data: {
        views: { increment: 1 },
      },
    });
    revalidatePath(`/blog/${parsedInput.slug}`);
    return { success: true, message: "Blog updated successfully", user };
  });
