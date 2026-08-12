import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import fs from "fs";

export const seedBanners = async ({
  prismaClient,
}: {
  prismaClient: typeof prisma;
}) => {
  const bannerData = JSON.parse(
    fs.readFileSync("prisma/json/banner-seed.json", "utf-8")
  );

  const formattedData = bannerData.map((item: any) => ({
    ...item,
    createdAt: new Date(item.createdAt).toISOString(),
  }));

  await prismaClient.banner.createMany({
    data: formattedData as Prisma.BannerCreateManyInput[],
    skipDuplicates: true,
  });

  console.log("✅ Banners seeded successfully");
};
