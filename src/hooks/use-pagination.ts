import { createSearchParamsCache, parseAsInteger } from "nuqs/server";
import { useQueryStates } from "nuqs";

export const paginationParsers = {
  page: parseAsInteger.withDefault(1),
  limit: parseAsInteger.withDefault(8),
};

export const paginationFilter = createSearchParamsCache(paginationParsers);

export const usePagination = () => {
  const [paginationData, setPaginationData] = useQueryStates(
    paginationParsers,
    {
      history: "push",
      shallow: false,
      scroll: true,
    }
  );
  return {
    paginationData,
    setPaginationData,
  };
};
