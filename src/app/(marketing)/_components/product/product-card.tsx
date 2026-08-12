import Link from "next/link";
import Image from "next/image";
import RenderCurrency from "@/helper/render-currency";
import { IProductGetAll } from "../../_types/products";
import { cn } from "@/lib/utils";
import { encodeRemoteUrlForImage } from "@/lib/encode-remote-url";
import { ArrowRight } from "lucide-react";

export function ProductCard({
  product,
  className,
  imageClassName,
}: {
  product: IProductGetAll;
  className?: string;
  imageClassName?: string;
}) {
  return (
    <Link
      scroll={true}
      href={`/products/${product.slug}`}
      className={cn(
        "group relative flex h-[280px] xs:h-[300px] sm:h-[340px] lg:h-[360px] w-full flex-col overflow-hidden rounded-none bg-white shadow-2xs hover:shadow-lg transition-all duration-300 font-sans border border-stone-200/80 hover:border-[#0555A2]/40 select-none",
        className,
      )}
    >
      {/* 1. Pure White Image Canvas (Top 68%) */}
      <div
        className={cn(
          "relative h-[68%] w-full overflow-hidden bg-white p-1.5 sm:p-3 flex items-center justify-center group-hover:bg-[#F0F7FD]/40 transition-colors duration-300 border-b border-stone-100/80",
          imageClassName,
        )}
      >
        <ProductImage images={product.images!} alt={product.name} />
      </div>

      {/* 2. Fixed Bottom Details Bar (Bottom 32% - Title & Single Row Price) */}
      <div className="relative h-[32%] p-2 sm:p-3 text-center bg-white group-hover:bg-[#F0F7FD] transition-colors duration-300 flex flex-col justify-center gap-0.5 sm:gap-1 z-10 overflow-hidden">
        {/* Default Title */}
        <h3
          title={product.name}
          className="line-clamp-1 group-hover:line-clamp-2 text-[11px] sm:text-[13px] font-sans font-medium tracking-[0.3px] sm:tracking-[0.5px] text-stone-800 group-hover:text-[#0555A2] transition-colors duration-300 leading-snug"
        >
          {product.name}
        </h3>

        {/* Default Single Row Price */}
        <ProductPricing
          unitSellingPrice={product.unitSellingPrice}
          specialPrice={product.specialPrice}
        />

        {/* Silky 60fps Hardware-Accelerated Slide-Up Overlay */}
        <div className="absolute inset-0 bg-[#F0F7FD] p-2 sm:p-3 text-center opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transform-gpu translate-y-full group-hover:translate-y-0 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-20 flex flex-col justify-center gap-1 sm:gap-1.5 border-0 will-change-transform">
          <h3
            title={product.name}
            className="line-clamp-none text-[11px] sm:text-[13px] font-sans font-semibold tracking-[0.3px] sm:tracking-[0.5px] text-[#0555A2] leading-snug"
          >
            {product.name}
          </h3>

          <div>
            <ProductPricing
              unitSellingPrice={product.unitSellingPrice}
              specialPrice={product.specialPrice}
            />
          </div>

          <div className="flex justify-center pt-0.5">
            <span className="inline-flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-[11px] font-bold uppercase tracking-widest text-[#0555A2] hover:text-[#28AAE0] transition-colors">
              <span>VIEW DETAILS</span>
              <ArrowRight className="w-3 h-3 text-[#28AAE0] group-hover:translate-x-1.5 transition-transform duration-300" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function ProductImage({
  images,
  alt,
}: {
  images?: any;
  alt: string;
}) {
  const imgObj = Array.isArray(images) ? images[0] : images;
  const rawUrl = imgObj?.url || imgObj?.imageUrl || "";
  const src = rawUrl ? encodeRemoteUrlForImage(rawUrl) : "";
  const isGif = rawUrl ? rawUrl.toLowerCase().includes(".gif") : false;

  return (
    <div className="relative h-full w-full flex items-center justify-center">
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 20vw"
          unoptimized={isGif}
          className="object-contain p-0.5 scale-105 group-hover:scale-110 transition-transform duration-500 ease-out transform-gpu"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-xs text-stone-400 font-sans">
          No Image
        </div>
      )}
    </div>
  );
}

export function ProductPricing({
  unitSellingPrice,
  specialPrice,
}: {
  unitSellingPrice: number;
  specialPrice: number;
}) {
  const isDiscounted = specialPrice < unitSellingPrice;
  const discountAmount = unitSellingPrice - specialPrice;

  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 font-sans pt-0.5 flex-wrap">
      {/* Special Selling Price */}
      <span className="text-[11px] sm:text-[13px] font-semibold text-stone-900 tracking-[0.2px]">
        <RenderCurrency amount={specialPrice} />
      </span>

      {/* Original Price */}
      {isDiscounted && (
        <span className="text-[9.5px] sm:text-[10.5px] text-stone-400 line-through font-normal">
          <RenderCurrency amount={unitSellingPrice} />
        </span>
      )}

      {/* Save Tag in the SAME Single Row! */}
      {isDiscounted && (
        <span className="text-[9px] sm:text-[10px] font-medium text-[#0555A2] bg-white border border-[#28AAE0]/40 px-1 sm:px-1.5 py-0.5 rounded-none shadow-2xs">
          Save <RenderCurrency amount={discountAmount} />
        </span>
      )}
    </div>
  );
}
