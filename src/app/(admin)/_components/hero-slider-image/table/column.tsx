"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Action from "./action";
import { IGetAllHeroSliderImage } from "@/app/(admin)/types/hero-slider-image";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<IGetAllHeroSliderImage>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "detail",
    header: "Description",
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <div className=" size-[40px] w-32 h-16 flex items-center">
        <Image
          src={row.original.image!}
          alt={row.original.name}
          className="w-32 h-16 object-contain"
          width={64}
          height={64}
        />
      </div>
    ),
  },
  {
    accessorKey: "url",
    header: "Url",
  },
  {
    accessorKey: "order",
    header: "Order",
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) =>
      row.original.isActive ? (
        <Badge className=" bg-green-100 text-green-800">Active</Badge>
      ) : (
        <Badge className=" bg-red-100 text-red-800">Inactive</Badge>
      ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <Action row={row} />,
  },
];
