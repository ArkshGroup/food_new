"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";
import { adminActionClient } from "@/lib/next-safe-action";

import z from "zod";
import {
  createBlogValidationSchema,
  updateBlogValidationSchema,
} from "../_validation/blog.validation";
import { uploadImageToAPI } from "../_helper/server-action-image";
import { adminNavigationPath } from "../_config/admin.config";

const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const createBlogMutation = adminActionClient
  .inputSchema(createBlogValidationSchema)
  .action(async ({ parsedInput }) => {
    try {
      const image = await uploadImageToAPI(parsedInput.imageUrl as File);
      const imageUrl = image.url;
      const slug = generateSlug(parsedInput.title);
      const { imageUrl: _parsedImageUrl, ...rest } = parsedInput;

      const blog = await prisma.blog.create({
        data: {
          ...rest,
          slug: slug,
          imageUrl,
        },
      });
      revalidatePath(adminNavigationPath.blog.path);
      revalidatePath("/blog");
      return {
        message: "Blog created successfully",
        data: blog,
        success: true,
      };
    } catch (error) {
      console.error("Error creating blog:", error);
      throw new Error(error instanceof Error ? error.message : "Unknown error");
    }
  });

export const updateBlogMutation = adminActionClient
  .inputSchema(updateBlogValidationSchema)
  .action(async ({ parsedInput }) => {
    const hasImageChange = parsedInput.imageUrl instanceof File;
    if (hasImageChange) {
      const image = await uploadImageToAPI(parsedInput.imageUrl as File);
      parsedInput.imageUrl = image.url;
    }

    const blog = await prisma.blog.update({
      where: { id: parsedInput.id },
      data: {
        ...parsedInput,
        imageUrl: parsedInput.imageUrl as string,
        slug: generateSlug(parsedInput.title),
      },
    });

    revalidatePath(adminNavigationPath.blog.path);
    revalidatePath("/blog");
    revalidatePath(`/blog/${blog.slug}`);

    return {
      message: "Blog updated successfully",
      data: blog,
      success: true,
    };
  });

export const deleteBlogMutation = adminActionClient
  .inputSchema(z.object({ id: z.string() }))
  .action(async ({ parsedInput }) => {
    const { id } = parsedInput;

    const blog = await prisma.blog.delete({
      where: { id },
    });

    revalidatePath(adminNavigationPath.blog.path);
    revalidatePath("/blog");
    revalidatePath(`/blog/${blog.slug}`);

    return {
      message: "Blog deleted successfully",
      success: true,
    };
  });
