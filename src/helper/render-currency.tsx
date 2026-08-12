"use client";

import { formatCurrency } from "./format-currency-using-context";

const RenderCurrency = ({ amount }: { amount: number }) => {
  return <span>{formatCurrency(amount)}</span>;
};

export default RenderCurrency;
