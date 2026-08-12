/**
 * Official Google product taxonomy IDs (en-US).
 * @see https://www.google.com/basepages/producttype/taxonomy-with-ids.en-US.txt
 *
 * Merchant Center rejects outdated paths (e.g. "Snacks" → use "Snack Foods" or IDs).
 * Numeric IDs are the most reliable for google_product_category.
 */
const SHOP_CATEGORY_TO_GOOGLE_TAXONOMY_ID: Record<string, string> = {
  Biscuits: "1445", // Snack Foods > Crackers (packaged biscuits/crackers)
  Cookies: "2229", // Bakery > Cookies
  Chocolate: "4748", // Candy & Chocolate
  Coffee: "1868", // Beverages > Coffee
  Creamer: "4418", // Dairy Products > Coffee Creamer
  Cup: "6049", // Tableware > Drinkware > Coffee & Tea Cups
  Puffs: "2392", // Snack Foods > Chips (corn / extruded puffs)
  Food: "423", // Snack Foods (safe default)
};

/**
 * Maps your admin category name to a valid google_product_category value (taxonomy ID).
 */
export function resolveGoogleProductCategory(
  categoryName: string | null | undefined
): string {
  const key = (categoryName ?? "").trim();
  if (!key) return SHOP_CATEGORY_TO_GOOGLE_TAXONOMY_ID.Food;
  const exact = SHOP_CATEGORY_TO_GOOGLE_TAXONOMY_ID[key];
  if (exact) return exact;
  const lower = key.toLowerCase();
  for (const [k, id] of Object.entries(SHOP_CATEGORY_TO_GOOGLE_TAXONOMY_ID)) {
    if (k.toLowerCase() === lower) return id;
  }
  return SHOP_CATEGORY_TO_GOOGLE_TAXONOMY_ID.Food;
}
