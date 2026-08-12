import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import fs from "fs";

export const seedCategories = async ({
  prismaClient,
}: {
  prismaClient: typeof prisma;
}) => {
  const categoryData = JSON.parse(
    fs.readFileSync("prisma/json/category-seed.json", "utf-8")
  );

  const formattedData = categoryData.map((item: any) => ({
    ...item,
    createdAt: new Date(item.createdAt).toISOString(),
  }));

  await prismaClient.category.createMany({
    data: formattedData as Prisma.CategoryCreateManyInput[],
    skipDuplicates: true,
  });

  console.log("✅ Categories seeded successfully");
};
