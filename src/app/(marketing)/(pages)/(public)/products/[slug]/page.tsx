import { ProductDetails } from "@/app/(marketing)/_components/product/product-details";
import { ProductDetailsSkeleton } from "@/app/(marketing)/_components/product/product-details-loading-skeleton";
import RecommendedProductContainer from "@/app/(marketing)/_components/product/recommended-product-container";
import {
  generateProductSchemaOrg,
  siteConfig,
} from "@/app/(marketing)/_config/seo.config";
import marketingService from "@/app/(marketing)/_services/index.service";
import { tiptapJsonToHtml } from "@/lib/tiptap-json-to-html";
import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import React, { Suspense } from "react";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// ✅ Generate Metadata
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const res = marketingService.product.getProductBySlug({ slug: decodedSlug });
  const product = (await res).data;

  if (!product) {
    return {
      title: "Product Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const metaTitle = (product as any).metaTitle || product.name;
  const metaDescription =
    (product as any).metaDescription ||
    (typeof product.description === "string" ? product.description : product.name);

  return {
    metadataBase: new URL(siteConfig.url),
    title: metaTitle,
    description: metaDescription,
    alternates: {
      canonical: `${siteConfig.url}/products/${decodedSlug}`,
    },
    openGraph: {
      type: "website",
      title: metaTitle,
      description: metaDescription,
      url: `${siteConfig.url}/products/${decodedSlug}`,
      images:
        (product.images
          ?.filter((img) => img.url)
          .map((img) => ({
            url: img.url as string,
            alt: product.name,
          })) as {
          url: string;
          alt?: string;
        }[]) || [],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [product.images?.[0]?.url || ""],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

// ✅ Main Product Page
const ProductPage = async ({ params }: Props) => {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const res = marketingService.product.getProductBySlug({ slug: decodedSlug });
  const product = (await res).data;

  const { data: availableDiscount } =
    await marketingService.discount.getAllDiscountCode();

  if (!product) {
    notFound();
  }

  const productSchema = generateProductSchemaOrg(product as any);
  const descriptionHtml = product.description
    ? typeof product.description === "string"
      ? product.description
      : tiptapJsonToHtml(product.description)
    : "";

  return (
    <div className="w-full bg-[#F0F7FD] min-h-screen font-sans pb-16">
      <script
        id="product-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema).replace(/</g, "\\u003c"),
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<ProductDetailsSkeleton />}>
          <ProductDetails
            availableDiscount={availableDiscount || []}
            productData={product as any}
            descriptionHtml={descriptionHtml}
          />
        </Suspense>

        <RecommendedProductContainer products={[]} />

        <div className="flex justify-center pt-4">
          <Link
            href={`/products?categoryNames=${product.categoryName}`}
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white border border-[#E8E2D9] text-[#0555A2] hover:bg-sky-50 text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-xs hover:shadow-md"
          >
            Explore More {product.categoryName || "Products"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
