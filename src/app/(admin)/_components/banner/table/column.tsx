"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import type { IGetAllBanner } from "@/app/(admin)/types/banner";
import Action from "./action";

export const columns: ColumnDef<IGetAllBanner>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "bannerDetail",
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
    header: "No. of Products",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <Action row={row} />,
  },
];
