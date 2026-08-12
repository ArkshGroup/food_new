"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Eye } from "lucide-react";

interface RealBlogItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  imageUrl: string;
  createdAt: Date | string;
  author?: string | null;
  views?: number;
}

const DEFAULT_BLOGS: RealBlogItem[] = [
  {
    id: "1",
    title: "The Golden Grain of the Himalayas: Why Kodo Millet is Nepal's Superfood",
    slug: "kodo-millet-nepal-superfood",
    summary: "Discover the incredible health benefits and rich agricultural heritage of Kodo millet grown in Nepal's hill districts.",
    imageUrl: "/images/nepal_brand_story.png",
    createdAt: "2026-08-04",
    author: "Arksh Editorial",
    views: 420,
  },
  {
    id: "2",
    title: "From Mountain Terraces to Modern Snacking: The Story Behind Dami Puffs",
    slug: "mountain-terraces-dami-puffs",
    summary: "How direct farmer partnerships bring sustainable corn & millet crunch directly to family tea tables across Nepal.",
    imageUrl: "/images/dami_featured.png",
    createdAt: "2026-07-28",
    author: "Arksh Editorial",
    views: 380,
  },
  {
    id: "3",
    title: "Elevating Your Daily Tea Time: Pairing Himalayan Teas with Artisanal Biscuits",
    slug: "elevating-daily-tea-time",
    summary: "Guide to matching traditional Nepalese tea blends with wholesome millet digestive and honey cookies.",
    imageUrl: "/images/lifestyle_morning.png",
    createdAt: "2026-07-15",
    author: "Arksh Editorial",
    views: 510,
  },
];

export function JournalBlogSection({ blogs: realBlogs }: { blogs?: RealBlogItem[] }) {
  const blogsToDisplay = (realBlogs && realBlogs.length > 0)
    ? realBlogs.slice(0, 3)
    : DEFAULT_BLOGS;

  return (
    <section className="w-full bg-[#F0F7FD] py-16 lg:py-24 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#28AAE0]/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] tracking-tight flex items-baseline gap-2 sm:gap-3 flex-wrap">
              <span className="font-sans font-bold uppercase text-[#0555A2] tracking-wider">
                FEATURED
              </span>
              <span className="font-serif font-semibold italic text-[#1C1917]">
                Articles
              </span>
            </h2>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0555A2] hover:text-[#28AAE0] transition-colors group"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-4 h-4 text-[#28AAE0] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3 Real Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogsToDisplay.map((article) => {
            const displayDate = typeof article.createdAt === "string"
              ? article.createdAt
              : new Date(article.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                });

            return (
              <Link
                key={article.id}
                href={`/blog/${article.slug}`}
                className="group bg-white rounded-3xl overflow-hidden border border-[#E8E2D9] shadow-xs hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#FAF8F5]">
                  <Image
                    src={article.imageUrl || "/images/nepal_brand_story.png"}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-stone-500 text-xs font-sans">
                      <span className="flex items-center gap-1.5 text-stone-500">
                        <Calendar size={13} className="text-[#28AAE0]" />
                        {displayDate}
                      </span>
                      <span className="flex items-center gap-1.5 text-[#0555A2] font-semibold bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-100">
                        <Eye size={12} className="text-[#28AAE0]" />
                        {article.views ?? 0} views
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-serif text-[#1C1917] group-hover:text-[#0555A2] transition-colors leading-snug font-bold">
                      {article.title}
                    </h3>

                    {article.summary && (
                      <p className="text-xs text-stone-600 leading-relaxed font-sans line-clamp-2">
                        {article.summary}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 border-t border-[#E8E2D9] flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#0555A2] group-hover:text-[#28AAE0] transition-colors">
                    <span>Read Full Article</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
