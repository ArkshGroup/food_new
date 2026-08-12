import React from "react";
import Image from "next/image";
import Link from "next/link";
import ProductHorizontalSlider from "../../product/product-horizonal-slider";
import { ProductSectionViewAllLink } from "../../product/product-section-header";
import { IBrandWithProducts } from "@/app/(marketing)/_types/products";

const BrandWiseSection = async ({
  brandsWithProducts,
}: {
  brandsWithProducts: IBrandWithProducts[];
}) => {
  return (
    <>
      <section className="w-full py-2 h-fit">
        <div className="space-y-2">
          {brandsWithProducts?.map((brand) => (
            <div key={brand.name} className="my-8">
              <div className="relative h-32 w-full overflow-hidden bg-slate-50 md:h-96">
                <Link href={`/products?brandNames=${brand.name}`}>
                  <Image
                    src={brand.brandBannerImage!}
                    alt={`${brand.name} banner`}
                    fill
                    sizes="(max-width: 768px) 100vw, 1200px"
                    quality={60}
                    loading="lazy"
                    fetchPriority="low"
                    decoding="async"
                    className="object-contain"
                  />
                </Link>
              </div>
              <div className="flex justify-end px-2 py-3 md:py-4">
                <ProductSectionViewAllLink
                  href={`/products?brandNames=${brand.name}`}
                />
              </div>
              {brand.subBrands.length > 0 && (
                <div className="space-y-6">
                  {brand.subBrands.map((subBrand) => (
                    <ProductHorizontalSlider
                      key={subBrand.id}
                      title=""
                      products={subBrand.products}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default BrandWiseSection;
