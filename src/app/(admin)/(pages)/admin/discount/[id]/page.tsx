import { DiscountCodeForm } from "@/app/(admin)/_components/discount-code/discount-code-form";
import { adminService } from "@/app/(admin)/_services/index.service";
import React from "react";

const Discount = async ({ params }: { params: Promise<{ id: number }> }) => {
  const { id } = await params;
  const { data } = await adminService.discount.getDiscountCodeById(id);

  if (!data) {
    return <div>Discount code not found</div>;
  }
  return (
    <div className=" p-4">
      <DiscountCodeForm initialData={data} />;
    </div>
  );
};

export default Discount;
