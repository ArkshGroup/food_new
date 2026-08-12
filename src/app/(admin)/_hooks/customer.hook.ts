import { useQueryStates } from "nuqs";
import {
  createSearchParamsCache,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";

export const customerFilterParsers = {
  page: parseAsInteger.withDefault(1),
  limit: parseAsInteger.withDefault(7),
  id: parseAsString,
  name: parseAsString,
  email: parseAsString,
  createdAt: parseAsString,
};

export const customerFilter = createSearchParamsCache(customerFilterParsers);

export const useCustomerFilter = () => {
  const [filter, setFilter] = useQueryStates(customerFilterParsers, {
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
