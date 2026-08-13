"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

export interface IWishlistItem {
  id: string;
  name: string;
  slug: string;
  unitSellingPrice: number;
  specialPrice: number;
  categoryName?: string;
  images?: {
    url?: string;
    alt?: string;
  };
  stockQuantity?: number;
}

const WISHLIST_STORAGE_KEY = "arksh_food_wishlist";
const WISHLIST_EVENT = "arksh_wishlist_updated";

export function useWishlist() {
  const [wishlist, setWishlist] = useState<IWishlistItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Sync state from localStorage
  const syncWishlist = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (stored) {
        setWishlist(JSON.parse(stored));
      } else {
        setWishlist([]);
      }
    } catch {
      setWishlist([]);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    syncWishlist();

    const handleStorageChange = () => {
      syncWishlist();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener(WISHLIST_EVENT, handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(WISHLIST_EVENT, handleStorageChange);
    };
  }, [syncWishlist]);

  const notifyChange = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event(WISHLIST_EVENT));
    }
  };

  const isInWishlist = useCallback(
    (productId: string) => {
      return wishlist.some((item) => item.id === productId);
    },
    [wishlist]
  );

  const addToWishlist = (product: any) => {
    if (!product || !product.id) return;
    
    const existingIndex = wishlist.findIndex((item) => item.id === product.id);
    if (existingIndex > -1) {
      toast.info("Already in wishlist");
      return;
    }

    const imageUrl = typeof product.images === "string" 
      ? product.images 
      : product.images?.url || (Array.isArray(product.images) ? product.images[0]?.url : "/placeholder.svg");

    const newItem: IWishlistItem = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      unitSellingPrice: product.unitSellingPrice ?? 0,
      specialPrice: product.specialPrice ?? product.unitSellingPrice ?? 0,
      categoryName: product.categoryName || product.category?.name || "Nepalese Snacks",
      images: {
        url: imageUrl || "/placeholder.svg",
        alt: product.name,
      },
      stockQuantity: product.stockQuantity ?? 10,
    };

    const updated = [newItem, ...wishlist];
    setWishlist(updated);
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(updated));
    notifyChange();
    toast.success("Added to wishlist");
  };

  const removeFromWishlist = (productId: string) => {
    const updated = wishlist.filter((item) => item.id !== productId);
    setWishlist(updated);
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(updated));
    notifyChange();
    toast.success("Removed from wishlist");
  };

  const toggleWishlist = (product: any) => {
    if (!product || !product.id) return;
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const clearWishlist = () => {
    setWishlist([]);
    localStorage.removeItem(WISHLIST_STORAGE_KEY);
    notifyChange();
    toast.success("Wishlist cleared");
  };

  return {
    wishlist,
    wishlistCount: wishlist.length,
    isLoaded,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist,
  };
}
