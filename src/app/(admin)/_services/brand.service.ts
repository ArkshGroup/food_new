import prisma from "@/lib/db";
import type { IPrismaResponse } from "@/types";
import { IGetAllBrand } from "../types/brand";

export class BrandService {
  async getAllBrands(): Promise<IPrismaResponse<IGetAllBrand[]>> {
    const brands = await prisma.brand.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: {
            product: true,
          },
        },
        subBrands: true,
      },
    });

    const mappedBrands = brands.map((brand) => ({
      ...brand,
      imageUrl: brand.imageUrl === null ? undefined : brand.imageUrl,
      noOfProducts: brand._count.product,
      subBrands: brand.subBrands.sort((a, b) => a.position - b.position),
    }));

    return {
      data: mappedBrands,
      message: "Brands fetched successfully",
      success: true,
      meta: { totalPage: 1 },
    };
  }
}
