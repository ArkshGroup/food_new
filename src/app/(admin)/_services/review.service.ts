import prisma from "@/lib/db";
import type { IPrismaResponse } from "@/types";
import type { IGetAllReview } from "../types/review";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reviewDelegate = (prisma as any).review;

export class ReviewService {
  async getAllReviews(): Promise<IPrismaResponse<IGetAllReview[]>> {
    const reviews = await reviewDelegate.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        product: { select: { name: true, slug: true } },
        user: { select: { userName: true, email: true } },
      },
    });

    const data: IGetAllReview[] = reviews.map((r: { id: string; productId: string; userId: string; rating: number; comment: string | null; createdAt: Date; product: { name: string; slug: string }; user: { userName: string | null; email: string } }) => ({
      id: r.id,
      productId: r.productId,
      userId: r.userId,
      rating: r.rating,
      comment: r.comment,
      createdAt: r.createdAt,
      product: r.product,
      user: r.user,
    }));

    return {
      data,
      message: "Reviews fetched successfully",
      success: true,
      meta: { totalPage: 1 },
    };
  }
}
