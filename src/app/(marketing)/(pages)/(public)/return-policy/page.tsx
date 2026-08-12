import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { siteConfig } from "../../../_config/seo.config";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "Arksh Food | Return & Exchange Policy – Refunds & Orders",
  description:
    "Arksh Food is an online store for biscuits, cookies, puffs, coffee, creamer, and chocolate in Nepal. Read our return and exchange policy for packaged food products.",
  keywords: [
    "Arksh Food",
    "return policy",
    "exchange policy",
    "refunds Nepal",
    "online store returns",
  ],
  alternates: {
    canonical: `${siteConfig.url}/return-policy`,
  },
};

const ReturnExchangePolicyPage = () => {
  return (
    <div className="w-full bg-[#F0F7FD] min-h-screen py-10 lg:py-16 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Editorial Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#28AAE0]">
            RETURNS & EXCHANGES
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1C1917] tracking-tight">
            Return & Refund Policy
          </h1>
          <p className="text-stone-600 text-sm sm:text-base max-w-xl mx-auto font-sans leading-relaxed">
            Our commitment to product freshness, customer satisfaction, and easy return resolution for packaged foods.
          </p>
        </div>

        <Card className="rounded-3xl bg-white border border-[#E8E2D9] shadow-sm font-sans overflow-hidden">
          <CardHeader className="bg-[#FAF8F5] border-b border-[#E8E2D9] p-6 sm:p-8 text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-100 text-[#0555A2] text-xs font-medium">
              <span>7-Day Return Guarantee</span>
            </div>
            <p className="text-xs text-stone-500 font-sans leading-relaxed max-w-lg mx-auto">
              Please inspect packages upon arrival and contact support for damaged or incorrect items.
            </p>
          </CardHeader>

          <CardContent className="p-6 sm:p-10 space-y-6">
            <Accordion
              type="multiple"
              defaultValue={["item-1"]}
              className="w-full space-y-3"
            >
              <AccordionItem value="item-1" className="border border-[#E8E2D9] rounded-2xl overflow-hidden px-4">
                <AccordionTrigger className="text-sm sm:text-base font-serif font-semibold text-[#1C1917] hover:text-[#0555A2] py-4">
                  1. Eligibility Criteria
                </AccordionTrigger>
                <AccordionContent className="pb-4 pt-1 text-stone-600 text-xs sm:text-sm font-sans space-y-2 border-t border-[#E8E2D9]/60">
                  <ul className="list-disc ml-5 space-y-1.5 pt-1">
                    <li>Items must remain unopened in original sealed factory packaging.</li>
                    <li>Perishable or open food products cannot be returned for hygiene reasons.</li>
                    <li>Return requests must be logged within 7 days of package delivery.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border border-[#E8E2D9] rounded-2xl overflow-hidden px-4">
                <AccordionTrigger className="text-sm sm:text-base font-serif font-semibold text-[#1C1917] hover:text-[#0555A2] py-4">
                  2. Damaged or Incorrect Dispatches
                </AccordionTrigger>
                <AccordionContent className="pb-4 pt-1 text-stone-600 text-xs sm:text-sm font-sans space-y-2 border-t border-[#E8E2D9]/60">
                  <p>
                    If an item arrives damaged or incorrect, email <strong className="text-[#0555A2]">info@arkshfood.com</strong> with unboxing photos within 48 hours for immediate replacement or store credit.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Separator className="my-6 bg-[#E8E2D9]" />

            <p className="text-center text-xs text-stone-500 font-sans">
              Need assistance with a return? Reach out to support at <strong className="text-[#0555A2]">+977-1-4002049</strong>.
            </p>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default ReturnExchangePolicyPage;
