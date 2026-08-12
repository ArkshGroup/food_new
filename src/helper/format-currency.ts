import Decimal from "decimal.js";

export function formatCurrencyWithCurrencyParam({
  amount,
  currency,
}: {
  amount: number | Decimal;
  currency: "USD" | "NPR";
}): string {
  const numAmount = typeof amount === "number" ? amount : amount.toNumber();

  if (currency === "USD") {
    const conversionRate = Number(process.env.NEXT_PUBLIC_CONVERSION_RATE);
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
