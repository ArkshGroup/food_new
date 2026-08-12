interface IGetAllBulkOrderInquiry {
  id: number;
  productId: string;
  productName: string;
  productQuantity: number;
  productPrice: number;
  productUnit: string;
  notes?: string;
  userEmail?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
