"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function LifestyleEditorialSection() {
  const moments = [
    {
      title: "Morning Ritual",
      subtitle: "Tea & Golden Millet Biscuits",
      desc: "Start your day with steaming local tea and crisp kodo millet biscuits baked to perfection.",
      image: "/images/lifestyle_morning.png",
      tag: "AM ENERGY",
    },
    {
      title: "Afternoon Break",
      subtitle: "Iced Coffee & Dami Crunch",
      desc: "Beat mid-day fatigue with seasoned puffed snacks paired with smooth iced coffee.",
      image: "/images/lifestyle_afternoon.png",
      tag: "MID-DAY FUEL",
    },
    {
      title: "Share the Moment",
      subtitle: "Family Gathering Snack Platters",
      desc: "Gather loved ones around generous platters of artisanal cookies, puffs, and dark chocolates.",
      image: "/images/lifestyle_sharing.png",
      tag: "EVENINGS TOGETHER",
    },
  ];

  return (
    <section className="w-full bg-[#FAF8F5] py-16 lg:py-24 border-b border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#28AAE0]">
              EVERYDAY INSPIRATION
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1C1917] tracking-tight">
              Food for Everyday Moments
            </h2>
          </div>
          <p className="text-stone-600 text-sm sm:text-base max-w-md font-sans">
            Crafted to accompany you through every quiet morning, busy afternoon, and joyous gathering.
          </p>
        </div>

        {/* 3 Lifestyle Editorial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {moments.map((item) => (
            <div
              key={item.title}
              className="group bg-white rounded-2xl overflow-hidden border border-[#E8E2D9] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F3EEE8]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#0555A2] border border-white/60">
                  {item.tag}
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-serif text-[#1C1917] group-hover:text-[#0555A2] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#28AAE0] mt-0.5">
                    {item.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans mt-3">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E8E2D9]">
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1C1917] group-hover:text-[#0555A2] transition-colors"
                  >
                    <span>Discover Snacks</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
