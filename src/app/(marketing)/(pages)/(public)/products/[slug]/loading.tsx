import { ProductDetailsSkeleton } from "@/app/(marketing)/_components/product/product-details-loading-skeleton";
import React from "react";

const Loading = () => {
  return (
    <div className=" container mx-auto">
      <ProductDetailsSkeleton />
    </div>
  );
};

export default Loading;
