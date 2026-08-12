import { publicActionClient, customerActionClient } from "@/lib/next-safe-action";
import z from "zod";
import prisma from "@/lib/db";

// Review model delegate (cast needed when PrismaClient types haven't refreshed after schema change)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reviewDelegate = (prisma as any).review;

export type { IProductReview } from "@/app/(marketing)/_types/review";
import type { IProductReview } from "@/app/(marketing)/_types/review";

type RatingGroup = { rating: number; _count: { rating: number } };

export class ReviewService {
  getProductReviews = publicActionClient
    .inputSchema(
      z.object({
        productId: z.string(),
        limit: z.number().min(1).max(50).optional().default(20),
        offset: z.number().min(0).optional().default(0),
      })
    )
    .action(async ({ parsedInput }): Promise<{ data: IProductReview[]; total: number }> => {
      const { productId, limit, offset } = parsedInput;

      const [reviews, total] = await Promise.all([
        reviewDelegate.findMany({
          where: { productId },
          orderBy: { createdAt: "desc" },
          take: limit,
          skip: offset,
          select: {
            id: true,
            productId: true,
            userId: true,
            rating: true,
            comment: true,
            createdAt: true,
            user: {
              select: {
                userName: true,
                email: true,
              },
            },
          },
        }),
        reviewDelegate.count({ where: { productId } }),
      ]);

      const data = reviews.map((r: IProductReview) => ({
        id: r.id,
        productId: r.productId,
        userId: r.userId,
        rating: r.rating,
        comment: r.comment,
        createdAt: r.createdAt,
        user: {
          userName: r.user.userName,
          email: r.user.email,
        },
      }));

      return { data, total };
    });

  getProductReviewStats = publicActionClient
    .inputSchema(z.object({ productId: z.string() }))
    .action(async ({ parsedInput }) => {
      const { productId } = parsedInput;
      const stats = (await reviewDelegate.groupBy({
        by: ["rating"],
        where: { productId },
        _count: { rating: true },
      })) as RatingGroup[];
      const total = await reviewDelegate.count({ where: { productId } });
      const avg =
        total > 0
          ? stats.reduce((acc: number, s: RatingGroup) => acc + s.rating * s._count.rating, 0) / total
          : 0;
      return {
        total,
        averageRating: Math.round(avg * 10) / 10,
        distribution: stats.reduce(
          (acc: Record<number, number>, s: RatingGroup) => ({ ...acc, [s.rating]: s._count.rating }),
          {} as Record<number, number>
        ),
      };
    });

  /** Logged-in user only: get current user's review for this product, or null. */
  getMyReviewForProduct = customerActionClient
    .inputSchema(z.object({ productId: z.string() }))
    .action(async ({ parsedInput, ctx }): Promise<IProductReview | null> => {
      const { productId } = parsedInput;
      const userId = ctx.user.id;
      const review = await reviewDelegate.findUnique({
        where: { productId_userId: { productId, userId } },
        select: {
          id: true,
          productId: true,
          userId: true,
          rating: true,
          comment: true,
          createdAt: true,
          user: {
            select: { userName: true, email: true },
          },
        },
      });
      if (!review) return null;
      return {
        id: review.id,
        productId: review.productId,
        userId: review.userId,
        rating: review.rating,
        comment: review.comment,
        createdAt: review.createdAt,
        user: {
          userName: review.user.userName,
          email: review.user.email,
        },
      };
    });
}
