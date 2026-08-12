"use server";

import { adminActionClient } from "@/lib/next-safe-action";

import {
  createProductValidationSchema,
  productImageValidationSchema,
} from "../_validation/products.validation";
import z from "zod";

import prisma from "@/lib/db";
import { uploadImageToAPI } from "../_helper/server-action-image";
import { revalidatePath } from "next/cache";
import { isFileLike } from "@/lib/file-utils";

const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};
export const createProductMutation = adminActionClient
  .inputSchema(
    createProductValidationSchema.extend({
      productImages: z.array(productImageValidationSchema),
    })
  )
  .action(async ({ parsedInput }) => {
    try {
      const {
        productImages,
        categoryId,
        bannerId,
        brandId,
        subBrandId,
        ...rest
      } = parsedInput;
      const doesProductExist = await prisma.product.findUnique({
        where: { name: rest.name },
      });

      if (doesProductExist) {
        return {
          success: false,
          message: "Product with this name already exists",
        };
      }
      const createdProduct = await prisma.product.create({
        data: {
          ...rest,
          slug: slugify(rest.name),
          category: {
            connect: { id: categoryId },
          },
          ...(brandId &&
            brandId != 0 && {
              brand: {
                connect: {
                  id: brandId,
                },
              },
            }),
          ...(subBrandId &&
            subBrandId != 0 && {
              subBrand: {
                connect: {
                  id: subBrandId,
                },
              },
            }),
          ...(bannerId &&
            bannerId != 0 && {
              banner: {
                connect: {
                  id: bannerId,
                },
              },
            }),
        },
      });

      await Promise.all(
        (productImages || []).map(async (img) => {
          if (img.isImageRemoved || !img.file) return null;

          if (typeof img.file === "string") {
            await prisma.productImage.create({
              data: {
                productId: createdProduct.id,
                imageUrl: img.file,
                sortOrder: img.sortOrder,
              },
            });
            return null;
          }

          if (isFileLike(img.file)) {
            const uploadedImageUrl = await uploadImageToAPI(img.file);
            await prisma.productImage.create({
              data: {
                productId: createdProduct.id,
                imageUrl: uploadedImageUrl.url,
                sortOrder: img.sortOrder,
              },
            });
          }

          return null;
        })
      );
      revalidatePath("/");
      return { success: true };
    } catch (error) {
      console.error("Error creating product:", error);
      throw new Error("Failed to create product");
    }
  });

export const updateProductMutation = adminActionClient
  .inputSchema(
    createProductValidationSchema.extend({
      id: z.string().min(1, "Product ID is required"),
      productImages: z.array(productImageValidationSchema),
    })
  )
  .action(async ({ parsedInput }) => {
    try {
      const {
        id,
        productImages,
        categoryId,
        bannerId,
        brandId,
        subBrandId,
        ...rest
      } = parsedInput;

      await prisma.product.update({
        where: { id },
        data: {
          ...rest,
          slug: slugify(rest.name),
          category: {
            connect: { id: categoryId },
          },
          brand: {
            connect: brandId && brandId !== 0 ? { id: brandId } : undefined,
          },
          subBrand: {
            connect:
              subBrandId && subBrandId !== 0 ? { id: subBrandId } : undefined,
          },
          banner:
            bannerId && bannerId !== 0
              ? {
                  connect: { id: bannerId },
                }
              : {
                  disconnect: true,
                },
        },
      });

      await Promise.all(
        productImages.map(async (productImage) => {
          if (
            productImage.isImageRemoved &&
            productImage.id &&
            typeof productImage.file === "string"
          ) {
            // await deleteImageFromAPI(productImage.file);
            await prisma.productImage.delete({
              where: {
                id: productImage.id,
              },
            });
          }
          // upload the new image
          if (
            isFileLike(productImage.file) &&
            productImage.isImageRemoved == false
          ) {
            const res = await uploadImageToAPI(productImage.file);
            await prisma.productImage.create({
              data: {
                productId: id,
                sortOrder: productImage.sortOrder,
                imageUrl: res.url,
              },
            });
          }

          // create image already uploaded from the client
          if (
            !productImage.id &&
            typeof productImage.file === "string" &&
            productImage.file &&
            !productImage.isImageRemoved
          ) {
            await prisma.productImage.create({
              data: {
                productId: id,
                sortOrder: productImage.sortOrder,
                imageUrl: productImage.file,
              },
            });
          }

          // update the ordering of the file
          if (
            productImage.id &&
            typeof productImage.file === "string" &&
            !productImage.isImageRemoved
          ) {
            await prisma.productImage.update({
              where: {
                id: productImage.id,
              },
              data: {
                sortOrder: productImage.sortOrder,
                imageUrl: productImage.file,
              },
            });
          }
        })
      );
      revalidatePath("/");
      return {
        success: true,
        message: "Product updated successfully",
      };
    } catch (error) {
      console.error("Error updating product:", error);
      throw new Error("Failed to update product");
    }
  });
