"use client";

import Image from "next/image";
import { Sprout, Wheat, Factory, Utensils } from "lucide-react";

export function FarmToTableSection() {
  const steps = [
    {
      num: "01",
      title: "Nepali Fields",
      desc: "Organically grown kodo millet and corn cultivated in pristine high-altitude terraced hills by local farming communities.",
      icon: Sprout,
    },
    {
      num: "02",
      title: "Pure Ingredients",
      desc: "Hand-harvested, cleaned, and tested for peak natural nutrient density and traditional aroma.",
      icon: Wheat,
    },
    {
      num: "03",
      title: "Artisanal Production",
      desc: "Oven-baked and puffed in hygienic, state-of-the-art facilities preserving zero artificial preservatives.",
      icon: Factory,
    },
    {
      num: "04",
      title: "Your Table",
      desc: "Delivered fresh to your home for memorable tea-time moments and daily healthy snacking.",
      icon: Utensils,
    },
  ];

  return (
    <section className="w-full bg-[#F0F7FD] py-16 lg:py-24 font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
        
        {/* Section Headline */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#28AAE0]">
            OUR HONEST JOURNEY
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] tracking-tight font-serif text-[#1C1917]">
            <span className="font-sans font-bold uppercase text-[#0555A2] tracking-wider">FROM NEPALI FIELDS</span>{" "}
            <span className="italic font-semibold">To Your Table</span>
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm font-sans pt-1">
            Trace how raw Himalayan grains are transformed into wholesome, delicious food products through sustainable local farming and modern culinary standards.
          </p>
        </div>

        {/* Hero Visual Image (Compact Box) */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/7] rounded-2xl overflow-hidden shadow-sm border-2 border-white bg-stone-100">
          <Image
            src="/images/farm_to_table.png"
            alt="Nepali Terraced Fields Harvest"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 text-white max-w-xl space-y-0.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#38BDF8]">SUSTAINABLE AGRICULTURE</span>
            <h3 className="text-lg sm:text-2xl font-serif font-bold text-white">Empowering Local Nepali Farmers</h3>
            <p className="text-xs text-slate-200 font-sans">Direct trade partnerships ensuring fair income and eco-friendly farming practices.</p>
          </div>
        </div>

        {/* Open 4 Step Process List (Cardless Layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.num} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-sky-50 border border-sky-100 text-[#0555A2] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-serif font-bold text-[#28AAE0] tracking-widest">
                    STEP {step.num}
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-base font-serif font-bold text-[#1C1917]">
                    {step.title}
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
