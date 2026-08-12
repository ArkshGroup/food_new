"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import {
  Check,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Coffee,
  Zap,
  Heart,
  Droplet,
} from "lucide-react";

interface BrandItem {
  id: string;
  name: string;
  logo: string;
  badge: string;
  badgeColor?: string;
  tagline: string;
  description: string;
  highlight: string;
  filterHref: string;
  items: string[];
}

const BRANDS_LIST: BrandItem[] = [
  {
    id: "dami",
    name: "Dami",
    logo: "/images/dami.png",
    badge: "Flagship Nepali Brand",
    tagline: "Celebrating Nepal's Agricultural Heritage & Wholesome Millet Snacks",
    description:
      "Dami is Arksh Food's flagship Nepali brand, proudly crafted to celebrate local ingredients, authentic flavors, and wholesome nutrition. Inspired by Nepal's rich farming heritage, Dami offers wholesome millet biscuits, corn cookies, and crisp puffs.",
    highlight: "100% Nepali Kodo Millet & Native Corn Sourced Directly from Farmers",
    filterHref: "/products?categoryNames=Biscuits",
    items: [
      "Kodo (Millet) Biscuits & Cookies",
      "Sugar-Free Kodo Biscuits",
      "Makai & Honey (Corn) Biscuits",
      "Digestive & Oats Cookies",
      "Dami Crunchy Corn Puffs",
    ],
  },
  {
    id: "maccoffee",
    name: "MacCoffee",
    logo: "/images/mac.png",
    badge: "Authorized Distributor",
    tagline: "Café-Style Premium Coffee Experience at Your Convenience",
    description:
      "MacCoffee is a world-leading instant coffee brand trusted by millions for its rich aroma, smooth taste, and exceptional quality. Arksh Food proudly brings MacCoffee's premium coffee range across Nepal.",
    highlight: "Rich Aroma & Consistent Café-Quality Taste in Every Cup",
    filterHref: "/products?categoryNames=Coffee",
    items: [
      "MacCoffee Original Instant",
      "MacCoffee Gold Freeze Dried Coffee",
      "Cold Coffee & Coffee Sachets",
      "Ceramic Cup Gift Sets",
    ],
  },
  {
    id: "didian",
    name: "Didian",
    logo: "/images/didian.png",
    badge: "International Partner",
    tagline: "Trusted High-Energy & Outdoor Emergency Snacking",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    description:
      "Didian is a trusted international food brand offering high-quality energy biscuits, crackers, and cookies engineered for durability, high calorie density, and nutrition for travelers, field usage, and emergency reserves.",
    highlight: "High Calorie Density & Long Shelf Life Energy Provisioning",
    filterHref: "/products?categoryNames=Biscuits",
    items: [
      "Compressed High Energy Army Biscuits",
      "Peanut & Chocolate Energy Bars",
      "Cream & Sugar-Free Soda Crackers",
      "Danish Style Butter Cookies",
    ],
  },
  {
    id: "luxury",
    name: "Luxury Chocolates",
    logo: "/images/luxury.png",
    badge: "Premium Confectionery",
    tagline: "Indulgent & Elegant Premium Cocoa Selection",
    description:
      "Luxury Chocolates offers an indulgent collection of premium chocolate products crafted for those who appreciate fine cocoa taste and smooth, satisfying chocolate moments.",
    highlight: "Crafted with Fine Cocoa Beans & Rich Cream Fillings",
    filterHref: "/products?categoryNames=Chocolate",
    items: [
      "Assorted Gourmet Chocolates",
      "Hazelnut & Vanilla Cream Bars",
      "Strawberry & Coconut Chocolates",
      "Crème & Crispy Chocolate Truffles",
    ],
  },
  {
    id: "creamer",
    name: "Non-Dairy Creamer",
    logo: "/images/logo.png",
    badge: "Quality Ingredient",
    tagline: "Premium Dairy-Free Beverage & Bakery Formulation",
    description:
      "Non-Dairy Creamer delivers a rich, smooth, and creamy texture for coffee, tea, and baked goods. Specially formulated for excellent solubility, instant dispersion, and long shelf stability.",
    highlight: "Instant Solubility for Cafés, Bakeries & Commercial Kitchens",
    filterHref: "/products?categoryNames=Creamer",
    items: [
      "Instant Coffee & Tea Whitener",
      "Bakery & Confectionery Grade Powder",
      "Commercial Beverage Foodservice Pack",
    ],
  },
];

export default function OurBrandsPage() {
  const damiBrand = BRANDS_LIST[0];
  const otherBrands = BRANDS_LIST.slice(1);

  return (
    <div className="w-full relative bg-[#F0F7FD] min-h-screen font-sans">
      
      {/* Hero Header Section */}
      <section className="py-16 lg:py-20 px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#E8E2D9] text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#28AAE0]">
          CURATED BRAND PORTFOLIO
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#1C1917] tracking-tight">
          Our <span className="italic text-[#0555A2]">Family of Brands</span>
        </h1>
        <p className="text-stone-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-sans">
          From authentic Nepalese millet creations to premium international coffee and gourmet chocolates, discover the brands that define Arksh Food.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16 space-y-12">
        
        {/* Flagship Brand Banner (DAMI - Meet Dami) */}
        <div className="bg-[#0555A2] text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden grid lg:grid-cols-12 gap-8 items-center border border-[#033B73]">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-sky-200 border border-white/20 text-xs font-bold uppercase tracking-wider">
                FLAGSHIP NEPALI BRAND
              </span>
              <span className="text-xs text-sky-200 font-medium">★ Nepal&apos;s #1 Millet Snack Line</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
                Meet <span className="italic text-sky-200">Dami</span>
              </h2>
              <p className="text-sky-100 text-sm sm:text-base font-serif italic leading-relaxed">
                &ldquo;Made with the goodness of locally sourced Nepali ingredients.&rdquo;
              </p>
            </div>

            <p className="text-sky-100/90 text-xs sm:text-sm leading-relaxed font-sans">
              Dami is Arksh Food&apos;s celebrated flagship line crafted specifically for mindful snack lovers. Powered by ancient <strong className="text-white">Kodo millet</strong> and sun-ripened Nepali corn, Dami delivers irresistible crunch, zero unnecessary additives, and pure local goodness in every bite.
            </p>

            {/* Feature Pills */}
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-sky-200 flex items-center gap-1.5 font-sans">
                <Sparkles size={14} /> Highlight
              </h4>
              <p className="text-xs text-white leading-relaxed font-sans">100% Nepali Kodo Millet & Native Corn Sourced Directly from Farmers</p>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {damiBrand.items.map((item, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-white/15 text-white text-xs font-medium border border-white/20 font-sans"
                >
                  ✓ {item}
                </span>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/products?brandNames=Dami"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-[#0555A2] hover:bg-sky-50 text-xs font-bold uppercase tracking-widest rounded-full transition-all shadow-md active:scale-95"
              >
                <span>Discover Dami Collection</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Right Product & Ingredient Showcase Image */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20">
              <Image
                src="/images/dami_featured.png"
                alt="Meet Dami - Arksh Food Flagship Brand"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </div>

        </div>

        {/* 2-Column Brand Grid for Remaining Brands */}
        <div className="grid md:grid-cols-2 gap-8">
          {otherBrands.map((brand) => (
            <div
              key={brand.id}
              className="bg-white rounded-3xl border border-[#E8E2D9] p-6 sm:p-8 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-5">
                
                {/* Brand Header */}
                <div className="flex items-center gap-5 border-b border-[#E8E2D9] pb-5">
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-[#0555A2] font-bold tracking-widest uppercase bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-100">
                      {brand.badge}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif text-[#1C1917] tracking-tight">
                      {brand.name}
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm font-sans font-medium text-[#28AAE0]">
                  {brand.tagline}
                </p>

                <p className="text-xs text-stone-600 leading-relaxed font-sans">
                  {brand.description}
                </p>

                {/* Items Checklist */}
                <div className="space-y-2 pt-2">
                  <h4 className="text-[11px] font-bold text-[#1C1917] uppercase tracking-wider">
                    Key Offerings:
                  </h4>
                  <div className="grid gap-2">
                    {brand.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-xs text-stone-700 font-sans"
                      >
                        <div className="w-4 h-4 rounded-full bg-sky-50 text-[#0555A2] flex items-center justify-center shrink-0">
                          <Check size={10} />
                        </div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Minimal Bottom CTA (No BG, No Border) */}
              <div className="pt-4 border-t border-[#E8E2D9]/60">
                <Link
                  href={brand.filterHref}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0555A2] hover:text-[#28AAE0] transition-colors group/btn"
                >
                  <span>Explore {brand.name} Products</span>
                  <ArrowRight size={14} className="group-hover/btn:translate-x-1.5 transition-transform" />
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
