"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

export function DamiFeaturedSection() {
  return (
    <section className="w-full bg-[#1C1917] text-white py-16 lg:py-24 relative overflow-hidden border-b border-stone-800">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#28AAE0]/10 rounded-full filter blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0555A2]/15 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text & Storytelling */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-800/80 border border-stone-700 text-[#28AAE0]">
              <Sparkles className="w-3.5 h-3.5 text-[#28AAE0]" />
              <span className="text-xs font-bold uppercase tracking-widest font-sans">
                FLAGSHIP NEPALI BRAND
              </span>
            </div>

            <div className="space-y-2">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-tight">
                Meet <span className="text-[#28AAE0] italic font-normal">Dami</span>
              </h2>
              <p className="text-lg sm:text-xl font-serif italic text-stone-300">
                "Made with the goodness of locally sourced Nepali ingredients."
              </p>
            </div>

            <p className="text-stone-400 text-base leading-relaxed font-sans max-w-xl">
              Dami is Arksh Food's celebrated flagship line crafted specifically for mindful snack lovers. Powered by ancient <strong className="text-white">kodo millet</strong> and sun-ripened Nepali corn, Dami delivers irresistible crunch, zero unnecessary additives, and pure local goodness in every bite.
            </p>

            {/* Ingredient Highlights */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#28AAE0] shrink-0" />
                <span className="text-sm text-stone-300 font-sans">Rich in natural fiber from authentic Himalayan Kodo Millet</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#28AAE0] shrink-0" />
                <span className="text-sm text-stone-300 font-sans">Crafted with non-GMO local Nepali corn & natural spices</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#28AAE0] shrink-0" />
                <span className="text-sm text-stone-300 font-sans">Crispy, oven-baked texture perfect for guilt-free indulgence</span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/products?brandNames=Dami"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#0555A2] hover:bg-[#28AAE0] text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95"
              >
                <span>Discover Dami</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Product & Ingredient Showcase Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden shadow-2xl border border-stone-800 bg-stone-900">
              <Image
                src="/images/dami_featured.png"
                alt="Dami Brand Kodo Millet and Corn Snacks"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent" />
            </div>

            {/* Floating ingredient card */}
            <div className="absolute -bottom-6 left-4 sm:left-8 bg-stone-900/90 backdrop-blur-md p-4 rounded-xl border border-stone-700 shadow-xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#0555A2]/30 flex items-center justify-center text-[#28AAE0] font-serif font-bold text-lg">
                क
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-white">Kodo Millet & Corn</p>
                <p className="text-xs text-stone-400">Hand-selected grains from Nepal</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

