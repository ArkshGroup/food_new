import prisma from "@/lib/db";
import { customerActionClient } from "@/lib/next-safe-action";

export class ProfileService {
  getProfileDetails = customerActionClient.action(async ({ ctx }) => {
    const res = prisma.user.findUnique({
      where: {
        id: ctx.user.id,
      },
      include: {},
    });
    return res;
  });
}
