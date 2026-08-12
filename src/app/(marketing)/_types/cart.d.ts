interface ICartGetAll {
  quantity: number;
  cartId: string;
  cartItemId: string;
  product: {
    id: string;
    slug: string;
    name: string;
    specialPrice: number;
    unitSellingPrice: number;
    imageUrl: string;
    approxWeight: number;
  };
}
