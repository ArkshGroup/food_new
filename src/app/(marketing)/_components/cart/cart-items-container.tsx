"use client";

import {
  ShoppingCart,
  Package,
  Percent,
  ShoppingCartIcon,
  ShoppingBagIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CartItem } from "./cart-items";
import { useCart } from "../../_hooks/useCart.hook";
import Link from "next/link";
import RenderCurrency from "@/helper/render-currency";
import { useState } from "react";
import { is } from "date-fns/locale";

interface CartProps {
  initialItems: ICartGetAll[];
}

export function Cart({ initialItems }: CartProps) {
  const {
    cartItems,
    loadingItems,
    updateQuantity,
    removeItem,
    getTotalPrice,
    getTotalItems,
    getTotalWeight,
  } = useCart(initialItems);

  const [isLoading, setIsLoading] = useState(false);
  if (cartItems.length === 0) {
    return (
      <Card className="w-full max-w-xl mx-auto rounded-2xl bg-white border border-[#E2EEF8] shadow-2xs font-sans">
        <CardContent className="flex flex-col items-center justify-center py-16 px-6 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-sky-50 text-[#0555A2] border border-sky-100 flex items-center justify-center shadow-2xs">
            <Package className="h-8 w-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-serif font-bold text-[#1C1917]">Your Cart is Currently Empty</h3>
            <p className="text-xs text-stone-500 max-w-xs font-sans">
              Explore our range of authentic Nepali millet biscuits, cookies, and coffee.
            </p>
          </div>
          <Link href="/products">
            <Button className="py-3 px-8 bg-[#0555A2] hover:bg-[#28AAE0] text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-2xs hover:shadow-sm">
              <ShoppingBagIcon className="w-4 h-4 mr-2" /> Start Shopping
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start font-sans">
      {/* Cart Items */}
      <div className="lg:col-span-8 space-y-4">
        {cartItems.map((item) => (
          <CartItem
            key={item.cartItemId}
            item={item}
            onRemoveItem={removeItem}
            onUpdateQuantity={updateQuantity}
            isLoading={loadingItems.has(item.cartItemId)}
          />
        ))}
      </div>

      {/* Cart Summary Card */}
      <Card className="lg:col-span-4 rounded-2xl bg-white border border-[#E2EEF8] shadow-sm sticky top-28 font-sans overflow-hidden">
        <CardHeader className="bg-white border-b border-[#E2EEF8] p-5 sm:p-6">
          <CardTitle className="text-lg font-serif font-bold flex items-center gap-2 text-[#1C1917]">
            <ShoppingCart className="w-5 h-5 text-[#0555A2]" />
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="p-5 sm:p-6 space-y-4">
          <div className="space-y-3">
            {/* Subtotal */}
            <div className="flex justify-between items-center text-xs text-stone-600">
              <span>Subtotal ({getTotalItems()} items)</span>
              <span className="font-bold text-[#1C1917]">
                <RenderCurrency amount={getTotalPrice()} />
              </span>
            </div>

            {/* approxWeight */}
            <div className="flex justify-between items-center text-xs text-stone-500">
              <span>Approx. Total Weight</span>
              <span className="font-medium">
                {getTotalWeight().toLocaleString()} gm
              </span>
            </div>

            <Separator className="bg-[#E2EEF8]" />

            {/* Total */}
            <div className="flex justify-between items-center text-lg sm:text-xl font-bold text-[#1C1917]">
              <span className="font-serif">Total Amount</span>
              <span className="text-[#0555A2]">
                <RenderCurrency amount={getTotalPrice()} />
              </span>
            </div>

            <Link href="/checkout" className="block pt-2">
              <Button
                onClick={() => setIsLoading(true)}
                className="w-full py-4 h-12 bg-[#0555A2] hover:bg-[#28AAE0] text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-2xs hover:shadow-sm active:scale-95 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  "Processing..."
                ) : (
                  <>
                    <ShoppingCartIcon className="w-4 h-4" />
                    Proceed to Checkout
                  </>
                )}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
