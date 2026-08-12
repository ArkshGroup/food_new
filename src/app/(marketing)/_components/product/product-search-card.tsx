import { Card } from "@/components/ui/card";
import React from "react";
import { IProductGetAll } from "../../_types/products";

const ProductSearchCard = ({ product }: { product: IProductGetAll }) => {
  return (
    <div className="flex  gap-4 p-2">
      <div className="w-16 h-16 relative flex-shrink-0">
        {product.images ? (
          <img
            src={product.images.url}
            alt={product.images.alt || product.name}
            className="w-full h-full object-cover rounded"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted rounded">
            <div className="text-muted-foreground text-sm">No Image</div>
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center">
        <h3 className="font-semibold text-sm">{product.name}</h3>
        <p className="text-sm text-muted-foreground">
          {product.unitSellingPrice} NPR
        </p>
      </div>
    </div>
  );
};

export default ProductSearchCard;
