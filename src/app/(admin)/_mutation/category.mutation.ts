"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";
import { adminActionClient } from "@/lib/next-safe-action";
import { uploadImageToAPI } from "../_helper/server-action-image";
import {
  createCategoryValidationSchema,
  updateCategoryValidationSchema,
} from "../_validation/category.validation";
import z from "zod";

export const createCategoryMutation = adminActionClient
  .inputSchema(createCategoryValidationSchema)
  .action(async ({ parsedInput }) => {
    try {
      if (!(parsedInput.imageUrl instanceof File)) {
        throw new Error("Image file is required for creating a category.");
      }
      const uploadedImageUrl = await uploadImageToAPI(
        parsedInput.imageUrl as File
      );
      const category = await prisma.category.upsert({
        where: { name: parsedInput.name },
        update: {
          categoryDetail: parsedInput.categoryDetail,
          isVisible: parsedInput.isVisible,
          imageUrl: uploadedImageUrl?.url,
        },
        create: {
          position: parsedInput.position,
          name: parsedInput.name,
          categoryDetail: parsedInput.categoryDetail,
          isVisible: parsedInput.isVisible,
          imageUrl: uploadedImageUrl?.url,
        },
      });

      revalidatePath("/admin/category");
      revalidatePath("/");
      return {
        message: "Category created successfully",
        success: true,
        data: category,
      };
    } catch (error) {
      console.error("Error uploading image or creating category:", error);
      throw new Error(error instanceof Error ? error.message : "Unknown error");
    }
  });

export const updateCategoryMutation = adminActionClient
  .inputSchema(updateCategoryValidationSchema)
  .action(async ({ parsedInput }) => {
    if (parsedInput.imageUrl instanceof File) {
      const uploadedImageUrl = await uploadImageToAPI(
        parsedInput.imageUrl as File
      );
      parsedInput.imageUrl = uploadedImageUrl.url;
    }

    const category = await prisma.category.update({
      where: { id: parsedInput.id },
      data: {
        ...parsedInput,
        position: parsedInput.position,
        imageUrl: parsedInput.imageUrl,
        isVisible: parsedInput.isVisible,
      },
    });
    revalidatePath("/");
    revalidatePath("/admin/category");
    return {
      message: "Category updated successfully",
      data: category,
      success: true,
    };
  });

export const deleteCategoryMutation = adminActionClient
  .inputSchema(z.object({ id: z.number() }))
  .action(async ({ parsedInput }) => {
    const { id } = parsedInput;

    await prisma.category.delete({
      where: { id },
    });
    revalidatePath("/");
    revalidatePath("/admin/category");
    return {
      message: "Category deleted successfully",
      success: true,
    };
  });
