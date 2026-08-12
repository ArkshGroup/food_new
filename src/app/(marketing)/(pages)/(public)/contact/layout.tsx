import { siteConfig } from "@/app/(marketing)/_config/seo.config";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "Arksh Food | Contact Us – Get in Touch for Orders & Inquiries",
  description:
    "Contact Arksh Food for orders, wholesale inquiries, and support. Reach us by phone, email, or visit our store in Lazimpat, Kathmandu. We respond within 24 hours.",
  keywords: [
    "Arksh Food contact",
    "contact Arksh Food",
    "Arksh Food Lazimpat",
    "Arksh Food customer support",
    "Arksh Food Nepal",
    "biscuits wholesale Nepal",
  ],
  alternates: {
    canonical: {
      url: `${siteConfig.url}/contact`,
    },
  },
};
const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default Layout;
