import prisma from "@/lib/db";
import type { IPrismaResponse } from "@/types";
import { IGetAllHeroSliderImage } from "../types/hero-slider-image";

export class HeroSliderImageService {
  async getAllHeroSliderImages(): Promise<
    IPrismaResponse<IGetAllHeroSliderImage[]>
  > {
    const heroSliderImages = await prisma.heroSliderImage.findMany({
      orderBy: { order: "asc" },
    });

    const mappedHeroSliderImages = heroSliderImages.map((img) => ({
      ...img,
    }));

    return {
      data: mappedHeroSliderImages,
      message: "Hero slider images fetched successfully",
      success: true,
      meta: { totalPage: 1 },
    };
  }
}
