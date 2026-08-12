import prisma from "@/lib/db";
import { publicActionClient } from "@/lib/next-safe-action";

export class CategoryService {
  getAllCategory = publicActionClient.action(async () => {
    const res = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        imageUrl: true,
      },
      where: {
        isVisible: true,
      },
      orderBy: {
        position: "asc",
      },
    });
    return res;
  });
}
