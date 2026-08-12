import prisma from "@/lib/db";
import { resolveGoogleProductCategory } from "@/lib/google-merchant-product-category";

const clean = (v: any) =>
  v === null || v === undefined
    ? ""
    : String(v)
        .replace(/[\t\n\r]/g, " ")
        .trim();

const formatPrice = (val: any, cur: any) => {
  const num = Number(val);
  if (Number.isNaN(num)) return "";
  return `${num.toFixed(2)} ${cur || ""}`.trim();
};

function richTextToPlainText(input: any): string {
  if (!input) return "";
  if (Array.isArray(input)) return input.map(richTextToPlainText).join(" ");
  if (typeof input === "object") {
    if (input.text) return input.text;
    if (input.children)
      return input.children.map(richTextToPlainText).join(" ");
  }
  return "";
}

export async function GET(req: Request) {
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

    const BASE =
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
          "https://www.arkshfood.com"
        : "http://localhost:3000";
    const rows = [header];

    for (const p of products) {
      const price =
        p.specialPrice != null && Number(p.specialPrice) > 0
          ? p.specialPrice
          : p.unitSellingPrice;
      const availability = p.stockQuantity > 0 ? "in_stock" : "out_of_stock";
      const image = p.images?.[0]?.imageUrl || "";
      const additionalImages = (p.images || [])
        .slice(1)
        .map((i) => i.imageUrl)
        .filter(Boolean)
        .join(",");

      const categoryName = p.category?.name || "Food";
      const gpc = resolveGoogleProductCategory(categoryName);

      rows.push(
        [
          clean(p.id),
          clean(p.name),
          clean(p.metaDescription || richTextToPlainText(p.description)),
          clean(`${BASE}/products/${encodeURIComponent(p.slug)}`),
          clean(image),
          clean(additionalImages),
          clean(availability),
          clean(formatPrice(price, p.currency)),
          "new",
          clean(p.brand?.name),
          clean(gpc),
          clean(categoryName),
          "no", // identifier_exists: no (no GTIN/MPN)
        ].join("\t")
      );
    }

    const fileContent = rows.join("\n");

    return new Response(fileContent, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Content-Disposition": `attachment; filename="product.txt"; filename*=UTF-8''product.txt`,
      },
    });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Failed to generate product feed" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } finally {
    try {
      await prisma.$disconnect();
    } catch (_) {}
  }
}
