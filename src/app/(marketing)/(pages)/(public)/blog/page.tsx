import marketingService from "@/app/(marketing)/_services/index.service";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import PaginationButton from "@/components/global/generic-table/pagination";
import { IndexPageProps } from "@/types";
import type { Metadata } from "next";
import { siteConfig } from "@/app/(marketing)/_config/seo.config";
import { Calendar, Eye, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

const BLOG_DESCRIPTION =
  "Read about healthy snacks for kids, biscuits, corn puffs, and food tips from Arksh Food. Stories and guides for families in Nepal.";

type SearchParams = Promise<{ page?: string }>;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const params = await searchParams;
  const page = Math.max(1, Number(params?.page) || 1);
  const isFirstPage = page <= 1;
  const title = isFirstPage
    ? `Blog | Healthy Snacks, Biscuits & Food Tips – ${siteConfig.name}`
    : `Blog – Page ${page} | ${siteConfig.name}`;
  const canonicalUrl =
    page <= 1
      ? `${siteConfig.url}/blog`
      : `${siteConfig.url}/blog?page=${page}`;

  return {
    title,
    description: BLOG_DESCRIPTION,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: isFirstPage
        ? `Blog | Healthy Snacks & Food Tips – ${siteConfig.name}`
        : `Blog – Page ${page} | ${siteConfig.name}`,
      description: BLOG_DESCRIPTION,
      url: canonicalUrl,
      siteName: siteConfig.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: BLOG_DESCRIPTION,
    },
  };
}

const BlogPage = async (props: IndexPageProps) => {
  const params = await props.searchParams;
  const { data: blogs } = await marketingService.blog.getAllBlogs({
    page: Number(params.page) || 1,
  });

  if (!blogs || !blogs.data) {
    return (
      <div className="w-full bg-[#F0F7FD] min-h-screen py-20 text-center text-stone-500 font-serif text-lg">
        No journal articles available at the moment.
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F0F7FD] min-h-screen pb-16 font-sans">
      {/* Blog Hero Header */}
      <div className="w-full bg-[#F0F7FD] py-12 lg:py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-3 text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-[#28AAE0]">
            JOURNAL & NUTRITION GUIDES
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1C1917] tracking-tight">
            Blogs & Nutrition Tips
          </h1>
          <p className="text-stone-600 text-sm sm:text-base max-w-xl font-sans leading-relaxed">
            Discover articles on healthy Nepali snacks, ingredient origins,
            nutrition tips, family recipe ideas, and behind-the-scenes stories
            from Arksh Food.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.data.map((article) => {
            const displayDate = new Date(article.createdAt).toLocaleDateString(
              "en-US",
              { month: "short", day: "numeric", year: "numeric" }
            );

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

        <div className="flex justify-center pt-4">
          <PaginationButton
            totalPage={blogs.meta?.totalPage}
            currentPage={blogs.meta?.currentPage || 1}
            limit={9}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
