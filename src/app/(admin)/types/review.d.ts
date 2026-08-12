export interface IGetAllReview {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string | null;
  createdAt: Date;
  product?: { name: string; slug: string };
  user?: { userName: string | null; email: string };
}
