import { useQueryStates } from "nuqs";
import {
  createSearchParamsCache,
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";

export const blogFilterParsers = {
  page: parseAsInteger.withDefault(1),
  limit: parseAsInteger.withDefault(10),

  title: parseAsString, // search by title
  author: parseAsString, // search by author
  isPublished: parseAsBoolean,

  createdAt: parseAsString, // format: "2024-01-01,2024-02-01"
  publishedAt: parseAsString, // format: "2024-01-01,2024-02-01"
};

export const blogSearchFilter = createSearchParamsCache(blogFilterParsers);

export const useBlogFilter = () => {
  const [filter, setFilter] = useQueryStates(blogFilterParsers, {
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
