import { useQueryStates } from "nuqs";
import {
  createSearchParamsCache,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";

export const bulkOrderInquiryFilterParsers = {
  page: parseAsInteger.withDefault(1),
  limit: parseAsInteger.withDefault(7),
  id: parseAsString,
  customerEmail: parseAsString,
  createdAt: parseAsString,
};

export const bulkOrderInquiryFilter = createSearchParamsCache(
  bulkOrderInquiryFilterParsers
);

export const useBulkOrderInquiryFilter = () => {
  const [filter, setFilter] = useQueryStates(bulkOrderInquiryFilterParsers, {
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
