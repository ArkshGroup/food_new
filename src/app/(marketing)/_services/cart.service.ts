import prisma from "@/lib/db";
import { customerActionClient } from "@/lib/next-safe-action";

export class CartService {
  getCartItems = customerActionClient.action(async ({ ctx }) => {
    const userId = ctx.user.id;
    const cart = await prisma.cart.findFirst({
      where: { userId },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                specialPrice: true,
                unitSellingPrice: true,
                images: {
                  take: 1,
                  orderBy: { sortOrder: "asc" },
                },
                approxWeight: true,
              },
            },
          },
        },
      },
    });

    const cartItems: ICartGetAll[] =
      cart?.items.map((item) => ({
        cartId: cart.id,
        cartItemId: item.id,
        quantity: item.quantity,
        product: {
          id: item.product.id,
          slug: item.product.id,
          name: item.product.name,
          specialPrice: Number(item.product.specialPrice),
          unitSellingPrice: Number(item.product.unitSellingPrice),
          imageUrl: item.product.images[0]?.imageUrl!,
          approxWeight: Number(item.product.approxWeight),
        },
      })) || [];

    return cartItems;
  });
}
