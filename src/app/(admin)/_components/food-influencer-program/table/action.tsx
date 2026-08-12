import type { Row } from "@tanstack/react-table";
import type { IFoodInfluencerProgram } from "@/app/(admin)/types/food-influencer-program";
import { DeleteFoodInfluencerProgramDialog } from "../delete-food-influencer-program-dialog";
import { FoodInfluencerProgramDialogForm } from "../food-influencer-program-dialog-form";

export default function Action({ row }: { row: Row<IFoodInfluencerProgram> }) {
  const item = row.original;
  return (
    <div className="space-x-2">
      <FoodInfluencerProgramDialogForm
        initialData={{
          id: item.id,
          title: item.title,
          category: item.category,
          description: item.description,
          instagramUrl: item.instagramUrl,
          facebookUrl: item.facebookUrl,
          tiktokUrl: item.tiktokUrl,
        }}
      />
      <DeleteFoodInfluencerProgramDialog id={item.id} />
    </div>
  );
}
