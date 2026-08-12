import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "";

  const data = await prisma.product.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
      isVisible: true,
    },
    take: 5,
    select: {
      id: true,
      name: true,
      slug: true,
      unitSellingPrice: true,
      specialPrice: true,
      banner: true,
      images: {
        take: 1,
        orderBy: {
          sortOrder: "asc",
        },
      },
    },
    orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
  });

  const products = data.map((product) => ({
    id: product.id,
    name: product.name,
    slug: product.slug,
    unitSellingPrice: Number(product.unitSellingPrice),
    specialPrice: Number(product.specialPrice),
    banner: product.banner,
    bannerImage: product.banner?.imageUrl || null,
    images: {
      id: product.images[0]?.id || "",
      url: product.images[0]?.imageUrl!,
      alt: product.name,
    },
  }));

  return NextResponse.json(products);
}
