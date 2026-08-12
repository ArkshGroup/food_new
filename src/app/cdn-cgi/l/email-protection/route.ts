import { NextResponse } from "next/server";

/**
 * Cloudflare injects /cdn-cgi/l/email-protection for mailto: links when
 * Email Address Obfuscation is enabled. That URL can 404 on our server.
 * This route returns 200 and redirects to contact so crawlers don't see 4xx.
 */
export function GET() {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ?? "https://www.arkshfood.com";
  return NextResponse.redirect(`${baseUrl}/contact`, 302);
}
