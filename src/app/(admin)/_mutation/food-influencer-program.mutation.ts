"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";
import { adminActionClient } from "@/lib/next-safe-action";
import z from "zod";
import {
  createFoodInfluencerProgramValidationSchema,
  updateFoodInfluencerProgramValidationSchema,
} from "../_validation/food-influencer-program.validation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const foodInfluencerDelegate = (prisma as any).foodInfluencerProgram;

export const createFoodInfluencerProgramMutation = adminActionClient
  .inputSchema(
    createFoodInfluencerProgramValidationSchema.extend({ userId: z.string() }),
  )
  .action(async ({ parsedInput }) => {
    const created = await foodInfluencerDelegate.create({
      data: parsedInput,
    });
    revalidatePath("/admin/food-influencer-program");
    revalidatePath("/food-influencer-program");
    return { success: true, message: "Entry created", data: created };
  });

export const updateFoodInfluencerProgramMutation = adminActionClient
  .inputSchema(updateFoodInfluencerProgramValidationSchema)
  .action(async ({ parsedInput }) => {
    const { id, ...data } = parsedInput;
    const updated = await foodInfluencerDelegate.update({
      where: { id },
      data,
    });
    revalidatePath("/admin/food-influencer-program");
    revalidatePath("/food-influencer-program");
    return { success: true, message: "Entry updated", data: updated };
  });

export const deleteFoodInfluencerProgramMutation = adminActionClient
  .inputSchema(z.object({ id: z.string() }))
  .action(async ({ parsedInput }) => {
    await foodInfluencerDelegate.delete({ where: { id: parsedInput.id } });
    revalidatePath("/admin/food-influencer-program");
    revalidatePath("/food-influencer-program");
    return { success: true, message: "Entry deleted" };
  });
