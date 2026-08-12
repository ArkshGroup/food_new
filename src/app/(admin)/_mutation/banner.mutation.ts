"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";
import { adminActionClient } from "@/lib/next-safe-action";
import { uploadImageToAPI } from "../_helper/server-action-image";
import {
  createBannerValidationSchema,
  updateBannerValidationSchema,
} from "../_validation/banner.validation";

export const createBannerMutation = adminActionClient
  .inputSchema(createBannerValidationSchema)
  .action(async ({ parsedInput }) => {
    try {
      if (!(parsedInput.imageUrl instanceof File)) {
        throw new Error("Image file is required for creating a category.");
      }
      const uploadedImageUrl = await uploadImageToAPI(
        parsedInput.imageUrl as File
      );

      const banner = await prisma.banner.create({
        data: {
          ...parsedInput,
          imageUrl: uploadedImageUrl.url,
        },
      });

      revalidatePath("/admin/banner");
      revalidatePath("/");
      return {
        message: "Banner created successfully",
        data: banner,
        success: true,
      };
    } catch (error) {
      console.error("Error uploading image or creating banner:", error);
      throw new Error(error instanceof Error ? error.message : "Unknown error");
    }
  });

export const updateBannerMutation = adminActionClient
  .inputSchema(updateBannerValidationSchema)
  .action(async ({ parsedInput }) => {
    if (parsedInput.imageUrl instanceof File) {
      const uploadedImageUrl = await uploadImageToAPI(
        parsedInput.imageUrl as File
      );
      parsedInput.imageUrl = uploadedImageUrl.url;
    }

    const banner = await prisma.banner.update({
      where: { id: parsedInput.id },
      data: {
        ...parsedInput,
        imageUrl: parsedInput.imageUrl,
      },
    });

    revalidatePath("/admin/banner");
    return {
      message: "Banner updated successfully",
      data: banner,
      success: true,
    };
  });
