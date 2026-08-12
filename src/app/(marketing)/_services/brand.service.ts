import prisma from "@/lib/db";
import { publicActionClient } from "@/lib/next-safe-action";

export class BrandService {
  getAllBrands = publicActionClient.action(async () => {
    const res = await prisma.brand.findMany({
      select: {
        id: true,
        name: true,
        imageUrl: true,
      },
    });
    return res;
  });
}
