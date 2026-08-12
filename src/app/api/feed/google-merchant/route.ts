import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { resolveGoogleProductCategory } from "@/lib/google-merchant-product-category";

const clean = (v: unknown): string =>
  v === null || v === undefined
    ? ""
    : String(v)
        .replace(/[\t\n\r]/g, " ")
        .trim();

const formatPrice = (val: unknown, cur: string): string => {
  const num = Number(val);
  if (Number.isNaN(num)) return "";
  return `${num.toFixed(2)} ${cur || "NPR"}`.trim();
};

function richTextToPlainText(input: unknown): string {
  if (!input) return "";
  if (Array.isArray(input)) return input.map(richTextToPlainText).join(" ");
  if (typeof input === "object" && input !== null) {
    const o = input as Record<string, unknown>;
    if (o.text) return String(o.text);
    if (Array.isArray(o.children))
      return o.children.map(richTextToPlainText).join(" ");
  }
  return "";
}

/** Base URL for product links (no trailing slash). */
function getBaseUrl(): string {
  if (process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_SITE_URL)
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  if (process.env.NODE_ENV === "production")
    return "https://www.arkshfood.com";
  return process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";
}

/**
 * GET /api/feed/google-merchant
 * Returns a tab-separated product feed for Google Merchant Center.
 * Use this URL in Merchant Center as a "Scheduled fetch" feed.
 */
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: { isVisible: true },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        unitSellingPrice: true,
        specialPrice: true,
        currency: true,
        metaDescription: true,
        stockQuantity: true,
        brand: { select: { name: true } },
        category: { select: { name: true } },
        images: { select: { imageUrl: true }, orderBy: { sortOrder: "asc" } },
      },
    });

    const baseUrl = getBaseUrl();
    const header = [
      "id",
      "title",
      "description",
      "link",
      "image_link",
      "additional_image_link",
      "availability",
      "price",
      "condition",
      "brand",
      "google_product_category",
      "product_type",
      "identifier_exists",
    ].join("\t");

    const rows = [header];

    for (const p of products) {
      const sellingPrice =
        p.specialPrice != null && Number(p.specialPrice) > 0
          ? p.specialPrice
          : p.unitSellingPrice;
      const availability = p.stockQuantity > 0 ? "in_stock" : "out_of_stock";
      const image = p.images?.[0]?.imageUrl ?? "";
      const additionalImages = (p.images ?? [])
        .slice(1)
        .map((i) => i.imageUrl)
        .filter(Boolean)
        .join(",");

      const categoryName = p.category?.name ?? "Food";
      const gpc = resolveGoogleProductCategory(categoryName);
      const currency = p.currency ?? "NPR";

      rows.push(
        [
          clean(p.id),
          clean(p.name),
          clean(p.metaDescription || richTextToPlainText(p.description)),
          clean(`${baseUrl}/products/${encodeURIComponent(p.slug)}`),
          clean(image),
          clean(additionalImages),
          clean(availability),
          clean(formatPrice(sellingPrice, currency)),
          "new",
          clean(p.brand?.name),
          clean(gpc),
          clean(categoryName),
          "no", // identifier_exists: no (no GTIN/MPN)
        ].join("\t")
      );
    }

    const body = rows.join("\n");

    return new NextResponse(body, {
      status: 200,
      headers: {
        "Content-Type": "text/tab-separated-values; charset=utf-8",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate",
      },
    });
  } catch (err) {
    console.error("[google-merchant feed]", err);
    return NextResponse.json(
      { error: "Failed to generate product feed" },
      { status: 500 }
    );
  }
}
