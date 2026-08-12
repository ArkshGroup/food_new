import marketingService from "@/app/(marketing)/_services/index.service";
import { Package, Tag, CheckCircle2, Calendar, ShoppingBag, ArrowRight } from "lucide-react";
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
  <div className="relative mt-4 border-2 border-[#E8E2D9] rounded-2xl overflow-hidden bg-white shadow-md">
    <img
      src={src || "/placeholder.svg"}
      alt="Payment Screenshot Preview"
      className="w-full h-auto object-contain max-h-[400px]"
    />
  </div>
);

const CheckoutSuccess = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const orderId = (await params).id;
  const { data: order } =
    await marketingService.order.getOrderByIdDuringCheckout({
      id: orderId,
    });

  if (!order?.data) {
    return (
      <div className="min-h-[70vh] bg-[#F0F7FD] flex items-center justify-center px-4 font-sans">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-[#E8E2D9] shadow-xl text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-red-50 text-red-500 border border-red-100 flex items-center justify-center mx-auto">
            <Package className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-[#1C1917]">Order Not Found</h1>
          <p className="text-sm text-stone-500 leading-relaxed font-sans">
            We couldn't find the order details for ID: <span className="font-mono text-[#0555A2]">{orderId}</span>. Please verify and try again.
          </p>
          <Link href="/">
            <Button className="w-full h-11 bg-[#0555A2] hover:bg-[#28AAE0] text-white rounded-xl font-bold font-sans transition-colors">
              Return to Homepage
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
    deliveryCharge,
    totalAmount,
    orderStatus,
    items,
    discountAmount,
    discountCode,
    subTotalAmount,
  } = order.data;

  return (
    <div className="min-h-screen bg-[#F0F7FD] pb-20 font-sans">
      {/* Top Banner Status Section */}
      <div className="bg-white border-b border-[#E8E2D9] py-8 sm:py-10 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Gourmet Porcelain Plate Icon */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-b from-white via-[#F0F7FD] to-[#E2EEF8] border-2 border-white shadow-xs ring-1 ring-[#0555A2]/15 flex items-center justify-center shrink-0">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-sky-100 shadow-inner flex items-center justify-center text-[#0555A2]">
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#0555A2]" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#1C1917]">
                    Order #{orderNumber}
                  </h1>
                  <Badge
                    className={
                      orderStatus === "PENDING"
                        ? "bg-amber-100 text-amber-800 border-amber-200"
                        : "bg-[#F0F7FD] text-[#0555A2] border-[#0555A2]/30"
                    }
                  >
                    {orderStatus}
                  </Badge>
                </div>
                <p className="text-xs sm:text-sm text-stone-500 flex items-center gap-1.5 mt-0.5 font-sans">
                  <Calendar className="w-3.5 h-3.5 text-[#28AAE0]" />
                  Placed on {formatDate(createdAt)}
                </p>
              </div>
            </div>

            <Link href="/my-orders">
              <Button
                variant="outline"
                className="h-10 rounded-xl border-[#E8E2D9] hover:bg-[#F0F7FD] text-[#0555A2] text-xs font-bold font-sans flex items-center gap-1.5"
              >
                <span>View All Orders</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>

          <div className="mt-4 p-4 rounded-2xl bg-[#F0F7FD] border border-[#0555A2]/20 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#0555A2] animate-ping" />
            <p className="text-xs sm:text-sm text-[#0555A2] font-medium font-sans">
              Your order has been created successfully! Please complete your payment option below to finalize processing.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content 2-Column Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Order Items & Payment Step */}
          <div className="lg:col-span-7 space-y-6">
            {/* Order Items Card */}
            <Card className="border border-[#E8E2D9] shadow-xs rounded-2xl bg-white overflow-hidden">
              <CardHeader className="border-b border-[#E8E2D9]/60 bg-[#F0F7FD]/40 py-4 px-6">
                <CardTitle className="text-base font-serif font-bold text-[#1C1917] flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-[#0555A2]" />
                  Ordered Items ({items.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 divide-y divide-[#E8E2D9]/60">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="py-4 first:pt-0 last:pb-0 flex items-center gap-4"
                  >
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-[#F0F7FD] rounded-xl overflow-hidden border border-[#E8E2D9] shrink-0">
                      <Image
                        src={item.productImage || "/placeholder.svg"}
                        alt={item.productName}
                        fill
                        className="object-contain p-1"
                      />
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <h3 className="font-serif font-bold text-sm text-[#1C1917] truncate">
                        {item.productName}
                      </h3>
                      {item.productApproxWeight && (
                        <p className="text-xs text-stone-500 font-sans">
                          Weight: {item.productApproxWeight}g
                        </p>
                      )}
                      <div className="flex items-center gap-3 text-xs font-sans">
                        <span className="bg-sky-50 text-[#0555A2] px-2 py-0.5 rounded-md font-semibold">
                          Qty: {item.quantity}
                        </span>
                        <div className="flex items-center gap-1.5">
                          {item.specialPrice < item.unitSellingPrice && (
                            <span className="line-through text-stone-400">
                              <RenderCurrency amount={item.unitSellingPrice} />
                            </span>
                          )}
                          <span className="font-semibold text-stone-800">
                            <RenderCurrency amount={item.specialPrice} />
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[11px] text-stone-400 block font-sans uppercase font-bold tracking-wider">
                        Total
                      </span>
                      <p className="font-serif font-bold text-base text-[#0555A2]">
                        <RenderCurrency amount={item.totalPrice} />
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Instant Delivery Notice */}
            {order.data.deliveryMethod === "INSTANT_DELIVERY" && (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm font-sans leading-relaxed">
                <strong className="font-bold">Note for Instant Delivery:</strong> Delivery charges will be bared directly by you with our delivery rider (e.g. inDrive) upon arrival.
              </div>
            )}

            {/* Payment Section */}
            <div className="bg-white border border-[#E8E2D9] rounded-2xl p-6 shadow-xs space-y-4">
              <h2 className="text-lg font-serif font-bold text-[#1C1917] flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#0555A2]" />
                Payment & Verification
              </h2>

              {order.data.paymentScreenShot ? (
                <div>
                  <p className="text-xs text-stone-500 font-sans mb-2">
                    Payment screenshot submitted and under verification:
                  </p>
                  <ImagePreview src={order.data.paymentScreenShot} />
                </div>
              ) : (
                <PaymentMethodSelector
                  deliveryMethod={order.data.deliveryMethod}
                  deliveryType={order.data.deliveryType}
                  orderId={order.data.id}
                  paymentMethod={order.data.paymentMethod}
                />
              )}
            </div>
          </div>

          {/* Right Column: Sticky Order Summary */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <Card className="border border-[#E8E2D9] shadow-xs rounded-2xl bg-white overflow-hidden">
              <CardHeader className="border-b border-[#E8E2D9]/60 bg-[#F0F7FD]/40 py-4 px-6">
                <CardTitle className="text-base font-serif font-bold text-[#1C1917]">
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-3 font-sans text-sm">
                  <div className="flex justify-between text-stone-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-stone-800">
                      <RenderCurrency amount={subTotalAmount} />
                    </span>
                  </div>

                  <div className="flex justify-between text-stone-600">
                    <span>Delivery Charge</span>
                    <span className="font-semibold text-stone-800">
                      <RenderCurrency amount={deliveryCharge} />
                    </span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#0555A2] bg-sky-50 p-2.5 rounded-xl border border-sky-100 text-xs">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Tag className="w-3.5 h-3.5 text-[#28AAE0]" />
                        Discount ({discountCode ?? "Points Applied"})
                      </span>
                      <span className="font-bold">
                        -<RenderCurrency amount={discountAmount} />
                      </span>
                    </div>
                  )}

                  <Separator className="bg-[#E8E2D9]" />

                  <div className="flex justify-between items-center pt-1 font-serif">
                    <span className="text-base font-bold text-[#1C1917]">
                      Total Payable
                    </span>
                    <span className="text-2xl font-bold text-[#0555A2]">
                      <RenderCurrency amount={totalAmount} />
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
