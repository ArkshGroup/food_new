"use server";

import prisma from "@/lib/db";
import { publicActionClient } from "@/lib/next-safe-action";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { foodInfluencerProgramValidation } from "../_validations/food-influencer-program.validation";

export const createFoodInfluencerProgramMutation = publicActionClient
  .inputSchema(foodInfluencerProgramValidation)
  .action(async ({ parsedInput }) => {
    const session = await auth();
    const created = await prisma.foodInfluencerProgram.create({
      data: {
        ...parsedInput,
        userId: session?.user?.id ?? null,
      },
    });
    revalidatePath("/food-influencer-program");
    revalidatePath("/admin/food-influencer-program");
    return { success: true, message: "Application submitted", data: created };
  });
