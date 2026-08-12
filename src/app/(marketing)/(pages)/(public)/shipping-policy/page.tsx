import { Metadata } from "next";
import { siteConfig } from "@/app/(marketing)/_config/seo.config";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "Arksh Food | Shipping & Delivery Policy – Nepal",
  description:
    "Arksh Food is an online store for biscuits, cookies, puffs, coffee, creamer, and chocolate in Nepal. Read our shipping and delivery policy for areas, timelines, charges, and COD.",
  alternates: {
    canonical: `${siteConfig.url}/shipping-policy`,
  },
};

const ShippingPolicyPage = () => {
  return (
    <div className="w-full bg-[#F0F7FD] min-h-screen py-10 lg:py-16 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Editorial Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#28AAE0]">
            DELIVERY & LOGISTICS
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1C1917] tracking-tight">
            Shipping & Delivery Policy
          </h1>
          <p className="text-stone-600 text-sm sm:text-base max-w-xl mx-auto font-sans leading-relaxed">
            Information regarding delivery coverage across Nepal, fulfillment timelines, shipping fees, and Cash on Delivery services.
          </p>
        </div>

        <Card className="rounded-3xl bg-white border border-[#E8E2D9] shadow-sm font-sans overflow-hidden">
          <CardHeader className="bg-[#FAF8F5] border-b border-[#E8E2D9] p-6 sm:p-8 text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-100 text-[#0555A2] text-xs font-medium">
              <span>Nationwide Nepal Coverage</span>
            </div>
            <p className="text-xs text-stone-500 font-sans leading-relaxed max-w-lg mx-auto">
              We package and dispatch all orders directly from our Kathmandu logistics hubs.
            </p>
          </CardHeader>

          <CardContent className="p-6 sm:p-10 space-y-8">
            <section className="space-y-2">
              <h2 className="text-lg font-serif font-semibold text-[#1C1917]">
                1. Delivery Coverage (Nepal)
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Arksh Food delivers our range of biscuits, cookies, puffs, coffee, and chocolates across Kathmandu Valley and major cities nationwide through recognized logistics partners.
              </p>
            </section>

            <Separator className="bg-[#E8E2D9]" />

            <section className="space-y-2">
              <h2 className="text-lg font-serif font-semibold text-[#1C1917]">
                2. Estimated Timelines
              </h2>
              <ul className="list-disc ml-5 text-xs sm:text-sm text-stone-600 space-y-1.5 pt-1">
                <li><strong>Kathmandu Valley:</strong> Delivered within 1 to 3 working days.</li>
                <li><strong>Major Regional Cities:</strong> Delivered within 3 to 7 working days.</li>
              </ul>
            </section>

            <Separator className="bg-[#E8E2D9]" />

            <section className="space-y-2">
              <h2 className="text-lg font-serif font-semibold text-[#1C1917]">
                3. Shipping Fees & COD
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Shipping rates are computed during checkout based on order weight and destination. Cash on Delivery (COD) is available for eligible delivery zones in Nepal.
              </p>
            </section>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default ShippingPolicyPage;

