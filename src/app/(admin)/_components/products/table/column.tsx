"use client";

import { adminNavigationPath } from "@/app/(admin)/_config/admin.config";
import { IGetAllProducts } from "@/app/(admin)/types/products";
import { Badge } from "@/components/ui/badge";
import { formatToNPR } from "@/helper/format-npr";
import { formatDate } from "@/helper/formate-date";
import type { ColumnDef } from "@tanstack/react-table";
import {
  Activity,
  Boxes,
  BoxesIcon,
  CalendarDays,
  CheckCircle2,
  DollarSign,
  Image as ImageIcon,
  Package,
  Percent,
  Rocket,
  Sparkles,
  StarIcon,
  Tag,
  TagsIcon,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const columns: ColumnDef<IGetAllProducts>[] = [
  {
    accessorKey: "image",
    header: () => (
      <div className="flex items-center gap-1">
        <ImageIcon className="h-4 w-4" /> Image
      </div>
    ),
    cell: ({ row }) => {
      const imageUrl = row.original.images?.imageUrl || "/images/cover.jpg";
      return (
        <Link
          className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-md"
          href={`${adminNavigationPath.products.path}/${row.original.id}/edit`}
        >
          <Image
            alt={row.original.name}
            className="h-full w-full object-cover"
            height={80}
            src={imageUrl}
            width={80}
          />
        </Link>
      );
    },
  },
  {
    accessorKey: "name",
    header: () => (
      <div className="flex items-center gap-1">
        <Package className="h-4 w-4" /> Name
      </div>
    ),
    cell: ({ row }) => (
      <Link
        className="font-medium text-blue-600 underline"
        href={`${adminNavigationPath.products.path}/${row.original.id}`}
      >
        {row.getValue("name")}
      </Link>
    ),
  },
  {
    accessorKey: "unitSellingPrice",
    header: () => (
      <div className="flex items-center gap-1">
        <DollarSign className="h-4 w-4" />
        Unit Selling Price
      </div>
    ),
    cell: ({ row }) => (
      <span className="font-medium">
        <span className="mr-1 font-bold">
          {formatToNPR(row.original.unitSellingPrice)}
        </span>
      </span>
    ),
  },
  {
    accessorKey: "specialPrice",
    header: () => (
      <div className="flex items-center gap-1">
        <DollarSign className="h-4 w-4" />
        Special Price
      </div>
    ),
    cell: ({ row }) => (
      <span className="font-medium">
        <span className="mr-1 font-bold">
          {formatToNPR(row.original.specialPrice)}
        </span>
      </span>
    ),
  },
  {
    accessorKey: "specialPrice",
    header: () => (
      <div className="flex items-center gap-1">
        <Percent className="h-4 w-4" />% Off Price
      </div>
    ),
    cell: ({ row }) => (
      <span className="font-medium">
        <span className="mr-1 font-bold">
          {row.original.unitSellingPrice && row.original.specialPrice
            ? Math.round(
                ((row.original.unitSellingPrice - row.original.specialPrice) /
                  row.original.unitSellingPrice) *
                  100
              ).toFixed(2) + "%"
            : "N/A"}
        </span>
      </span>
    ),
  },
  {
    accessorKey: "stock",
    header: () => (
      <div className="flex items-center gap-1">
        <Boxes className="h-4 w-4" /> Stock
      </div>
    ),
    cell: ({ row }) => {
      const stock = row.original.stockQuantity;
      if (stock > 10) {
        return <Badge className="bg-green-400">{stock} In Stock</Badge>;
      }
      if (stock > 0) {
        return <Badge variant="outline">{stock} Low Stock</Badge>;
      }
      return <Badge variant="destructive">Out of Stock</Badge>;
    },
  },
  {
    accessorKey: "categoryName",
    header: () => (
      <div className="flex items-center gap-1">
        <TagsIcon className="h-4 w-4" /> Category
      </div>
    ),
    cell: ({ row }) => {
      const categoryName = row.original.categoryName;
      return categoryName ? (
        <Badge variant="secondary">
          <Tag className="mr-1 h-3 w-3" /> {categoryName}
        </Badge>
      ) : (
        <Badge variant="outline">No Category </Badge>
      );
    },
  },
  {
    accessorKey: "onSale",
    header: () => (
      <div className="flex items-center gap-1">
        <Rocket className="h-4 w-4" /> On Sale
      </div>
    ),
    cell: ({ row }) => {
      const onSale = row.original.onSale;
      return onSale ? (
        <Badge className="bg-green-500">
          <CheckCircle2 className="mr-1 h-3 w-3" /> Yes
        </Badge>
      ) : (
        <Badge variant="outline">
          <XCircle className="mr-1 h-3 w-3" /> No
        </Badge>
      );
    },
  },
  {
    accessorKey: "isWholeSale",
    header: () => (
      <div className="flex items-center gap-1">
        <BoxesIcon className="h-4 w-4" /> Whole Sale
      </div>
    ),
    cell: ({ row }) => {
      const isWholeSale = row.original.isWholeSale;
      return isWholeSale ? (
        <Badge className="bg-green-500">
          <CheckCircle2 className="mr-1 h-3 w-3" /> Yes
        </Badge>
      ) : (
        <Badge variant="outline">
          <XCircle className="mr-1 h-3 w-3" /> No
        </Badge>
      );
    },
  },
  {
    accessorKey: "isFeatured",
    header: () => (
      <div className="flex items-center gap-1">
        <Sparkles className="h-4 w-4" /> Featured
      </div>
    ),
    cell: ({ row }) => {
      const isFeatured = row.original.isFeatured;
      return isFeatured ? (
        <Badge className="bg-green-500">
          <CheckCircle2 className="mr-1 h-3 w-3" /> Yes
        </Badge>
      ) : (
        <Badge variant="outline">
          <XCircle className="mr-1 h-3 w-3" /> No
        </Badge>
      );
    },
  },
  {
    accessorKey: "isNewProduct",
    header: () => (
      <div className="flex items-center gap-1">
        <StarIcon className="h-4 w-4" /> New Product
      </div>
    ),
    cell: ({ row }) => {
      const isNewProduct = row.original.isNewProduct;
      return isNewProduct ? (
        <Badge className="bg-green-500">
          <CheckCircle2 className="mr-1 h-3 w-3" /> Yes
        </Badge>
      ) : (
        <Badge variant="outline">
          <XCircle className="mr-1 h-3 w-3" /> No
        </Badge>
      );
    },
  },
  {
    accessorKey: "isVisible",
    header: () => (
      <div className="flex items-center gap-1">
        <Activity className="h-4 w-4" /> Status
      </div>
    ),
    cell: ({ row }) => {
      const isVisible = row.original.isVisible;
      return isVisible ? (
        <Badge className="bg-green-500">
          <CheckCircle2 className="mr-1 h-3 w-3" /> Visible
        </Badge>
      ) : (
        <Badge variant="destructive">
          <XCircle className="mr-1 h-3 w-3" /> Not Visible
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: () => (
      <div className="flex items-center gap-1">
        <CalendarDays className="h-4 w-4" /> Created At
      </div>
    ),
    cell: ({ row }) => formatDate(row.getValue("createdAt")),
  },
];
