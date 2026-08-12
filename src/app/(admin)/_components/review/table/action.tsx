"use client";

import type { Row } from "@tanstack/react-table";
import { DeleteReviewDialog } from "../delete-review-dialog";
import { IGetAllReview } from "@/app/(admin)/types/review";

const Action = ({ row }: { row: Row<IGetAllReview> }) => {
  return (
    <div className="space-x-2">
      <DeleteReviewDialog id={row.original.id} />
    </div>
  );
};

export default Action;
