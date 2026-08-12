"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IGetAllCustomer } from "@/app/(admin)/types/customer";
// Assuming you have an Action component
import Action from "./action";

// Import Lucide icons
import {
  Mail,
  User,
  Calendar,
  Key,
  CheckCircle,
  Gavel,
  MoreHorizontal,
} from "lucide-react";
import Link from "next/link";
import { adminNavigationPath } from "@/app/(admin)/_config/admin.config";
import { formatDate } from "@/helper/formate-date";

// The IGetAllCustomer interface based on your Prisma model
// interface IGetAllCustomer extends Prisma.UserGetPayload<{}> {}
// (assuming this is imported correctly from "@/app/(admin)/types/customer")

export const columns: ColumnDef<IGetAllCustomer>[] = [
  // --- ID Column (Optional but useful for debugging/reference) ---
  {
    accessorKey: "id",
    header: ({ column }) => (
      <div className="flex items-center space-x-2">
        <Key className="w-4 h-4 text-muted-foreground" />
        <span className="font-semibold">Customer ID</span>
      </div>
    ),
    cell: ({ row }) => (
      <Link
        href={adminNavigationPath.customer.path + "/" + row.original.id}
        className="hover:underline"
      >
        <span className="text-sm text-gray-500 underline font-mono">
          {row.original.id}
        </span>
      </Link>
    ),
  },
  // --- Name Column ---
  {
    accessorKey: "userName", // Use userName from your schema
    header: ({ column }) => (
      <div className="flex items-center space-x-2">
        <User className="w-4 h-4 text-blue-500" />
        <span className="font-semibold">Name</span>
      </div>
    ),
    cell: ({ row }) => (
      <span className="font-medium capitalize">
        {row.original.userName || "N/A"}
      </span>
    ),
  },
  // --- Email Column ---
  {
    accessorKey: "email",
    header: ({ column }) => (
      <div className="flex items-center space-x-2">
        <Mail className="w-4 h-4 text-red-500" />
        <span className="font-semibold">Email</span>
      </div>
    ),
  },
  // --- Country Column (New) ---
  {
    accessorKey: "arkshFoodPoint",
    header: ({ column }) => (
      <div className="flex items-center space-x-2">
        <span className="font-semibold">Arksh Food Points </span>
      </div>
    ),
    cell: ({ row }) => (
      <span className="capitalize">
        {Number(row.original.arkshFoodPoint) || "N/A"}
      </span>
    ),
  },
  // --- Role Column (New) ---
  {
    accessorKey: "role",
    header: ({ column }) => (
      <div className="flex items-center space-x-2">
        <Gavel className="w-4 h-4 text-purple-500" />
        <span className="font-semibold">Role</span>
      </div>
    ),
    cell: ({ row }) => (
      <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">
        {row.original.role}
      </span>
    ),
  },
  // --- Created At Column (Improved Formatting) ---
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <div className="flex items-center space-x-2">
        <Calendar className="w-4 h-4 text-orange-500" />
        <span className="font-semibold">Joined At</span>
      </div>
    ),
    cell: ({ row }) => (
      <span className="text-sm">{formatDate(row.original.createdAt)}</span>
    ),
  },
];
