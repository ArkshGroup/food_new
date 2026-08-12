import type { MetadataRoute } from "next";
import { siteConfig } from "./(marketing)/_config/seo.config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/api",
          "/auth",
          "/cart",
          "/checkout",
          "/my-orders",
          "/points",
          "/profile",
          "/security",
        ],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
