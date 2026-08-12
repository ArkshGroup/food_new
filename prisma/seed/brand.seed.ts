import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import fs from "fs";

export const seedBrands = async ({
  prismaClient,
}: {
  prismaClient: typeof prisma;
}) => {
  const brandData = JSON.parse(
    fs.readFileSync("prisma/json/brand-seed.json", "utf-8")
  );

  const formattedData = brandData.map((item: any) => ({
    ...item,
    createdAt: new Date(item.createdAt).toISOString(),
  }));

  await prismaClient.brand.createMany({
    data: formattedData as Prisma.BrandCreateManyInput[],
    skipDuplicates: true,
  });

  console.log("✅ Brands seeded successfully");
};
