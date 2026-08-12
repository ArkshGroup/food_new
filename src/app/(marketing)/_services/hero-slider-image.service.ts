import prisma from "@/lib/db";
import { publicActionClient } from "@/lib/next-safe-action";

export class HeroSliderImageService {
  getAllHeroSliderImage = publicActionClient.action(async () => {
    const res = await prisma.heroSliderImage.findMany({
      select: {
        id: true,
        name: true,
        detail: true,
        image: true,
        url: true,
        order: true,
        isActive: true,
      },
      orderBy: {
        order: "asc",
      },
      where: {
        isActive: true,
      },
    });
    const mappedRes: IHeroSliderImage[] = res.map((item) => ({
      id: item.id,
      name: item.name,
      detail: item.detail,
      image: item.image,
      url: item.url !== undefined ? item.url : null,
      order: item.order,
      isActive: item.isActive,
    }));

    return { data: mappedRes };
  });
}
