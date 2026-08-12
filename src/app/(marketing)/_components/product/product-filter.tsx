"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import RangeFilter from "@/components/global/filter/range-filter";
import { useProductFilter } from "../../_hooks/useProductFilter.hook";
import MultiCheckBoxFilter from "@/components/global/filter/multi-check-box-filter";

interface FilterPanelProps {
  categories?: { id: number; name: string }[];
  brands?: { id: number; name: string }[];
}

export function FilterPanel({ categories, brands }: FilterPanelProps) {
  const { filter, resetFilter, setFilter } = useProductFilter();

  const clearAllFilters = () => {
    resetFilter();
  };

  return (
    <div
      className={cn(
        "w-full bg-white border border-[#E8E2D9] rounded-2xl p-6 shadow-xs lg:sticky lg:top-28 space-y-4 font-sans"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D9]">
        <div className="flex items-center gap-2 text-[#1C1917]">
          <Filter className="w-4 h-4 text-[#0555A2]" />
          <h2 className="text-sm font-bold uppercase tracking-wider font-sans">Filters</h2>
        </div>
        <Button
          variant="ghost"
          onClick={clearAllFilters}
          className="text-xs text-stone-500 hover:text-[#0555A2] p-0 h-auto font-sans font-medium transition-colors"
        >
          Reset All
        </Button>
      </div>

      <Accordion
        type="multiple"
        defaultValue={["sort", "price", "category", "brand", "other"]}
        className="w-full space-y-2"
      >
        {/* Sort By Price Section */}
        <AccordionItem value="sort" className="border-b border-[#E8E2D9]/60 pb-2">
          <AccordionTrigger className="text-xs font-bold uppercase tracking-wider text-stone-800 hover:text-[#0555A2] py-2 px-0 font-sans">
            Sort By Price
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-2">
            <div className="space-y-2 font-sans">
              <button
                type="button"
                onClick={() => setFilter({ sortBy: "specialPrice", sortOrder: "desc" })}
                className={`w-full text-left px-3 py-2 rounded-xl border text-xs font-medium transition-all ${
                  filter?.sortBy === "specialPrice" && filter?.sortOrder === "desc"
                    ? "bg-sky-50 border-[#0555A2] text-[#0555A2] font-bold shadow-xs"
                    : "bg-[#FAF8F5] border-[#E8E2D9] text-stone-700 hover:bg-white"
                }`}
              >
                Price: High to Low
              </button>
              <button
                type="button"
                onClick={() => setFilter({ sortBy: "specialPrice", sortOrder: "asc" })}
                className={`w-full text-left px-3 py-2 rounded-xl border text-xs font-medium transition-all ${
                  filter?.sortBy === "specialPrice" && filter?.sortOrder === "asc"
                    ? "bg-sky-50 border-[#0555A2] text-[#0555A2] font-bold shadow-xs"
                    : "bg-[#FAF8F5] border-[#E8E2D9] text-stone-700 hover:bg-white"
                }`}
              >
                Price: Low to High
              </button>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price Range Section */}
        <AccordionItem value="price" className="border-b border-[#E8E2D9]/60 pb-2">
          <AccordionTrigger className="text-xs font-bold uppercase tracking-wider text-stone-800 hover:text-[#0555A2] py-2 px-0 font-sans">
            Price Range
          </AccordionTrigger>
          <AccordionContent className="pb-4 pt-2">
            <RangeFilter
              fn={setFilter}
              label="specialPrice"
              value={filter?.specialPrice || null}
            />
          </AccordionContent>
        </AccordionItem>

        {/* Category Section */}
        <AccordionItem value="category" className="border-b border-[#E8E2D9]/60 pb-2">
          <AccordionTrigger className="text-xs font-bold uppercase tracking-wider text-stone-800 hover:text-[#0555A2] py-2 px-0 font-sans">
            Category
          </AccordionTrigger>
          <AccordionContent className="pt-1 pb-2">
            <MultiCheckBoxFilter
              items={
                categories
                  ? categories.map((category) => ({
                      value: String(category.name),
                      label: category.name,
                    }))
                  : []
              }
              fn={setFilter}
              fieldName="categoryNames"
              selectedItems={filter?.categoryNames || ""}
            />
          </AccordionContent>
        </AccordionItem>

        {/* Brand Section */}
        <AccordionItem value="brand" className="border-b border-[#E8E2D9]/60 pb-2">
          <AccordionTrigger className="text-xs font-bold uppercase tracking-wider text-stone-800 hover:text-[#0555A2] py-2 px-0 font-sans">
            Brand
          </AccordionTrigger>
          <AccordionContent className="pt-1 pb-2">
            <MultiCheckBoxFilter
              items={
                brands
                  ? brands.map((brand) => ({
                      value: String(brand.name),
                      label: brand.name,
                    }))
                  : []
              }
              fn={setFilter}
              fieldName="brandNames"
              selectedItems={filter?.brandNames || ""}
            />
          </AccordionContent>
        </AccordionItem>

        {/* Other Section */}
        <AccordionItem value="other" className="border-none">
          <AccordionTrigger className="text-xs font-bold uppercase tracking-wider text-stone-800 hover:text-[#0555A2] py-2 px-0 font-sans">
            Curated Highlights
          </AccordionTrigger>
          <AccordionContent className="flex flex-col pt-2 pb-2">
            <div className="space-y-3 font-sans">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="flash-sale"
                  checked={filter?.isFlashSale === true}
                  onClick={() => {
                    setFilter({
                      isFlashSale: filter?.isFlashSale ? null : true,
                    });
                  }}
                  className="rounded-md border-[#E8E2D9] data-[state=checked]:bg-[#0555A2] data-[state=checked]:border-[#0555A2]"
                />
                <label
                  htmlFor="flash-sale"
                  className="text-xs text-stone-700 cursor-pointer select-none font-medium hover:text-[#0555A2]"
                >
                  Flash Sale
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox
                  onClick={() => {
                    setFilter({
                      newArrivals: filter?.newArrivals ? null : true,
                    });
                  }}
                  checked={filter?.newArrivals === true}
                  id="new-arrivals"
                  className="rounded-md border-[#E8E2D9] data-[state=checked]:bg-[#0555A2] data-[state=checked]:border-[#0555A2]"
                />
                <label
                  htmlFor="new-arrivals"
                  className="text-xs text-stone-700 cursor-pointer select-none font-medium hover:text-[#0555A2]"
                >
                  New Arrivals
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox
                  onClick={() => {
                    setFilter({
                      onSale: filter?.onSale ? null : true,
                    });
                  }}
                  checked={filter?.onSale === true}
                  id="on-sale"
                  className="rounded-md border-[#E8E2D9] data-[state=checked]:bg-[#0555A2] data-[state=checked]:border-[#0555A2]"
                />
                <label
                  htmlFor="on-sale"
                  className="text-xs text-stone-700 cursor-pointer select-none font-medium hover:text-[#0555A2]"
                >
                  On Sale
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="featured"
                  checked={filter?.isFeatured === true}
                  onClick={() => {
                    setFilter({
                      isFeatured: filter?.isFeatured ? null : true,
                    });
                  }}
                  className="rounded-md border-[#E8E2D9] data-[state=checked]:bg-[#0555A2] data-[state=checked]:border-[#0555A2]"
                />
                <label
                  htmlFor="featured"
                  className="text-xs text-stone-700 cursor-pointer select-none font-medium hover:text-[#0555A2]"
                >
                  Featured
                </label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
