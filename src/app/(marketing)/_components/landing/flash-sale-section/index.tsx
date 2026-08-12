import React from "react";
import { FlameIcon } from "lucide-react";
import ProductHorizontalSlider from "../../product/product-horizonal-slider";
import { ProductSectionViewAllLink } from "../../product/product-section-header";
import CountdownToMidnight from "./flash-sale-count-down";
import { IProductGetAll } from "@/app/(marketing)/_types/products";

const FlashSaleProductsSection = async ({
  products,
}: {
  products: IProductGetAll[];
}) => {
  if (products.length === 0) {
    return null;
  }
  return (
    <section className="w-full py-2 h-fit">
      <div className="space-y-1">
        <div className="flex flex-wrap items-center justify-between gap-y-2 px-2 py-3 md:py-4">
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#209AEA]/10 text-[#0756A3] md:h-9 md:w-9">
              <FlameIcon className="h-4 w-4 md:h-5 md:w-5" strokeWidth={1.75} />
            </div>
            <h2 className="font-serif text-base font-semibold text-slate-900 md:text-xl">
              Flash Sale
            </h2>
            <CountdownToMidnight />
          </div>
          <ProductSectionViewAllLink href="/products?isFlashSale=true" />
        </div>
        <ProductHorizontalSlider title="Flash Sale" products={products} />
      </div>
    </section>
  );
};

export default FlashSaleProductsSection;
