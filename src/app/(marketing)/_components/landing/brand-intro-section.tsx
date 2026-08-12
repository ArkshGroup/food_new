"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, ShieldCheck, HeartHandshake } from "lucide-react";

export function BrandIntroSection() {
  return (
    <section className="w-full bg-[#FAF8F5] py-16 lg:py-24 border-b border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Lifestyle Imagery */}
          <div className="lg:col-span-6 relative order-2 lg:order-1">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden shadow-xl border border-[#E8E2D9] bg-[#F3EEE8]">
              <Image
                src="/images/nepal_brand_story.png"
                alt="A Taste of Nepal - Traditional local ingredients"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            {/* Small floating feature badge */}
            <div className="absolute -bottom-6 -right-2 sm:right-6 bg-[#0555A2] text-white p-5 rounded-xl shadow-xl max-w-xs border border-blue-900">
              <p className="text-xs uppercase tracking-widest text-[#28AAE0] font-bold">100% Nepali Identity</p>
              <p className="text-sm font-serif mt-1 font-light">Rooted in traditional grains, perfected for everyday snacking.</p>
            </div>
          </div>

          {/* Right Typography & Story Content */}
          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#28AAE0]">
                OUR HERITAGE & VISION
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1C1917] tracking-tight leading-tight">
                More Than Food. <br />
                <span className="italic font-normal text-[#0555A2]">A Taste of Nepal.</span>
              </h2>
            </div>

            <p className="text-stone-600 text-base sm:text-lg leading-relaxed font-sans">
              At Arksh Food, we believe everyday snacks should nourish both body and soul. We blend authentic Himalayan recipes with locally grown grains like <strong className="text-stone-800 font-semibold">kodo millet</strong> and organic corn, working directly with Nepali farmers to bring pure quality to your table.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white border border-[#E8E2D9] space-y-1">
                <Leaf className="w-5 h-5 text-[#0555A2]" />
                <p className="text-xs font-bold uppercase tracking-wider text-stone-800">Local Grains</p>
                <p className="text-xs text-stone-500">Ancient millet & corn harvest</p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#E8E2D9] space-y-1">
                <ShieldCheck className="w-5 h-5 text-[#28AAE0]" />
                <p className="text-xs font-bold uppercase tracking-wider text-stone-800">Artisanal Quality</p>
                <p className="text-xs text-stone-500">Hygiene & quality controlled</p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#E8E2D9] space-y-1">
                <HeartHandshake className="w-5 h-5 text-[#0555A2]" />
                <p className="text-xs font-bold uppercase tracking-wider text-stone-800">Farmer First</p>
                <p className="text-xs text-stone-500">Sustaining local agriculture</p>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/about-us"
                className="inline-flex items-center gap-3 px-7 py-3.5 bg-[#0555A2] hover:bg-[#28AAE0] text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <span>Discover Our Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

