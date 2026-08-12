import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Provider from "@/components/provider/provider";
import { siteConfig } from "./(marketing)/_config/seo.config";

const GA_MEASUREMENT_ID = "G-6YD2CKC8QK";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "Arksh Food | High Quality Biscuits, Snacks, Puffs & Cookies",
  description:
    "Arksh Food offers premium quality biscuits, cookies, puffs, and snacks made in Nepal, crafted to be delicious and perfect for every occasion.",
  keywords: [
    "Arksh Food",
    "biscuits",
    "cookies",
    "puffs",
    "snacks",
    "high quality food",
    "healthy snacks",
    "kodo ko biscuits",
    "kodo ko cookies",
    "kodo ko puffs",
    "kodo ko snacks",
    "kodo ko high quality food",
    "kodo ko healthy snacks",
    "best biscuits Nepal",
  ],
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: "Arksh Food | High Quality Biscuits, Snacks, Puffs & Cookies",
    description:
      "Arksh Food offers premium quality biscuits, cookies, puffs, and snacks. Freshly baked, delicious, and perfect for every occasion.",
    siteName: "Arksh Food",
    images: [
      {
        url: `${siteConfig.url}/opengraph-image.jpg`, // Replace with your OG image
        width: 1200,
        height: 630,
        alt: "Arksh Food - High Quality Biscuits, Snacks & Cookies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arksh Food | High Quality Biscuits, Snacks, Puffs & Cookies",
    description:
      "Premium biscuits, cookies, puffs & snacks from Arksh Food. Taste the difference!",
    images: [`${siteConfig.url}/opengraph-image.jpg`],
    creator: "@arkshfood", // optional, replace with your Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="kFOH3VbqfUWM2tQ3j7orCrMN9Q2qovoqLJpMKwIJXF0"
        />
        <link
          rel="preconnect"
          href="https://minio-oks404ksgws8sc0wg8kcgok0.209.50.229.110.sslip.io"
          crossOrigin="anonymous"
        />
        {/* Google tag (gtag.js) — GA4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="lazyOnload"
        />
        <Script
          id="gtag-config"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}');`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Arksh Food",
              url: siteConfig.url,
              logo: `${siteConfig.url}/opengraph-image.jpg`,
              sameAs: [
                "https://www.facebook.com/Arksh.Food",
                "https://www.instagram.com/Arksh.Food",
              ],
            }),
          }}
        />
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
