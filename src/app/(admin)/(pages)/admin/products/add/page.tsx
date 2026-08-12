import ProductForm from "@/app/(admin)/_components/products/product-form";
import { adminService } from "@/app/(admin)/_services/index.service";
import React from "react";

const AddProductPage = async () => {
  const categories = await adminService.category.getAllCategories();
  const banners = await adminService.banner.getAllBanners();
  const brands = await adminService.brand.getAllBrands();
  return (
    <ProductForm
      banners={banners.data.map((banner) => ({
        id: banner.id,
        name: banner.name,
        image: banner.imageUrl!,
      }))}
      categories={categories.data.map((cat) => ({
        id: cat.id,
        name: cat.name,
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

export default AddProductPage;
