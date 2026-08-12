import prisma from "@/lib/db";

export interface IGoogleReviewPublic {
  id: string;
  name: string;
  starRating: number;
  reviewText: string;
  sortOrder: number;
}

export class GoogleReviewService {
  async getPublicList(): Promise<IGoogleReviewPublic[]> {
    const list = await prisma.googleReview.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      select: { id: true, name: true, starRating: true, reviewText: true, sortOrder: true },
    });
    return list;
  }
}
  

