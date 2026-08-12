import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import fs from "fs";

export const seedHeroSliderImage = async ({
  prismaClient,
}: {
  prismaClient: typeof prisma;
}) => {
  const heroSliderImageData = JSON.parse(
    fs.readFileSync("prisma/json/hero-slider-seed.json", "utf-8")
  );

  const formattedData = heroSliderImageData.map((item: any) => ({
    ...item,
    createdAt: new Date(item.createdAt).toISOString(),
    updatedAt: new Date(item.updatedAt).toISOString(),
  }));

  await prismaClient.heroSliderImage.createMany({
    data: formattedData as Prisma.HeroSliderImageCreateManyInput[],
    skipDuplicates: true,
  });

  console.log("✅ Hero slider images seeded successfully");
};
