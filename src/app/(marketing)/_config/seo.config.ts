import { WithContext, Product } from "schema-dts";
import { IProductGetBySlug } from "../_types/products";

export const siteConfig = {
  name: "Arksh Food",
  title: "Arksh Food – Premium Biscuits, Snacks & Cookies in Nepal",
  description:
    "Official website of Arksh Food – high-quality biscuits, cookies, puffs, and snacks made in Nepal.",
  url:
    process.env.NODE_ENV === "production"
      ? "https://www.arkshfood.com"
      : "http://localhost:3000",
  twitterTitle: "Arksh Food | Premium Biscuits, Snacks & Cookies in Nepal",
  twitterDescription:
    "Discover high-quality biscuits, cookies, puffs, and snacks made in Nepal by Arksh Food.",
  /**
   * Public Google Maps / Business Profile URL (use your official listing).
   * Set NEXT_PUBLIC_GOOGLE_BUSINESS_URL in production so the link matches Merchant Center / GBP.
   */
  googleBusinessProfileUrl:
    process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_URL ||
    "https://www.google.com/maps/search/?api=1&query=Arksh+Food+Lazimpat+Kathmandu",
};

/** Price valid 1 year ahead – site-wide 10% discount is ongoing. */
function getDefaultPriceValidUntil(): string {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  return d.toISOString().slice(0, 10);
}

/** Site-wide return policy for structured data (matches /return-policy). */
const merchantReturnPolicy = {
  "@type": "MerchantReturnPolicy" as const,
  name: "Arksh Food Return Policy",
  url: `${siteConfig.url}/return-policy`,
  returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow" as const,
  merchantReturnDays: 7,
  returnFees: "https://schema.org/ReturnShippingFees" as const,
  returnMethod: "https://schema.org/ReturnByMail" as const,
  // Required by Google Merchant listings for hasMerchantReturnPolicy
  applicableCountry: {
    "@type": "Country" as const,
    name: "Nepal",
    alternateName: "NP",
  },
  returnShippingFeesAmount: {
    "@type": "MonetaryAmount" as const,
    value: 0,
    currency: "NPR",
  },
};

/** Site-wide shipping details for Nepal (matches /shipping-policy). */
const offerShippingDetails = {
  "@type": "OfferShippingDetails" as const,
  shippingRate: {
    "@type": "MonetaryAmount" as const,
    value: 0,
    currency: "NPR",
  },
  deliveryTime: {
    "@type": "ShippingDeliveryTime" as const,
    handlingTime: { "@type": "QuantitativeValue" as const, minValue: 0, maxValue: 3, unitCode: "DAY" },
    transitTime: { "@type": "QuantitativeValue" as const, minValue: 1, maxValue: 7, unitCode: "DAY" },
  },
  shippingDestination: {
    "@type": "DefinedRegion" as const,
    addressCountry: "NP",
  },
};

export const generateProductSchemaOrg = (
  product: IProductGetBySlug
): WithContext<Product> => {
  const firstImage =
    product.images?.[0]?.imageUrl || `${siteConfig.url}/default-product.jpg`;
  const productUrl = `${siteConfig.url}/products/${product.slug}`;

  const sellingPrice = product.specialPrice ?? product.unitSellingPrice;
  const listPrice = product.unitSellingPrice;
  const hasDiscount = listPrice > sellingPrice;

  const schema: WithContext<Product> = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": productUrl,
    name: product.metaTitle || product.name,
    description: product.metaDescription ?? product.description ?? undefined,
    sku: product.id,
    mpn: product.id,
    category: product.category?.name || "Products",
    url: productUrl,
    image: product.images?.map((img: any) => img.imageUrl) || [firstImage],
    brand: product.brand
      ? {
          "@type": "Brand",
          name: product.brand?.name,
        }
      : {
          "@type": "Brand",
          name: "Arksh Food",
        },
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: product.currency || "NPR",
      price: sellingPrice,
      priceValidUntil: getDefaultPriceValidUntil(),
      availability:
        product.stockQuantity && product.stockQuantity > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      hasMerchantReturnPolicy: merchantReturnPolicy,
      shippingDetails: offerShippingDetails,
      seller: {
        "@type": "Organization",
        name: "Arksh Food",
        url: siteConfig.url,
      },
      // 10% discount site-wide – optional fields for richer snippets (spread only when discounted)
      ...(hasDiscount && {
        discount: Math.round(((listPrice - sellingPrice) / listPrice) * 100),
      }),
    } as WithContext<Product>["offers"],
    isAccessoryOrSparePartFor: product.category
      ? {
          "@type": "Product",
          name: product.category.name,
        }
      : undefined,
    keywords: product.metaKeywords || "",
    productID: product.id,
  };

  // Add aggregateRating + review only when you have real review data (e.g. from DB).
  // Faking ratings violates Google's guidelines. When you add reviews, extend product
  // type with rating/reviewCount/reviews and set them here.
  // Example when available: aggregateRating: { "@type": "AggregateRating", ratingValue: "4.5", reviewCount: 10 }

  return schema;
};
