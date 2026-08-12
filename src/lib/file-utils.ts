export const isFileLike = (value: unknown): value is File => {
  if (value instanceof File) {
    return true;
  }

  return (
    typeof value === "object" &&
    value !== null &&
    "arrayBuffer" in value &&
    typeof (value as File).arrayBuffer === "function" &&
    "name" in value &&
    "size" in value
  );
};
