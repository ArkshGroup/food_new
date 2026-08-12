import prisma from "@/lib/db";
import type { IPrismaResponse } from "@/types";
import type { IFoodInfluencerProgram } from "../types/food-influencer-program";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const foodInfluencerDelegate = (prisma as any).foodInfluencerProgram;

export class FoodInfluencerProgramService {
  async getAll(): Promise<IPrismaResponse<IFoodInfluencerProgram[]>> {
    if (!foodInfluencerDelegate) {
      throw new Error(
        "Prisma client is outdated. Run `pnpm prisma generate` and restart the dev server."
      );
    }

    const data = await foodInfluencerDelegate.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { userName: true, email: true } },
      },
    });

    return {
      data: data as IFoodInfluencerProgram[],
      message: "Fetched food influencer entries",
      success: true,
      meta: { totalPage: 1 },
    };
  }
}
