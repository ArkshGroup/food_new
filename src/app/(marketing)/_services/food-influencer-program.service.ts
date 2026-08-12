import prisma from "@/lib/db";

export interface IMyFoodInfluencerProgram {
  id: string;
  title: string;
  category: string;
  description: string;
  instagramUrl: string;
  facebookUrl: string;
  tiktokUrl: string;
  createdAt: Date;
}

export class FoodInfluencerProgramService {
  async getMine(userId: string): Promise<IMyFoodInfluencerProgram[]> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const foodInfluencerDelegate = (prisma as any).foodInfluencerProgram;
    if (!foodInfluencerDelegate) {
      throw new Error(
        "Prisma client is outdated. Run `pnpm prisma generate` and restart the dev server."
      );
    }
    return foodInfluencerDelegate.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        category: true,
        description: true,
        instagramUrl: true,
        facebookUrl: true,
        tiktokUrl: true,
        createdAt: true,
      },
    });
  }
}
