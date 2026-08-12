import React from "react";
import { ProductCard } from "./product-card";
import { IProductGetAll } from "../../_types/products";

const ProductGridContainer = ({ products }: { products: IProductGetAll[] }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-2 bg-slate-300/5 w-full flex-1 overflow-hidden ">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGridContainer;
