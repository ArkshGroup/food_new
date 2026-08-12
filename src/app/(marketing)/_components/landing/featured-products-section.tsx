"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "../product/product-card";
import { IProductGetAll } from "../../_types/products";

export function FeaturedProductsSection({
  products = [],
}: {
  products?: IProductGetAll[];
}) {
  const displayProducts = useMemo(
    () => (Array.isArray(products) ? products : []),
    [products],
  );

  const ITEMS_PER_SLIDE = 4;

  // Group products into slides of 4 products each
  const slides = useMemo(() => {
    if (displayProducts.length === 0) return [];
    const result: IProductGetAll[][] = [];
    for (let i = 0; i < displayProducts.length; i += ITEMS_PER_SLIDE) {
      result.push(displayProducts.slice(i, i + ITEMS_PER_SLIDE));
    }
    return result;
  }, [displayProducts]);

  const totalSlides = slides.length;
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (totalSlides <= 1) return;
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    if (totalSlides <= 1) return;
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <section className="w-full bg-white py-12 lg:py-20 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        {/* Section Header Top Row: Title on Left, Prev/Next Buttons on Right */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] tracking-tight flex items-baseline gap-2 sm:gap-3 flex-wrap">
              <span className="font-sans font-bold uppercase text-[#0555A2] tracking-wider">
                EXPLORE
              </span>
              <span className="font-serif font-semibold italic text-[#1C1917]">
                Our Products
              </span>
            </h2>
          </div>

          {/* Neumorphic Top Row Prev & Next Icon Buttons */}
          {totalSlides > 1 && (
            <div className="flex items-center gap-2.5">
              <button
                onClick={prevSlide}
                aria-label="Previous Products"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#F0F7FD] border border-white/80 text-[#0555A2] flex items-center justify-center transition-all duration-300 shadow-[3px_3px_8px_rgba(5,85,162,0.14),-3px_-3px_8px_rgba(255,255,255,0.95)] hover:shadow-[1px_1px_4px_rgba(5,85,162,0.18),-1px_-1px_4px_rgba(255,255,255,1)] hover:text-[#28AAE0] active:shadow-[inset_2px_2px_5px_rgba(5,85,162,0.18),inset_-2px_-2px_5px_rgba(255,255,255,0.9)] cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={nextSlide}
                aria-label="Next Products"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#F0F7FD] border border-white/80 text-[#0555A2] flex items-center justify-center transition-all duration-300 shadow-[3px_3px_8px_rgba(5,85,162,0.14),-3px_-3px_8px_rgba(255,255,255,0.95)] hover:shadow-[1px_1px_4px_rgba(5,85,162,0.18),-1px_-1px_4px_rgba(255,255,255,1)] hover:text-[#28AAE0] active:shadow-[inset_2px_2px_5px_rgba(5,85,162,0.18),inset_-2px_-2px_5px_rgba(255,255,255,0.9)] cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* 4 Products per Slide Track */}
        {slides.length > 0 ? (
          <>
            <div className="w-full overflow-hidden py-1">
              <div
                className="flex flex-nowrap w-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu will-change-transform"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {slides.map((slideItems, slideIdx) => (
                  <div
                    key={slideIdx}
                    className="w-full min-w-full shrink-0 flex-none grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 lg:gap-8 items-start px-0.5"
                  >
                    {slideItems.map((prod) => (
                      <div key={prod.id} className="w-full">
                        <ProductCard product={prod} />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Simple View All Products Link Below Grid */}
            <div className="pt-2 text-center">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0555A2] hover:text-[#28AAE0] transition-colors group"
              >
                <span>View All Products</span>
                <ArrowRight className="w-4 h-4 text-[#28AAE0] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </>
        ) : (
          <div className="p-12 text-center bg-white rounded-2xl border border-[#E8E2D9]">
            <p className="text-stone-500 font-serif text-lg">
              Exploring our best-selling snacks...
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
