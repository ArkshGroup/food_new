"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { IFoodInfluencerProgram } from "@/app/(admin)/types/food-influencer-program";
import Action from "./action";

export const columns: ColumnDef<IFoodInfluencerProgram>[] = [
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) =>
      row.original.user?.email ?? row.original.userId ?? "Guest submission",
  },
  { accessorKey: "title", header: "Title" },
  { accessorKey: "category", header: "Category" },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <span className="line-clamp-2 max-w-[220px]">{row.original.description}</span>
    ),
  },
  {
    accessorKey: "instagramUrl",
    header: "Instagram",
    cell: ({ row }) => (
      <a
        href={row.original.instagramUrl}
        target="_blank"
        rel="noreferrer"
        className="text-primary underline"
      >
        Link
      </a>
    ),
  },
  {
    accessorKey: "facebookUrl",
    header: "Facebook",
    cell: ({ row }) => (
      <a
        href={row.original.facebookUrl}
        target="_blank"
        rel="noreferrer"
        className="text-primary underline"
      >
        Link
      </a>
    ),
  },
  {
    accessorKey: "tiktokUrl",
    header: "TikTok",
    cell: ({ row }) => (
      <a
        href={row.original.tiktokUrl}
        target="_blank"
        rel="noreferrer"
        className="text-primary underline"
      >
        Link
      </a>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <Action row={row} />,
  },
];
