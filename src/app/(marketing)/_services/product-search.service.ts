import { IProductGetAll } from "../_types/products";

export async function searchProducts(query: string): Promise<IProductGetAll[]> {
  if (!query.trim()) {
    return [];
  }
  const response = await fetch(
    "/api/product?query=" + encodeURIComponent(query),
    { cache: "no-store" }
  );
  const data: IProductGetAll[] = await response.json();

  return data;
}
