"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";
import { adminActionClient } from "@/lib/next-safe-action";
import { uploadImageToAPI } from "../_helper/server-action-image";
import {
  createHeroSliderImageValidationSchema,
  updateHeroSliderImageValidationSchema,
} from "../_validation/hero-slider-image.validation";
import z from "zod";

export const createHeroSliderImageMutation = adminActionClient
  .inputSchema(createHeroSliderImageValidationSchema)
  .action(async ({ parsedInput }) => {
    try {
      const uploadedImageUrl = await uploadImageToAPI(
        parsedInput.image as File
      );

      const heroSliderImage = await prisma.heroSliderImage.create({
        data: {
          ...parsedInput,
          image: uploadedImageUrl.url,
        },
      });

      revalidatePath("/admin/hero-slider-image");

      return {
        message: "Hero slider image created successfully",
        data: heroSliderImage,
        success: true,
      };
    } catch (error) {
      console.error(
        "Error uploading image or creating hero slider image:",
        error
      );
      throw new Error(error instanceof Error ? error.message : "Unknown error");
    }
  });

export const updateHeroSliderImageMutation = adminActionClient
  .inputSchema(updateHeroSliderImageValidationSchema)
  .action(async ({ parsedInput }) => {
    if (parsedInput.image instanceof File) {
      const uploadedImageUrl = await uploadImageToAPI(
        parsedInput.image as File
      );
      parsedInput.image = uploadedImageUrl.url;
    }

    const heroSliderImage = await prisma.heroSliderImage.update({
      where: { id: parsedInput.id },
      data: {
        ...parsedInput,
        image: parsedInput.image as string,
      },
    });
    revalidatePath("/");
    revalidatePath("/admin/hero-slider-image");
    return {
      message: "Hero slider image updated successfully",
      data: heroSliderImage,
      success: true,
    };
  });

export const deleteHeroSliderImageMutation = adminActionClient
  .inputSchema(z.object({ id: z.string() }))
  .action(async ({ parsedInput }) => {
    const { id } = parsedInput;

    await prisma.heroSliderImage.delete({
      where: { id },
    });
    revalidatePath("/");
    revalidatePath("/admin/hero-slider-image");
    return {
      message: "Hero slider image deleted successfully",
      success: true,
    };
  });
