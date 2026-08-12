"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { encodeRemoteUrlForImage } from "@/lib/encode-remote-url";
import {
  ArrowUpRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface CategoryItem {
  id: number | string;
  name: string;
  imageUrl?: string | null;
  description?: string;
}

const CATEGORY_EDITORIAL_INFO: Record<
  string,
  { desc: string; imageFallback: string }
> = {
  Biscuits: {
    desc: "Crispy Himalayan millet & pure butter biscuits baked for daily tea time.",
    imageFallback: "/category/biscuits.avif",
  },
  Cookies: {
    desc: "Rich, buttery, artisanal cookies crafted with wholesome natural ingredients.",
    imageFallback: "/category/cookies.avif",
  },
  "Puffs & Snacks": {
    desc: "Lightly seasoned crunchy kodo millet & corn puffs for guilt-free munching.",
    imageFallback: "/category/puff.avif",
  },
  "Coffee & Creamers": {
    desc: "Smooth local roast coffee & non-dairy creamers for perfect morning energy.",
    imageFallback: "/category/coffee.avif",
  },
  Coffee: {
    desc: "Rich, aromatic local roast coffee sachets and highland coffee beans.",
    imageFallback: "/category/coffee.avif",
  },
  Creamer: {
    desc: "Smooth, non-dairy coffee & tea creamer for rich, velvety beverages.",
    imageFallback: "/category/creamer.avif",
  },
  Chocolates: {
    desc: "Decadent dark & milk chocolate creations crafted for sweet moments.",
    imageFallback: "/category/chocholate.avif",
  },
  Chocolate: {
    desc: "Decadent dark & milk chocolate creations crafted for sweet moments.",
    imageFallback: "/category/chocholate.avif",
  },
};

const DEFAULT_CATEGORIES: CategoryItem[] = [
  { id: 1, name: "Biscuits" },
  { id: 2, name: "Cookies" },
  { id: 3, name: "Puffs & Snacks" },
  { id: 4, name: "Coffee" },
  { id: 5, name: "Creamer" },
  { id: 6, name: "Chocolates" },
];

export default function CategoryWiseSection({
  categories,
}: {
  categories?: CategoryItem[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // If backend returns real categories, use them; otherwise use default 6 category list
  const sourceCategories =
    categories && categories.length > 0 ? categories : DEFAULT_CATEGORIES;

  const categoryList = sourceCategories.map((cat) => {
    const editorialInfo = CATEGORY_EDITORIAL_INFO[cat.name] || {
      desc:
        cat.description ||
        "Thoughtfully crafted authentic Nepalese food products.",
      imageFallback: "/images/hero_nepal_food.png",
    };

    return {
      id: cat.id,
      name: cat.name,
      imageUrl: cat.imageUrl || null,
      desc: cat.description || editorialInfo.desc,
      fallbackImage: editorialInfo.imageFallback,
      href: `/products?categoryNames=${encodeURIComponent(cat.name)}`,
    };
  });

  // Calculate maximum index (showing 4 cards at a time on desktop)
  const maxIndex = Math.max(0, categoryList.length - 4);

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <section className="w-full bg-[#FAF8F5] py-16 lg:py-24 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Left/Right Carousel Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-6">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight flex items-baseline gap-2.5 sm:gap-3.5 flex-wrap">
              <span className="font-sans font-black uppercase text-transparent [-webkit-text-stroke:1.25px_#0555A2] tracking-wider">
                EXPLORE
              </span>
              <span className="font-serif font-bold italic text-[#1C1917]">
                Our Products
              </span>
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-end gap-2 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className="w-10 h-10 rounded-full border border-[#E8E2D9] bg-white text-[#0555A2] flex items-center justify-center hover:bg-[#0555A2] hover:text-white disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-[#0555A2] transition-all shadow-2xs active:scale-95"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                disabled={currentIndex >= maxIndex}
                className="w-10 h-10 rounded-full border border-[#E8E2D9] bg-white text-[#0555A2] flex items-center justify-center hover:bg-[#0555A2] hover:text-white disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-[#0555A2] transition-all shadow-2xs active:scale-95"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Viewport Container */}
        <div className="relative overflow-hidden pt-2 pb-6">
          <div
            className="flex transition-transform duration-500 ease-out gap-6"
            style={{
              transform: `translateX(-${currentIndex * (100 / 4 + 0.6)}%)`,
            }}
          >
            {categoryList.map((cat) => {
              const imgSrc = cat.imageUrl
                ? encodeRemoteUrlForImage(cat.imageUrl)
                : cat.fallbackImage;

              return (
                <div
                  key={cat.name}
                  className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] shrink-0"
                >
                  <Link
                    href={cat.href}
                    className="group relative rounded-3xl p-5 bg-gradient-to-br from-[#0555A2] via-[#044482] to-[#022B54] text-white shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col justify-between h-[330px] sm:h-[360px] overflow-hidden hover:-translate-y-1.5 border border-white/10"
                  >
                    {/* Subtle Background Glow Radial Gradient */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(40,170,224,0.25),transparent_60%)] pointer-events-none" />

                    {/* Top Action Arrow Button */}
                    <div className="relative z-10 flex items-center justify-end">
                      <div className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-md text-white border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-[#0555A2] transition-all duration-300 shadow-2xs group-hover:scale-110">
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>

                    {/* Center Floating HD Object-Contain Product Image */}
                    <div className="relative z-10 w-full h-[180px] sm:h-[200px] my-2 flex items-center justify-center">
                      <Image
                        src={imgSrc}
                        alt={cat.name}
                        fill
                        quality={95}
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 300px"
                        className="object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.4)] p-1 transition-transform duration-500 ease-out group-hover:scale-108"
                      />
                    </div>

                    {/* Bottom Clean White Title Typography */}
                    <div className="relative z-10 text-center pt-1 pb-1">
                      <h3 className="text-xl sm:text-2xl font-serif font-black tracking-widest uppercase text-white group-hover:text-[#28AAE0] transition-colors duration-300 drop-shadow-sm">
                        {cat.name}
                      </h3>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
