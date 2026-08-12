"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { IOrderGetAll } from "@/app/(admin)/types/order";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingCart,
  User,
  Package,
  Calendar,
  Mail,
  List,
  BanknoteIcon,
  EyeIcon,
  BoxIcon,
  BoxesIcon,
  XCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  QrCodeIcon,
  Truck,
} from "lucide-react";
import { formatDate } from "@/helper/formate-date";
import { formatToNPR } from "@/helper/format-npr";
import Link from "next/link";
import { adminNavigationPath } from "@/app/(admin)/_config/admin.config";
import { ORDER_STATUS } from "@prisma/client";
import { ro } from "@faker-js/faker";

export const columns: ColumnDef<IOrderGetAll>[] = [
  // Order ID
  {
    accessorKey: "id",
    header: () => (
      <div className="flex items-center gap-2">
        <List className="h-4 w-4" />
        Order ID
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        <Link href={`${adminNavigationPath.orders.path}/${row.original.id}`}>
          <EyeIcon className="inline-block mr-2 h-4 w-4" />
          View Order
        </Link>
      </div>
    ),
  },
  {
    accessorKey: "orderNumber",
    header: () => (
      <div className="flex items-center gap-2">
        <List className="h-4 w-4" />
        Order Number
      </div>
    ),
  },
  // Customer
  {
    accessorKey: "customerName",
    header: () => (
      <div className="flex items-center gap-2">
        <User className="h-4 w-4" />
        Customer
      </div>
    ),
    cell: ({ row }) => {
      const customerName = row.original.customer.userName as string;
      const customerEmail = row.original.customer.email as string;
      const initials = customerName
        .split(" ")
        .map((n) => n[0])
        .join("");
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className=" bg-primary/10 text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{customerName}</span>
            <span className="text-sm text-muted-foreground">
              {customerEmail}
            </span>
          </div>
        </div>
      );
    },
  },
  // Total Amount
  {
    accessorKey: "totalAmount",
    header: () => (
      <div className="flex items-center gap-2">
        <BanknoteIcon className="h-4 w-4" />
        Total Amount
      </div>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalAmount"));
      return <div className="font-medium">{formatToNPR(amount)}</div>;
    },
  },
  {
    accessorKey: "deliveryMethod",
    header: () => (
      <div className="flex items-center gap-2">
        <BoxesIcon className="h-4 w-4" />
        Delivery Method
      </div>
    ),
    cell: ({ row }) => {
      if (!row.original.deliveryMethod) {
        return;
      }
      return (
        <div className="flex items-center">
          {row.original.deliveryMethod === "INSTANT_DELIVERY" && (
            <Badge className=" bg-green-400">
              <Truck />
              {row.original.deliveryMethod}
            </Badge>
          )}
          {row.original.deliveryMethod === "NORMAL_DELIVERY" && (
            <Badge className=" bg-primary">
              <Package />
              {row.original.deliveryMethod}
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "deliveryType",
    header: () => (
      <div className="flex items-center gap-2">
        <BoxesIcon className="h-4 w-4" />
        Delivery Type
      </div>
    ),
  },
  {
    accessorKey: "paymentMethod",
    header: () => (
      <div className="flex items-center gap-2">
        <BoxIcon className="h-4 w-4" />
        Payment Method
      </div>
    ),
    cell: ({ row }) => {
      if (!row.original.paymentMethod) {
        return;
      }
      return (
        <div className="flex items-center">
          {row.original.paymentMethod === "CASH_ON_DELIVERY" && (
            <Badge>
              <Truck />
              {row.original.paymentMethod}
            </Badge>
          )}
          {row.original.paymentMethod === "ONLINE_PAYMENT" && (
            <Badge>
              <QrCodeIcon />
              {row.original.paymentMethod}
            </Badge>
          )}
          {row.original.paymentMethod === "DRAFT" && (
            <Badge className=" bg-slate-600">
              {row.original.paymentMethod}
            </Badge>
          )}
        </div>
      );
    },
  },

  {
    accessorKey: "totalItems",
    header: () => (
      <div className="flex items-center gap-2">
        <ShoppingCart className="h-4 w-4" />
        Items
      </div>
    ),
  },
  // Status
  {
    accessorKey: "status",
    header: () => (
      <div className="flex items-center gap-2">
        <Mail className="h-4 w-4" />
        Status
      </div>
    ),
    cell: ({ row }) => {
      const status = row.original.orderStatus;
      const getStatusVariant = (status: ORDER_STATUS) => {
        switch (status) {
          case "PENDING":
            return "bg-orange-500";
          case "DISPATCHED":
            return "bg-green-500";
          case "CANCELLED":
            return "bg-red-500";
          default:
            return "default";
        }
      };
      return (
        <Badge className={getStatusVariant(status)}>
          {getStatusVariant(status) === "bg-red-500" && (
            <XCircleIcon className="h-4 w-4 mr-1 inline" />
          )}
          {getStatusVariant(status) === "bg-green-500" && (
            <CheckCircleIcon className="h-4 w-4 mr-1 inline" />
          )}
          {getStatusVariant(status) === "bg-orange-500" && (
            <ClockIcon className="h-4 w-4 mr-1 inline" />
          )}
          {status}
        </Badge>
      );
    },
  },
  // payment Status
  {
    accessorKey: "paymentStatus",
    header: () => (
      <div className="flex items-center gap-2">
        <BanknoteIcon className="h-4 w-4" />
        Payment Status
      </div>
    ),
    cell: ({ row }) => {
      const paymentStatus = row.original.paymentStatus;
      const getPaymentStatusVariant = (paymentStatus: string) => {
        switch (paymentStatus) {
          case "PAID":
            return "bg-green-500";
          case "UNPAID":
            return "bg-red-500";
          case "REFUNDED":
            return "bg-blue-500";
          default:
            return "default";
        }
      };
      return (
        <Badge className={getPaymentStatusVariant(paymentStatus)}>
          <BanknoteIcon className="h-4 w-4 mr-1 inline" />
          {paymentStatus}
        </Badge>
      );
    },
  },

  // Ordered Date
  {
    accessorKey: "createdAt",
    header: () => (
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4" />
        Ordered Date
      </div>
    ),
    cell: ({ getValue }) => {
      const value = getValue() as Date;
      return value ? (
        <span className="text-sm text-muted-foreground">
          {formatDate(value)}
        </span>
      ) : (
        ""
      );
    },
  },
];
