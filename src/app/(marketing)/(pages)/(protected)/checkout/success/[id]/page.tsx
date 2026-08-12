import marketingService from "@/app/(marketing)/_services/index.service";
import {
  CheckCircle,
  MapPin,
  Package,
  Tag,
  Phone,
  Mail,
  Truck,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/helper/formate-date";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ConfettiStars } from "@/app/(marketing)/_components/checkout/check-out-success-confetti";
import RenderCurrency from "@/helper/render-currency";

const CheckoutSuccess = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const orderId = (await params).id;
  const { data: order } = await marketingService.order.getOrderById({
    id: orderId,
  });

  if (!order?.data) {
    return (
      <div className=" min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Order Not Found</h1>
          <p className="text-muted-foreground">
            We couldn't find the order you're looking for. Please check the
            order ID and try again.
          </p>
          <Link href={"/"}>
            <Button className="mt-6" variant="outline">
              Go to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const {
    id,
    orderNumber,
    createdAt,
    paymentStatus,
    deliveryCharge,
    totalAmount,
    orderShippingDetails,
    orderStatus,
    items,
    deliveryType,
    discountAmount,
    discountCode,
    subTotalAmount,
  } = order.data;

  return (
    <div className="min-h-screen bg-background">
      <ConfettiStars />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-success/10 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-green-500  mb-2 text-balance">
            Order Confirmed!
          </h1>
          <p className=" text-green-500 text-lg">
            Thank you for your order. Your order has been successfully placed.
            We will contact you shortly for confirmation.
          </p>
          <Link href="/my-orders" className="mt-4 inline-block">
            <Button variant="default">
              <Package />
              My Orders
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Summary */}
            <Card className="shadow-none border-none">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="w-5 h-5" />
                      Order No:{orderNumber}
                    </CardTitle>
                    <CardDescription>
                      Placed on {formatDate(createdAt)}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge
                      variant={
                        orderStatus === "PENDING" ? "secondary" : "default"
                      }
                    >
                      {orderStatus}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-4 border rounded-lg"
                    >
                      <div className="relative w-16 h-16 bg-muted rounded-md overflow-hidden">
                        <Image
                          src={item.productImage || "/placeholder.svg"}
                          alt={item.productName}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">
                          {item.productName}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Weight: {item.productApproxWeight}g
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-muted-foreground">
                            Qty: {item.quantity}
                          </span>
                          {item.specialPrice < item.unitSellingPrice && (
                            <span className="text-sm line-through text-muted-foreground">
                              <RenderCurrency amount={item.unitSellingPrice} />
                            </span>
                          )}
                          <span className="font-semibold text-foreground">
                            <RenderCurrency amount={item.specialPrice} />
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">
                          <RenderCurrency amount={item.totalPrice} />
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Shipping Details */}
            <Card className="shadow-none border-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  Delivery Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      Shipping Address
                    </h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p className="font-medium text-foreground">
                        {orderShippingDetails?.recipientName}
                      </p>
                      <p>{orderShippingDetails?.addressLine1}</p>
                      <p>{orderShippingDetails?.city}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      Contact Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="w-4 h-4" />
                        {orderShippingDetails?.phoneNumber}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        {orderShippingDetails?.email}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {deliveryType.replace("_", " ")}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">
                      <RenderCurrency amount={subTotalAmount} />
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className="text-foreground">
                      <RenderCurrency amount={deliveryCharge} />
                    </span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        Discount ({discountCode ?? "Arksh Food Point"})
                      </span>
                      <span className="text-success">
                        -<RenderCurrency amount={discountAmount} />
                      </span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span className="text-foreground">Total</span>
                    <span className="text-foreground">
                      <RenderCurrency amount={totalAmount} />
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 text-center space-y-4">
          <p className="text-muted-foreground">
            Need help? Contact our support team or check your order status.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/">
              <Button variant="outline">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
