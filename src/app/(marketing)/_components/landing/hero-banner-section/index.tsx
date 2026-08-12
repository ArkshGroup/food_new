"use client";

import React, { memo, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sprout,
  Droplet,
  Activity,
  Users,
  Zap,
  Flame,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

export interface BannerSlide {
  id: number;
  categoryUrl: string;
  greenTitle: string;
  blackTitle: string;
  subTitle: string;
  mobileTitle1: string;
  mobileTitle2: string;
  image: string;
  features: {
    iconType: "maida" | "fiber" | "transfat" | "cholesterol" | "farmers";
    title: string;
    desc: string;
  }[];
  mobileFeatures: {
    iconType: "protein" | "energizing" | "natural";
    label: string;
  }[];
  bgGradient: string;
}

const SLIDES: BannerSlide[] = [
  {
    id: 1,
    categoryUrl: "/products?category=biscuits",
    greenTitle: "DELICIOUS &",
    blackTitle: "WHOLE WHEAT BISCUITS",
    subTitle: "Chakki Atta & 0% Maida Healthy Bakery Snacks",
    mobileTitle1: "Delicious Wheat Biscuits,",
    mobileTitle2: "Pure Supergrain Crunch.",
    image: "/banner/biscuits.png",
    bgGradient: "from-[#F0F7FF] via-[#FAF8F5] to-[#E5F3FF]",
    features: [
      {
        iconType: "maida",
        title: "Fresh Baked",
        desc: "Rich Artisanal Flavor",
      },
      { iconType: "fiber", title: "Chakki Atta", desc: "Whole Wheat Goodness" },
      { iconType: "transfat", title: "Zero Maida", desc: "Guilt-Free Crunch" },
      { iconType: "cholesterol", title: "Heart Safe", desc: "Zero Trans Fats" },
      {
        iconType: "farmers",
        title: "Local Pride",
        desc: "Handcrafted in Nepal",
      },
    ],
    mobileFeatures: [
      { iconType: "natural", label: "Fresh Baked" },
      { iconType: "protein", label: "Whole Wheat" },
      { iconType: "energizing", label: "Guilt-Free" },
    ],
  },
  {
    id: 2,
    categoryUrl: "/products?category=chocolates",
    greenTitle: "FINE QUALITY",
    blackTitle: "CRAFT CHOCOLATES",
    subTitle: "Rich Cocoa Confectionery & Gourmet Sweets",
    mobileTitle1: "Rich Craft Cocoa,",
    mobileTitle2: "Made with Love in Nepal.",
    image: "/banner/chocolate.png",
    bgGradient: "from-[#EBF5FB] via-[#FAF8F5] to-[#E0F2FE]",
    features: [
      { iconType: "maida", title: "Real Cocoa", desc: "Rich & Velvety" },
      {
        iconType: "fiber",
        title: "Zero Trans Fat",
        desc: "Wholesome Sweetness",
      },
      {
        iconType: "transfat",
        title: "Melt In Mouth",
        desc: "Silky Smooth Texture",
      },
      {
        iconType: "cholesterol",
        title: "No Preservatives",
        desc: "Natural Goodness",
      },
      { iconType: "farmers", title: "Nepali Pride", desc: "Crafted with Love" },
    ],
    mobileFeatures: [
      { iconType: "natural", label: "Real Cocoa" },
      { iconType: "protein", label: "Melt In Mouth" },
      { iconType: "energizing", label: "Pure Sweetness" },
    ],
  },
  {
    id: 3,
    categoryUrl: "/products?category=coffee",
    greenTitle: "RICH IN",
    blackTitle: "AROMA COFFEE",
    subTitle: "Premium Blends with Pure Natural Goodness",
    mobileTitle1: "Rich in Aroma Coffee,",
    mobileTitle2: "Pure Natural Richness.",
    image: "/banner/coffee.png",
    bgGradient: "from-[#F0F7FF] via-[#FAF8F5] to-[#E5F3FF]",
    features: [
      { iconType: "maida", title: "Rich Aroma", desc: "Authentic Local Roast" },
      { iconType: "fiber", title: "Pure Beans", desc: "Highland Harvest" },
      {
        iconType: "transfat",
        title: "Smooth Brew",
        desc: "100% Arabica Blend",
      },
      {
        iconType: "cholesterol",
        title: "Zero Additives",
        desc: "Clean & Pure",
      },
      { iconType: "farmers", title: "Fresh Pack", desc: "Sealed Quality" },
    ],
    mobileFeatures: [
      { iconType: "energizing", label: "Rich Roast" },
      { iconType: "natural", label: "Smooth Brew" },
      { iconType: "protein", label: "Pure Aroma" },
    ],
  },
  {
    id: 4,
    categoryUrl: "/products?category=cookies",
    greenTitle: "HEALTHY KODO",
    blackTitle: "MILLET COOKIES",
    subTitle: "100% Maida-Free Supergrain Snack Collection",
    mobileTitle1: "Kodo Millet Cookies,",
    mobileTitle2: "100% Healthy & Fiber-Rich.",
    image: "/banner/cookies.png",
    bgGradient: "from-[#EBF5FB] via-[#FAF8F5] to-[#E0F2FE]",
    features: [
      { iconType: "maida", title: "0% Maida", desc: "Pure & Healthy" },
      {
        iconType: "fiber",
        title: "High Fiber",
        desc: "Good for Digestive Health",
      },
      {
        iconType: "transfat",
        title: "Trans Fat Free",
        desc: "Better for Your Heart",
      },
      {
        iconType: "cholesterol",
        title: "Cholesterol Free",
        desc: "Supports Healthy Living",
      },
      {
        iconType: "farmers",
        title: "Local Farmers",
        desc: "Sourced with Pride",
      },
    ],
    mobileFeatures: [
      { iconType: "protein", label: "Protein-packed" },
      { iconType: "energizing", label: "Energizing" },
      { iconType: "natural", label: "All-Natural Goodness" },
    ],
  },
  {
    id: 5,
    categoryUrl: "/products?category=creamer",
    greenTitle: "CREAMY &",
    blackTitle: "MILKY CREAMER",
    subTitle: "Smooth Non-Dairy Milk & Tea Enhancers",
    mobileTitle1: "Creamy Milky Creamer,",
    mobileTitle2: "Instant Smooth Richness.",
    image: "/banner/creamer.png",
    bgGradient: "from-[#F0F7FF] via-[#FAF8F5] to-[#E5F3FF]",
    features: [
      { iconType: "maida", title: "Non-Dairy", desc: "Lactose Friendly" },
      { iconType: "fiber", title: "Super Smooth", desc: "Rich Creamy Blend" },
      {
        iconType: "transfat",
        title: "Quick Dissolve",
        desc: "Instant Richness",
      },
      {
        iconType: "cholesterol",
        title: "Zero Trans Fat",
        desc: "Healthy Beverage",
      },
      {
        iconType: "farmers",
        title: "Sealed Fresh",
        desc: "Quality Guaranteed",
      },
    ],
    mobileFeatures: [
      { iconType: "energizing", label: "Super Smooth" },
      { iconType: "natural", label: "Non-Dairy" },
      { iconType: "protein", label: "Instant Richness" },
    ],
  },
  {
    id: 6,
    categoryUrl: "/products?category=puffs",
    greenTitle: "SAVORY ROASTED",
    blackTitle: "GRAIN PUFFS",
    subTitle: "High-Protein Crunchy Mountain Snacks",
    mobileTitle1: "Roasted Grain Puffs,",
    mobileTitle2: "High-Protein Superfood.",
    image: "/banner/puff.png",
    bgGradient: "from-[#EBF5FB] via-[#FAF8F5] to-[#E0F2FE]",
    features: [
      { iconType: "maida", title: "Roasted Grains", desc: "Sustained Energy" },
      {
        iconType: "fiber",
        title: "High Protein",
        desc: "Keeps You Full Longer",
      },
      { iconType: "transfat", title: "Non-GMO", desc: "Organic Mountain Corn" },
      {
        iconType: "cholesterol",
        title: "Zero Cholesterol",
        desc: "Active Lifestyle",
      },
      { iconType: "farmers", title: "Fair Trade", desc: "Empowering Villages" },
    ],
    mobileFeatures: [
      { iconType: "protein", label: "High Protein" },
      { iconType: "energizing", label: "Roasted Grains" },
      { iconType: "natural", label: "Non-GMO" },
    ],
  },
];

export interface HeroBannerProps {
  heroSliderImages?: any[];
}

export const HeroBanner = memo(function HeroBanner({
  heroSliderImages,
}: HeroBannerProps = {}) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 3500);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const slide = SLIDES[currentSlide];

  // Helper for desktop icons using Arksh Brand Primary Blue / Accent
  const renderDesktopIcon = (type: string) => {
    switch (type) {
      case "maida":
        return <Sprout className="w-6 h-6 text-[#0555A2]" />;
      case "fiber":
        return <Flame className="w-6 h-6 text-[#0555A2]" />;
      case "transfat":
        return <Droplet className="w-6 h-6 text-[#0555A2]" />;
      case "cholesterol":
        return <Activity className="w-6 h-6 text-[#0555A2]" />;
      case "farmers":
        return <Users className="w-6 h-6 text-[#0555A2]" />;
      default:
        return <Sprout className="w-6 h-6 text-[#0555A2]" />;
    }
  };

  // Helper for mobile icons using Arksh Brand Colors
  const renderMobileIcon = (type: string) => {
    switch (type) {
      case "protein":
        return <Zap className="w-6 h-6 text-[#0555A2]" />;
      case "energizing":
        return <Sparkles className="w-6 h-6 text-[#0555A2]" />;
      case "natural":
        return <Sprout className="w-6 h-6 text-[#0555A2]" />;
      default:
        return <Sprout className="w-6 h-6 text-[#0555A2]" />;
    }
  };

  return (
    <section
      className={`relative w-full bg-gradient-to-r ${slide.bgGradient} py-10 sm:py-16 lg:py-20 overflow-hidden border-b border-[#E8E2D9] font-sans transition-colors duration-500`}
    >
      {/* Background Subtle Hexagonal Grid Pattern in Arksh Brand Color */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" width="100%" height="100%">
          <pattern
            id="hexagons"
            width="50"
            height="43.3"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M25 0 L50 14.4 L50 43.3 L25 57.7 L0 43.3 L0 14.4 Z"
              fill="none"
              stroke="#0555A2"
              strokeWidth="0.5"
              strokeDasharray="2 2"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#hexagons)" />
        </svg>
      </div>

      {/* Gourmet Serving Plate Neumorphic Left & Right Slider Arrows */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-2 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-b from-white via-[#F0F7FD] to-[#E2EEF8] border border-white shadow-xs ring-1 ring-[#0555A2]/15 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group p-0"
      >
        <div className="w-7.5 h-7.5 sm:w-8.5 sm:h-8.5 rounded-full bg-white border border-sky-100/80 shadow-inner flex items-center justify-center text-[#0555A2]">
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-0.5 transition-transform" />
        </div>
      </button>

      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-2 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-b from-white via-[#F0F7FD] to-[#E2EEF8] border border-white shadow-xs ring-1 ring-[#0555A2]/15 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group p-0"
      >
        <div className="w-7.5 h-7.5 sm:w-8.5 sm:h-8.5 rounded-full bg-white border border-sky-100/80 shadow-inner flex items-center justify-center text-[#0555A2]">
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ============================================================ */}
        {/* DESKTOP / LAPTOP VIEW                                        */}
        {/* ============================================================ */}
        <div
          key={`desktop-${slide.id}`}
          className="hidden md:grid md:grid-cols-12 gap-8 lg:gap-14 items-center min-h-[500px]"
        >
          {/* Left Column: Animated Larger Headline & Horizontal Badges */}
          <div className="md:col-span-7 space-y-8 text-left">
            {/* Animated Senior Designer Headline Group */}
            <div className="space-y-2.5 animate-slide-down">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight uppercase leading-[0.96] select-none">
                <span className="block font-black bg-gradient-to-r from-[#0555A2] via-[#044483] to-[#28AAE0] bg-clip-text text-transparent filter drop-shadow-xs tracking-wide">
                  {slide.greenTitle}
                </span>
                <span className="block font-serif font-extrabold text-[#1C1917] italic tracking-tight hover:text-[#0555A2] transition-colors duration-500">
                  {slide.blackTitle}
                </span>
              </h1>

              <div className="flex items-center gap-2.5 pt-1">
                <div className="flex items-center gap-1 shrink-0">
                  <span className="w-7 h-[2px] bg-gradient-to-r from-[#0555A2] via-[#28AAE0] to-transparent rounded-full" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#28AAE0] animate-ping" />
                </div>
                <p className="text-base sm:text-lg lg:text-xl font-serif text-[#0555A2] font-semibold italic tracking-wide">
                  {slide.subTitle}
                </p>
              </div>
            </div>

            {/* Compact Flush-Left Feature Items */}
            <div className="flex flex-nowrap items-center pt-3 animate-slide-up">
              {slide.features.slice(0, 4).map((feat, index) => (
                <div
                  key={feat.title}
                  className={`py-1 flex flex-col items-start text-left space-y-1.5 shrink-0 group ${
                    index === 0
                      ? "pl-0 pr-3 sm:pr-4"
                      : index === 3
                        ? "pl-3 sm:pl-4 pr-0"
                        : "px-3 sm:px-4"
                  } ${index !== 3 ? "border-r-2 border-[#0555A2]/30" : ""}`}
                >
                  {/* Gourmet Porcelain Plate Icon (TOP) */}
                  <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-b from-white via-[#F0F7FD] to-[#E2EEF8] border-2 border-white shadow-xs ring-1 ring-[#0555A2]/15 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <div className="w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-full bg-white border border-sky-100/80 shadow-inner flex items-center justify-center">
                      {renderDesktopIcon(feat.iconType)}
                    </div>
                  </div>

                  {/* Title (BELOW) */}
                  <p className="text-xs font-bold text-[#1C1917] leading-tight whitespace-nowrap">
                    {feat.title}
                  </p>
                </div>
              ))}
            </div>

            {/* Pure Text SHOP NOW Link */}
            <div className="pt-2 animate-slide-up">
              <Link
                href={slide.categoryUrl}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-widest text-[#0555A2] hover:text-[#28AAE0] transition-colors group"
              >
                <span>SHOP NOW</span>
                <ArrowRight className="w-4 h-4 text-[#0555A2] group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column: Motion Product Box Image */}
          <div className="md:col-span-5 relative flex items-center justify-center animate-pop-in">
            <div className="relative w-full aspect-[4/3] max-w-xl xl:max-w-2xl">
              <Image
                src={slide.image}
                alt={`${slide.greenTitle} ${slide.blackTitle}`}
                fill
                priority
                quality={95}
                className="object-contain drop-shadow-2xl animate-hero-float"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* MOBILE VIEW                                                  */}
        {/* ============================================================ */}
        <div
          key={`mobile-${slide.id}`}
          className="md:hidden space-y-6 text-center"
        >
          {/* Top Animated Headline */}
          <div className="space-y-1.5 animate-slide-down">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0555A2]">
              {slide.mobileTitle1}
            </h2>
            <p className="text-lg sm:text-2xl font-serif font-semibold text-[#28AAE0]">
              {slide.mobileTitle2}
            </p>
          </div>

          {/* 3 Serving Plate Feature Items (Centered Horizontally on Mobile) */}
          <div className="grid grid-cols-3 pt-1 max-w-sm mx-auto animate-slide-up">
            {slide.mobileFeatures.map((mFeat, index) => (
              <div
                key={mFeat.label}
                className={`py-1.5 flex flex-col items-center text-center space-y-1.5 px-2 ${
                  index !== slide.mobileFeatures.length - 1
                    ? "border-r-2 border-[#0555A2]/30"
                    : ""
                }`}
              >
                {/* Porcelain Serving Plate Icon Container */}
                <div className="relative w-9 h-9 rounded-full bg-gradient-to-b from-white via-[#F0F7FD] to-[#E2EEF8] border-2 border-white shadow-xs ring-1 ring-[#0555A2]/15 flex items-center justify-center shrink-0">
                  <div className="w-6 h-6 rounded-full bg-white border border-sky-100/80 shadow-inner flex items-center justify-center">
                    {renderMobileIcon(mFeat.iconType)}
                  </div>
                </div>
                <p className="text-[10px] sm:text-xs font-bold text-stone-800 leading-tight">
                  {mFeat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Middle Product Image */}
          <div className="relative w-full aspect-[4/3] max-w-[290px] mx-auto animate-pop-in">
            <Image
              src={slide.image}
              alt={`${slide.greenTitle} ${slide.blackTitle}`}
              fill
              priority
              quality={95}
              className="object-contain drop-shadow-xl animate-hero-float"
              sizes="240px"
            />
          </div>

          {/* Bottom Action Button (Pure Text) */}
          <div className="pt-1 flex justify-center">
            <Link
              href={slide.categoryUrl}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0555A2] hover:text-[#28AAE0] transition-colors group"
            >
              <span>SHOP NOW</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#0555A2] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
});
