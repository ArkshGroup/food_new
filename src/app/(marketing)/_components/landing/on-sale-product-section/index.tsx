import React from "react";
import { TagIcon } from "lucide-react";
import ProductHorizontalSlider from "../../product/product-horizonal-slider";
import { ProductSectionHeader } from "../../product/product-section-header";
import { IProductGetAll } from "@/app/(marketing)/_types/products";

const FeaturedProductsSection = async ({
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
          title="On Sale"
          subtitle="Get them before they're gone!"
          icon={TagIcon}
          href="/products?onSale=true"
        />
        <ProductHorizontalSlider title="On Sale" products={products} />
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
