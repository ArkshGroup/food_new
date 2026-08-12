"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductCard } from "./product-card";
import { IProductGetAll } from "../../_types/products";

interface ProductGridContainerProps {
  products: IProductGetAll[];
  title: string;
}

const arrowClassName =
  "static size-8 translate-x-0 translate-y-0 rounded-full border-slate-200 bg-white text-[#0756A3] shadow-sm hover:bg-slate-50 disabled:opacity-40";

const ProductHorizontalSlider = ({
  products,
  title,
}: ProductGridContainerProps) => {
  return (
    <Carousel
      className="w-full px-2 py-1"
      opts={{
        align: "start",
        loop: products.length > 2,
        slidesToScroll: 1,
      }}
      aria-label={title || "Product slider"}
    >
      <CarouselContent className="-ml-0 gap-3 md:gap-4">
        {products.map((product) => (
          <CarouselItem
            key={product.slug}
            className="pl-0 basis-[calc((100%-0.75rem)/2)] md:basis-[calc((100%-2rem)/3)] lg:basis-[calc((100%-3rem)/4)]"
          >
            <ProductCard product={product} className="h-full" />
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="mt-3 flex items-center justify-end gap-2 px-1">
        <CarouselPrevious className={arrowClassName} />
        <CarouselNext className={arrowClassName} />
      </div>
    </Carousel>
  );
};

export default ProductHorizontalSlider;
