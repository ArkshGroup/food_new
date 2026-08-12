import { HeroSliderImageDialogForm } from "@/app/(admin)/_components/hero-slider-image/hero-slider-image-dialog-form";
import HeroSliderImageTable from "@/app/(admin)/_components/hero-slider-image/table";
import { adminService } from "@/app/(admin)/_services/index.service";

const HeroSliderPage = async () => {
  const { heroSliderImage } = adminService;
  const { data } = await heroSliderImage.getAllHeroSliderImages();

  return (
    <div className="">
      <div className=" pt-4">
        <HeroSliderImageDialogForm mode="create" />
      </div>
      <HeroSliderImageTable data={data} />
    </div>
  );
};

export default HeroSliderPage;
