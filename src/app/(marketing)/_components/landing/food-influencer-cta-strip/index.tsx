import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function FoodInfluencerCtaStrip() {
  return (
    <section className="w-full px-2 py-8 md:py-10" aria-label="Food influencer program">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/food-influencer-program"
          className="group flex flex-col gap-4 overflow-hidden rounded-lg bg-gradient-to-r from-[#0756A3] to-[#209AEA] px-5 py-5 md:flex-row md:items-center md:justify-between md:px-8 md:py-6 transition-opacity hover:opacity-95"
        >
          <div className="flex items-start gap-4 md:items-center">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-white/15 text-white">
              <Sparkles className="h-5 w-5" strokeWidth={1.5} />
            </div>

            <div className="min-w-0">
              <p className="font-semibold text-sm md:text-base uppercase tracking-wide text-white">
                Food Influencer Program
              </p>
              <p className="mt-1 text-xs md:text-sm leading-relaxed text-white/85">
                Create content, share Arksh Food, and join our growing creator
                community.
              </p>
            </div>
          </div>

          <span className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-md bg-white px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-[#0756A3] transition-transform group-hover:translate-x-0.5 md:self-auto">
            Apply now
            <ArrowRight className="h-4 w-4" aria-hidden />
          </span>
        </Link>
      </div>
    </section>
  );
}
