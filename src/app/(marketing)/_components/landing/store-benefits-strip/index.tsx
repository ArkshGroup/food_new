"use client";

import React from "react";
import { Truck, Headset, RotateCcw, ShieldCheck } from "lucide-react";

const benefits = [
  {
    title: "FREE SHIPPING",
    description: "Free Shipping on orders ₹2500",
    Icon: Truck,
  },
  {
    title: "24/7 SUPPORT",
    description: "Online and phone support 24 / 7",
    Icon: Headset,
  },
  {
    title: "7 DAYS RETURN",
    description: "7 days money back guarantee.",
    Icon: RotateCcw,
  },
  {
    title: "SECURE PAYMENT",
    description: "100% safety system",
    Icon: ShieldCheck,
  },
];

export function StoreBenefitsStrip() {
  return (
    <section className="w-full bg-white py-10 lg:py-12 font-sans" aria-label="Store benefits">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x-2 divide-[#28AAE0]/60">
          {benefits.map(({ title, description, Icon }) => (
            <div
              key={title}
              className="flex items-center gap-4 px-4 sm:px-6 py-4 sm:py-2 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 text-[#0555A2] flex items-center justify-center shrink-0 group-hover:bg-[#0555A2] group-hover:text-white transition-all duration-300 shadow-2xs group-hover:scale-105">
                <Icon className="w-6 h-6" strokeWidth={2} />
              </div>

              <div className="space-y-0.5">
                <h3 className="text-xs sm:text-sm font-serif font-bold uppercase tracking-wider text-[#1C1917] group-hover:text-[#0555A2] transition-colors">
                  {title}
                </h3>
                <p className="text-xs text-stone-500 font-sans leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
