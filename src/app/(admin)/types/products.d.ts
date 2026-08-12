import { UNIT } from "@prisma/client";

export interface IGetProductById {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  isFeatured: boolean;
  isNewProduct: boolean;
  isFlashSale: boolean;
  isVisible: boolean;
  metaDescription: string;
  metaKeywords: string;
  metaTitle: string;
  onSale: boolean;
  stockQuantity: number;
  unit: UNIT;
  categoryId?: number | null;
  bannerId?: number | null;
  brandId?: number | null;
  subBrandId?: number | null;
  specialPrice: number;
  unitSellingPrice: number;
  specialPrice: number;
  approxWeight: number;
  isWholeSale: boolean;
  currency: string;
  createdAt: string;
  updatedAt: string;
  videoUrl: string | null;
  images: {
    id: string | null;
    imageUrl?: string | null;
    productId: string | null;
    sortOrder: number | null;
  }[];
  productPosition: number;
}

export interface IGetAllProducts {
  id: string;
  name: string;
  isFeatured: boolean;
  isNewProduct: boolean;
  isVisible: boolean;
  onSale: boolean;
  stockQuantity: number;
  categoryName: string;
  isWholeSale: boolean;
  currency: string;
  unitSellingPrice: number;
  specialPrice: number;
  images: {
    id: string | null;
    imageUrl: string | null;
    productId: string | null;
    sortOrder: number | null;
  };
}
