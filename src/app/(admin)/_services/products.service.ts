import prisma from "@/lib/db";

import { adminActionClient } from "@/lib/next-safe-action";

import { IPrismaResponse } from "@/types";
import z from "zod";

import { IGetAllProducts, IGetProductById } from "../types/products";

import { Prisma } from "@prisma/client";

import { productsSearchFilterSchema } from "../_validation/products.validation";

export class ProductService {
  getProductById = adminActionClient
    .inputSchema(
      z.object({
        id: z.string().min(1, { message: "Product ID is required" }),
      })
    )
    .action(
      async ({ parsedInput }): Promise<IPrismaResponse<IGetProductById>> => {
        const { id } = parsedInput;

        const productById = await prisma.product.findUnique({
          where: { id },
          include: {
            images: {
              orderBy: { sortOrder: "asc" },
            },
          },
        });

        if (!productById) {
          throw new Error("Product not found");
        }
        const data: IGetProductById = {
          ...productById,
          specialPrice: Number(productById.specialPrice),
          unitSellingPrice: Number(productById.unitSellingPrice),
          approxWeight: Number(productById.approxWeight),
          createdAt: productById.createdAt.toISOString(),
          updatedAt: productById.updatedAt.toISOString(),
          videoUrl: productById.videoUrl || null,
          images:
            productById?.images.map((img) => ({
              id: img.id,
              imageUrl: img.imageUrl,
              productId: img.productId,
              sortOrder: img.sortOrder,
            })) || [],
        };
        return {
          data: data || null,
          message: productById
            ? "Product fetched successfully"
            : "Product not found",
          success: !!productById,
          meta: {},
        };
      }
    );

  getAllProducts = adminActionClient
    .inputSchema(productsSearchFilterSchema)
    .action(
      async ({ parsedInput }): Promise<IPrismaResponse<IGetAllProducts[]>> => {
        const where: Prisma.ProductWhereInput = {
          isNewProduct: parsedInput.isNewProduct ?? undefined,
          isFeatured: parsedInput.isFeatured ?? undefined,
          isVisible: parsedInput.isVisible ?? undefined,
          onSale: parsedInput.onSale ?? undefined,
          isWholeSale: parsedInput.isWholeSale ?? undefined,
          isFlashSale: parsedInput.isFlashSale ?? undefined,
          name: parsedInput.name
            ? {
                contains: parsedInput.name,
                mode: "insensitive",
              }
            : undefined,
          stockQuantity: parsedInput.stockQuantity
            ? {
                gte: parsedInput.stockQuantity.min ?? undefined,
                lte: parsedInput.stockQuantity.max ?? undefined,
              }
            : undefined,
          unitSellingPrice: parsedInput.unitSellingPrice
            ? {
                gte: parsedInput.unitSellingPrice.min ?? undefined,
                lte: parsedInput.unitSellingPrice.max ?? undefined,
              }
            : undefined,
          createdAt: parsedInput.createdAt
            ? {
                gte: parsedInput.createdAt.from
                  ? new Date(parsedInput.createdAt.from)
                  : undefined,
                lte: parsedInput.createdAt.to
                  ? new Date(parsedInput.createdAt.to)
                  : undefined,
              }
            : undefined,
        };
        const totalCount = await prisma.product.count({ where });
        const totalPage = Math.ceil(totalCount / (parsedInput.limit ?? 10));
        const currentPage =
          parsedInput.page && parsedInput.page > totalPage
            ? 1
            : (parsedInput.page ?? 1);

        const data = await prisma.product.findMany({
          include: {
            images: {
              orderBy: { sortOrder: "asc" },
              take: 1,
            },
            category: true,
          },
          where,
          take: parsedInput.limit ?? 10,
          skip: parsedInput.limit
            ? (currentPage - 1) * parsedInput.limit
            : undefined,
          orderBy: {
            createdAt: "desc",
          },
        });

        const serializedData: IGetAllProducts[] = data.map((d) => {
          return {
            id: d.id,
            name: d.name,
            isFeatured: d.isFeatured,
            isNewProduct: d.isNewProduct,
            isVisible: d.isVisible,
            onSale: d.onSale,
            stockQuantity: d.stockQuantity,
            isWholeSale: d.isWholeSale,
            currency: d.currency,
            unitSellingPrice: Number(d.unitSellingPrice),
            specialPrice: Number(d.specialPrice),
            categoryName: d.category?.name!,
            images: d.images[0],
          };
        });
        return {
          data: serializedData,
          message: "fetched",
          success: true,
          meta: {
            totalPage,
            currentPage,
          },
        };
      }
    );

  getProductOrderTimeLine = adminActionClient
    .inputSchema(
      z.object({
        id: z.string().min(1, { message: "Product ID is required" }),
      })
    )
    .action(
      async ({
        parsedInput,
      }): Promise<IPrismaResponse<{ date: string; count: number }[]>> => {
        const productOrder = await prisma.orderItem.findMany({
          where: {
            productId: parsedInput.id,
          },
          select: {
            quantity: true,
            order: {
              select: {
                createdAt: true,
              },
            },
          },
          orderBy: {
            order: {
              createdAt: "asc",
            },
          },
        });

        // Group quantities by date
        const quantityByDate = productOrder.reduce(
          (acc, item) => {
            const date = item.order.createdAt.toISOString().split("T")[0];
            acc[date] = (acc[date] || 0) + item.quantity;
            return acc;
          },
          {} as Record<string, number>
        );

        // Convert to array format
        const quantityTimeline = Object.entries(quantityByDate).map(
          ([date, count]) => ({
            date,
            count,
          })
        );

        return {
          data: quantityTimeline,
          message: "Product quantity timeline fetched successfully",
          success: true,
          meta: {},
        };
      }
    );
}
