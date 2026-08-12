"use client";

import React from "react";
import Image from "next/image";
import {
  ShieldCheck,
  Leaf,
  Zap,
  Heart,
  Sprout,
  CheckCircle2,
} from "lucide-react";

export function FeaturesBenefitsSection() {
  const leftFeatures = [
    {
      num: "01",
      title: "Quality You Can Trust",
      desc: "Every biscuit, cookie, and snack is made with selected ingredients and strict quality checks.",
      Icon: ShieldCheck,
    },
    {
      num: "02",
      title: "Millet & Maize Goodness",
      desc: "Millet-based options bring fiber and nutrients for healthier everyday snacking.",
      Icon: Leaf,
    },
    {
      num: "03",
      title: "Energy for Busy Days",
      desc: "From morning coffee to quick bites — stay fueled without heavy, greasy meals.",
      Icon: Zap,
    },
  ];

  const rightFeatures = [
    {
      num: "04",
      title: "Made for the Whole Family",
      desc: "Tasty, safe choices kids and adults enjoy at home, school, or work.",
      Icon: Heart,
    },
    {
      num: "05",
      title: "Locally Made in Nepal",
      desc: "Freshly crafted with local crops — better taste and stronger farming communities.",
      Icon: Sprout,
    },
    {
      num: "06",
      title: "Smarter Snack Choices",
      desc: "Wholesome alternatives to ordinary junk food — great taste, guilt-free moments.",
      Icon: CheckCircle2,
    },
  ];

  return (
    <section className="w-full bg-[#F0F7FD] py-16 lg:py-24 font-sans relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Headline */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] tracking-tight flex items-baseline justify-center gap-2 sm:gap-3 flex-wrap">
            <span className="font-sans font-bold uppercase text-[#0555A2] tracking-wider">
              WHY
            </span>
            <span className="font-serif font-semibold italic text-[#1C1917]">
              Arksh Food?
            </span>
          </h2>
        </div>

        {/* 3-Column Grid: Left (3) | Center Image | Right (3) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center">
          {/* Left Column (01, 02, 03) */}
          <div className="lg:col-span-4 space-y-8 sm:space-y-10">
            {leftFeatures.map(({ num, title, desc, Icon }) => (
              <div
                key={num}
                className="group flex flex-row lg:flex-row-reverse items-start lg:items-center gap-4 text-left lg:text-right"
              >
                {/* Glassmorphic Serving Plate Icon Container */}
                <div className="relative p-1 rounded-full bg-gradient-to-br from-white via-white/80 to-sky-100/50 backdrop-blur-md border border-white shadow-md shadow-sky-900/5 group-hover:shadow-xl group-hover:border-[#0555A2]/40 transition-all duration-300 shrink-0">
                  <div className="w-12 h-12 rounded-full bg-sky-50 border border-sky-100/80 text-[#0555A2] flex items-center justify-center shadow-inner group-hover:bg-[#0555A2] group-hover:text-white group-hover:border-[#0555A2] transition-all duration-300">
                    <Icon
                      className="w-5.5 h-5.5 transition-transform duration-300 group-hover:scale-110"
                      strokeWidth={2}
                    />
                  </div>
                </div>

                {/* Text Content */}
                <div className="space-y-0.5">
                  <span className="hidden lg:block text-xs sm:text-sm font-mono font-bold tracking-wider text-stone-300">
                    {num}
                  </span>
                  <h3 className="text-base sm:text-lg font-serif font-bold text-[#1C1917] group-hover:text-[#0555A2] transition-colors leading-snug">
                    {title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Center Visual Image Column */}
          <div className="lg:col-span-4 flex items-center justify-center my-6 lg:my-0">
            <div className="relative w-full max-w-[460px] h-[320px] sm:h-[420px] lg:h-[500px] flex items-center justify-center">
              <Image
                src="/images/millet4.png"
                alt="Himalayan Kodo Millet Harvest"
                fill
                quality={95}
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-contain drop-shadow-2xl transition-transform duration-700 hover:scale-105"
                priority
              />
            </div>
          </div>

          {/* Right Column (04, 05, 06) */}
          <div className="lg:col-span-4 space-y-8 sm:space-y-10">
            {rightFeatures.map(({ num, title, desc, Icon }) => (
              <div
                key={num}
                className="group flex flex-row items-start lg:items-center gap-4 text-left"
              >
                {/* Glassmorphic Serving Plate Icon Container */}
                <div className="relative p-1 rounded-full bg-gradient-to-br from-white via-white/80 to-sky-100/50 backdrop-blur-md border border-white shadow-md shadow-sky-900/5 group-hover:shadow-xl group-hover:border-[#0555A2]/40 transition-all duration-300 shrink-0">
                  <div className="w-12 h-12 rounded-full bg-sky-50 border border-sky-100/80 text-[#0555A2] flex items-center justify-center shadow-inner group-hover:bg-[#0555A2] group-hover:text-white group-hover:border-[#0555A2] transition-all duration-300">
                    <Icon
                      className="w-5.5 h-5.5 transition-transform duration-300 group-hover:scale-110"
                      strokeWidth={2}
                    />
                  </div>
                </div>

                {/* Text Content */}
                <div className="space-y-0.5">
                  <span className="hidden lg:block text-xs sm:text-sm font-mono font-bold tracking-wider text-stone-300">
                    {num}
                  </span>
                  <h3 className="text-base sm:text-lg font-serif font-bold text-[#1C1917] group-hover:text-[#0555A2] transition-colors leading-snug">
                    {title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
