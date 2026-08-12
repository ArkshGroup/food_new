"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Action from "./action";
import { IGetAllDiscountCode } from "@/app/(admin)/types/discount";
import {
  BadgeCheck,
  Calendar,
  Hash,
  Percent,
  ShieldCheck,
  Users,
} from "lucide-react";
import { formatDate } from "@/helper/formate-date";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<IGetAllDiscountCode>[] = [
  {
    accessorKey: "id",
    header: () => (
      <span className="flex items-center gap-2">
        <Hash size={16} /> ID
      </span>
    ),
  },
  {
    accessorKey: "code",
    header: () => (
      <span className="flex items-center gap-2">
        <BadgeCheck size={16} /> Code
      </span>
    ),
  },
  {
    accessorKey: "discountType",
    header: () => (
      <span className="flex items-center gap-2">
        <BadgeCheck size={16} /> Type
      </span>
    ),
  },
  {
    accessorKey: "startDate",
    header: () => (
      <span className="flex items-center gap-2">
        <Calendar size={16} /> Start Date
      </span>
    ),
    cell: ({ getValue }) => {
      const date = getValue() as Date;
      return date ? formatDate(date) : "-";
    },
  },
  {
    accessorKey: "endDate",
    header: () => (
      <span className="flex items-center gap-2">
        <Calendar size={16} /> End Date
      </span>
    ),
    cell: ({ getValue }) => {
      const date = getValue() as Date;
      return date ? formatDate(date) : "-";
    },
  },
  {
    accessorKey: "minOrderAmount",
    header: () => (
      <span className="flex items-center gap-2">रु Min Order Amount</span>
    ),
    cell: ({ row }) => {
      return (
        <span className=" flex items-center gap-1">
          रु {row.original.minOrderAmount}
        </span>
      );
    },
  },
  {
    accessorKey: "value",
    header: () => <span className="flex items-center gap-2">रु Value</span>,
    cell: ({ row }) => {
      return (
        <span className=" flex items-center gap-1">
          {row.original.discountType === "PERCENTAGE" ? (
            <>
              {row.original.discountPercent} <Percent size={16} />
            </>
          ) : (
            <>रु {row.original.value}</>
          )}
        </span>
      );
    },
  },
  {
    accessorKey: "isActive",
    header: () => (
      <span className="flex items-center gap-2">
        <ShieldCheck size={16} /> Active
      </span>
    ),
    cell: ({ row }) => {
      const isActive = row.original.isActive;
      return isActive ? (
        <Badge className=" bg-green-100 text-green-800">
          <BadgeCheck className=" text-green-600" />
          Active
        </Badge>
      ) : (
        <Badge className=" bg-red-100 text-red-800">
          <BadgeCheck className=" text-red-600" />
          Inactive
        </Badge>
      );
    },
  },
  {
    accessorKey: "usageLimit",
    header: () => (
      <span className="flex items-center gap-2">
        <Users size={16} /> Usage Limit
      </span>
    ),
  },
  {
    accessorKey: "usageCount",
    header: () => (
      <span className="flex items-center gap-2">
        <Users size={16} /> Usage Count
      </span>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <Action row={row} />,
  },
];
