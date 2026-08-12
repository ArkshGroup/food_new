"use client";

import { useState } from "react";
import Image from "next/image";
import { Minus, Plus, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import RenderCurrency from "@/helper/render-currency";

interface CartItemProps {
  item: ICartGetAll;
  onUpdateQuantity: (
    cartItemId: string,
    quantity: number
  ) => Promise<boolean | undefined>;
  onRemoveItem: (cartItemId: string) => void;
  isLoading?: boolean;
}

export function CartItem({
  item,
  onUpdateQuantity,
  onRemoveItem,
  isLoading,
}: CartItemProps) {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1 || isLoading) return;

    const prev = quantity;
    setQuantity(newQuantity);

    const success = await onUpdateQuantity(item.cartItemId, newQuantity);
    if (!success) {
      setQuantity(prev); // rollback if failed
    }
  };

  const handleRemove = async () => {
    if (isLoading) return;
    onRemoveItem(item.cartItemId);
  };

  const discountPercentage = Math.round(
    ((item.product.unitSellingPrice - item.product.specialPrice) /
      item.product.unitSellingPrice) *
      100
  );
  return (
    <Card
      className={cn(
        "transition-all duration-300 rounded-2xl bg-white border border-[#E2EEF8] shadow-2xs hover:shadow-xs p-0 overflow-hidden font-sans",
        isLoading && "opacity-50"
      )}
    >
      <CardContent className="p-4 sm:p-5">
        <div className="flex gap-4 sm:gap-6 items-center">
          {/* Product Image Canvas */}
          <div className="relative h-24 w-24 sm:h-28 sm:w-28 flex-shrink-0 overflow-hidden rounded-xl bg-white border border-[#E2EEF8] p-2 flex items-center justify-center">
            <Image
              src={item.product.imageUrl}
              alt={item.product.name}
              fill
              className="object-contain p-1"
              sizes="112px"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 space-y-2 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-serif font-bold text-sm sm:text-base text-[#1C1917] line-clamp-1">
                  {item.product.name}
                </h3>
                <p className="text-xs text-stone-500 font-sans">
                  Weight: ~{item.product.approxWeight}g
                </p>
              </div>

              {/* Remove Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemove}
                disabled={isLoading}
                className="text-stone-400 hover:text-red-500 hover:bg-red-50 h-8 w-8 p-0 rounded-full shrink-0 transition-colors"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
              </Button>
            </div>

            {/* Price Row */}
            <div className="flex items-center gap-2 text-xs font-sans">
              <span className="font-bold text-[#0555A2] text-sm">
                <RenderCurrency amount={item.product.specialPrice} />
              </span>
              {item.product.unitSellingPrice > item.product.specialPrice && (
                <>
                  <span className="text-stone-400 line-through">
                    <RenderCurrency amount={item.product.unitSellingPrice} />
                  </span>
                  <span className="text-[10px] bg-red-50 text-red-600 border border-red-100 px-1.5 py-0.5 rounded-full font-bold">
                    -{discountPercentage}%
                  </span>
                </>
              )}
            </div>

            {/* Quantity Controls and Item Total */}
            <div className="flex items-center justify-between pt-1 border-t border-stone-100">
              <div className="flex items-center gap-1.5 bg-[#F0F7FD] p-1 rounded-full border border-[#E2EEF8]">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1 || isLoading}
                  className="h-7 w-7 p-0 rounded-full text-stone-700 hover:text-[#0555A2]"
                >
                  {isLoading ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <Minus className="h-3 w-3" />
                  )}
                </Button>

                <span className="w-6 text-center font-bold text-xs text-[#1C1917]">
                  {quantity}
                </span>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={isLoading}
                  className="h-7 w-7 p-0 rounded-full text-stone-700 hover:text-[#0555A2]"
                >
                  {isLoading ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <Plus className="h-3 w-3" />
                  )}
                </Button>
              </div>

              {/* Subtotal */}
              <div className="text-right">
                <span className="text-[11px] text-stone-500 font-sans">Total: </span>
                <span className="font-bold text-[#1C1917] text-sm font-sans">
                  <RenderCurrency amount={item.product.specialPrice * quantity} />
                </span>
              </div>
            </div>

          </div>
        </div>
      </CardContent>
    </Card>
  );
}
