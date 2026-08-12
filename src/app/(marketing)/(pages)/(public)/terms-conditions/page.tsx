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
import { Metadata } from "next";
import { siteConfig } from "@/app/(marketing)/_config/seo.config";

const STORE_DESCRIPTION =
  "Arksh Food is an online food store based in Nepal, selling packaged food products including biscuits, cookies, puffs, coffee, creamer, and chocolate.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "Arksh Food | Terms & Conditions – Online Store Use",
  description:
    "Terms and conditions for using Arksh Food's online store. We sell biscuits, cookies, puffs, coffee, creamer, and chocolate in Nepal.",
  alternates: {
    canonical: `${siteConfig.url}/terms-conditions`,
  },
};

const TermsConditionsPage = () => {
  return (
    <div className="w-full bg-[#F0F7FD] min-h-screen py-10 lg:py-16 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Editorial Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#28AAE0]">
            TERMS OF SERVICE
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1C1917] tracking-tight">
            Terms & Conditions
          </h1>
          <p className="text-stone-600 text-sm sm:text-base max-w-xl mx-auto font-sans leading-relaxed">
            Please read these terms carefully before placing orders or browsing Arksh Food's online store.
          </p>
        </div>

        <Card className="rounded-3xl bg-white border border-[#E8E2D9] shadow-sm font-sans overflow-hidden">
          <CardHeader className="bg-[#FAF8F5] border-b border-[#E8E2D9] p-6 sm:p-8 text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-100 text-[#0555A2] text-xs font-medium">
              <span>Last updated: February 2026</span>
            </div>
            <p className="text-xs text-stone-500 font-sans leading-relaxed max-w-lg mx-auto">
              By accessing arkshfood.com, you agree to comply with our online store policies, return procedures, and delivery guidelines.
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
                  1. Store Use & Acceptance
                </AccordionTrigger>
                <AccordionContent className="pb-4 pt-1 text-stone-600 text-xs sm:text-sm font-sans space-y-2 border-t border-[#E8E2D9]/60">
                  <p>{STORE_DESCRIPTION}</p>
                  <p>By browsing or submitting an order, you agree to these terms, our Privacy Policy, and Return Policy.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border border-[#E8E2D9] rounded-2xl overflow-hidden px-4">
                <AccordionTrigger className="text-sm sm:text-base font-serif font-semibold text-[#1C1917] hover:text-[#0555A2] py-4">
                  2. Orders, Availability & Pricing
                </AccordionTrigger>
                <AccordionContent className="pb-4 pt-1 text-stone-600 text-xs sm:text-sm font-sans space-y-2 border-t border-[#E8E2D9]/60">
                  <ul className="list-disc ml-5 space-y-1.5">
                    <li>Prices are displayed in Nepalese Rupees (NPR).</li>
                    <li>Orders are subject to batch stock availability. In case of discrepancies, our customer team will notify you promptly.</li>
                    <li>We support Cash on Delivery and integrated digital wallet payments.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border border-[#E8E2D9] rounded-2xl overflow-hidden px-4">
                <AccordionTrigger className="text-sm sm:text-base font-serif font-semibold text-[#1C1917] hover:text-[#0555A2] py-4">
                  3. Intellectual Property
                </AccordionTrigger>
                <AccordionContent className="pb-4 pt-1 text-stone-600 text-xs sm:text-sm font-sans space-y-2 border-t border-[#E8E2D9]/60">
                  <p>
                    All brand logos, product photography, editorial text, and packaging designs remain the exclusive property of Arksh Food.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Separator className="my-6 bg-[#E8E2D9]" />

            <p className="text-center text-xs text-stone-500 font-sans">
              Need clarification on terms? Contact us at <strong className="text-[#0555A2]">info@arkshfood.com</strong>.
            </p>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default TermsConditionsPage;
