import { Decimal } from "@prisma/client/runtime/library";

export function formatToNPR(amount: number | Decimal): string {
  const numAmount = typeof amount === "number" ? amount : amount.toNumber();
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
