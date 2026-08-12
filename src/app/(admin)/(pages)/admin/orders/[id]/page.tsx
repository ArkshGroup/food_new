import React from "react";
import { adminService } from "@/app/(admin)/_services/index.service";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User,
  MapPin,
  Calendar,
  ShoppingCart,
  Truck,
  BanknoteIcon,
  WeightIcon,
  BoxesIcon,
  MapPinIcon,
  TruckIcon,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Decimal } from "decimal.js";
import { formatToNPR } from "@/helper/format-npr";
import OrderEditDialog from "@/app/(admin)/_components/order/edit-order.dialog";
import { cn } from "@/lib/utils";
import {
  DELIVERY_METHOD,
  DELIVERY_TYPE,
  PAYMENT_METHOD,
  PAYMENT_STATUS,
} from "@prisma/client";
import Link from "next/link";
import { adminNavigationPath } from "@/app/(admin)/_config/admin.config";
import CreatePathaoOrder from "@/app/(admin)/_components/order/create-pathoo-order";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/helper/formate-date";

export default async function OrderDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data } = await adminService.order.getOrderById({ id: id });
  const order = data?.data!;

  const getOrderStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-600";
      case "delivered":
        return "bg-green-100 text-green-800 border-green-600";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-600";
      default:
        return "bg-gray-100 text-gray-800 border-gray-600";
    }
  };

  const getPaymentStatusColor = (status: PAYMENT_STATUS) => {
    switch (status) {
      case "PAID":
        return "bg-green-100 text-green-800 border-green-600";
      case "UNPAID":
        return "bg-yellow-100 text-yellow-800 border-yellow-600";
      case "REFUNDED":
        return "bg-red-100 text-red-800 border-red-600";
      default:
        return "bg-gray-100 text-gray-800 border-gray-600";
    }
  };

  const getDeliveryTypeColor = (type: DELIVERY_TYPE) => {
    switch (type) {
      case "INSIDE_VALLEY":
        return "bg-green-100 text-green-800 border-green-600";
      case "OUTSIDE_VALLEY":
        return "bg-yellow-100 text-yellow-800 border-yellow-600";
      case "INTERNATIONAL":
        return "bg-primary text-primary-foreground border-primary";
      default:
        return "bg-gray-100 text-gray-800 border-gray-600";
    }
  };

  const getDeliveryMethodColor = (method: DELIVERY_METHOD) => {
    switch (method) {
      case "INSTANT_DELIVERY":
        return "bg-green-100 text-green-800 border-green-600";
      case "SELF_COURIER":
        return "bg-yellow-100 text-yellow-800 border-yellow-600";
      case "NORMAL_DELIVERY":
        return "bg-primary text-primary-foreground border-primary";
      default:
        return "bg-gray-100 text-gray-800 border-gray-600";
    }
  };

  const getPaymentMethodColor = (method: PAYMENT_METHOD) => {
    switch (method) {
      case "CASH_ON_DELIVERY":
        return "bg-green-100 text-green-800 border-green-600";
      case "ONLINE_PAYMENT":
        return "bg-primary text-primary-foreground border-primary";
      default:
        return "bg-gray-100 text-gray-800 border-gray-600";
    }
  };

  const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalWeight = order.items.reduce(
    (sum, item) =>
      sum +
      item.quantity * Number.parseFloat(item.productApproxWeight.toString()),
    0
  );

  const isPathooOrderDisabled =
    order.deliveryMethod === "INSTANT_DELIVERY" ||
    order.deliveryMethod === "SELF_COURIER" ||
    order.paymentMethod === "DRAFT" ||
    order.deliveryType === "INTERNATIONAL" ||
    order.orderStatus === "DISPATCHED" ||
    order.orderStatus === "CANCELLED" ||
    order.trackingNumber !== null;

  return (
    <div className="min-h-screen bg-background p-2 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex  flex-col md:flex-row   md:items-center justify-between">
          <div>
            <p className=" py-2">Order Id : {order.id}</p>
            <p className="py-2">Order Number : {order.orderNumber}</p>
            <p className="py-2">
              {!isPathooOrderDisabled &&
                "Tracking Number : " + (order.trackingNumber || "Not Assigned")}
            </p>
            <CreatePathaoOrder
              isDisabled={isPathooOrderDisabled}
              paymentScreenShot={order.paymentScreenShot}
              orderNumber={order.orderNumber}
            />
            {order.trackingNumber && (
              <div className="py-2">
                <Link
                  href={
                    order.trackingNumber.startsWith("http")
                      ? order.trackingNumber
                      : `https://parcel.pathao.com/tracking?consignment_id=${order.trackingNumber}`
                  }
                  target="_blank"
                  className="text-primary "
                >
                  <Button>
                    <TruckIcon /> Track Order
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <OrderEditDialog
              orderId={order.id}
              paymentStatus={order.paymentStatus}
              orderStatus={order.orderStatus}
            />
          </div>
        </div>

        {/* Order Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center font-medium gap-x-2 text-muted-foreground">
                <ShoppingCart />
                Total Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <span className="text-2xl font-bold">{totalItems}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center font-medium text-muted-foreground">
                <BanknoteIcon className="w-4 h-4 mr-2" />
                Total Amount
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <span className="text-2xl font-bold">
                  {formatToNPR(order.totalAmount)}
                </span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center font-medium text-muted-foreground">
                <WeightIcon className="w-4 h-4 mr-2" />
                Approx Weight (gm)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <span className="text-2xl font-bold">
                  {Number(totalWeight.toFixed(2))} gm
                  <span className="text-sm text-muted-foreground ml-2">
                    ({(totalWeight / 1000).toFixed(2)} kg)
                  </span>
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center font-medium gap-x-2 text-muted-foreground">
                <BoxesIcon />
                Sales Channel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-lg font-semibold">
                {order.salesChannel}
              </span>
            </CardContent>
          </Card>

          <Card className="pb-2 p-2 flex items-start  flex-col justify-start  space-y-2">
            <CardTitle className="text-sm flex items-center gap-x-2 font-medium text-muted-foreground">
              <div
                className={cn(
                  getOrderStatusColor(order.orderStatus),
                  " size-2 rounded-full border "
                )}
              />
              Order Status
              <Badge className={getOrderStatusColor(order.orderStatus)}>
                {order.orderStatus}
              </Badge>
            </CardTitle>
            <CardTitle className="text-sm flex items-center gap-x-2 font-medium text-muted-foreground">
              <div
                className={cn(
                  getPaymentStatusColor(order.paymentStatus),
                  " size-2 rounded-full border "
                )}
              />
              Payment Status
              <Badge className={getPaymentStatusColor(order.paymentStatus)}>
                {order.paymentStatus}
              </Badge>
            </CardTitle>
            <CardTitle className="text-sm flex items-center gap-x-2 font-medium text-muted-foreground">
              <div
                className={cn(
                  getDeliveryTypeColor(order.deliveryType),
                  " size-2 rounded-full border "
                )}
              />
              Delivery Type
              <Badge className={getDeliveryTypeColor(order.deliveryType)}>
                {order.deliveryType}
              </Badge>
            </CardTitle>
            <CardTitle className="text-sm flex items-center gap-x-2 font-medium text-muted-foreground">
              <div
                className={cn(
                  getDeliveryMethodColor(order.deliveryMethod),
                  " size-2 rounded-full border "
                )}
              />
              Delivery Method
              <Badge className={getDeliveryMethodColor(order.deliveryMethod)}>
                {order.deliveryMethod}
              </Badge>
            </CardTitle>
            <CardTitle className="text-sm flex items-center gap-x-2 font-medium text-muted-foreground">
              <div
                className={cn(
                  getPaymentMethodColor(order.paymentMethod),
                  " size-2 rounded-full border "
                )}
              />
              Payment Method
              <Badge className={getPaymentMethodColor(order.paymentMethod)}>
                {order.paymentMethod}
              </Badge>
            </CardTitle>
          </Card>

          {/* Order Timeline */}
          <Card className="">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Order Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Order Created</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500  rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Order Updated At </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(order.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className=" md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-semibold flex items-center gap-x-2 text-foreground">
                  <Avatar>
                    <AvatarFallback className=" bg-primary/10 text-primary">
                      {(order.customer.userName ?? "")
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {order.customer.userName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {order.customer.email}
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm capitalize">
                <MapPin className="w-4 h-4 text-muted-foreground " />
                <span>
                  {order.customer.country}, {order.customer.zipCode}
                </span>
              </div>

              <div className="text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>Joined: {formatDate(order.customer.createdAt)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Products List */}
          <div className="lg:col-span-4">
            {/* Order Calculation Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Order Calculation Details
                </CardTitle>
                <CardDescription>
                  Complete breakdown of pricing and calculations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2 font-medium text-muted-foreground">
                          Image
                        </th>
                        <th className="text-left py-3 px-2 font-medium text-muted-foreground">
                          Product
                        </th>
                        <th className="text-left py-3 px-2 font-medium text-muted-foreground">
                          Weight (gm)
                        </th>
                        <th className="text-right py-3 px-2 text-nowrap font-medium text-muted-foreground">
                          Original Price
                        </th>
                        <th className="text-right py-3 px-2 font-medium text-muted-foreground">
                          Discount
                        </th>
                        <th className="text-center py-3 px-2 font-medium text-muted-foreground">
                          Quantity
                        </th>
                        <th className="text-right py-3 px-2 text-nowrap font-medium text-muted-foreground">
                          Unit Sale Price
                        </th>
                        <th className="text-right py-3 px-2 font-medium text-muted-foreground">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item) => (
                        <tr key={item.id} className="border-b">
                          <td className="py-4 px-2">
                            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                              <img
                                src={item.productImage}
                                alt={item.productName}
                                width={48}
                                height={48}
                                className="object-cover rounded-md"
                              />
                            </div>
                          </td>
                          <td className="py-4 px-2">
                            <p className="font-medium text-foreground">
                              <Link
                                className=" text-primary"
                                href={`${adminNavigationPath.products.path}/${item.productId}`}
                              >
                                {item.productName}
                              </Link>
                            </p>
                          </td>
                          <td className="py-4 px-2">
                            {new Decimal(item.productApproxWeight).toFixed(2)}
                          </td>
                          <td className="py-4 px-2 text-right font-medium">
                            {new Decimal(item.unitSellingPrice).toFixed(2)}
                          </td>
                          <td className="py-4 px-2 text-right">
                            <div>
                              <p className="font-medium text-green-600">
                                {(
                                  ((Number(item.unitSellingPrice) -
                                    Number(item.specialPrice)) /
                                    Number(item.unitSellingPrice)) *
                                  100
                                ).toFixed(2)}
                                %
                              </p>
                              <p className="text-sm text-muted-foreground"></p>
                            </div>
                          </td>
                          <td className="py-4 px-2 text-center font-medium">
                            {item.quantity}
                          </td>
                          <td className="py-4 px-2 text-right font-medium">
                            {new Decimal(item.specialPrice).toFixed(2)}
                          </td>
                          <td className="py-4 px-2 text-right font-bold">
                            {new Decimal(item.totalPrice).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 flex justify-end">
                  <div className="w-80 space-y-3">
                    <div className="flex justify-between items-center py-2">
                      <span className="font-medium text-muted-foreground">
                        Subtotal
                      </span>
                      <span className="font-bold text-lg">
                        {formatToNPR(order.subTotalAmount)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="font-medium text-muted-foreground flex flex-col">
                        Delivery Fee
                        <span className="text-xs font-normal text-muted-foreground flex flex-col">
                          <span>({order.deliveryType})</span>
                          <span>({order.deliveryMethod})</span>
                        </span>
                      </span>
                      <span className="font-medium">
                        {formatToNPR(order.deliveryCharge)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="font-medium  flex  flex-col text-muted-foreground">
                        Discount Amount
                        {order.discountAmount.greaterThan(0) && (
                          <span className=" text-sm font-normal text-muted-foreground">
                            (discount code:{" "}
                            {order.discountCode ||
                              `${order.arkshFoodPoint.toNumber()} Arksh Food Points`}
                            )
                          </span>
                        )}
                      </span>
                      <span className="font-medium">
                        -{formatToNPR(order.discountAmount)}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center py-2">
                      <span className="font-bold text-lg">Order Total</span>
                      <span className="font-bold text-xl text-primary">
                        {formatToNPR(order.totalAmount)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Customer & Shipping Info */}
          <div className="space-y-6  gap-6 grid grid-cols-4  lg:col-span-4">
            {/* shipping  Information */}
            {order.orderShippingDetails && (
              <>
                <Card className=" col-span-4">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Truck className="w-5 h-5 text-primary" />
                      Shipping Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-lg">
                    <div>
                      <p className="font-semibold text-foreground">
                        Recipient Name:{" "}
                        {order.orderShippingDetails.recipientName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Shipping Email:
                        <a
                          className="ml-2 text-primary"
                          href={`mailto:${order.orderShippingDetails.email}`}
                        >
                          {order.orderShippingDetails.email}
                        </a>
                      </p>
                      <p className="text-sm text-muted-foreground flex items-center">
                        Phone Number:
                        <a
                          className="ml-2 text-primary"
                          href={`tel:${order.orderShippingDetails.phoneNumber}`}
                        >
                          {order.orderShippingDetails.phoneNumber}
                        </a>
                      </p>
                      {order.orderShippingDetails.country && (
                        <p className="text-sm text-muted-foreground">
                          Country: {order.orderShippingDetails.country}
                        </p>
                      )}
                    </div>

                    <Separator />

                    <div className="text-sm   space-y-1">
                      <p className="flex items-center gap-2">
                        Street Address :{" "}
                        {order.orderShippingDetails.addressLine1}
                      </p>
                      {order.orderShippingDetails.city && (
                        <span className="ml-2 ">
                          City : {order.orderShippingDetails.city}
                        </span>
                      )}
                      {order.orderShippingDetails.zone && (
                        <span className="ml-2 ">
                          Pickup Zone : {order.orderShippingDetails.zone}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
                {order.orderShippingDetails.latitude &&
                  order.orderShippingDetails.longitude && (
                    <Card className=" col-span-4">
                      <iframe
                        src={`https://www.google.com/maps?q=${order.orderShippingDetails.latitude},${order.orderShippingDetails.longitude}&hl=es;z=14&output=embed`}
                        width="600"
                        height="450"
                        className=" w-full h-96 rounded-md border"
                        loading="lazy"
                      ></iframe>
                    </Card>
                  )}
              </>
            )}

            {/* Payment Screenshot */}
            {order.paymentScreenShot && order.paymentScreenShot.length > 0 && (
              <Card className=" col-span-2 w-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BanknoteIcon className="w-5 h-5 text-primary" />
                    Payment Screenshot
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3  w-fit ">
                  {order.paymentScreenShot && (
                    <img
                      src={order.paymentScreenShot}
                      alt="Payment Screenshot"
                      width={400}
                      height={400}
                      className="object-contain rounded-md border"
                    />
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
