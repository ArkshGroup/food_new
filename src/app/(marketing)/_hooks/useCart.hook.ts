import { queryClient } from "@/components/provider/tanstack-query-provider";
import { useQuery } from "@tanstack/react-query";
import { useAction } from "next-safe-action/hooks";
import { useState, useCallback } from "react";
import { toast } from "sonner";
import {
  removeCartItemMutation,
  updateCartItemQuantityMutation,
} from "../_mutation/cart.mutation";
import { useSession } from "next-auth/react";

export const CART_COUNT_QUERY_KEY = "cartCount";

export function useCartCountQuery() {
  const { data: session } = useSession();
  return useQuery({
    enabled: !!session?.user,
    queryKey: [CART_COUNT_QUERY_KEY],
    queryFn: async (): Promise<{ count: number }> => {
      const res = await fetch("/api/cart");
      if (!res.ok) throw new Error("Failed to fetch cart count");
      const data: { count: number } = await res.json();
      return { count: data.count };
    },
  });
}

export function useCart(initialItems: ICartGetAll[] = []) {
  const [cartItems, setCartItems] = useState<ICartGetAll[]>(initialItems);
  const [loadingItems, setLoadingItems] = useState<Set<string>>(new Set());

  const { executeAsync: excCartUpdate } = useAction(
    updateCartItemQuantityMutation,
    {
      onSuccess: ({ data }) => {
        if (data?.success) {
          setCartItems((prev) =>
            prev.map((item) =>
              item.cartItemId === data.cartItemId
                ? { ...item, quantity: data.quantity! }
                : item
            )
          );
          toast.success(data.message);
          queryClient.invalidateQueries({ queryKey: [CART_COUNT_QUERY_KEY] });
        } else {
          toast.error(data.message || "Failed to update cart item");
        }
      },
      onError: ({ error, input }) => {
        setLoadingItems((prev) => {
          const newSet = new Set(prev);
          newSet.delete(input.cartItemId);
          return newSet;
        });
        toast.error(error.serverError?.message || "Failed to update cart item");
      },
      onSettled: ({ result }) => {
        setLoadingItems((prev) => {
          const newSet = new Set(prev);
          newSet.delete(result.data?.cartItemId!);
          return newSet;
        });
      },
    }
  );

  const { execute: excCartRemove } = useAction(removeCartItemMutation, {
    onSuccess: ({ data }) => {
      if (data?.success) {
        setCartItems((prev) =>
          prev.filter((item) => item.cartItemId !== data.cartItemId)
        );
        toast.success("Item removed from cart");
        queryClient.invalidateQueries({ queryKey: [CART_COUNT_QUERY_KEY] });
      } else {
        toast.error("Failed to remove cart item");
      }
    },
    onError: (error) => {
      toast.error(
        error.error.serverError?.message || "Failed to remove cart item"
      );
    },
    onSettled: ({ result }) => {
      setLoadingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(result.data?.cartItemId!);
        return newSet;
      });
    },
  });

  const updateQuantity = useCallback(
    async (cartItemId: string, newQuantity: number): Promise<boolean> => {
      if (newQuantity < 1) return false;
      setLoadingItems((prev) => new Set(prev).add(cartItemId));
      try {
        const result = await excCartUpdate({ cartItemId, newQuantity });
        if (result?.data?.success) {
          return true;
        }
        return false;
      } catch {
        return false;
      } finally {
        setLoadingItems((prev) => {
          const newSet = new Set(prev);
          newSet.delete(cartItemId);
          return newSet;
        });
      }
    },
    [excCartUpdate]
  );

  const removeItem = useCallback(
    (cartItemId: string) => {
      setLoadingItems((prev) => new Set(prev).add(cartItemId));
      excCartRemove({ cartItemId });
    },
    [excCartRemove]
  );

  const getTotalPrice = useCallback(() => {
    return cartItems.reduce(
      (total, item) => total + item.product.specialPrice * item.quantity,
      0
    );
  }, [cartItems]);

  const getTotalItems = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const getTotalWeight = useCallback(() => {
    return cartItems.reduce(
      (total, item) => total + item.product.approxWeight * item.quantity,
      0
    );
  }, [cartItems]);

  return {
    cartItems,
    loadingItems,
    updateQuantity,
    removeItem,
    getTotalPrice,
    getTotalItems,
    getTotalWeight,
  };
}
