"use client";

import { useEffect, useState } from "react";
import { Check, CheckCircle2, QrCode, Truck } from "lucide-react";
import { cn } from "@/lib/utils";
import { DELIVERY_METHOD, DELIVERY_TYPE, PAYMENT_METHOD } from "@prisma/client";
import { PaymentScreenShotInputField } from "./qr-screen-shot-input-field";
import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import { confirmPaymentMethod } from "../../_mutation/payment.mutation";
import { useRouter, useSearchParams } from "next/navigation"; // Added useSearchParams
import { toast } from "sonner";
import { queryClient } from "@/components/provider/tanstack-query-provider";
import { CART_COUNT_QUERY_KEY } from "../../_hooks/useCart.hook";

type PaymentMethod = PAYMENT_METHOD;

interface PaymentMethodSelectorProps {
  orderId: string;
  deliveryMethod: DELIVERY_METHOD;
  deliveryType: DELIVERY_TYPE;
  paymentMethod: PAYMENT_METHOD;
}

export const PaymentMethodSelector = ({
  orderId,
  deliveryMethod,
  deliveryType,
}: PaymentMethodSelectorProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const methodFromQuery = searchParams.get("method") as PAYMENT_METHOD | null;
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(
    null,
  );
  useEffect(() => {
    if (
      methodFromQuery &&
      Object.values(PAYMENT_METHOD).includes(methodFromQuery)
    ) {
      setSelectedMethod(methodFromQuery);
    }
  }, [methodFromQuery]);

  const { execute: excUpdatePaymentMethodToCashOnDelivery, isPending } =
    useAction(confirmPaymentMethod, {
      onSuccess: (res) => {
        queryClient.invalidateQueries({
          queryKey: [CART_COUNT_QUERY_KEY],
        });
        if (res.data?.success) router.push(`/checkout/success/${orderId}`);
      },
      onError: (error) => {
        console.error(error);
        toast.error("Something went wrong");
      },
    });

  // Early returns
  if (deliveryMethod === "SELF_COURIER" || deliveryType === "INTERNATIONAL") {
    return null;
  }

  const paymentMethods = [
    {
      id: "CASH_ON_DELIVERY" as PaymentMethod,
      title: "Cash on Delivery",
      subtitle: "Pay when you receive",
      disable:
        deliveryMethod === "INSTANT_DELIVERY" ||
        methodFromQuery === "ONLINE_PAYMENT",
      icon: (
        <div className="w-12 h-12 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
          <Truck className="w-6 h-6 text-pink-600 dark:text-pink-400" />
        </div>
      ),
    },
    {
      id: "ONLINE_PAYMENT" as PaymentMethod,
      title: "Online",
      subtitle: "Pay instantly",
      disable: methodFromQuery === "CASH_ON_DELIVERY",
      icon: (
        <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
          <QrCode className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
        </div>
      ),
    },
  ];

  return (
    <div className="w-full space-y-4">
      {paymentMethods
        .filter((method) => !method.disable)
        .map((method) => (
          <button
            key={method.id}
            type="button" // Always specify type for buttons to prevent accidental form submission
            disabled={method.disable}
            onClick={() => setSelectedMethod(method.id)}
            className={cn(
              "p-4 cursor-pointer transition-all w-full duration-200 border-2 flex flex-col items-stretch",
              selectedMethod === method.id
                ? "border-primary bg-blue-50/50 dark:bg-pink-950/20"
                : "border-border hover:border-primary/50 hover:bg-accent/30",
              method.disable && "opacity-50 cursor-not-allowed",
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-left">
                {method.icon}
                <div>
                  <h3 className="font-semibold text-foreground">
                    {method.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {method.subtitle}
                  </p>
                </div>
              </div>
              {selectedMethod === method.id && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
          </button>
        ))}

      {selectedMethod === "ONLINE_PAYMENT" && (
        <PaymentScreenShotInputField orderId={orderId} />
      )}

      {selectedMethod === "CASH_ON_DELIVERY" && (
        <Button
          onClick={() =>
            excUpdatePaymentMethodToCashOnDelivery({
              id: orderId,
              paymentType: "CASH_ON_DELIVERY",
            })
          }
          disabled={isPending}
          className="w-full"
        >
          {isPending ? (
            "Confirming..."
          ) : (
            <>
              <CheckCircle2 className="mr-2 h-4 w-4" /> Confirm Order
            </>
          )}
        </Button>
      )}
    </div>
  );
};
