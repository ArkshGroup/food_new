"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";
import { adminActionClient } from "@/lib/next-safe-action";
import { uploadImageToAPI } from "../_helper/server-action-image";
import {
  createBrandValidationSchema,
  updateBrandValidationSchema,
} from "../_validation/brand.validation";
import z from "zod";

export const createBrandMutation = adminActionClient
  .inputSchema(createBrandValidationSchema)
  .action(async ({ parsedInput }) => {
    try {
      if (!(parsedInput.imageUrl instanceof File)) {
        throw new Error("Image file is required for creating a category.");
      }
      const uploadedImageUrl = await uploadImageToAPI(
        parsedInput.imageUrl as File
      );

      const brand = await prisma.brand.create({
        data: {
          ...parsedInput,
          imageUrl: uploadedImageUrl.url,
          subBrands: {
            create: parsedInput.subBrands,
          },
        },
      });

      revalidatePath("/admin/brand");
      revalidatePath("/");
      return {
        message: "Brand created successfully",
        data: brand,
        success: true,
      };
    } catch (error) {
      console.error("Error uploading image or creating category:", error);
      throw new Error(error instanceof Error ? error.message : "Unknown error");
    }
  });

export const updateBrandMutation = adminActionClient
  .inputSchema(updateBrandValidationSchema)
  .action(async ({ parsedInput }) => {
    if (parsedInput.imageUrl instanceof File) {
      const uploadedImageUrl = await uploadImageToAPI(
        parsedInput.imageUrl as File
      );
      parsedInput.imageUrl = uploadedImageUrl.url;
    }

    // Get existing sub-brands
    const existingSubBrands = await prisma.subBrand.findMany({
      where: { brandId: parsedInput.id },
      select: { id: true },
    });

    const existingIds = existingSubBrands.map((sb) => sb.id);
    const incomingIds =
      parsedInput.subBrands?.filter((sb) => sb.id).map((sb) => sb.id!) || [];

    // Find IDs to delete (existing but not in incoming)
    const idsToDelete = existingIds.filter((id) => !incomingIds.includes(id));

    const brand = await prisma.brand.update({
      where: { id: parsedInput.id },
      data: {
        name: parsedInput.name,
        brandDetail: parsedInput.brandDetail,
        imageUrl: parsedInput.imageUrl,
        brandPosition: parsedInput.brandPosition,
        subBrands: {
          // Delete removed sub-brands
          deleteMany:
            idsToDelete.length > 0
              ? {
                  id: { in: idsToDelete },
                }
              : undefined,
          // Update existing sub-brands
          updateMany:
            parsedInput.subBrands
              ?.filter((sb) => sb.id)
              .map((sb) => ({
                where: { id: sb.id },
                data: {
                  name: sb.name,
                  position: sb.position,
                },
              })) || [],
          // Create new sub-brands
          create:
            parsedInput.subBrands
              ?.filter((sb) => !sb.id)
              .map((sb) => ({
                name: sb.name,
                position: sb.position,
              })) || [],
        },
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/brand");
    return {
      message: "Brand updated successfully",
      data: brand,
      success: true,
    };
  });
export const deleteBrandMutation = adminActionClient
  .inputSchema(z.object({ id: z.number() }))
  .action(async ({ parsedInput }) => {
    const { id } = parsedInput;

    await prisma.brand.delete({
      where: { id },
    });

    revalidatePath("/admin/brand");
    return {
      message: "Brand deleted successfully",
      success: true,
    };
  });
