import { BannerDialogForm } from "@/app/(admin)/_components/banner/banner-dialog-form";
import BannerTable from "@/app/(admin)/_components/banner/table";
import { adminService } from "@/app/(admin)/_services/index.service";

const BannerPage = async () => {
  const { banner } = adminService;
  const { data } = await banner.getAllBanners();
  return (
    <div className="">
      <div className=" pt-4">
        <BannerDialogForm mode="create" />
      </div>
      <BannerTable data={data} />
    </div>
  );
};

export default BannerPage;
