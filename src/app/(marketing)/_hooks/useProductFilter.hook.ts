import { useQueryStates } from "nuqs";
import {
  createSearchParamsCache,
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";

export const productsFilterParsers = {
  page: parseAsInteger.withDefault(1),
  limit: parseAsInteger.withDefault(20),
  name: parseAsString,
  specialPrice: parseAsString,
  categoryNames: parseAsString,
  brandNames: parseAsString,
  onSale: parseAsBoolean,
  newArrivals: parseAsBoolean,
  isFeatured: parseAsBoolean,
  isFlashSale: parseAsBoolean,
  sortBy: parseAsString,
  sortOrder: parseAsString,
};

export const productSearchFilter = createSearchParamsCache(
  productsFilterParsers
);

export const useProductFilter = () => {
  const [filter, setFilter] = useQueryStates(productsFilterParsers, {
    history: "replace",
    shallow: false,
  });

  const resetFilter = () => setFilter(null);

  return {
    filter,
    setFilter,
    resetFilter,
  };
};
