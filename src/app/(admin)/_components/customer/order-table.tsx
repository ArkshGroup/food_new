"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  CheckCircle,
  AlertCircle,
  CreditCard,
  EyeIcon,
} from "lucide-react";
import RenderCurrency from "@/helper/render-currency";
import { formatDate } from "@/helper/formate-date";
import { adminNavigationPath } from "../../_config/admin.config";
import Link from "next/link";
import { IGetCustomerById } from "../../types/discount";
import { Button } from "@/components/ui/button";
import { ORDER_STATUS, PAYMENT_STATUS } from "@prisma/client";

interface Order extends Pick<IGetCustomerById, "orders"> {}

export function OrdersTable({ orders }: Order) {
  const getStatusColor = (status: ORDER_STATUS) => {
    switch (status) {
      case ORDER_STATUS.DISPATCHED:
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case ORDER_STATUS.PENDING:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case ORDER_STATUS.CANCELLED:
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  const getPaymentStatusIcon = (status: PAYMENT_STATUS) => {
    switch (status) {
      case PAYMENT_STATUS.PAID:
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case PAYMENT_STATUS.UNPAID:
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case PAYMENT_STATUS.ON_VERIFICATION:
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case PAYMENT_STATUS.REFUNDED:
        return <CreditCard className="h-4 w-4 text-blue-600" />;
      default:
        return <CreditCard className="h-4 w-4 text-gray-600" />;
    }
  };

  if (orders.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8">
            <p className="text-muted-foreground">No orders found</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History ({orders.length} orders)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>View</TableHead>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Subtotal</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Delivery</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <Link
                      href={`${adminNavigationPath.orders.path}/${order.id}`}
                      className=" hover:underline"
                    >
                      <Button variant={"outline"}>
                        <EyeIcon />
                        View Order
                      </Button>
                    </Link>
                  </TableCell>
                  <TableCell className="font-medium">
                    <Link
                      href={`${adminNavigationPath.orders.path}/${order.id}`}
                    >
                      #{order.id}
                    </Link>
                  </TableCell>
                  <TableCell>{formatDate(order.createdAt)}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.orderStatus)}>
                      {order.orderStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getPaymentStatusIcon(order.paymentStatus)}
                      <span className="text-sm">{order.paymentStatus}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <RenderCurrency amount={Number(order.subTotalAmount)} />
                  </TableCell>
                  <TableCell>
                    <RenderCurrency amount={Number(order.discountAmount)} />
                  </TableCell>
                  <TableCell>
                    <RenderCurrency amount={Number(order.deliveryCharge)} />
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    <RenderCurrency amount={Number(order.totalAmount)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
