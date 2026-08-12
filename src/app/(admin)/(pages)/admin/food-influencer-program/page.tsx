import FoodInfluencerProgramTable from "@/app/(admin)/_components/food-influencer-program/table";
import { adminService } from "@/app/(admin)/_services/index.service";

const FoodInfluencerProgramPage = async () => {
  const { data } = await adminService.foodInfluencerProgram.getAll();
  return (
    <div className="pt-4">
      <FoodInfluencerProgramTable data={data ?? []} />
    </div>
  );
};

export default FoodInfluencerProgramPage;
