"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart, Trash2, ArrowRight, Loader2Icon, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useWishlist, IWishlistItem } from "@/app/(marketing)/_hooks/useWishlist.hook";
import RenderCurrency from "@/helper/render-currency";
import { useAction } from "next-safe-action/hooks";
import { addCartItems } from "@/app/(marketing)/_mutation/cart.mutation";
import { queryClient } from "@/components/provider/tanstack-query-provider";
import { CART_COUNT_QUERY_KEY } from "@/app/(marketing)/_hooks/useCart.hook";
import { toast } from "sonner";

function WishlistItemCard({
  item,
  onRemove,
}: {
  item: IWishlistItem;
  onRemove: (id: string) => void;
}) {
  const { execute: addToCart, isPending } = useAction(addCartItems, {
    onSuccess() {
      try {
        queryClient.invalidateQueries({
          queryKey: [CART_COUNT_QUERY_KEY],
        });
      } catch (error) {
        console.error(error);
      }
      toast.success(`Added "${item.name}" to your cart!`);
    },
    onError() {
      toast.error("Failed to add item to cart");
    },
  });

  const handleAddToCart = () => {
    addToCart({
      productId: item.id,
      quantity: 1,
    });
  };

  const imageUrl = item.images?.url || "/placeholder.svg";

  return (
    <div className="group bg-white rounded-3xl border border-[#E8E2D9] p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-[#0555A2]/30 relative">
      {/* Remove Button on Top Right */}
      <button
        type="button"
        onClick={() => onRemove(item.id)}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 text-stone-400 hover:text-red-500 hover:bg-red-50 border border-stone-200 transition-colors shadow-2xs"
        aria-label="Remove from wishlist"
        title="Remove item"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      <div>
        {/* Product Image Container */}
        <Link href={`/products/${item.slug}`} className="block relative w-full h-44 sm:h-48 rounded-2xl overflow-hidden bg-[#F0F7FD] mb-3 group/img">
          <Image
            src={imageUrl}
            alt={item.name}
            fill
            className="object-cover group-hover/img:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          {item.unitSellingPrice > item.specialPrice && (
            <Badge className="absolute bottom-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border-0">
              Sale
            </Badge>
          )}
        </Link>

        {/* Category & Title */}
        <div className="space-y-1.5 mb-3">
          {item.categoryName && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#0555A2] bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-100/80 inline-block">
              {item.categoryName}
            </span>
          )}
          <Link href={`/products/${item.slug}`}>
            <h3 className="font-serif font-bold text-sm text-stone-900 line-clamp-2 group-hover:text-[#0555A2] transition-colors leading-snug">
              {item.name}
            </h3>
          </Link>
        </div>
      </div>

      {/* Pricing & Action Buttons */}
      <div className="space-y-3 pt-2 border-t border-[#E8E2D9]">
        <div className="flex items-baseline justify-between">
          <span className="text-base font-bold text-[#0555A2]">
            <RenderCurrency amount={item.specialPrice} />
          </span>
          {item.unitSellingPrice > item.specialPrice && (
            <span className="text-xs text-stone-400 line-through font-normal">
              <RenderCurrency amount={item.unitSellingPrice} />
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            disabled={isPending}
            onClick={handleAddToCart}
            className="w-full h-9 bg-[#0555A2] hover:bg-[#28AAE0] text-white text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 flex items-center justify-center gap-1.5 shadow-2xs"
          >
            {isPending ? (
              <Loader2Icon className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function WishlistPage() {
  const { wishlist, wishlistCount, isLoaded, removeFromWishlist, clearWishlist } = useWishlist();

  return (
    <div className="w-full bg-[#F0F7FD] min-h-screen py-8 sm:py-12 font-sans">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs text-stone-500 font-sans">
          <Link href="/" className="hover:text-[#0555A2] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-stone-800 font-bold">My Wishlist</span>
        </nav>

        {/* Page Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E2D9] shadow-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1917]">
                My Saved Wishlist
              </h1>
              {isLoaded && wishlistCount > 0 && (
                <Badge className="bg-[#0555A2] text-white font-bold text-xs px-2.5 py-0.5 rounded-full">
                  {wishlistCount} {wishlistCount === 1 ? "Item" : "Items"}
                </Badge>
              )}
            </div>
            <p className="text-stone-600 text-xs sm:text-sm max-w-xl">
              Keep track of your favorite Himalayan cookies, biscuits, and wholesome Nepali snacks.
            </p>
          </div>

          {isLoaded && wishlistCount > 0 && (
            <Button
              variant="outline"
              onClick={clearWishlist}
              className="text-xs text-stone-600 hover:text-red-600 hover:bg-red-50 border-[#E8E2D9] rounded-full px-4 h-9 font-semibold self-start sm:self-center transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5 mr-1.5" />
              Clear Wishlist
            </Button>
          )}
        </div>

        {/* Main Content Area */}
        {!isLoaded ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-[#E8E2D9] shadow-xs gap-3">
            <Loader2Icon className="w-6 h-6 animate-spin text-[#0555A2]" />
            <p className="text-xs text-stone-500 font-medium">Loading your saved items...</p>
          </div>
        ) : wishlistCount > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist.map((item) => (
              <WishlistItemCard
                key={item.id}
                item={item}
                onRemove={removeFromWishlist}
              />
            ))}
          </div>
        ) : (
          /* Empty Wishlist State */
          <div className="bg-white rounded-3xl border border-[#E8E2D9] p-8 sm:p-14 text-center space-y-6 shadow-xs max-w-2xl mx-auto">
            {/* 3D Porcelain Plate Icon Container */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-b from-white via-[#F0F7FD] to-[#E2EEF8] border-2 border-white shadow-md ring-1 ring-[#0555A2]/15 mx-auto flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-white border border-sky-100 shadow-inner flex items-center justify-center text-red-500">
                <Heart className="w-7 h-7 fill-red-100 text-red-500" />
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1C1917]">
                Your Wishlist is Empty
              </h2>
              <p className="text-stone-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                You haven't saved any products yet. Browse our selection of organic Himalayan treats and tap the heart icon to save items for later!
              </p>
            </div>

            <div className="pt-2">
              <Link href="/products">
                <Button className="bg-[#0555A2] hover:bg-[#28AAE0] text-white font-bold text-xs uppercase tracking-wider px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 inline-flex items-center gap-2">
                  <span>Explore Products</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
