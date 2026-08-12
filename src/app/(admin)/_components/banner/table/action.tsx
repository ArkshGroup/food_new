import type { Row } from "@tanstack/react-table";
import React from "react";
import type { IGetAllBanner } from "@/app/(admin)/types/banner";
import { BannerDialogForm } from "../banner-dialog-form";

const Action = ({ row }: { row: Row<IGetAllBanner> }) => {
  return (
    <div>
      <BannerDialogForm
        mode="update"
        initialData={{
          ...row.original,
        }}
      />
    </div>
  );
};

export default Action;
