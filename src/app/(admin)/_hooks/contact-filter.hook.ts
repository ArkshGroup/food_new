import { useQueryStates } from "nuqs";
import {
  createSearchParamsCache,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";

export const contactFilterParsers = {
  page: parseAsInteger.withDefault(1),
  limit: parseAsInteger.withDefault(7),
  id: parseAsString,
  name: parseAsString,
  email: parseAsString,
  createdAt: parseAsString,
};

export const contactFilter = createSearchParamsCache(contactFilterParsers);

export const useContactFilter = () => {
  const [filter, setFilter] = useQueryStates(contactFilterParsers, {
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
