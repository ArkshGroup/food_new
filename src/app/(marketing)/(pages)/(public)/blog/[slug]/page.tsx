import IncrementView from "@/app/(marketing)/_components/blog/increment-view";
import ShareButtons from "@/app/(marketing)/_components/blog/share-button";
import marketingService from "@/app/(marketing)/_services/index.service";
import { JsonToHtml } from "@/components/global/rich-text-editor/json-to-html";
import { Calendar, EyeIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/app/(marketing)/_config/seo.config";
import { notFound } from "next/navigation";
import { tiptapJsonToHtml } from "@/lib/tiptap-json-to-html";

type BlogSlugParams = { slug: string };

async function getBlogForMetadata(slug: string) {
  const result = await marketingService.blog.getBlogBySlug({ slug });
  const inner = result?.data;
  const blog = inner && typeof inner === "object" && "data" in inner ? inner.data : null;
  return blog;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<BlogSlugParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogForMetadata(slug);
  if (!blog) {
    return {
      title: "Blog Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }
  const title = blog.metaTitle?.trim() || blog.title;
  const description =
    blog.metaDescription?.trim() ||
    blog.summary?.slice(0, 160)?.trim() ||
    "Read more on Arksh Food blog.";
  const url = `${siteConfig.url}/blog/${blog.slug}`;
  const imageUrl = blog.imageUrl
    ? blog.imageUrl.startsWith("http")
      ? blog.imageUrl
      : `${siteConfig.url}${blog.imageUrl.startsWith("/") ? "" : "/"}${blog.imageUrl}`
    : undefined;

  return {
    title,
    description,
    keywords: blog.metaKeywords?.trim() || undefined,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: blog.publishedAt?.toString(),
      images: imageUrl ? [{ url: imageUrl, alt: blog.title }] : undefined,
      siteName: "Arksh Food",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export const generateStaticParams = async () => {
  const result = await marketingService.blog.getAllBlogSlugs();
  const data = result?.data ?? [];
  if (!Array.isArray(data)) {
    console.error("Expected an array of slugs, but received non-array data.");
    return [];
  }
  const params = data.map((slug: string) => ({
    slug: slug,
  }));
  return params;
};

const BlogDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slugParams = await params;
  const { data: blogs } = await marketingService.blog.getBlogBySlug({
    slug: slugParams.slug,
  });

  const { data: similarBlogs } = await marketingService.blog.getSimilarBlogs({
    slug: slugParams.slug,
  });

  if (!blogs?.data) {
    notFound();
  }

  const contentHtml = blogs.data.content
    ? tiptapJsonToHtml(blogs.data.content)
    : "";

  return (
    <div className="w-full bg-[#F0F7FD] min-h-screen py-8 lg:py-14 font-sans">
      <IncrementView slug={blogs.data.slug} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs font-sans text-stone-500">
          <a href="/" className="hover:text-[#0555A2] transition-colors">Home</a>
          <span>/</span>
          <a href="/blog" className="hover:text-[#0555A2] transition-colors">Blogs & Nutrition Tips</a>
          <span>/</span>
          <span className="text-stone-800 font-medium truncate max-w-[200px] sm:max-w-xs">{blogs.data.title}</span>
        </nav>

        {/* Top Header & Sidebar Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Article Header Details (8 columns) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Header Title & Meta */}
            <div className="space-y-5">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#0555A2] bg-white px-3.5 py-1 rounded-full border border-[#E2EEF8] shadow-2xs">
                ARKSH NUTRITION JOURNAL
              </span>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1C1917] leading-tight tracking-tight">
                {blogs.data.title}
              </h1>

              {/* Author & Meta Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-[#E2EEF8] text-xs text-stone-600 font-sans">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2 font-medium text-stone-800">
                    <div className="w-8 h-8 rounded-full bg-[#0555A2] text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                      {(blogs.data.author || "A")[0].toUpperCase()}
                    </div>
                    <span>{blogs.data.author || "Arksh Food Editorial Team"}</span>
                  </div>
                  <span className="text-stone-300">•</span>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-[#0555A2]" />
                    <span>{new Date(blogs.data.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                  </div>
                  <span className="text-stone-300">•</span>
                  <div className="flex items-center gap-1.5">
                    <EyeIcon size={14} className="text-[#28AAE0]" />
                    <span>{blogs.data.views || 0} views</span>
                  </div>
                </div>

                <ShareButtons />
              </div>
            </div>

            {/* Featured Image */}
            {blogs.data.imageUrl && (
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border-2 border-white shadow-sm bg-stone-100">
                <Image
                  src={blogs.data.imageUrl}
                  alt={blogs.data.title}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            )}

            {/* Article Summary Callout */}
            {blogs.data.summary && (
              <div className="p-6 rounded-2xl bg-white border border-[#E2EEF8] shadow-2xs space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#0555A2]">
                  ARTICLE HIGHLIGHT & SUMMARY
                </span>
                <p className="text-stone-800 font-serif italic text-base sm:text-lg leading-relaxed">
                  "{blogs.data.summary}"
                </p>
              </div>
            )}

          </div>

          {/* Right Sidebar (4 columns) */}
          <aside className="lg:col-span-4 space-y-6">
            
            {/* Related Articles Card */}
            {(similarBlogs?.data?.length ?? 0) > 0 && (
              <div className="p-6 bg-white rounded-2xl border border-[#E2EEF8] shadow-2xs space-y-4 font-sans">
                <div className="space-y-1 pb-3 border-b border-[#E2EEF8]">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#28AAE0]">MORE STORIES</span>
                  <h2 className="text-xl font-serif text-[#1C1917]">Related Articles</h2>
                </div>

                <div className="space-y-4">
                  {similarBlogs?.data?.map((similar) => (
                    <a
                      key={similar.id}
                      href={`/blog/${similar.slug}`}
                      className="group flex gap-4 items-center p-2 rounded-xl hover:bg-[#F0F7FD] transition-colors"
                    >
                      {similar.imageUrl && (
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-[#E2EEF8] bg-stone-100">
                          <Image
                            src={similar.imageUrl}
                            alt={similar.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="space-y-1 min-w-0 flex-1">
                        <h3 className="text-xs sm:text-sm font-serif font-bold text-[#1C1917] line-clamp-2 group-hover:text-[#0555A2] transition-colors">
                          {similar.title}
                        </h3>
                        <p className="text-[11px] text-stone-400 font-sans">
                          {new Date(similar.publishedAt || similar.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Shop Product Callout Card */}
            <div className="p-6 rounded-2xl bg-[#0555A2] text-white shadow-sm space-y-4 font-sans">
              <span className="text-[10px] font-bold uppercase tracking-widest text-sky-200 bg-white/10 px-3 py-1 rounded-full inline-block">
                HEALTHY SNACKING
              </span>
              <h3 className="text-xl font-serif text-white">Taste Authentic Nepali Biscuits & Snacks</h3>
              <p className="text-xs text-sky-100 leading-relaxed">
                Made with premium millet, wheat, and natural ingredients. Direct delivery across Nepal.
              </p>
              <a
                href="/products"
                className="inline-block w-full text-center py-3 bg-white text-[#0555A2] hover:bg-sky-50 text-xs font-bold uppercase tracking-widest rounded-full transition-colors shadow-2xs"
              >
                Browse Product Catalog →
              </a>
            </div>

          </aside>

        </div>

        {/* FULL CONTAINER WIDTH ARTICLE BODY TEXT CANVAS */}
        <div className="w-full bg-white rounded-2xl border border-[#E2EEF8] p-6 sm:p-10 lg:p-12 shadow-sm">
          <article className="prose prose-stone max-w-none w-full">
            {contentHtml ? (
              <div
                dangerouslySetInnerHTML={{ __html: contentHtml }}
                className="blog-content font-sans text-stone-700 text-sm sm:text-base leading-relaxed w-full max-w-none"
              />
            ) : (
              <JsonToHtml json={blogs.data.content} />
            )}
          </article>
        </div>

        {/* Article Bottom Actions */}
        <div className="p-6 bg-white rounded-2xl border border-[#E2EEF8] shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4 font-sans">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-sky-50 text-[#0555A2] flex items-center justify-center font-bold text-xs">
              AF
            </div>
            <div>
              <p className="text-xs font-bold text-[#1C1917]">Arksh Food Quality Assurance</p>
              <p className="text-[11px] text-stone-500">Crafting traditional Nepali snacks with modern food safety.</p>
            </div>
          </div>

          <a
            href="/blog"
            className="inline-flex items-center px-6 py-2.5 bg-[#0555A2] hover:bg-[#28AAE0] text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-2xs"
          >
            ← Back to Blogs
          </a>
        </div>

      </main>
    </div>
  );
};

export default BlogDetailPage;
