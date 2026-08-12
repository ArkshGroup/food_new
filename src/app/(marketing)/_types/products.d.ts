import { Prisma } from "@prisma/client";

interface IProductGetAll {
  slug: string;
  name: string;
  banner: {
    name: string;
    id: number;
    imageUrl: string;
    createdAt: Date;
    bannerDetail: string;
  } | null;
  id: string;
  unitSellingPrice: number;
  specialPrice: number;
  stockQuantity: number;
  isFlashSale?: boolean;
  images: {
    id: string;
    url: string;
    alt: string;
  } | null;
}

interface IProductsGetByCategory {
  name: string;
  categoryBanner: string;
  products: IProductGetAll[];
}

interface IProductGetBySlug
  extends Prisma.ProductGetPayload<{
    include: {
      images: true;
      banner: true;
      category: true;
      brand: true;
    };
  }> {
  unitSellingPrice: number;
  specialPrice: number;
  approxWeight: number;
}

interface IBrandWithProducts {
  id: number;
  name: string;
  brandBannerImage: string | null;
  subBrands: {
    id: number;
    name: string;
    subBrandPosition: number;
    products: {
      id: string;
      name: string;
      slug: string;
      unitSellingPrice: number;
      specialPrice: number;
      isFlashSale: boolean;
      stockQuantity: number;
      banner: {
        name: string;
        id: number;
        imageUrl: string;
        createdAt: Date;
        bannerDetail: string;
      } | null;
      images: {
        id: string;
        url: string;
        alt: string;
      };
      productPosition: number;
    }[];
  }[];
}
