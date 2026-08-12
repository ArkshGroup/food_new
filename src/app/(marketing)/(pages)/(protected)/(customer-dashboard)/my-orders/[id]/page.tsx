import marketingService from "@/app/(marketing)/_services/index.service";
import {
  MapPin,
  Package,
  Tag,
  Phone,
  Mail,
  Truck,
  TruckIcon,
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
import RenderCurrency from "@/helper/render-currency";
import { PaymentMethodSelector } from "@/app/(marketing)/_components/payment-method/payment-method-container";

const ImagePreview = ({ src }: { src: string }) => (
  <div className="relative mt-4 border-2 border-border rounded-lg overflow-hidden bg-muted/30">
    <img
      src={src || "/placeholder.svg"}
      alt="Payment Screenshot Preview"
      className="w-full h-auto object-contain "
    />
  </div>
);

const OrderDetailRootPage = async ({
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
    paymentScreenShot,
    paymentMethod,
    items,
    deliveryType,
    discountAmount,
    discountCode,
    trackingNumber,
    subTotalAmount,
  } = order.data;

  const isInternationalDelivery = deliveryType === "INTERNATIONAL";
  const isPaymentMethodAvailable = paymentMethod === "DRAFT";

  return (
    <div className="space-y-6 font-sans pb-12">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Order Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Summary */}
          <Card className="bg-white rounded-3xl border border-[#E8E2D9] shadow-xs overflow-hidden">
            <CardHeader className="bg-[#FAF8F5] border-b border-[#E8E2D9] p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle className="flex items-center gap-2 text-xl font-serif font-bold text-[#1C1917]">
                    <Package className="w-5 h-5 text-[#0555A2]" />
                    Order #{orderNumber}
                  </CardTitle>
                  <CardDescription className="text-xs text-stone-500 mt-1">
                    Placed on {formatDate(createdAt)}
                  </CardDescription>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-bold text-stone-500">Status:</span>
                  <Badge className="bg-[#0555A2] text-white hover:bg-[#0555A2] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {orderStatus}
                  </Badge>
                  {paymentMethod && (
                    <>
                      <span className="font-bold text-stone-500 ml-1">Payment:</span>
                      <Badge className="bg-sky-50 text-[#0555A2] border border-sky-100 hover:bg-sky-50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        {paymentMethod}
                      </Badge>
                    </>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 border border-[#E8E2D9]/80 rounded-2xl bg-[#FAF8F5]/60 hover:bg-white transition-all shadow-2xs"
                  >
                    <div className="relative w-16 h-16 bg-white border border-[#E8E2D9] rounded-xl overflow-hidden shrink-0 shadow-2xs">
                      <Image
                        src={item.productImage || "/placeholder.svg"}
                        alt={item.productName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif font-bold text-[#1C1917] text-sm sm:text-base truncate">
                        {item.productName}
                      </h3>
                      <p className="text-xs text-stone-500 font-sans mt-0.5">
                        Approx Weight: {item.productApproxWeight}g
                      </p>
                      <div className="flex items-center gap-2 mt-1.5 text-xs font-sans">
                        <span className="px-2 py-0.5 rounded-md bg-stone-100 font-bold text-stone-600">
                          Qty: {item.quantity}
                        </span>
                        {item.specialPrice < item.unitSellingPrice && (
                          <span className="line-through text-stone-400">
                            <RenderCurrency amount={item.unitSellingPrice} />
                          </span>
                        )}
                        <span className="font-bold text-[#0555A2]">
                          <RenderCurrency amount={item.specialPrice} />
                        </span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[10px] uppercase font-bold text-stone-400 block">
                        Total
                      </span>
                      <p className="font-serif font-bold text-[#0555A2] text-base sm:text-lg">
                        <RenderCurrency amount={item.totalPrice} />
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {trackingNumber && (
            <div className="bg-white rounded-3xl border border-[#E8E2D9] p-6 shadow-xs flex items-center justify-between">
              <div>
                <h4 className="font-serif font-bold text-[#1C1917] text-sm">
                  Shipment Tracking
                </h4>
                <p className="text-xs text-stone-500 font-sans">Consignment ID: {trackingNumber}</p>
              </div>
              <Link
                href={
                  trackingNumber.startsWith("http")
                    ? trackingNumber
                    : `https://parcel.pathao.com/tracking?consignment_id=${trackingNumber}`
                }
                target="_blank"
              >
                <Button className="bg-[#0555A2] hover:bg-[#034484] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-xs">
                  <TruckIcon className="w-4 h-4 mr-1.5" /> Track Package
                </Button>
              </Link>
            </div>
          )}

          {order.data.paymentScreenShot && (
            <Card className="bg-white rounded-3xl border border-[#E8E2D9] shadow-xs p-6">
              <h2 className="text-base font-serif font-bold text-[#1C1917] mb-2">Payment Receipt</h2>
              <ImagePreview src={order.data.paymentScreenShot!} />
            </Card>
          )}

          {isPaymentMethodAvailable && (
            <PaymentMethodSelector
              deliveryMethod={order.data.deliveryMethod}
              orderId={order.data.id}
              deliveryType={order.data.deliveryType}
              paymentMethod={order.data.paymentMethod}
            />
          )}

          {/* Delivery Details */}
          <Card className="bg-white rounded-3xl border border-[#E8E2D9] shadow-xs overflow-hidden">
            <CardHeader className="bg-[#FAF8F5] border-b border-[#E8E2D9] p-6">
              <CardTitle className="flex items-center gap-2 text-base font-serif font-bold text-[#1C1917]">
                <Truck className="w-5 h-5 text-[#0555A2]" />
                Delivery Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-[#0555A2]">
                    Shipping Address
                  </h4>
                  <div className="space-y-1 text-xs text-stone-600 font-sans leading-relaxed">
                    <p className="font-bold capitalize text-[#1C1917] text-sm">
                      {orderShippingDetails?.recipientName}
                    </p>
                    <p>{orderShippingDetails?.addressLine1}</p>
                    <p>{orderShippingDetails?.city}, {orderShippingDetails?.zone}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-[#0555A2]">
                    Contact Details
                  </h4>
                  <div className="space-y-2 text-xs font-sans">
                    <div className="flex items-center gap-2 text-stone-700">
                      <Phone className="w-4 h-4 text-[#28AAE0]" />
                      <span>{orderShippingDetails?.phoneNumber}</span>
                    </div>
                    <div className="flex items-center gap-2 text-stone-700">
                      <Mail className="w-4 h-4 text-[#28AAE0]" />
                      <span>{orderShippingDetails?.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-stone-700">
                      <MapPin className="w-4 h-4 text-[#28AAE0]" />
                      <span>{deliveryType.replace("_", " ")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary Sidebar */}
        <div className="space-y-6">
          <Card className="bg-white rounded-3xl border border-[#E8E2D9] shadow-xs overflow-hidden">
            <CardHeader className="bg-[#FAF8F5] border-b border-[#E8E2D9] p-5">
              <CardTitle className="font-serif font-bold text-base text-[#1C1917]">
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-4 font-sans">
              <div className="space-y-2.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#1C1917]">
                    <RenderCurrency amount={subTotalAmount} />
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charge</span>
                  <span className="font-bold text-[#1C1917]">
                    <RenderCurrency amount={deliveryCharge} />
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#0555A2] font-bold">
                    <span className="flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5" />
                      Discount ({discountCode ?? "PROMO"})
                    </span>
                    <span>-<RenderCurrency amount={discountAmount} /></span>
                  </div>
                )}
              </div>

              <Separator className="bg-[#E8E2D9]" />

              <div className="flex justify-between font-serif font-bold text-base text-[#1C1917]">
                <span>Total Paid</span>
                <span className="text-[#0555A2]">
                  <RenderCurrency amount={totalAmount} />
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-8 text-center space-y-3 pt-6 border-t border-[#E8E2D9]">
        <p className="text-xs text-stone-500 font-sans">
          Need assistance with this order? Our support team is ready to help.
        </p>
        <Link href="/contact">
          <Button className="bg-[#0555A2] hover:bg-[#034484] text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-xs">
            Contact Customer Support
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default OrderDetailRootPage;
