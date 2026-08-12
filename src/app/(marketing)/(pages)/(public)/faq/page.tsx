"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: "p1",
    question: "What ingredients are used in Arksh Food products?",
    answer:
      "Arksh Food uses premium natural ingredients sourced directly from verified Nepalese farms. Our biscuits and snacks feature nutritious finger millet (Kodo), whole wheat, unrefined sugars, and quality dairy creamers without artificial preservatives.",
  },
  {
    id: "p2",
    question: "Are your snacks suitable for children and seniors?",
    answer:
      "Yes! Our product line is formulated with balanced nutrition in mind, making them ideal healthy daily snacks for school children, working adults, and health-conscious seniors.",
  },
  {
    id: "p3",
    question: "What is the shelf life of Arksh Food biscuits and coffee?",
    answer:
      "Our packaged biscuits and snacks maintain optimal freshness for 6 to 9 months when stored in a cool, dry place. Expiry and manufacturing dates are clearly printed on every package.",
  },
  {
    id: "s1",
    question: "Where does Arksh Food deliver across Nepal?",
    answer:
      "We deliver across Nepal! Express delivery is available within the Kathmandu Valley (1-3 working days), and standard courier delivery serves major cities across all 7 provinces (3-7 working days).",
  },
  {
    id: "s2",
    question: "How are delivery charges calculated?",
    answer:
      "Delivery fees are calculated during checkout based on your exact delivery zone and total order weight. We offer free delivery on orders over Rs. 2,500.",
  },
  {
    id: "pay1",
    question: "What payment methods do you accept?",
    answer:
      "We accept Cash on Delivery (COD) for eligible zones in Nepal, as well as digital wallet payments (eSewa, Khalti, ConnectIPS) and online banking via secure payment gateways.",
  },
  {
    id: "r1",
    question: "What is your return and exchange policy?",
    answer:
      "We offer a 7-day return guarantee for unopened and sealed products. If an item arrives damaged or incorrect, contact our customer team at info@arkshfood.com within 48 hours for immediate exchange or credit.",
  },
];

export default function FAQPage() {
  return (
    <div className="w-full bg-[#F0F7FD] min-h-screen py-12 lg:py-16 font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0555A2]">
            HELP & SUPPORT
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-[#1C1917] tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-stone-600 text-sm max-w-md mx-auto leading-relaxed">
            Everything you need to know about Arksh Food products, shipping, and delivery.
          </p>
        </div>

        {/* 3D Porcelain Serving Plate Numbered Questions */}
        <Accordion type="single" collapsible className="w-full space-y-3">
          {FAQ_DATA.map((faq, index) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="bg-white rounded-2xl border border-stone-200/80 px-4 sm:px-5 shadow-2xs hover:border-[#0555A2]/30 transition-all duration-200 overflow-hidden border-b-0"
            >
              <AccordionTrigger className="py-4 text-left hover:no-underline group">
                <div className="flex items-center gap-3.5 pr-2">
                  {/* Exact 3D Gourmet Porcelain Serving Plate Number Container */}
                  <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-b from-white via-[#F0F7FD] to-[#E2EEF8] border-2 border-white shadow-xs ring-1 ring-[#0555A2]/15 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-full bg-white border border-sky-100/80 shadow-inner flex items-center justify-center text-xs font-bold text-[#0555A2] font-sans">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>

                  <span className="text-sm sm:text-base font-sans font-semibold text-[#1C1917] group-hover:text-[#0555A2] transition-colors leading-snug">
                    {faq.question}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4 pt-1 text-stone-600 text-xs sm:text-sm leading-relaxed font-sans border-t border-stone-100/80 pl-12 sm:pl-13">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Support Link Box */}
        <div className="bg-white rounded-2xl border border-stone-200/80 p-5 text-center space-y-2 shadow-2xs">
          <h3 className="text-base font-serif text-[#1C1917]">Still have questions?</h3>
          <p className="text-xs text-stone-600">
            Our team is available Sun - Fri, 9:00 AM - 6:00 PM.
          </p>
          <div className="pt-1">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#0555A2] hover:text-[#28AAE0] transition-colors group"
            >
              <span>CONTACT SUPPORT</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#28AAE0] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
