import prisma from "@/lib/db";
import type { IPrismaResponse } from "@/types";
import type { IGetAllCategory } from "../types/category";

export class CategoryService {
  async getAllCategories(): Promise<IPrismaResponse<IGetAllCategory[]>> {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: {
            product: true,
          },
        },
      },
    });

    const mappedCategories: IGetAllCategory[] = categories
      .map((category) => ({
        categoryDetail: category.categoryDetail,
        id: category.id,
        imageUrl: category.imageUrl,
        name: category.name,
        noOfProducts: category._count.product,
        createdAt: category.createdAt,
        position: category.position,
        isVisible: category.isVisible,
      }))
      .sort((a, b) => a.position - b.position);

    return {
      data: mappedCategories,
      message: "Categories fetched successfully",
      success: true,
      meta: { totalPage: 1 },
    };
  }
}
