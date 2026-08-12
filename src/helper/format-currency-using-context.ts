"use client";
import { CurrencyContext } from "@/context/currency-context";
import { Decimal } from "@prisma/client/runtime/library";
import { useContext } from "react";

const CONVERSION_RATE = Number(process.env.NEXT_PUBLIC_CONVERSION_RATE) || 141;
export function formatCurrency(amount: number | Decimal): string {
  const currencyContext = useContext(CurrencyContext);
  const numAmount = typeof amount === "number" ? amount : amount.toNumber();

  if (currencyContext.currency === "USD") {
    const conversionRate = CONVERSION_RATE;
    if (!conversionRate) {
      throw new Error(
        "CONVERSION_RATE environment variable is not set or invalid."
      );
    }
    const convertedAmount = numAmount / conversionRate;
    return convertedAmount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      currencyDisplay: "symbol",
    });
  }

  // For NPR, still use rounded integer
  const rounded = Math.round(numAmount);
  return rounded
    .toLocaleString("en-IN", {
      style: "currency",
      currency: "NPR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      currencyDisplay: "symbol",
    })
    .replace("NPR", "रु");
}
