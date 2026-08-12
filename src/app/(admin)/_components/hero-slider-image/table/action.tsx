import type { Row } from "@tanstack/react-table";
import React from "react";
import { HeroSliderImageDialogForm } from "../hero-slider-image-dialog-form";
import { DeleteHeroSliderImageDialog } from "../delete-hero-slider-image-dialog";
import { IGetAllHeroSliderImage } from "@/app/(admin)/types/hero-slider-image";

const Action = ({ row }: { row: Row<IGetAllHeroSliderImage> }) => {
  return (
    <div className=" space-x-2">
      <HeroSliderImageDialogForm
        mode="update"
        initialData={{
          ...row.original,
          isActive: row.original.isActive,
          id: row.original.id,
          url: row.original.url || "",
        }}
      />
      <DeleteHeroSliderImageDialog id={row.original.id} />
    </div>
  );
};

export default Action;
