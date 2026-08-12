import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CurrencyContext } from "@/context/currency-context";

export function CurrencySelector() {
  const { currency, setCurrency } = React.useContext(CurrencyContext);

  return (
    <Select
      value={currency}
      onValueChange={(value) => setCurrency(value as "NPR" | "USD")}
    >
      <SelectTrigger className="w-fit" aria-label="Select currency">
        <SelectValue placeholder="Select currency" />
      </SelectTrigger>
      <SelectContent className=" z-[99999999]">
        <SelectGroup>
          <SelectLabel>Currency</SelectLabel>
          <SelectItem value="NPR">🇳🇵 NPR</SelectItem>
          <SelectItem value="USD">🇺🇸 USD</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
