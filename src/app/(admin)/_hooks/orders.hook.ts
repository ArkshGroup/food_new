import { useQueryStates } from "nuqs";
import {
  createSearchParamsCache,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";

export const ordersFilterParsers = {
  page: parseAsInteger.withDefault(1),
  limit: parseAsInteger.withDefault(7),
  id: parseAsString,
  orderNumber: parseAsInteger,
  customerName: parseAsString,
  customerEmail: parseAsString,
  stockQuantity: parseAsString,
  totalAmount: parseAsString,
  createdAt: parseAsString,
  itemCount: parseAsString,
  orderStatus: parseAsString,
  paymentStatus: parseAsString,
};

export const orderSearchFilter = createSearchParamsCache(ordersFilterParsers);

export const useOrderFilter = () => {
  const [filter, setFilter] = useQueryStates(ordersFilterParsers, {
    history: "push",
    shallow: false,
  });

  const resetFilter = () => setFilter(null);

  return {
    filter,
    setFilter,
    resetFilter,
  };
};
