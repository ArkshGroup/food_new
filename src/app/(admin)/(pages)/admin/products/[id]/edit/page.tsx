import ProductForm from "@/app/(admin)/_components/products/product-form";
import { adminService } from "@/app/(admin)/_services/index.service";
import React from "react";

const ProductEditPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const product = (await adminService.product.getProductById({ id })).data;
  if (!product) return <div>Product not found</div>;
  const categories = await adminService.category.getAllCategories();
  const banners = await adminService.banner.getAllBanners();
  const brands = await adminService.brand.getAllBrands();

  const { images, ...rest } = product.data;
  return (
    <ProductForm
      initialData={{
        ...rest,
        images: images || [],
      }}
      categories={categories.data.map((cat) => ({
        id: cat.id,
        name: cat.name,
      }))}
      banners={banners.data.map((banner) => ({
        id: banner.id,
        name: banner.name,
        image: banner.imageUrl!,
      }))}
      brands={brands.data.map((brand) => ({
        id: brand.id,
        name: brand.name,
        subBrands: brand.subBrands.map((subBrand) => ({
          id: subBrand.id,
          name: subBrand.name,
          position: subBrand.position,
        })),
      }))}
    />
  );
};

export default ProductEditPage;
