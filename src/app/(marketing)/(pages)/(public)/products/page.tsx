import React, { Suspense } from "react";
import { ProductCard } from "../../../_components/product/product-card";
import marketingService from "../../../_services/index.service";

import { ProductOrderBy } from "../../../_components/product/product-sort-by";
import { FilterPanel } from "../../../_components/product/product-filter";

import PaginationButton from "@/components/global/generic-table/pagination";

import { Metadata } from "next";
import { siteConfig } from "@/app/(marketing)/_config/seo.config";
import AppliedFilterDisplayContainer from "@/app/(marketing)/_components/product/applied-filter-display-container";
import { ProductFilterSheet } from "@/app/(marketing)/_components/product/product-filter-sheet";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "Arksh Food | Products – Biscuits, Cookies, Coffee & Chocolates",
  description:
    "Explore Arksh Food's wide range of high-quality biscuits, cookies, puffs, and snacks. Find your favorite treats today!",
  keywords: [
    "Arksh Food",
    "biscuits",
    "cookies",
    "puffs",
    "snacks",
    "high quality food",
    "healthy snacks",
    "best biscuits Nepal",
  ],
  alternates: {
    canonical: `${siteConfig.url}/products`,
  },
};
const ProductsRootPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const params = await searchParams;
  const [products, categories, brands] = await Promise.all([
    marketingService.product.getAllProducts({
      limit: "9",
      ...params,
    }),
    marketingService.category.getAllCategory(),
    marketingService.brand.getAllBrands(),
  ]);

  const productCount = products.data?.data.length || 0;

  return (
    <div className="w-full bg-[#F0F7FD] min-h-screen pb-16 font-sans">
      {/* Editorial Catalog Hero Header */}
      <div className="w-full bg-[#F0F7FD] py-10 lg:py-14 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-3 text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-[#28AAE0]">
            ARTISANAL NEPALI FOODS
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1C1917] tracking-tight">
            Our Food Collection
          </h1>
          <p className="text-stone-600 text-sm sm:text-base max-w-xl font-sans">
            Thoughtfully crafted Himalayan millet biscuits, authentic corn puffs, local roast coffee, and gourmet chocolates.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block w-72 shrink-0">
            <FilterPanel brands={brands.data} categories={categories.data} />
          </div>

          {/* Main Products Area */}
          <div className="flex-1 w-full space-y-6">
            
            {/* Applied Filter Chips */}
            <AppliedFilterDisplayContainer />

            {/* Mobile Filter Button */}
            <div className="lg:hidden flex items-center justify-between gap-4 bg-white p-3 rounded-2xl border border-[#E8E2D9] shadow-xs">
              <ProductFilterSheet>
                <FilterPanel brands={brands.data} categories={categories.data} />
              </ProductFilterSheet>
            </div>

            {/* Product Grid */}
            <Suspense fallback={
              <div className="text-center py-20 bg-white rounded-2xl border border-[#E8E2D9] text-stone-500 font-serif text-lg">
                Loading artisanal products...
              </div>
            }>
              <div className="bg-transparent">
                {products.data?.data && products.data.data.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
                    {products.data.data.map((product) => (
                      <ProductCard
                        key={product.id}
                        className="w-full"
                        product={product}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="p-16 text-center bg-white rounded-2xl border border-[#E8E2D9] space-y-3">
                    <p className="text-stone-800 font-serif text-xl">No products match your criteria</p>
                    <p className="text-stone-500 text-xs font-sans max-w-sm mx-auto">
                      Try clearing selected filters or searching for different categories.
                    </p>
                  </div>
                )}
              </div>
            </Suspense>

            {/* Pagination Controls */}
            <div className="pt-6 flex justify-center">
              <PaginationButton
                currentPage={products.data?.pagination?.currentPage || 1}
                totalPage={products.data?.pagination?.totalPages || 1}
              />
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductsRootPage;
