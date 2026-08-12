import type { Row } from "@tanstack/react-table";
import React from "react";
import { BrandDialogForm } from "../brand-dialog-form";
import { IGetAllBrand } from "@/app/(admin)/types/brand";
import { DeleteBrandDialog } from "../delete-brand-dialog";

const Action = ({ row }: { row: Row<IGetAllBrand> }) => {
  return (
    <div className=" space-x-2">
      <BrandDialogForm
        mode="update"
        initialData={{
          ...row.original,
          subBrands: row.original.subBrands,
        }}
      />
      <DeleteBrandDialog id={row.original.id} />
    </div>
  );
};

export default Action;
