import { BrandDialogForm } from "@/app/(admin)/_components/brand/brand-dialog-form";
import BrandTable from "@/app/(admin)/_components/brand/table";

import { adminService } from "@/app/(admin)/_services/index.service";

const BrandPage = async () => {
  const { brand } = adminService;
  const { data } = await brand.getAllBrands();

  return (
    <div className="">
      <div className=" pt-4">
        <BrandDialogForm mode="create" />
      </div>
      <BrandTable data={data} />
    </div>
  );
};

export default BrandPage;
