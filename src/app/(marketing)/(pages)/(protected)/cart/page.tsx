import { Cart } from "@/app/(marketing)/_components/cart/cart-items-container";
import marketingService from "@/app/(marketing)/_services/index.service";
import React from "react";

export const dynamic = "force-dynamic";

const CartRootPage = async () => {
  const { data } = await marketingService.cart.getCartItems();
  return (
    <div className="w-full bg-[#F0F7FD] min-h-screen py-10 lg:py-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#28AAE0]">
            SHOPPING BASKET
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1C1917] tracking-tight">
            Your Cart
          </h1>
        </div>

        <Cart initialItems={data!} />
      </div>
    </div>
  );
};

export default CartRootPage;
