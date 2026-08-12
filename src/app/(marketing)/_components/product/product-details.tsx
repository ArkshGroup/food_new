"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Minus, Plus, Youtube, Loader2Icon } from "lucide-react";
import { JsonToHtml } from "@/components/global/rich-text-editor/json-to-html";
import Image from "next/image";
import { useAction } from "next-safe-action/hooks";
import { addCartItems, buyNowMutation } from "../../_mutation/cart.mutation";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { CART_COUNT_QUERY_KEY } from "../../_hooks/useCart.hook";
import { queryClient } from "@/components/provider/tanstack-query-provider";
import RenderCurrency from "@/helper/render-currency";
import { BulkOrderInquiry } from "./product-bulk-inquiry-drawer";
import VideoPlayer from "./video-player";
import { IProductGetBySlug } from "../../_types/products";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IDiscountCode } from "../../_services/discount.service";
import { DiscountCard } from "./discount-code-card";
import { DeliveryDiscountCard } from "./delivery-card";
import { ProductReviews } from "./product-reviews";

export function ProductDetails({
  productData,
  availableDiscount,
  descriptionHtml,
}: {
  productData: IProductGetBySlug;
  availableDiscount: IDiscountCode[];
  /** Server-rendered HTML for SEO; when set, used instead of client JsonToHtml so crawlers see full word count */
  descriptionHtml?: string;
}) {
  const session = useSession();
  const router = useRouter();

  const [selectedImage, setSelectedImage] = useState(1);
  const [quantity, setQuantity] = useState(1);

  const discountedPrice = productData.specialPrice;
  const savings = productData.unitSellingPrice - discountedPrice;
  const discountPercentage = Math.round(
    ((productData.unitSellingPrice - discountedPrice) /
      productData.unitSellingPrice) *
      100
  );

  const { execute: addToCart, isPending } = useAction(addCartItems, {
    onSuccess() {
      try {
        queryClient.invalidateQueries({
          queryKey: [CART_COUNT_QUERY_KEY],
        });
      } catch (error) {
        console.error("Error invalidating cart count query:", error);
      }
      toast.success("Item added to cart");
    },
    onError(error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart");
    },
  });

  const { execute: buyNow, isPending: isBuyNowPending } = useAction(
    buyNowMutation,
    {
      onSuccess() {
        try {
          queryClient.invalidateQueries({
            queryKey: [CART_COUNT_QUERY_KEY],
          });
          router.push("/cart");
        } catch (error) {
          console.error("Error invalidating cart count query:", error);
        }
      },
      onError(error) {
        toast.error(
          error.error.serverError?.message ??
            "Failed to process buy now request"
        );
      },
    }
  );
  const handleAddToCart = () => {
    if (session.status !== "authenticated") {
      toast.error("You must be logged in to add items to the cart");
      return;
    }
    addToCart({ productId: productData.id, quantity });
  };

  const handleBuyNow = () => {
    if (session.status !== "authenticated") {
      toast.error("You must be logged in to add items to the cart");
      return;
    }
    buyNow({ productId: productData.id, quantity });
  };

  const [activeTab, setActiveTab] = useState<"info" | "ingredients" | "reviews">("info");

  return (
    <div className="min-h-screen bg-[#F0F7FD] font-sans text-stone-800">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-12">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Product Images & Video Column */}
          <div className="lg:col-span-6 space-y-4">
            <div className="w-full rounded-3xl overflow-hidden bg-white border border-[#E8E2D9] shadow-xs aspect-square flex items-center justify-center p-6 relative">
              {selectedImage === 0 && productData.videoUrl ? (
                <VideoPlayer videoUrl={productData.videoUrl} />
              ) : (
                <Image
                  width={500}
                  height={500}
                  src={
                    productData.images[selectedImage - 1]?.imageUrl ||
                    "/placeholder.svg"
                  }
                  alt={productData.name}
                  className="object-contain max-h-full max-w-full hover:scale-105 transition-transform duration-500"
                  priority
                />
              )}
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-5 gap-3">
              {/* Video Thumbnail */}
              {productData.videoUrl && (
                <button
                  type="button"
                  onClick={() => setSelectedImage(0)}
                  className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all ${
                    selectedImage === 0
                      ? "border-[#0555A2] ring-2 ring-[#0555A2]/20"
                      : "border-[#E8E2D9] bg-white hover:border-[#0555A2]/50"
                  }`}
                >
                  <div className="relative flex items-center justify-center h-full w-full">
                    <Youtube className="w-6 h-6 absolute z-10 text-white drop-shadow-md" />
                    <div className="w-full h-full absolute bg-black/30" />
                    <Image
                      height={100}
                      width={100}
                      src={
                        productData.images[0]?.imageUrl || "/placeholder.svg"
                      }
                      alt="Video Thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </button>
              )}

              {/* Image Thumbnails */}
              {productData.images.map((image, index) => (
                <button
                  type="button"
                  key={image.id}
                  onClick={() => setSelectedImage(index + 1)}
                  className={`aspect-square rounded-2xl overflow-hidden border-2 bg-white transition-all ${
                    selectedImage === index + 1
                      ? "border-[#0555A2] ring-2 ring-[#0555A2]/20 shadow-xs"
                      : "border-[#E8E2D9] hover:border-[#0555A2]/40"
                  }`}
                >
                  <Image
                    height={100}
                    width={100}
                    src={image.imageUrl || "/placeholder.svg"}
                    alt={productData.name}
                    className="w-full h-full object-contain p-1"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info Column */}
          <div className="lg:col-span-6 space-y-4 font-sans">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {productData.category && (
                  <Link
                    href={`/products?categoryNames=${productData.category.name}`}
                    className="text-[10px] font-bold uppercase tracking-wider text-[#0555A2] bg-sky-50 border border-sky-100 px-2.5 py-0.5 rounded-full hover:bg-sky-100 transition-colors"
                  >
                    {productData.category.name}
                  </Link>
                )}
                {productData.brand && (
                  <Link
                    href={`/products?brandNames=${productData.brand.name}`}
                    className="text-[10px] font-medium text-stone-600 bg-stone-100 border border-[#E8E2D9] px-2.5 py-0.5 rounded-full hover:text-[#0555A2] transition-colors"
                  >
                    Brand: {productData.brand.name}
                  </Link>
                )}
              </div>

              <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#1C1917] leading-tight">
                {productData.name}
              </h1>

              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-medium">
                <span>Earn +{Math.round(0.03 * productData.specialPrice)} Reward Points</span>
              </div>
            </div>

            {/* Minimalist Borderless Pricing Row */}
            <div className="py-2 border-y border-[#E8E2D9] space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-bold text-[#0555A2]">
                  <RenderCurrency amount={discountedPrice} />
                </span>

                {productData.unitSellingPrice > discountedPrice && (
                  <span className="text-sm text-stone-400 line-through font-normal">
                    <RenderCurrency amount={productData.unitSellingPrice} />
                  </span>
                )}
                {productData.unitSellingPrice > discountedPrice && (
                  <Badge
                    variant="outline"
                    className="bg-red-50 text-red-600 border-red-200 text-[10px] font-bold py-0"
                  >
                    SAVE {discountPercentage}%
                  </Badge>
                )}
              </div>
              {savings > 0 && (
                <p className="text-[11px] text-emerald-600 font-medium">
                  You save <RenderCurrency amount={savings} /> on this order
                </p>
              )}
            </div>

            {/* Available Discount Coupons */}
            {availableDiscount && availableDiscount.length > 0 && (
              <div className="space-y-1.5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                  Available Discount Codes:
                </p>
                <div className="flex flex-row overflow-x-auto gap-2 pb-1 scrollbar-none">
                  {availableDiscount.map((discount) => (
                    <div key={discount.id} className="flex-shrink-0">
                      <DiscountCard discount={discount} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Compact Quantity Selector & Minimalist Buttons */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between gap-4 py-1">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-600">Quantity</span>
                <div className="flex items-center border border-[#E8E2D9] rounded-xl bg-white">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-8 w-8 p-0 text-stone-700 hover:text-[#0555A2]"
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="w-8 text-center font-bold text-xs text-stone-800">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={quantity >= productData.stockQuantity}
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-8 w-8 p-0 text-stone-700 hover:text-[#0555A2]"
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              {/* 3 Action Buttons in the Same Line */}
              <div className="flex flex-col sm:flex-row gap-2.5 items-center w-full pt-1">
                <Button
                  disabled={isBuyNowPending || productData.stockQuantity <= 0}
                  onClick={handleBuyNow}
                  className="flex-1 w-full sm:w-auto h-10 bg-[#0555A2] hover:bg-[#28AAE0] text-white text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 shadow-2xs hover:shadow-sm active:scale-95 px-3"
                >
                  {isBuyNowPending ? (
                    <Loader2Icon className="animate-spin w-4 h-4" />
                  ) : (
                    "Buy Now"
                  )}
                </Button>

                <Button
                  disabled={isPending || productData.stockQuantity <= 0}
                  onClick={handleAddToCart}
                  variant="outline"
                  className="flex-1 w-full sm:w-auto h-10 border-[#0555A2] text-[#0555A2] hover:bg-sky-50 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 flex items-center justify-center gap-1.5 px-3 shadow-2xs"
                >
                  {isPending ? (
                    <Loader2Icon className="animate-spin w-4 h-4" />
                  ) : (
                    <>
                      <ShoppingCart className="w-3.5 h-3.5" />
                      Add to Cart
                    </>
                  )}
                </Button>

                <div className="flex-1 w-full sm:w-auto">
                  <BulkOrderInquiry
                    product={productData!}
                    className="w-full h-10 border-[#0555A2] text-[#0555A2] hover:bg-sky-50 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 flex items-center justify-center shadow-2xs px-3"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Tabbed Product Details Section */}
        <div className="w-full space-y-6 pt-8 border-t border-[#E8E2D9]">
          {/* Tab Navigation Header */}
          <div className="flex border-b border-[#E8E2D9] gap-4 sm:gap-8 overflow-x-auto scrollbar-none">
            <button
              type="button"
              onClick={() => setActiveTab("info")}
              className={`pb-4 text-sm sm:text-base font-serif font-bold transition-all relative border-b-2 ${
                activeTab === "info"
                  ? "border-[#0555A2] text-[#0555A2]"
                  : "border-transparent text-stone-500 hover:text-stone-800"
              }`}
            >
              Product Info
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("ingredients")}
              className={`pb-4 text-sm sm:text-base font-serif font-bold transition-all relative border-b-2 ${
                activeTab === "ingredients"
                  ? "border-[#0555A2] text-[#0555A2]"
                  : "border-transparent text-stone-500 hover:text-stone-800"
              }`}
            >
              Ingredients & Nutrition
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("reviews")}
              className={`pb-4 text-sm sm:text-base font-serif font-bold transition-all relative border-b-2 ${
                activeTab === "reviews"
                  ? "border-[#0555A2] text-[#0555A2]"
                  : "border-transparent text-stone-500 hover:text-stone-800"
              }`}
            >
              Customer Reviews
            </button>
          </div>

          {/* Tab 1: Product Info */}
          {activeTab === "info" && (
            <div className="py-2">
              {descriptionHtml ? (
                <div
                  dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                  className="product-description text-stone-700 text-sm sm:text-base leading-relaxed max-w-none space-y-3"
                />
              ) : (
                <JsonToHtml json={productData.description} />
              )}
            </div>
          )}

          {/* Tab 2: Ingredients & Nutrition */}
          {activeTab === "ingredients" && (
            <div className="py-4 space-y-8 font-sans">
              <div className="space-y-2">
                <h3 className="text-xl font-serif font-bold text-[#1C1917]">Key Ingredients & Himalayan Sourcing</h3>
                <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-3xl">
                  Crafted with care from natural Nepalese grains sourced directly from high-altitude hill farming communities. Featuring finger millet (Kodo), native organic corn, and wholesome ingredients with zero artificial colors or synthetic preservatives.
                </p>
              </div>

              {/* Clean Open Feature Pillars (No Box Cards) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-[#E2EEF8]">
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-lg bg-sky-50 text-[#0555A2] flex items-center justify-center font-bold text-xs">
                    01
                  </div>
                  <h4 className="text-sm font-serif font-bold text-[#1C1917]">100% Nepali Grains</h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Hand-selected Kodo millet & native maize harvested from Nepalese mountain farmers.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-lg bg-sky-50 text-[#28AAE0] flex items-center justify-center font-bold text-xs">
                    02
                  </div>
                  <h4 className="text-sm font-serif font-bold text-[#1C1917]">Zero Preservatives</h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Zero synthetic chemical preservatives, artificial colors, or greasy oil fillers.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-lg bg-sky-50 text-[#0555A2] flex items-center justify-center font-bold text-xs">
                    03
                  </div>
                  <h4 className="text-sm font-serif font-bold text-[#1C1917]">Rich in Fiber & Minerals</h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Packed with natural dietary fiber, calcium, iron, and slow-release energy for family health.
                  </p>
                </div>
              </div>

              {/* Product Specification Strip */}
              <div className="p-5 rounded-2xl bg-white border border-[#E2EEF8] shadow-2xs grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-sans">
                <div>
                  <span className="block text-stone-400 font-medium">Grain Origin</span>
                  <span className="block font-bold text-[#1C1917] mt-0.5">Nepal Hill Districts</span>
                </div>
                <div>
                  <span className="block text-stone-400 font-medium">Baking Standard</span>
                  <span className="block font-bold text-[#1C1917] mt-0.5">Hygienic Oven-Baked</span>
                </div>
                <div>
                  <span className="block text-stone-400 font-medium">Dietary Type</span>
                  <span className="block font-bold text-[#1C1917] mt-0.5">High-Fiber Vegetarian</span>
                </div>
                <div>
                  <span className="block text-stone-400 font-medium">Shelf Stability</span>
                  <span className="block font-bold text-[#1C1917] mt-0.5">6-9 Months Sealed</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Reviews */}
          {activeTab === "reviews" && (
            <ProductReviews productId={productData.id} />
          )}
        </div>

      </div>
    </div>
  );
}
