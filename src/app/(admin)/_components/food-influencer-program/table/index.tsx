import GenericTable from "@/components/global/generic-table";
import type { IFoodInfluencerProgram } from "@/app/(admin)/types/food-influencer-program";
import { columns } from "./column";

export default function FoodInfluencerProgramTable({
  data,
}: {
  data: IFoodInfluencerProgram[];
}) {
  return <GenericTable<IFoodInfluencerProgram> columns={columns} data={data} />;
}
