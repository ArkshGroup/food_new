import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

export function FoodInfluencerCtaStrip() {
  return (
    <section className="w-full px-4 py-6 md:py-8" aria-label="Food influencer program">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/food-influencer-program"
          className="relative group flex flex-col gap-4 overflow-hidden rounded-2xl p-6 md:flex-row md:items-center md:justify-between md:px-8 md:py-6 shadow-md hover:shadow-xl transition-all duration-300"
        >
          {/* Background Image */}
          <Image
            src="/CTA1.png"
            alt="Arksh Food Creator Program"
            fill
            quality={90}
            className="object-cover object-center w-full h-full scale-105 group-hover:scale-110 transition-transform duration-700"
          />

          {/* Professional Brand Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0555A2] via-[#0555A2]/90 to-[#28AAE0]/70" />

          {/* Left Icon & Text Content */}
          <div className="relative z-10 flex items-start gap-4 md:items-center">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-xs">
              <Sparkles className="h-6 w-6 text-sky-200" strokeWidth={1.75} />
            </div>

            <div className="min-w-0 space-y-1">
              <p className="font-serif font-bold text-base md:text-lg uppercase tracking-wide text-white">
                Food Influencer Program
              </p>
              <p className="text-xs md:text-sm leading-relaxed text-sky-100">
                Create content, share Arksh Food snacks, and join our growing creator community.
              </p>
            </div>
          </div>

          {/* Action Button */}
          <span className="relative z-10 inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full bg-white px-6 py-3 text-xs md:text-sm font-serif font-bold uppercase tracking-wider text-[#0555A2] group-hover:bg-[#F0F7FD] transition-all shadow-md group-hover:shadow-lg md:self-auto">
            Apply Now
            <ArrowRight className="h-4 w-4 text-[#0555A2] group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>
      </div>
    </section>
  );
}
