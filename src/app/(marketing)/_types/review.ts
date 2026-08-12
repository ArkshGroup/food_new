/** Shared type for product reviews (types-only, safe to import from client). */
export interface IProductReview {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string | null;
  createdAt: Date;
  user: {
    userName: string | null;
    email: string;
  };
}
