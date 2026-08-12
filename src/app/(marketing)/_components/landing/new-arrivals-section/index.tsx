import React from "react";
import { StarIcon } from "lucide-react";
import ProductHorizontalSlider from "../../product/product-horizonal-slider";
import { ProductSectionHeader } from "../../product/product-section-header";
import { IProductGetAll } from "@/app/(marketing)/_types/products";

const NewArrivalProductsSection = async ({
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
        <ProductSectionHeader
          title="New Arrivals"
          subtitle="New products just arrived!"
          icon={StarIcon}
          href="/products?newArrivals=true"
        />
        <ProductHorizontalSlider title="New Arrivals" products={products} />
      </div>
    </section>
  );
};

export default NewArrivalProductsSection;
