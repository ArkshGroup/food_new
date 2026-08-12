"use server";

import prisma from "@/lib/db";
import { customerActionClient } from "@/lib/next-safe-action";
import z from "zod";

export const buyNowMutation = customerActionClient
  .inputSchema(
    z.object({
      productId: z.string(),
      quantity: z.number().min(1),
    })
  )
  .action(async ({ parsedInput, ctx }) => {
    const { productId, quantity } = parsedInput;
    const userId = ctx.user.id;

    const result = await prisma.$transaction(async (tx) => {
      // Get or create a cart for the user
      let cart = await tx.cart.findFirst({
        where: { userId },
      });

      if (!cart) {
        cart = await tx.cart.create({
          data: { userId },
        });
      }

      // Remove all existing items from the user's cart
      await tx.cartItem.deleteMany({
        where: { cartId: cart.id },
      });

      // Fetch product details
      const product = await tx.product.findUnique({
        where: { id: productId },
      });

      if (!product) {
        throw new Error("Product not found");
      }

      if (product.stockQuantity < quantity) {
        throw new Error("Product is out of stock ");
      }

      // Add the new item
      const cartItem = await tx.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
          price: product.specialPrice,
        },
      });

      return cartItem;
    });

    return {
      message: "Buy now item added to cart",
      success: true,
      cartItem: result,
    };
  });

export const addCartItems = customerActionClient
  .inputSchema(
    z.object({
      productId: z.string(),
      quantity: z.number().min(1),
    })
  )
  .action(async ({ parsedInput, ctx }) => {
    const { productId, quantity } = parsedInput;

    const userId = ctx.user.id;
    const tx = await prisma.$transaction(async (prisma) => {
      let cart = await prisma.cart.findFirst({
        where: { userId },
      });
      if (!cart) {
        cart = await prisma.cart.create({
          data: { userId },
        });
      }
      let cartItem = await prisma.cartItem.findFirst({
        where: { cartId: cart.id, productId },
      });

      if (cartItem) {
        cartItem = await prisma.cartItem.update({
          where: { id: cartItem.id },
          data: { quantity: cartItem.quantity + quantity },
        });
      } else {
        const product = await prisma.product.findUnique({
          where: { id: productId },
        });
        if (!product) {
          throw new Error("Product not found");
        }

        if (product.stockQuantity < quantity) {
          throw new Error("Insufficient stock");
        }

        cartItem = await prisma.cartItem.create({
          data: {
            cartId: cart.id,
            productId,
            quantity,
            price: product.specialPrice,
          },
        });
      }

      return cartItem;
    });

    return {
      message: "Item added to cart",
      success: true,
    };
  });

export const removeCartItemMutation = customerActionClient
  .inputSchema(
    z.object({
      cartItemId: z.string(),
    })
  )
  .action(async ({ parsedInput, ctx }) => {
    const { cartItemId } = parsedInput;
    const userId = ctx.user.id;

    const cartItem = await prisma.cartItem.findFirst({
      where: { id: cartItemId },
      include: { cart: true },
    });

    if (!cartItem || cartItem.cart.userId !== userId) {
      return {
        message: "Cart item not found or access denied",
        success: false,
        cartItemId,
      };
    }

    await prisma.cartItem.delete({
      where: { id: cartItemId },
    });

    return {
      message: "Item removed from cart",
      success: true,
      cartItemId,
    };
  });

export const updateCartItemQuantityMutation = customerActionClient
  .inputSchema(
    z.object({
      cartItemId: z.string(),
      newQuantity: z.number().min(1),
    })
  )
  .action(async ({ parsedInput, ctx }) => {
    const { cartItemId, newQuantity } = parsedInput;
    const userId = ctx.user.id;
    const cartItem = await prisma.cartItem.findFirst({
      where: { id: cartItemId },
      include: { cart: true },
    });

    if (!cartItem || cartItem.cart.userId !== userId) {
      throw new Error("Cart item not found or access denied");
    }

    const product = await prisma.product.findUnique({
      where: { id: cartItem.productId },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    if (product.stockQuantity < newQuantity) {
      throw new Error("Insufficient stock");
    }

    const updatedCartItem = await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity: newQuantity },
    });

    return {
      message: "Cart item quantity updated",
      success: true,
      cartItemId: updatedCartItem.id,
      quantity: updatedCartItem.quantity,
    };
  });
