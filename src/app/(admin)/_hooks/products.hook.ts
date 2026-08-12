import { useQueryStates } from "nuqs";
import {
  createSearchParamsCache,
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";

export const productsFilterParsers = {
  page: parseAsInteger.withDefault(1),
  limit: parseAsInteger.withDefault(4),
  name: parseAsString,
  sellingPrice: parseAsString,
  stockQuantity: parseAsString,
  category: parseAsString,
  onSale: parseAsBoolean,
  isNewProduct: parseAsBoolean,
  isFeatured: parseAsBoolean,
  isFlashSale: parseAsBoolean,
  isVisible: parseAsBoolean,
  isWholeSale: parseAsBoolean,
  unitSellingPrice: parseAsString,
  createdAt: parseAsString,
};

export const productSearchFilter = createSearchParamsCache(
  productsFilterParsers
);

export const useProductFilter = () => {
  const [filter, setFilter] = useQueryStates(productsFilterParsers, {
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
