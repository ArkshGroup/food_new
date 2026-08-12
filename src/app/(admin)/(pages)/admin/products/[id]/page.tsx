import { ProductDetail } from "@/app/(admin)/_components/products/product-detail";
import ProductOrderChart from "@/app/(admin)/_components/products/product-stats-chart";
import { adminService } from "@/app/(admin)/_services/index.service";
import { notFound } from "next/navigation";
import React from "react";

const ProductViewPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const response = await adminService.product.getProductById({ id });

  if (!response?.data?.success || !response?.data?.data) {
    notFound();
  }
  const { data: productOrderTimeline } =
    await adminService.product.getProductOrderTimeLine({ id });

  const product = response.data.data;

  return (
    <>
      <ProductDetail product={product} />
      <ProductOrderChart data={productOrderTimeline?.data ?? []} />
    </>
  );
};

export default ProductViewPage;
