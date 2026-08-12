"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function ShoppingCtaBanner() {
  return (
    <section className="w-full bg-[#1C1917] text-white py-20 lg:py-28 relative overflow-hidden border-b border-stone-800">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#28AAE0]/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-800 border border-stone-700 text-[#28AAE0]">
          <Sparkles className="w-4 h-4 text-[#28AAE0]" />
          <span className="text-xs font-bold uppercase tracking-widest font-sans">
            AUTHENTIC NEPALI TASTE
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-tight">
          Something Delicious Awaits
        </h2>

        <p className="text-stone-300 text-base sm:text-lg max-w-2xl mx-auto font-sans leading-relaxed">
          Explore our collection of snacks, biscuits, coffee, chocolates and more. Freshly baked, thoughtfully made, and delivered straight to your doorstep.
        </p>

        <div className="pt-4">
          <Link
            href="/products"
            className="inline-flex items-center gap-3 px-9 py-4 bg-[#0555A2] hover:bg-[#28AAE0] text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl active:scale-95"
          >
            <span>Shop All Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
