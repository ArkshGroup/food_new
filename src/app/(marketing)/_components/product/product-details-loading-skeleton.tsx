"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function ProductDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-background overflow-hidden animate-pulse">
      <div className="mx-auto px-1 md:px-2 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Product Images & Video Skeleton */}
          <div>
            <div className="space-y-4 flex-col-reverse flex md:flex-row md:gap-x-4">
              {/* Thumbnails Skeleton */}
              {/* This mimics the grid layout for thumbnails */}
              <div className="grid mt-2 md:max-w-[100px] grid-cols-4 md:grid-cols-1 gap-3">
                <Skeleton className="aspect-square rounded-lg" />
                <Skeleton className="aspect-square rounded-lg" />
                <Skeleton className="aspect-square rounded-lg" />
                <Skeleton className="aspect-square rounded-lg" />
                {/* Add more if your product might have more images */}
              </div>
              {/* Main Image/Video Player Skeleton */}
              <div className="w-full aspect-square rounded-2xl overflow-hidden border shadow-none">
                <Skeleton className="w-full h-full" />
              </div>
            </div>
          </div>

          {/* Product Info Skeleton */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                {/* Banner Image Skeleton */}
                <Skeleton className="w-12 h-12 rounded-lg" />
                {/* Product Name Skeleton */}
                <Skeleton className="h-10 w-2/3 md:w-full max-w-sm" />
              </div>
              {/* Badges Skeleton */}
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>
              {/* Description Snippet Skeleton (Optional, as the full description is in tabs) */}
              {/* <Skeleton className="h-4 w-full md:block hidden" /> */}
            </div>

            {/* Pricing Skeleton */}
            <Card className="bg-card/50 shadow-none border-none">
              <CardContent className="md:p-6">
                <div className="space-y-4">
                  <div className="flex items-baseline gap-3">
                    {/* Discounted Price Skeleton */}
                    <Skeleton className="h-8 w-32" />
                    {/* Original Price Skeleton */}
                    <Skeleton className="h-6 w-20" />
                    {/* Discount Badge Skeleton */}
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </div>
                  {/* Savings text Skeleton */}
                  <Skeleton className="h-4 w-40" />
                </div>
              </CardContent>
            </Card>

            {/* Quantity & Actions Skeleton */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                {/* Quantity Selector Skeleton */}
                <div className="flex items-center border border-border rounded-lg">
                  <Skeleton className="h-10 w-10 p-0 rounded-l-lg" />
                  <Skeleton className="w-12 h-10" />
                  <Skeleton className="h-10 w-10 p-0 rounded-r-lg" />
                </div>
                {/* Stock Text Skeleton */}
                <Skeleton className="h-4 w-28" />
              </div>
              <div className="flex gap-3">
                {/* Add to Cart Button Skeleton */}
                <Skeleton className="flex-1 h-12" />
              </div>
              {/* Bulk Order Inquiry Button Skeleton (Added this) */}
              <div className="w-full">
                <Skeleton className="h-10 w-full" />
              </div>
            </div>

            {/* Features Skeleton */}
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>

        {/* Product Details Tabs Skeleton */}
        <div className="mt-16">
          {/* Tabs List Skeleton */}
          <div className="grid w-full grid-cols-3 bg-card/50 rounded-md p-1">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Tabs Content Skeleton */}
          <div className="mt-8">
            <Card className="bg-card/30 shadow-none border-none">
              <CardContent className="md:p-8">
                <div className="space-y-4">
                  {/* Title/Heading Placeholder */}
                  <Skeleton className="h-8 w-1/3" />
                  {/* Content Placeholder */}
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
