"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

export function ImpactStatisticsSection() {
  return (
    <section className="relative w-full min-h-[360px] sm:min-h-[440px] lg:min-h-[480px] flex items-center font-sans overflow-hidden py-12 sm:py-16">
      {/* Full-width Background Image cropped slightly from top & bottom */}
      <Image
        src="/CTA1.png"
        alt="Arksh Food Creator Program"
        fill
        priority
        sizes="100vw"
        quality={90}
        className="object-cover object-center w-full h-full"
      />

      {/* Sky Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0555A2]/90 via-[#0555A2]/75 to-[#28AAE0]/40 mix-blend-multiply" />
      <div className="absolute inset-0 bg-black/20" />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Left Text */}
          <div className="space-y-2 text-left max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold tracking-wider text-white uppercase border border-white/30">
              <Sparkles className="w-3.5 h-3.5 text-[#28AAE0]" />
              <span>Creator Community</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              Become an Arksh Food Influencer
            </h2>
            <p className="text-xs sm:text-base text-white/90 font-sans leading-relaxed">
              Share authentic Nepali snacks, create content, and earn exclusive tasting hampers & rewards.
            </p>
          </div>

          {/* Right CTA Button */}
          <div className="shrink-0 pt-2 md:pt-0">
            <Link
              href="/food-influencer-program"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-white text-[#0555A2] hover:bg-[#F0F7FD] text-xs sm:text-sm font-serif font-bold uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 group"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-4 h-4 text-[#0555A2] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
