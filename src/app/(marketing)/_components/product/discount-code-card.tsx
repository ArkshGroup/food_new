"use client";
import React, { useState } from "react";
import RenderCurrency from "@/helper/render-currency";
import { IDiscountCode } from "../../_services/discount.service";
import { formatCurrency } from "@/helper/format-currency-using-context";

export const DiscountCard = ({ discount }: { discount: IDiscountCode }) => {
  // --- Local State for Collection Status ---
  const [isCollected, setIsCollected] = useState(false);

  const {
    id,
    code,
    startDate,
    endDate,
    minOrderAmount,
    value,
    discountPercent,
    discountType,
  } = discount;

  // --- Logic to format the main discount display ---
  let mainDiscountText = "";
  let subHeaderText = "";

  if (discountType === "PERCENTAGE") {
    mainDiscountText = `${discountPercent}%`;
    subHeaderText = "OFF";
  } else if (discountType === "FIXED_AMOUNT") {
    // Note: Removed toLocaleString() to simplify for display space, but kept it if value is large
    mainDiscountText = formatCurrency(value);
    subHeaderText = "Discount";
  } else {
    mainDiscountText = "Special Offer";
    subHeaderText = code;
  }

  // Format Dates to Nepali timezone (Asia/Kathmandu)
  const formatDateTime = (dateString: Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "Asia/Kathmandu",
    });
  };

  const validityStart = formatDateTime(startDate);
  const validityEnd = formatDateTime(endDate);

  const handleCollect = () => {
    setIsCollected(true);
  };

  return (
    <div className="flex w-full max-w-xs mx-auto rounded-lg overflow-hidden shadow-md border border-gray-100 bg-white">
      <div className="flex flex-col items-center justify-center p-3 min-w-[120px] bg-primary/10 relative">
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-full overflow-hidden">
          <div className="w-1 h-full border-r-2 border-dashed border-white"></div>
        </div>
        <p
          className={`text-3xl font-bold text-primary ${discountType === "PERCENTAGE" ? "leading-none" : ""}`}
        >
          {mainDiscountText}
        </p>

        {/* Discount Type Subtext (Reduced margin mt-0.5) */}
        <p className="text-xs mt-0.5 text-gray-600 font-medium text-center">
          {subHeaderText}
        </p>

        {/* Minimum Spend (Reduced text size to text-2xs and margin mt-1) */}
        <p className="text-[10px] mt-1 text-gray-500 whitespace-nowrap">
          Min.Spend
          <RenderCurrency amount={minOrderAmount} />
        </p>
      </div>

      {/* --- Right Part: Details, Code & Action (Scaled) --- */}
      {/* Reduced padding (p-3) */}
      <div className="flex flex-col flex-grow p-3 bg-white relative">
        <div className="flex justify-between items-start mb-1">
          {/* Main Offer Title and Code (Reduced text sizes) */}
          <div className="flex flex-col">
            <p className="text-xs font-semibold text-gray-800">
              {discountType === "PERCENTAGE"
                ? "Percentage Off"
                : "Fixed Amount Off"}
            </p>
            <p className="text-[10px] text-gray-500 mt-0.5">
              Code:
              <span className=" text-primary">{code}</span>
            </p>
          </div>

          {/* T&C Link (Reduced text size to text-[10px]) */}
          <a
            href={`/return-policy`}
            className="text-[10px] font-medium text-gray-500 hover:text-primary"
          >
            T&C
          </a>
        </div>

        {/* Validity Period and Collect Button */}
        <div className="mt-auto flex justify-between items-center pt-2 border-t border-gray-100">
          {/* Reduced text size to text-[10px] */}
          <p className="text-[10px] text-gray-500 pr-1">
            Valid: {validityStart} - {validityEnd}
          </p>

          {/* Collect/Collected Button (Reduced padding and text size) */}
          <button
            onClick={handleCollect}
            disabled={isCollected}
            className={`
              py-1.5 px-3 rounded-full text-white font-semibold text-xs transition duration-300 ease-in-out
              ${
                isCollected
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-primary/80"
              }
            `}
          >
            {isCollected ? "Collected" : "Collect"}
          </button>
        </div>
      </div>
    </div>
  );
};
