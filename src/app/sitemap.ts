import prisma from "@/lib/db";
import { MetadataRoute } from "next";
import { siteConfig } from "./(marketing)/_config/seo.config";

export const dynamic = "force-dynamic";

function normalizeSitemapUrl(rawUrl: string): string {
  try {
    const url = new URL(rawUrl);

    url.pathname = url.pathname
      .split("/")
      .map((segment) => encodeURIComponent(decodeURIComponent(segment)))
      .join("/");

    return url
      .toString()
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  } catch {
    return rawUrl
      .replace(/ /g, "%20")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, blogs] = await Promise.all([
    prisma.product.findMany({
      where: {
        isVisible: true,
      },
      select: {
        slug: true,
        images: {
          select: {
            imageUrl: true,
          },
        },
        updatedAt: true,
      },
    }),
    prisma.blog.findMany({
      where: {
        isPublished: true,
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    }),
  ]);

const productSitemap: MetadataRoute.Sitemap = products.map((product) => ({
  url: normalizeSitemapUrl(
    encodeURI(`${siteConfig.url}/products/${encodeURIComponent(product.slug)}`),
  ),
  lastModified: product.updatedAt,
  changeFrequency: "monthly",
  priority: 0.9,
  images: product.images
    .map((image) => image.imageUrl?.trim())
    .filter((u): u is string => Boolean(u))
    .map((url) => normalizeSitemapUrl(encodeURI(url))),
}));

  const blogSitemap: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: normalizeSitemapUrl(
      `${siteConfig.url}/blog/${encodeURIComponent(blog.slug)}`
    ),
    lastModified: blog.updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const now = new Date();
  const staticSitemap: MetadataRoute.Sitemap = [
    {
      url: normalizeSitemapUrl(`${siteConfig.url}`),
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: normalizeSitemapUrl(`${siteConfig.url}/about-us`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: normalizeSitemapUrl(`${siteConfig.url}/products`),
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: normalizeSitemapUrl(`${siteConfig.url}/blog`),
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: normalizeSitemapUrl(`${siteConfig.url}/contact`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: normalizeSitemapUrl(`${siteConfig.url}/food-influencer-program`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: normalizeSitemapUrl(`${siteConfig.url}/privacy-policy`),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: normalizeSitemapUrl(`${siteConfig.url}/terms-conditions`),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: normalizeSitemapUrl(`${siteConfig.url}/return-policy`),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: normalizeSitemapUrl(`${siteConfig.url}/shipping-policy`),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];

  return [...staticSitemap, ...productSitemap, ...blogSitemap];
}
