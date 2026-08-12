"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Action from "./action";
// import { IGetAllBrand } from "@/app/(admin)/types/brand"; // Not used

export const columns: ColumnDef<IGetAllBulkOrderInquiry>[] = [
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <Action row={row} />,
  },
  {
    accessorKey: "productId",
    header: "Product ID",
  },
  {
    accessorKey: "productName",
    header: "Product Name",
  },
  {
    accessorKey: "productQuantity",
    header: "Quantity",
  },
  {
    accessorKey: "productUnit",
    header: "Unit",
  },
  {
    accessorKey: "userEmail",
    header: "User Email",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => (
      <span>{new Date(row.original.createdAt).toLocaleString()}</span>
    ),
  },
];
