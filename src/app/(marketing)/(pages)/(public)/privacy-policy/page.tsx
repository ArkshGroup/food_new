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
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { siteConfig } from "@/app/(marketing)/_config/seo.config";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "Arksh Food | Privacy Policy – How We Collect & Protect Your Data",
  description:
    "Read Arksh Food's Privacy Policy. We are an online store for biscuits, cookies, puffs, coffee, creamer, and chocolate in Nepal. This policy explains how we collect, use, and protect your personal information.",
  keywords: [
    "Arksh Food",
    "privacy policy",
    "data protection",
    "personal information",
    "online store Nepal",
    "customer data security",
  ],
  alternates: {
    canonical: `${siteConfig.url}/privacy-policy`,
  },
};

const PrivacyPolicyPage = () => {
  return (
    <div className="w-full bg-[#F0F7FD] min-h-screen py-10 lg:py-16 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Editorial Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#28AAE0]">
            LEGAL & TRANSPARENCY
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1C1917] tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-stone-600 text-sm sm:text-base max-w-xl mx-auto font-sans leading-relaxed">
            How Arksh Food collects, protects, and handles your personal information when you shop for authentic Nepali biscuits, snacks, and beverages.
          </p>
        </div>

        <Card className="rounded-3xl bg-white border border-[#E8E2D9] shadow-sm font-sans overflow-hidden">
          <CardHeader className="bg-[#FAF8F5] border-b border-[#E8E2D9] p-6 sm:p-8 text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-100 text-[#0555A2] text-xs font-medium">
              <span>Last updated: February 2026</span>
            </div>
            <p className="text-xs text-stone-500 font-sans leading-relaxed max-w-lg mx-auto">
              We respect your privacy and are committed to maintaining data protection standards across all services.
            </p>
          </CardHeader>

          <CardContent className="p-6 sm:p-10 space-y-6">
            
            {/* SEO-only content */}
            <div className="sr-only" aria-hidden="true">
              <p>
                This Privacy Policy applies to all visitors and customers who use
                the Arksh Food website. Arksh Food is an online store in Nepal
                selling biscuits, cookies, puffs, coffee, creamer, and chocolate.
              </p>
            </div>

            <Accordion
              type="multiple"
              defaultValue={["item-1"]}
              className="w-full space-y-3"
            >
              {/* 1. Information We Collect */}
              <AccordionItem value="item-1" className="border border-[#E8E2D9] rounded-2xl overflow-hidden px-4">
                <AccordionTrigger className="text-sm sm:text-base font-serif font-semibold text-[#1C1917] hover:text-[#0555A2] py-4">
                  1. Information We Collect
                </AccordionTrigger>
                <AccordionContent className="pb-4 pt-1 text-stone-600 text-xs sm:text-sm font-sans space-y-2 border-t border-[#E8E2D9]/60">
                  <p>We collect essential details to process and deliver your orders accurately:</p>
                  <ul className="list-disc ml-5 space-y-1.5 pt-1">
                    <li><strong>Personal Details:</strong> Name, delivery address, contact phone number, and email.</li>
                    <li><strong>Order History:</strong> Record of purchased products, delivery preferences, and invoices.</li>
                    <li><strong>Payment Data:</strong> Secure transaction references processed via authorized Nepalese payment gateways.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              {/* 2. How We Use Your Information */}
              <AccordionItem value="item-2" className="border border-[#E8E2D9] rounded-2xl overflow-hidden px-4">
                <AccordionTrigger className="text-sm sm:text-base font-serif font-semibold text-[#1C1917] hover:text-[#0555A2] py-4">
                  2. How We Use Your Information
                </AccordionTrigger>
                <AccordionContent className="pb-4 pt-1 text-stone-600 text-xs sm:text-sm font-sans space-y-2 border-t border-[#E8E2D9]/60">
                  <ul className="list-disc ml-5 space-y-1.5">
                    <li>Fulfill, package, and dispatch orders across Nepal efficiently.</li>
                    <li>Provide responsive customer support and order status updates via SMS/Email.</li>
                    <li>Enhance website performance, security, and user experience.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              {/* 3. Data Protection */}
              <AccordionItem value="item-3" className="border border-[#E8E2D9] rounded-2xl overflow-hidden px-4">
                <AccordionTrigger className="text-sm sm:text-base font-serif font-semibold text-[#1C1917] hover:text-[#0555A2] py-4">
                  3. How We Protect Your Information
                </AccordionTrigger>
                <AccordionContent className="pb-4 pt-1 text-stone-600 text-xs sm:text-sm font-sans space-y-2 border-t border-[#E8E2D9]/60">
                  <p>
                    All sensitive transmissions are encrypted via SSL protocol. Your personal data is restricted strictly to authorized customer service personnel.
                  </p>
                </AccordionContent>
              </AccordionItem>

              {/* 4. Sharing */}
              <AccordionItem value="item-4" className="border border-[#E8E2D9] rounded-2xl overflow-hidden px-4">
                <AccordionTrigger className="text-sm sm:text-base font-serif font-semibold text-[#1C1917] hover:text-[#0555A2] py-4">
                  4. Third-Party Sharing
                </AccordionTrigger>
                <AccordionContent className="pb-4 pt-1 text-stone-600 text-xs sm:text-sm font-sans space-y-2 border-t border-[#E8E2D9]/60">
                  <p>
                    We never sell or lease customer information. Data is shared exclusively with verified delivery logistics partners and licensed payment service providers.
                  </p>
                </AccordionContent>
              </AccordionItem>

              {/* 5. Your Rights */}
              <AccordionItem value="item-5" className="border border-[#E8E2D9] rounded-2xl overflow-hidden px-4">
                <AccordionTrigger className="text-sm sm:text-base font-serif font-semibold text-[#1C1917] hover:text-[#0555A2] py-4">
                  5. Customer Data Rights
                </AccordionTrigger>
                <AccordionContent className="pb-4 pt-1 text-stone-600 text-xs sm:text-sm font-sans space-y-2 border-t border-[#E8E2D9]/60">
                  <p>
                    You may review, update, or request erasure of your personal data at any time by contacting our support team at <strong className="text-[#0555A2]">info@arkshfood.com</strong>.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Separator className="my-6 bg-[#E8E2D9]" />

            <p className="text-center text-xs text-stone-500 font-sans">
              Have questions regarding data protection? Reach out via our <a href="/contact" className="text-[#0555A2] font-bold underline">Contact Page</a>.
            </p>

          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
