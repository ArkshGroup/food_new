import { createContext } from "react";

export const CurrencyContext = createContext<{
  currency: "NPR" | "USD";
  setCurrency: React.Dispatch<React.SetStateAction<"NPR" | "USD">>;
}>({
  currency: "NPR",
  setCurrency: () => {},
});
