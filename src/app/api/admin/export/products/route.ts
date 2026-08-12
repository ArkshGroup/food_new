import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

function escapeCsvCell(value: unknown): string {
  if (value === null || value === undefined) return "";
  const s = String(value);
  if (/[",\n\r]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

const HEADERS = [
  "id",
  "name",
  "slug",
  "category",
  "brand",
  "sub_brand",
  "unit_selling_price",
  "special_price",
  "currency",
  "stock_quantity",
  "unit",
  "approx_weight",
  "is_visible",
  "is_new_product",
  "is_featured",
  "on_sale",
  "is_flash_sale",
  "is_wholesale",
  "meta_title",
  "meta_description",
  "meta_keywords",
  "video_url",
  "primary_image_url",
  "created_at",
  "updated_at",
] as const;

/**
 * GET /api/admin/export/products
 * CSV export of all products (admin/moderator only).
 */
export async function GET() {
  const session = await auth();
  const role = session?.user?.role;
  if (!session?.user || (role !== "ADMIN" && role !== "MODERATOR")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        category: { select: { name: true } },
        brand: { select: { name: true } },
        subBrand: { select: { name: true } },
        images: {
          orderBy: { sortOrder: "asc" },
          take: 1,
          select: { imageUrl: true },
        },
      },
    });

    const lines: string[] = [HEADERS.map((h) => escapeCsvCell(h)).join(",")];

    for (const p of products) {
      const primaryImage = p.images[0]?.imageUrl ?? "";
      lines.push(
        [
          escapeCsvCell(p.id),
          escapeCsvCell(p.name),
          escapeCsvCell(p.slug),
          escapeCsvCell(p.category?.name ?? ""),
          escapeCsvCell(p.brand?.name ?? ""),
          escapeCsvCell(p.subBrand?.name ?? ""),
          escapeCsvCell(Number(p.unitSellingPrice)),
          escapeCsvCell(Number(p.specialPrice)),
          escapeCsvCell(p.currency),
          escapeCsvCell(p.stockQuantity),
          escapeCsvCell(p.unit),
          escapeCsvCell(Number(p.approxWeight)),
          escapeCsvCell(p.isVisible),
          escapeCsvCell(p.isNewProduct),
          escapeCsvCell(p.isFeatured),
          escapeCsvCell(p.onSale),
          escapeCsvCell(p.isFlashSale),
          escapeCsvCell(p.isWholeSale),
          escapeCsvCell(p.metaTitle),
          escapeCsvCell(p.metaDescription),
          escapeCsvCell(p.metaKeywords),
          escapeCsvCell(p.videoUrl ?? ""),
          escapeCsvCell(primaryImage),
          escapeCsvCell(p.createdAt.toISOString()),
          escapeCsvCell(p.updatedAt.toISOString()),
        ].join(",")
      );
    }

    const csv = "\ufeff" + lines.join("\r\n");

    const filename = `products-export-${new Date().toISOString().slice(0, 10)}.csv`;

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch (e) {
    console.error("[admin export products]", e);
    return NextResponse.json(
      { error: "Failed to export products" },
      { status: 500 }
    );
  }
}
