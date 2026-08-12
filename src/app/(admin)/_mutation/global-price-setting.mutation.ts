"use server";
import prisma from "@/lib/db";
import { adminActionClient } from "@/lib/next-safe-action";
import { revalidatePath } from "next/cache";
import z from "zod";

export const updateAllProductSpecialPriceMutation = adminActionClient
  .inputSchema(
    z.object({
      percentage: z.number(),
    })
  )
  .action(async ({ parsedInput }) => {
    const { percentage } = parsedInput;

    if (percentage > 55) {
      return {
        message: "Percentage cannot be greater than 55",
        success: false,
      };
    }

    await prisma.$executeRawUnsafe(`
      UPDATE "Product"
      SET "specialPrice" = ROUND("unitSellingPrice" - ("unitSellingPrice" * ${percentage} / 100))::int
    `);

    revalidatePath("/");
    return {
      message: "All products special price updated successfully",
      success: true,
    };
  });
