"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Quote, StarIcon, CheckCircle2 } from "lucide-react";
import type { IGoogleReviewPublic } from "../../../_services/google-review.service";

const DEFAULT_TESTIMONIALS: IGoogleReviewPublic[] = [
  {
    id: "rev-1",
    name: "Suman Shrestha",
    starRating: 5,
    reviewText:
      "The Kodo Millet biscuits from Dami are hands down the best healthy snack I've found in Nepal. Fresh, crunchy, and perfect with afternoon tea!",
    sortOrder: 1,
  },
  {
    id: "rev-2",
    name: "Pooja Gurung",
    starRating: 5,
    reviewText:
      "MacCoffee Gold freeze-dried coffee delivered right to my home in Pokhara! Outstanding quality, rich aroma, and super fast delivery.",
    sortOrder: 2,
  },
  {
    id: "rev-3",
    name: "Aashish Karki",
    starRating: 5,
    reviewText:
      "Didian energy biscuits are my go-to for high altitude trekking in Nepal. Great taste, durability, and high calorie energy packs!",
    sortOrder: 3,
  },
  {
    id: "rev-4",
    name: "Dr. Anisha Thapa",
    starRating: 5,
    reviewText:
      "As a nutritionist, I love that Arksh Food focuses on local Nepalese grains like millet and organic corn without artificial preservatives.",
    sortOrder: 4,
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="flex gap-1"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon
          key={i}
          size={15}
          aria-hidden
          className={
            i < rating ? "fill-amber-400 text-amber-400" : "text-stone-200"
          }
        />
      ))}
    </div>
  );
}

export function GoogleReviewsSection({
  reviews: initialReviews,
}: {
  reviews: IGoogleReviewPublic[];
}) {
  const reviews =
    initialReviews && initialReviews.length > 0
      ? initialReviews
      : DEFAULT_TESTIMONIALS;
  const averageRating =
    reviews.reduce((sum, review) => sum + review.starRating, 0) /
    reviews.length;

  return (
    <section
      className="w-full bg-[#F0F7FD] py-16 lg:py-24 relative overflow-hidden"
      aria-labelledby="customer-reviews-heading"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#0555A2]/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2
              id="customer-reviews-heading"
              className="text-2xl sm:text-3xl lg:text-[40px] tracking-tight flex items-baseline gap-2 sm:gap-3 flex-wrap"
            >
              <span className="font-sans font-bold uppercase text-[#0555A2] tracking-wider">
                LOVED
              </span>
              <span className="font-serif font-semibold italic text-[#1C1917]">
                by Our Customers
              </span>
            </h2>
          </div>

          {/* Average Rating Score Card */}
          <div className="flex items-center gap-3.5 bg-white border border-[#E8E2D9] rounded-2xl px-5 py-3 shadow-2xs shrink-0">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-serif font-black text-[#0555A2] leading-none">
                {averageRating.toFixed(1)}
              </span>
              <span className="text-xs font-serif font-bold text-stone-400">/ 5</span>
            </div>

            <div className="h-8 w-px bg-[#E8E2D9]" />

            <div className="space-y-1">
              <StarRating rating={Math.round(averageRating)} />
              <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-stone-500 block leading-none">
                Google Reviews
              </span>
            </div>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <Carousel
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-4">
            {reviews.map((review) => (
              <CarouselItem
                key={review.id}
                className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <article className="h-full bg-white border border-[#E8E2D9] rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-6 relative group">
                  <Quote
                    className="absolute top-6 right-6 text-stone-200 group-hover:text-sky-200 transition-colors"
                    size={36}
                  />

                  <div className="space-y-4">
                    <StarRating rating={review.starRating} />
                    <blockquote className="text-sm text-stone-700 leading-relaxed font-sans italic">
                      &ldquo;{review.reviewText}&rdquo;
                    </blockquote>
                  </div>

                  <div className="pt-4 border-t border-[#E8E2D9]/70">
                    <h4 className="text-sm font-serif font-bold text-[#1C1917]">
                      {review.name}
                    </h4>
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="flex items-center justify-end gap-2 pt-6">
            <CarouselPrevious className="static translate-y-0 bg-white border-[#E8E2D9] text-stone-700 hover:bg-[#0555A2] hover:text-white hover:border-[#0555A2] transition-colors" />
            <CarouselNext className="static translate-y-0 bg-white border-[#E8E2D9] text-stone-700 hover:bg-[#0555A2] hover:text-white hover:border-[#0555A2] transition-colors" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
