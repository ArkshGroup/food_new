"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Action from "./action";
import { IGetAllBrand } from "@/app/(admin)/types/brand";

export const columns: ColumnDef<IGetAllBrand>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "brandDetail",
    header: "Description",
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
    accessorKey: "brandPosition",
    header: "Brand Position",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <Action row={row} />,
  },
];
