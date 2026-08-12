import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import fs from "fs";

export const seedProducts = async ({
  prismaClient,
}: {
  prismaClient: typeof prisma;
}) => {
  const productData = JSON.parse(
    fs.readFileSync("prisma/json/product-seed.json", "utf-8")
  );
  const formattedData = productData.map((item: any) => ({
    ...item,
    createdAt: new Date(item.createdAt).toISOString(),
    updatedAt: new Date(item.updatedAt).toISOString(),
  }));

  await prismaClient.product.createMany({
    data: formattedData as Prisma.ProductCreateManyInput[],
    skipDuplicates: true,
  });

  const productImageData = JSON.parse(
    fs.readFileSync("prisma/json/product-image-seed.json", "utf-8")
  );

  const formattedProductImageData = productImageData.map((item: any) => ({
    ...item,
  }));

  await prismaClient.productImage.createMany({
    data: formattedProductImageData as Prisma.ProductImageCreateManyInput[],
    skipDuplicates: true,
  });
};
