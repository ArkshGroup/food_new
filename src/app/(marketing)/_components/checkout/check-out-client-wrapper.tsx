"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { CheckoutForm } from "./shipping-address-form";
import { PlaceOrderFormWithDiscountCoupon } from "./place-order-form";
import { DELIVERY_TYPE, DELIVERY_METHOD, PAYMENT_METHOD } from "@prisma/client";
import { IDiscountCode } from "../../_services/discount.service";

export const checkoutFormSchema = z
  .object({
    email: z.email("Please enter a valid email address"),
    recipientName: z
      .string()
      .min(2, "Recipient name must be at least 2 characters"),
    addressLine1: z.string().min(1, "Address is required"),
    country: z.string().optional(),
    city: z.string().optional(),
    cityId: z.string().optional(),
    zone: z.string().optional(),
    zoneId: z.string().optional(),
    phoneNumber: z
      .string()
      .min(10, "Valid phone number is required")
      .regex(/^[0-9]+$/, "Phone number must contain only numbers"),
    deliveryType: z.enum(DELIVERY_TYPE),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    deliveryMethod: z.enum(DELIVERY_METHOD, {
      error: "Please Select a payment method",
    }),
    paymentMethod: z.enum(
      [PAYMENT_METHOD.CASH_ON_DELIVERY, PAYMENT_METHOD.ONLINE_PAYMENT],
      {
        error: "Please Select a payment method",
      },
    ),
  })
  .superRefine((data, ctx) => {
    if (
      data.deliveryType === "OUTSIDE_VALLEY" &&
      data.deliveryMethod == "INSTANT_DELIVERY"
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Instant delivery is not available for outside valley.",
        path: ["deliveryMethod"],
      });
    }
    if (
      data.deliveryMethod == "INSTANT_DELIVERY" &&
      data.paymentMethod != PAYMENT_METHOD.ONLINE_PAYMENT
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Instant delivery is only available with online payment.",
        path: ["paymentMethod"],
      });
    }
    if (
      data.deliveryType === "OUTSIDE_VALLEY" ||
      data.deliveryType === "INSIDE_VALLEY"
    ) {
      if (!data.cityId || data.cityId.trim().length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "City is required for this delivery type.",
        });
      }
      if (!data.zoneId || data.zoneId.trim().length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Zone is required for this delivery type.",
        });
      }
    }
    if (data.deliveryType === "INTERNATIONAL") {
      if (!data.country || data.country.trim().length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Country is required for international delivery.",
          path: ["country"],
        });
      }
      if (
        data.deliveryMethod != DELIVERY_METHOD.NORMAL_DELIVERY &&
        data.deliveryMethod != DELIVERY_METHOD.SELF_COURIER
      ) {
        ctx.addIssue({
          code: "custom",
          message:
            "Please select SELF_COURIER or NORMAL_DELIVERY for international delivery.",
          path: ["deliveryMethod"],
        });
      }
    }
  });

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

const CheckOutClientWrapper = ({
  cartItems,
  userDetails,
  availableCode,
}: {
  cartItems: ICartGetAll[];
  availableCode: IDiscountCode[];
  userDetails: {
    arkshFoodPoint: number;
    email: string;
    country: string | null;
    phoneNumber: string | null;
    address: string | null;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userName: string | null;
    zipCode: string | null;
    gender: string | null;
    dateOfBirth: Date | null;
    isVerified: boolean;
    termsAndConditionsAccepted: boolean;
  };
}) => {
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: userDetails.email || "",
      recipientName: userDetails.userName || "",
      addressLine1: userDetails.address || "",
      city: "",
      phoneNumber: userDetails.phoneNumber || "",
      deliveryType: "INSIDE_VALLEY",
      deliveryMethod: DELIVERY_METHOD.NORMAL_DELIVERY,
      paymentMethod: PAYMENT_METHOD.CASH_ON_DELIVERY,
      latitude: undefined,
      longitude: undefined,
    },
    shouldFocusError: true,
    mode: "onBlur",
  });
  return (
    <div className="w-full bg-[#F0F7FD] min-h-screen py-10 lg:py-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#28AAE0]">
            SECURE TRANSACTION
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1C1917] tracking-tight">
            Checkout
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm font-sans">
            Please enter your delivery address and preferred payment option below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column - Checkout Form */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-10 rounded-2xl border border-[#E2EEF8] shadow-2xs">
            <CheckoutForm form={form} />
          </div>

          {/* Right Column - Order Summary & Payment Place Order */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2EEF8] shadow-2xs">
              <PlaceOrderFormWithDiscountCoupon
                formData={form}
                cartItems={cartItems}
                availableCode={availableCode}
                userDetails={userDetails}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CheckOutClientWrapper;
