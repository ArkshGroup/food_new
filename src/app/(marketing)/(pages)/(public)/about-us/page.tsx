"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import {
  Sparkles,
  Target,
  Compass,
  Leaf,
  ArrowRight,
  ShieldCheck,
  HeartHandshake,
} from "lucide-react";

export default function AboutPage() {
  const pillars = [
    {
      icon: Leaf,
      title: "Authentic Local Grains",
      description:
        "Harvested directly from Nepal's hill districts, focusing on Kodo millet and native corn.",
      iconColor: "text-[#0555A2] bg-sky-50",
    },
    {
      icon: HeartHandshake,
      title: "Farmer First & Fair Trade",
      description:
        "Sustaining over 1,200 mountain farming families with direct trade and guaranteed fair pricing.",
      iconColor: "text-[#28AAE0] bg-sky-50",
    },
    {
      icon: ShieldCheck,
      title: "Artisanal Quality Control",
      description:
        "Combining hygienic manufacturing standards with traditional Nepalese baking recipes.",
      iconColor: "text-[#0555A2] bg-sky-50",
    },
    {
      icon: Sparkles,
      title: "Nutritional Excellence",
      description:
        "Wholesome, nutrient-rich snacks crafted without unnecessary greasy fillers or artificial preservatives.",
      iconColor: "text-[#28AAE0] bg-sky-50",
    },
  ];

  const milestones = [
    {
      year: "2018",
      title: "Foundation & Vision",
      description:
        "Founded with a mission to elevate traditional Nepalese grains into everyday healthy food products.",
    },
    {
      year: "2020",
      title: "Farmer Sourcing Network",
      description:
        "Established direct partnerships with over 1,200 local millet and maize growers across Nepal's hill districts.",
    },
    {
      year: "2022",
      title: "Launch of Dami Snacks",
      description:
        "Introduced flagship Dami Kodo millet biscuits and artisanal corn puffs to tea tables nationwide.",
    },
    {
      year: "Today",
      title: "Nationwide Growth",
      description:
        "Expanding brand portfolio including MacCoffee, Didian, and Luxury Chocolates across all 7 provinces.",
    },
  ];

  return (
    <div className="w-full font-sans overflow-hidden">
      {/* SECTION 1: Open Editorial Hero Section (Soft Sky Blue) */}
      <section className="w-full bg-[#F0F7FD] py-16 lg:py-24 px-6 lg:px-8 relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0555A2]/5 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#28AAE0]/5 rounded-full filter blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
          {/* Left Story Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E2EEF8] text-[#0555A2] shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#28AAE0]" />
              <span className="text-xs font-bold uppercase tracking-wider font-sans">
                OUR STORY & HERITAGE
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-serif text-[#1C1917] tracking-tight leading-tight">
              Our{" "}
              <span className="italic font-normal text-[#0555A2]">Story</span> &
              Mission
            </h1>

            <div className="space-y-4 text-sm sm:text-base text-stone-600 leading-relaxed font-sans">
              <p>
                Arksh Food was created with a simple yet powerful vision: to
                bring healthier, tastier, and more nutritious snacks to Nepali
                families while supporting local farming communities.
              </p>
              <p>
                We believe traditional crops like{" "}
                <strong className="text-stone-900 font-semibold">
                  Kodo (millet)
                </strong>{" "}
                and{" "}
                <strong className="text-stone-900 font-semibold">
                  Makai (corn)
                </strong>{" "}
                hold the key to better everyday nutrition. By sourcing directly
                from mountain farmers, we preserve Nepal&apos;s rich
                agricultural heritage.
              </p>

              <p className="font-serif italic text-sm sm:text-base text-[#1C1917] border-l-2 border-[#0555A2] pl-4 py-1.5">
                &ldquo;More than just a food brand, Arksh Food represents local
                pride, sustainable agriculture, and trusted quality for every
                household.&rdquo;
              </p>
            </div>

            {/* Clean Inline Stats (3 Columns) */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-4 border-t border-sky-200/60">
              <div>
                <span className="block text-xl sm:text-2xl font-serif font-extrabold text-[#0555A2]">
                  100%
                </span>
                <span className="block text-xs font-medium text-stone-600 mt-0.5">
                  Nepali Grains
                </span>
              </div>
              <div>
                <span className="block text-xl sm:text-2xl font-serif font-extrabold text-[#28AAE0]">
                  Direct
                </span>
                <span className="block text-xs font-medium text-stone-600 mt-0.5">
                  Farmer Support
                </span>
              </div>
              <div>
                <span className="block text-xl sm:text-2xl font-serif font-extrabold text-[#0555A2]">
                  Trusted
                </span>
                <span className="block text-xs font-medium text-stone-600 mt-0.5">
                  Quality Care
                </span>
              </div>
            </div>
          </div>

          {/* Right Farmer Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full rounded-2xl overflow-hidden shadow-sm border-2 border-white bg-stone-100">
              <Image
                src="/harvest.png"
                alt="Arksh Food Himalayan Story"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#38BDF8]">
                  HERITAGE & COMMUNITY
                </span>
                <h3 className="text-base font-serif font-bold text-white mt-0.5">
                  Rooted in Himalayan Agriculture
                </h3>
                <p className="text-xs text-slate-200 mt-0.5 font-sans">
                  Empowering indigenous grain farmers across Nepal
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Open Feature Grid - Core Pillars (Pure White, No Cards) */}
      <section className="w-full bg-white py-16 lg:py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#28AAE0]">
              WHAT DRIVES US
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] tracking-tight font-serif text-[#1C1917]">
              <span className="font-sans font-bold uppercase text-[#0555A2] tracking-wider">
                OUR
              </span>{" "}
              <span className="italic font-semibold">Core Pillars</span>
            </h2>
          </div>

          {/* Open 4-Column Feature List (No Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((pillar) => {
              const IconComp = pillar.icon;
              return (
                <div key={pillar.title} className="space-y-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${pillar.iconColor}`}
                  >
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-serif font-bold text-[#1C1917]">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-stone-600 font-sans leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3: Guiding Principles - Mission & Vision Narrative (Soft Sky Blue, No Cards) */}
      <section className="w-full bg-[#F0F7FD] py-16 lg:py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#28AAE0]">
              FOUNDATION OF OUR BRAND
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] tracking-tight font-serif text-[#1C1917]">
              <span className="font-sans font-bold uppercase text-[#0555A2] tracking-wider">
                GUIDING
              </span>{" "}
              <span className="italic font-semibold">Principles</span>
            </h2>
          </div>

          {/* Open Editorial Columns (No Heavy Cards) */}
          <div className="grid md:grid-cols-2 gap-10">
            {/* Mission Column */}
            <div className="space-y-3 border-l-4 border-[#0555A2] pl-6">
              <div className="flex items-center gap-2 text-[#0555A2]">
                <Target size={20} />
                <h3 className="text-xl font-serif font-bold text-[#1C1917]">
                  Our Mission
                </h3>
              </div>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-sans">
                To innovate, produce, and distribute wholesome, nutritious food
                products using locally grown Himalayan grains, making healthy
                eating accessible while directly benefiting Nepali farmers.
              </p>
            </div>

            {/* Vision Column */}
            <div className="space-y-3 border-l-4 border-[#28AAE0] pl-6">
              <div className="flex items-center gap-2 text-[#28AAE0]">
                <Compass size={20} />
                <h3 className="text-xl font-serif font-bold text-[#1C1917]">
                  Our Vision
                </h3>
              </div>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-sans">
                To elevate traditional Nepalese grains like Kodo millet onto the
                national & global stage, establishing Arksh Food as a trusted
                benchmark for nutritional excellence and sustainable food
                culture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Our Milestones Open Timeline (Pure White, No Cards) */}
      <section className="w-full bg-white py-16 lg:py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#28AAE0]">
              EVOLUTION & GROWTH
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] tracking-tight font-serif text-[#1C1917]">
              <span className="font-sans font-bold uppercase text-[#0555A2] tracking-wider">
                OUR
              </span>{" "}
              <span className="italic font-semibold">Milestones</span>
            </h2>
          </div>

          {/* Open Horizontal Timeline List (No Box Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {milestones.map((item, idx) => (
              <div key={item.year} className="space-y-2 relative">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-serif font-extrabold text-[#0555A2]">
                    {item.year}
                  </span>
                  <span className="h-0.5 flex-1 bg-stone-200" />
                </div>
                <h3 className="text-base font-serif font-bold text-[#1C1917]">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-600 font-sans leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: Clean Link CTAs (Soft Sky Blue, Open Layout) */}
      <section className="w-full bg-[#F0F7FD] py-16 lg:py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Link 1: Social Impact */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-[#E2EEF8] shadow-2xs">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#0555A2]">
                SUSTAINABILITY
              </span>
              <h3 className="text-lg font-serif font-bold text-[#1C1917]">
                Explore Social Impact
              </h3>
              <p className="text-xs text-stone-500">
                Discover our work with 1,200+ local Nepalese farmers.
              </p>
            </div>
            <Link
              href="/social-impact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0555A2] hover:bg-[#28AAE0] text-white text-xs font-bold uppercase tracking-wider transition-all shrink-0"
            >
              <span>View Impact</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Link 2: Our Brands */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-[#E2EEF8] shadow-2xs">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#28AAE0]">
                PRODUCT RANGE
              </span>
              <h3 className="text-lg font-serif font-bold text-[#1C1917]">
                View Brands Portfolio
              </h3>
              <p className="text-xs text-stone-500">
                Browse Dami, MacCoffee, Didian, and Luxury Chocolates.
              </p>
            </div>
            <Link
              href="/our-brands"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0555A2] hover:bg-[#28AAE0] text-white text-xs font-bold uppercase tracking-wider transition-all shrink-0"
            >
              <span>Explore Portfolio</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
