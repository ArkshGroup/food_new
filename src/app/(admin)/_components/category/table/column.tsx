"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import type { IGetAllCategory } from "@/app/(admin)/types/category";
import Action from "./action";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<IGetAllCategory>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isVisible",
    header: "Is Visible",
    cell: ({ row }) =>
      row.original.isVisible ? (
        <Badge className=" bg-green-500">Yes</Badge>
      ) : (
        <Badge variant="destructive">No</Badge>
      ),
  },
  {
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ row }) => (
      <div className=" size-[40px] w-32 h-16 flex items-center">
        <Image
          src={row.original.imageUrl!}
          alt={row.original.name}
          className="w-32 h-16 object-contain"
          width={64}
          height={64}
        />
      </div>
    ),
  },
  {
    accessorKey: "noOfProducts",
    header: "No. of  Products",
  },
  {
    accessorKey: "position",
    header: "Position",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <Action row={row} />,
  },
];
