"use client";

import React from "react";
import Image from "next/image";
import {
  Leaf,
  Award,
  Users,
  Globe,
  Sprout,
} from "lucide-react";
import { FarmToTableSection } from "@/app/(marketing)/_components/landing/farm-to-table-section";

export default function SocialImpactPage() {
  const initiatives = [
    {
      icon: Award,
      title: "Fair Price Guarantee",
      description:
        "We pay direct premium prices to local Himalayan grain farmers, protecting smallholder agricultural families from market price volatility.",
      iconColor: "text-[#0555A2] bg-sky-50",
    },
    {
      icon: Leaf,
      title: "Soil & Crop Protection",
      description:
        "We promote organic farming methods and revive traditional indigenous crops like Kodo millet and native Nepalese corn varieties.",
      iconColor: "text-[#28AAE0] bg-sky-50",
    },
    {
      icon: Users,
      title: "Women Farmer Empowerment",
      description:
        "Over 65% of our partner agricultural cooperatives in rural hill districts are led by women farmers who earn independent household incomes.",
      iconColor: "text-[#0555A2] bg-sky-50",
    },
    {
      icon: Globe,
      title: "Sustainable Packaging",
      description:
        "Our manufacturing processes prioritize recyclable barrier packaging and energy-efficient processing units to minimize our carbon footprint.",
      iconColor: "text-[#28AAE0] bg-sky-50",
    },
  ];

  return (
    <div className="w-full font-sans overflow-hidden">
      
      {/* SECTION 1: Open Hero Section (Soft Sky Blue) */}
      <section className="w-full bg-[#F0F7FD] py-16 lg:py-24 px-6 lg:px-8 relative overflow-hidden">
        {/* Background Ambient Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0555A2]/5 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#28AAE0]/5 rounded-full filter blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E2EEF8] text-[#0555A2] shadow-2xs">
              <Leaf className="w-3.5 h-3.5 text-[#28AAE0]" />
              <span className="text-xs font-bold uppercase tracking-wider font-sans">
                COMMUNITY & SUSTAINABILITY
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-serif text-[#1C1917] tracking-tight leading-tight">
              Our <span className="italic font-normal text-[#0555A2]">Social Impact</span> & Responsibility
            </h1>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-sans">
              At Arksh Food, business success goes hand-in-hand with community welfare. We empower local Nepalese farmers, revive ancient indigenous grains like Kodo (millet), and practice eco-conscious manufacturing across Nepal.
            </p>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full rounded-2xl overflow-hidden shadow-sm border-2 border-white bg-stone-100">
              <Image
                src="/images/farmer.png"
                alt="Nepalese Millet Farmers"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#38BDF8] flex items-center gap-1.5">
                  <Sprout size={14} /> Direct Farm Partnership
                </span>
                <h3 className="text-base font-serif font-bold text-white">Empowering Rural Himalayan Communities</h3>
                <p className="text-xs text-slate-200 font-sans">Working directly with farming families across Kavre, Mustang & Western Nepal.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: Core Initiatives Open Feature Grid (Pure White, No Cards) */}
      <section className="w-full bg-white py-16 lg:py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#28AAE0]">
              PRACTICES & COMMITMENT
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] tracking-tight font-serif text-[#1C1917]">
              <span className="font-sans font-bold uppercase text-[#0555A2] tracking-wider">HOW WE</span>{" "}
              <span className="italic font-semibold">Make a Difference</span>
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm font-sans pt-1">
              Our 4 pillars of sustainable agricultural development and fair trade in Nepal.
            </p>
          </div>

          {/* Open 4-Column Feature List (No Cards) */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {initiatives.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="space-y-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.iconColor}`}>
                    <Icon size={20} />
                  </div>
                  <h3 className="text-base font-serif font-bold text-[#1C1917]">{item.title}</h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans">{item.description}</p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION 3: Farm to Table Narrative (Soft Sky Blue) */}
      <div className="w-full bg-[#F0F7FD]">
        <FarmToTableSection />
      </div>

    </div>
  );
}
