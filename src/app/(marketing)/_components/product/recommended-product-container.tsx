import React from "react";
import { AuroraText } from "@/components/animated/aurora-text";
import { ProductCard } from "./product-card";
import ProductGridContainer from "./product-grid-container";
import { GemIcon } from "lucide-react";
import { IProductGetAll } from "../../_types/products";

interface IRecommendedProductContainerProps extends IProductGetAll {}

const RecommendedProductContainer = ({
  products,
}: {
  products: IRecommendedProductContainerProps[];
}) => {
  if (!products || products.length === 0) return null;

  return (
    <div className="py-12 border-t border-[#E8E2D9] space-y-6">
      <div className="text-center space-y-1">
        <span className="text-xs font-bold uppercase tracking-widest text-[#28AAE0]">
          CURATED SELECTION
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif text-[#1C1917]">
          Recommended Products
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.slice(0, 4).map((product) => (
          <ProductCard
            key={product.id}
            className="w-full"
            product={product}
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendedProductContainer;
