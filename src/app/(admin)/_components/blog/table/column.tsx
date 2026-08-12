"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  Key,
  User,
  BookOpen,
  Calendar,
  CheckCircle,
  XCircle,
  MoreHorizontal,
} from "lucide-react";
import Link from "next/link";
import { adminNavigationPath } from "@/app/(admin)/_config/admin.config";
import { IGetAllBlogs } from "@/app/(admin)/types/blog";

export const columns: ColumnDef<IGetAllBlogs>[] = [
  {
    accessorKey: "id",
    header: () => (
      <div className="flex items-center space-x-2">
        <Key className="w-4 h-4 text-muted-foreground" />
        <span className="font-semibold">Blog ID</span>
      </div>
    ),
    cell: ({ row }) => (
      <Link
        href={adminNavigationPath.blog.path + "/" + row.original.id}
        className="hover:underline"
      >
        <span className="text-sm text-gray-600 underline font-mono">
          {row.original.id}
        </span>
      </Link>
    ),
  },

  {
    accessorKey: "title",
    header: () => (
      <div className="flex items-center space-x-2">
        <BookOpen className="w-4 h-4 text-blue-600" />
        <span className="font-semibold">Title</span>
      </div>
    ),
    cell: ({ row }) => (
      <span className="font-medium">{row.original.title}</span>
    ),
  },
  {
    accessorKey: "author",
    header: () => (
      <div className="flex items-center space-x-2">
        <User className="w-4 h-4 text-purple-600" />
        <span className="font-semibold">Author</span>
      </div>
    ),
    cell: ({ row }) => (
      <span className="capitalize">{row.original.author || "N/A"}</span>
    ),
  },
  {
    accessorKey: "isPublished",
    header: () => (
      <div className="flex items-center space-x-2">
        <CheckCircle className="w-4 h-4 text-green-500" />
        <span className="font-semibold">Published</span>
      </div>
    ),
    cell: ({ row }) =>
      row.original.isPublished ? (
        <span className="flex items-center gap-1 text-green-600 text-sm">
          <CheckCircle className="w-4 h-4" /> Published
        </span>
      ) : (
        <span className="flex items-center gap-1 text-red-600 text-sm">
          <XCircle className="w-4 h-4" /> Draft
        </span>
      ),
  },
  {
    accessorKey: "createdAt",
    header: () => (
      <div className="flex items-center space-x-2">
        <Calendar className="w-4 h-4 text-orange-500" />
        <span className="font-semibold">Created At</span>
      </div>
    ),
    cell: ({ row }) => (
      <span className="text-sm">
        {new Date(row.original.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </span>
    ),
  },
];
