import prisma from "@/lib/db";
import type { IPrismaResponse } from "@/types";
import type { IGetAllBanner } from "../types/banner.d";

export class BannerService {
	async getAllBanners(): Promise<IPrismaResponse<IGetAllBanner[]>> {
		const banners = await prisma.banner.findMany({
			orderBy: { name: "asc" },
			include: {
				_count: {
					select: {
						Product: true
					},
				},
			},
		});

		const mappedBanners = banners.map((banner) => ({
			...banner,
			imageUrl: banner.imageUrl === null ? undefined : banner.imageUrl,
			noOfProducts: banner._count.Product,
		}));

		return {
			data: mappedBanners,
			message: "Banners fetched successfully",
			success: true,
			meta: { totalPage: 1 },
		};
	}
}