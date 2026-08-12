"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Action from "./action";
import { IGetAllReview } from "@/app/(admin)/types/review";

function formatDate(d: Date) {
  return new Date(d).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export const columns: ColumnDef<IGetAllReview>[] = [
  {
    accessorKey: "product",
    header: "Product",
    cell: ({ row }) => row.original.product?.name ?? row.original.productId,
  },
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) =>
      row.original.user?.userName ?? row.original.user?.email ?? row.original.userId,
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => `${row.original.rating}/5`,
  },
  {
    accessorKey: "comment",
    header: "Comment",
    cell: ({ row }) => {
      const c = row.original.comment;
      if (!c) return "—";
      return c.length > 80 ? c.slice(0, 80) + "…" : c;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => formatDate(row.original.createdAt),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <Action row={row} />,
  },
];
