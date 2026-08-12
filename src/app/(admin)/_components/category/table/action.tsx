import type { Row } from "@tanstack/react-table";
import React from "react";
import type { IGetAllCategory } from "@/app/(admin)/types/category";
import { CategoryDialogForm } from "../category-dialog-form";
import { DeleteCategoryDialog } from "../delete-category-dialog";

const Action = ({ row }: { row: Row<IGetAllCategory> }) => {
  return (
    <div className=" space-x-2">
      <CategoryDialogForm
        mode="update"
        initialData={{
          categoryDetail: row.original.categoryDetail,
          id: row.original.id,
          name: row.original.name,
          imageUrl: row.original.imageUrl!,
          isVisible: row.original.isVisible,
        }}
      />
      <DeleteCategoryDialog id={row.original.id} />
    </div>
  );
};

export default Action;
