"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { IGoogleReview } from "@/app/(admin)/types/google-review";
import Action from "./action";

export const columns: ColumnDef<IGoogleReview>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "starRating", header: "Stars" },
  {
    accessorKey: "reviewText",
    header: "Review",
    cell: ({ row }) => (
      <span className="line-clamp-2 max-w-[200px]">{row.original.reviewText}</span>
    ),
  },
  { id: "actions", enableHiding: false, cell: ({ row }) => <Action row={row} /> },
];
