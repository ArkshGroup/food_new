import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Package } from "lucide-react";
import Image from "next/image";
import React from "react";
import RenderCurrency from "@/helper/render-currency";

const CheckoutItems = ({
  checkoutItems,
}: {
  checkoutItems: ICartGetAll[] | undefined[];
}) => {
  if (!checkoutItems || checkoutItems.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 text-gray-500">
        <div className="text-center">
          <ShoppingCart className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p className="text-lg font-medium">Your cart is empty</p>
          <p className="text-sm mt-1">Add some items to get started</p>
        </div>
      </div>
    );
  }

  return (
    <Card className="max-w-2xl shadow-none border-none  ">
      <div className="p-6">
        <CardTitle className="text-xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
          <Package className="w-5 h-5" />
          Cart Items ({checkoutItems.length})
        </CardTitle>
        <CardContent className="p-0  space-y-1">
          {checkoutItems.map((item, index) => (
            <CartItem key={index} item={item} />
          ))}
        </CardContent>
      </div>
    </Card>
  );
};

export default CheckoutItems;

function CartItem({ item }: { item: ICartGetAll | undefined }) {
  if (!item) {
    return null;
  }

  const specialPrice = item.product.specialPrice;
  const unitSellingPrice = item.product.unitSellingPrice;
  const isProductPriceDiscounted = unitSellingPrice > specialPrice;
  const discountedPercentage = Math.round(
    ((unitSellingPrice - specialPrice) / unitSellingPrice) * 100
  );

  return (
    <div className="flex gap-4 p-2   border-b border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200 bg-white">
      {/* Product Image */}
      <div className="flex-shrink-0">
        <div className="w-20 h-20 rounded-md overflow-hidden bg-gray-100 ">
          <Image
            alt={item?.product.name || "Product"}
            src={item?.product.imageUrl}
            height={80}
            width={80}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <h3 className="font-medium text-gray-900 text-sm leading-5 mb-2 line-clamp-2">
            {item.product.name}
          </h3>
        </div>

        {/* Pricing Section */}
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold text-gray-900">
            <RenderCurrency amount={specialPrice} />
          </span>
          {isProductPriceDiscounted && (
            <>
              <span className="text-sm text-gray-500 line-through">
                <RenderCurrency amount={unitSellingPrice} />
              </span>
              <Badge className=" bg-destructive/10 text-destructive">
                {discountedPercentage}% OFF
              </Badge>
            </>
          )}
        </div>
      </div>

      {/* Quantity Badge */}
      <div className="flex-shrink-0  items-end justify-end flex flex-col">
        <span className="text-sm">Qty: {item.quantity}</span>
        <span className=" text-slate-600 text-sm">
          Total :{" "}
          <RenderCurrency amount={item.quantity * item.product.specialPrice} />
        </span>
      </div>
    </div>
  );
}
