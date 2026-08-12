"use client";

import { useContext, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  X,
  Tag,
  TagIcon,
  Loader2,
  Loader2Icon,
  ShoppingCartIcon,
  TriangleAlertIcon,
  TruckIcon,
} from "lucide-react";
import { useAction } from "next-safe-action/hooks";

import { toast } from "sonner";
import z from "zod";
import { UseFormReturn } from "react-hook-form";
import { checkoutFormSchema } from "./check-out-client-wrapper";
import { orderMutation } from "../../_mutation/order.mutation";
import { queryClient } from "@/components/provider/tanstack-query-provider";
import { CART_COUNT_QUERY_KEY } from "../../_hooks/useCart.hook";
import { useRouter } from "next/navigation";
import RenderCurrency from "@/helper/render-currency";
import { getDeliveryCharge } from "./get-delivery-charge";
import { CurrencyContext } from "@/context/currency-context";
import { IDiscountCode } from "../../_services/discount.service";
import { AvailableDiscountDialog } from "./available-discount-dialog";
import { useDiscountHook } from "./use-discount-hook";
import { fetchPricePlan } from "@/lib/axios";
import { PricePlanData } from "@/app/api/pathao/price-plan/route";
import { pathaoConfig } from "@/config/pathao.config";

interface CartSummaryProps {
  cartItems: ICartGetAll[];
  availableCode: IDiscountCode[];
  userDetails: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    userName: string | null;
    country: string | null;
    zipCode: string | null;
    isVerified: boolean;
    termsAndConditionsAccepted: boolean;
    arkshFoodPoint: number;
  };
  formData: UseFormReturn<
    z.infer<typeof checkoutFormSchema>,
    any,
    z.infer<typeof checkoutFormSchema>
  >;
}

export function PlaceOrderFormWithDiscountCoupon({
  formData,
  cartItems,
  userDetails,
  availableCode,
}: CartSummaryProps) {
  const router = useRouter();

  const cityId = formData.getValues("cityId");
  const zoneId = formData.getValues("zoneId");
  const totalWeight = cartItems.reduce(
    (acc, item) =>
      acc + (item.quantity * (item.product.approxWeight || 0)) / 1000,
    0,
  );
  const [pricePlanData, setPricePlanData] = useState<PricePlanData>();
  const [isLoadingPricePlan, setIsLoadingPricePlan] = useState(false);

  useEffect(() => {
    if (!cityId || !zoneId) return;
    setIsLoadingPricePlan(true);
    const fetchData = async () => {
      try {
        const response = await fetchPricePlan({
          store_id: Number(pathaoConfig.pathaoStoreId),
          item_type: 2,
          delivery_type: 48,
          item_weight: totalWeight,
          recipient_city: Number(cityId),
          recipient_zone: Number(zoneId),
        });
        setPricePlanData(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoadingPricePlan(false);
      }
    };
    fetchData();
  }, [cityId, zoneId, totalWeight]);

  const subtotal = cartItems.reduce((sum, item) => {
    const price =
      item.product.specialPrice < item.product.unitSellingPrice
        ? item.product.specialPrice
        : item.product.unitSellingPrice;
    return sum + price * item.quantity;
  }, 0);

  const {
    discountCodeInputText,
    setDiscountCodeInputText,
    activeDiscountCode,
    setActiveDiscountCode,
    discountAmount,
    setDiscountAmount,
    arkshFoodPoint,
    setArkshFoodPoint,
    discountError,
    setDiscountError,
    applyArkshFoodPoint,
    isArkshFoodPointPending,
    applyDiscountCode,
    isApplyDiscountCodePending,
    handleApplyDiscount,
    handleRemoveDiscount,
    openDiscountDialog,
    setOpenDiscountDialog,
  } = useDiscountHook({ subtotal });

  const { currency } = useContext(CurrencyContext);
  const deliveryType = formData.watch("deliveryType");
  const deliveryMethod =
    formData.watch("deliveryMethod") ?? ("NORMAL_DELIVERY" as const);
  const paymentMethod = formData.watch("paymentMethod");
  const country = formData.watch("country");
  const isInternationalDelivery =
    formData.getValues("deliveryType") === "INTERNATIONAL";

  const isInstantDelivery = deliveryMethod == "INSTANT_DELIVERY";
  const isDomesticDelivery =
    deliveryType === "INSIDE_VALLEY" || deliveryType === "OUTSIDE_VALLEY";

  const isFreeShippingEligible =
    isDomesticDelivery &&
    deliveryMethod === "NORMAL_DELIVERY" &&
    subtotal >= 2500;

  const { execute: excOrderSubmit, isPending: isOrderSubmitting } = useAction(
    orderMutation,
    {
      onSuccess: (res) => {
        if (!res.data.success) {
          return toast.error(res.data.message);
        } else {
          queryClient.invalidateQueries({
            queryKey: [CART_COUNT_QUERY_KEY],
          });
          if (
            (deliveryMethod === "NORMAL_DELIVERY" ||
              deliveryMethod === "INSTANT_DELIVERY") &&
            !isInternationalDelivery
          ) {
            router.push(
              `/checkout/order/${res.data.data?.orderId}?method=${paymentMethod}`,
            );
            return;
          }
          toast.success(res.data.message);
          router.push(`/checkout/success/${res.data.data?.orderId}`);
        }
      },
      onError: (error) => {
        console.error(error);
        toast.error("Something went wrong");
      },
    },
  );

  formData.watch("deliveryMethod");
  formData.watch("deliveryType");
  formData.watch("country");
  formData.watch("cityId");
  formData.watch("zoneId");

  const deliveryCharge = useMemo(() => {
    return getDeliveryCharge({
      deliveryMethod,
      deliveryType,
      country,
      paymentMethod,
      cartItems,
      pricePlanData,
      subtotal,
      discountAmount,
    });
  }, [
    deliveryMethod,
    deliveryType,
    country,
    paymentMethod,
    cityId,
    zoneId,
    subtotal,
    pricePlanData,
    discountAmount,
  ]);
  const total = subtotal - discountAmount + deliveryCharge;

  formData.watch("deliveryType");
  const isInternational =
    formData.getValues("deliveryType") === "INTERNATIONAL";
  const isNormalDelivery =
    formData.getValues("deliveryMethod") == "NORMAL_DELIVERY" ||
    formData.getValues("deliveryMethod") == "INSTANT_DELIVERY";

  const handleOrderSubmit = async () => {
    const isValid = await formData.trigger();
    if (!isValid) {
      toast.error(`${Object.values(formData.formState.errors)[0]?.message}`);
      window.scrollTo({ top: 100, behavior: "smooth" });
      formData.setFocus(
        Object.keys(
          formData.formState.errors,
        )[0] as keyof typeof formData.getValues,
      );
      return;
    }
    excOrderSubmit({
      deliveryCharge: deliveryCharge,
      deliveryType: formData.getValues("deliveryType"),
      discountCode: activeDiscountCode,
      currency: currency,
      discountAmount: discountAmount,
      items: cartItems.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      })),
      paymentMethod: formData.getValues("paymentMethod"),
      arkshFoodPoint: arkshFoodPoint,
      deliveryMethod: formData.getValues("deliveryMethod"),
      shippingAddress: {
        recipientName: formData.getValues("recipientName"),
        addressLine1: formData.getValues("addressLine1"),
        city: formData.getValues("city"),
        phoneNumber: formData.getValues("phoneNumber"),
        country: formData.getValues("country"),
        cityId: formData.getValues("cityId"),
        zone: formData.getValues("zone"),
        zoneId: formData.getValues("zoneId"),
        email: formData.getValues("email"),
        latitude: formData.getValues("latitude"),
        longitude: formData.getValues("longitude"),
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Cart Items */}
      <div className="">
        {cartItems.map((item) => {
          const specialPrice = item.product.specialPrice;
          const unitSellingPrice = item.product.unitSellingPrice;
          const hasDiscount = unitSellingPrice > specialPrice;

          return (
            <div
              key={item.cartItemId}
              className="flex items-start gap-4 border-b p-1  bg-card rounded-lg "
            >
              <div className="relative">
                <img
                  src={item.product.imageUrl || "/placeholder.svg"}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded-md bg-muted"
                />
                <Badge
                  variant="secondary"
                  className="absolute -top-1 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-destructive text-background"
                >
                  {item.quantity}
                </Badge>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium  text-xs leading-tight">
                  {item.product.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Weight: {item.product.approxWeight}g
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Unit Price:{" "}
                  <span className="font-semibold text-foreground">
                    <RenderCurrency amount={specialPrice} />
                    {hasDiscount && (
                      <span className="line-through text-muted-foreground ml-1">
                        <RenderCurrency amount={unitSellingPrice} />
                      </span>
                    )}
                  </span>
                </p>
              </div>
              <div className="text-right">
                <div className="font-semibold ">
                  <RenderCurrency amount={specialPrice * item.quantity} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Discount Code */}
      <Card className="border-border bg-card p-2">
        <CardContent className="p-2">
          <CardTitle className=" p-2 flex items-center gap-x-2">
            <TagIcon />
            Discount Code
          </CardTitle>
          <div className="flex flex-col gap-2">
            <div className=" flex gap-2">
              <Input
                placeholder="discount code..."
                value={discountCodeInputText}
                onChange={(e) => setDiscountCodeInputText(e.target.value)}
                className=" border-border "
              />
              <Button
                onClick={() => handleApplyDiscount()}
                variant="outline"
                type="button"
                disabled={
                  isApplyDiscountCodePending ||
                  discountCodeInputText.trim().length === 0
                }
                className="border-border   bg-transparent"
              >
                {isApplyDiscountCodePending ? (
                  <Loader2 className=" animate-spin duration-300" />
                ) : (
                  "Apply"
                )}
              </Button>
            </div>
            {discountError && (
              <p className="text-sm  flex items-center gap-x-2  text-slate-500 mt-1">
                <TriangleAlertIcon size={16} />
                {discountError}
              </p>
            )}
          </div>
          <div></div>

          {activeDiscountCode && (
            <div className="flex items-center justify-between mt-3 p-2 bg-accent/10 rounded-md">
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 " />
                <span className="text-sm font-medium ">
                  {activeDiscountCode}
                </span>
              </div>
              <Button
                onClick={handleRemoveDiscount}
                variant="ghost"
                type="button"
                size="sm"
                className="h-6 w-6 p-0 hover:bg-accent/20"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}

          {/* show available discount codes */}
          <AvailableDiscountDialog
            open={openDiscountDialog}
            setOpen={setOpenDiscountDialog}
            arkshFoodPoint={arkshFoodPoint}
            setArkshFoodPoint={setArkshFoodPoint}
            applyArkshFoodPoint={applyArkshFoodPoint}
            isArkshFoodPointPending={isArkshFoodPointPending}
            activeDiscountCode={activeDiscountCode}
            setDiscountAmount={setDiscountAmount}
            setActiveDiscountCode={setActiveDiscountCode}
            userDetails={userDetails}
            setDiscountCodeInputText={setDiscountCodeInputText}
            cartItems={cartItems}
            handleRemoveDiscount={handleRemoveDiscount}
            availableCode={availableCode}
            handleApplyDiscount={handleApplyDiscount}
            isApplyDiscountCodePending={isApplyDiscountCodePending}
          />
        </CardContent>
      </Card>

      {/* Order Summary */}
      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-muted-foreground">
          <span>Subtotal</span>
          <span>
            <RenderCurrency amount={subtotal} />
          </span>
        </div>

        <div className="flex justify-between text-muted-foreground">
          <span>Approx Weight </span>
          <span>
            {cartItems.reduce(
              (acc, item) => acc + item.product.approxWeight * item.quantity,
              0,
            ) / 1000}{" "}
            kg
          </span>
        </div>

        <div className="">
          <div className="flex justify-between text-muted-foreground">
            <span>
              Delivery Charge
              {deliveryMethod == "INSTANT_DELIVERY" && " (Paid by you)"}
            </span>
            <span className="text-right">
              {isFreeShippingEligible ? (
                <span className="font-medium text-emerald-600">
                  Free (orders above रु 2,500)
                </span>
              ) : (
                <>
                  <RenderCurrency amount={deliveryCharge} />
                  {isInternationalDelivery && (
                    <span className=" text-xs">(estimated)</span>
                  )}
                </>
              )}
            </span>
          </div>
          {discountAmount > 0 && (
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <span className="  text-muted-foreground">Order discount</span>
              </div>
              <span className="">
                -<RenderCurrency amount={discountAmount} />
              </span>
            </div>
          )}
          {isInternationalDelivery && (
            <span className=" text-xs text-muted-foreground">
              (Delivery charge is subject to change based on destination country
              & weight)
            </span>
          )}
        </div>

        <hr className="border-border" />

        <div className="flex justify-between text-lg font-semibold ">
          <span>Total</span>
          <div className="text-right">
            <div>
              <RenderCurrency amount={total} />
            </div>
          </div>
        </div>

        {discountAmount > 0 && (
          <div className="flex items-center gap-2 ">
            <Tag className="h-4 w-4" />
            <span className="font-medium">
              TOTAL SAVINGS <RenderCurrency amount={discountAmount} />
            </span>
          </div>
        )}
      </div>

      {isInstantDelivery && (
        <div className="flex items-center gap-2 p-3 bg-primary/10 text-primary rounded-md">
          <TruckIcon className="h-5 w-5" />
          <span className="font-medium text-xs">
            Instant Delivery will be charged separately and paid by you.
          </span>
        </div>
      )}

      {/* submit */}
      <div>
        <Button
          disabled={isOrderSubmitting}
          onClick={handleOrderSubmit}
          className="w-full"
          type="button"
        >
          {isOrderSubmitting ? (
            <Loader2Icon className=" animate-spin duration-300" />
          ) : (
            <>
              <ShoppingCartIcon className="w-5 h-5 mr-2" />
              {isNormalDelivery && !isInternational
                ? "Proceed to Payment"
                : "Place Order"}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
