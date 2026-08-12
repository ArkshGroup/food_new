import prisma from "@/lib/db";
import type { IPrismaResponse } from "@/types";
import type { IGoogleReview } from "../types/google-review";

export class GoogleReviewService {
  async getAll(): Promise<IPrismaResponse<IGoogleReview[]>> {
    const list = await prisma.googleReview.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });

    return {
      data: list as IGoogleReview[],
      message: "Google reviews fetched successfully",
      success: true,
      meta: { totalPage: 1 },
    };
  }
}
