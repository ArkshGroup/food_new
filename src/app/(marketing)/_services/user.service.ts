import prisma from "@/lib/db";
import { customerActionClient } from "@/lib/next-safe-action";

export class UserService {
  getUserProfile = customerActionClient.action(async ({ ctx }) => {
    const userId = ctx.user.id;
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw new Error("User not found");
    const { password, ...rest } = user;
    return {
      ...rest,
      arkshFoodPoint: user.arkshFoodPoint.toNumber(),
    };
  });
}
