"use client";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProductFilter } from "../../_hooks/useProductFilter.hook";
import { ArrowDown01Icon, ArrowDown10Icon } from "lucide-react";

export function ProductOrderBy({ productCount }: { productCount?: number }) {
  const { filter, setFilter } = useProductFilter();

  // If the filter object is null or undefined, return null to render nothing
  if (!filter) {
    return null;
  }

  // 1. Determine the correct 'value' string for the Select component based on the current filter state
  //    Return undefined if no specific sorting is applied to prevent initial selection.
  const getSelectValue = () => {
    if (filter.sortBy === "specialPrice" && filter.sortOrder === "desc") {
      return "price-desc";
    } else if (filter.sortBy === "specialPrice" && filter.sortOrder === "asc") {
      return "price-asc";
    }
    // Return undefined when no sorting is selected, which allows the placeholder to show.
    return undefined;
  };

  // A temporary variable to hold the value for the Select component
  const selectValue = getSelectValue();

  return (
    <div className="w-full flex py-3 items-center justify-between bg-white border border-[#E8E2D9] px-6 rounded-2xl shadow-xs text-stone-700 text-xs sm:text-sm font-sans">
      <h3 className="hidden lg:block text-stone-600 font-medium">
        Showing <span className="font-bold text-[#0555A2]">{productCount}</span> items
      </h3>
      <div className="flex items-center gap-3 ml-auto">
        <Select
          onValueChange={(value) => {
            let sortBy = "specialPrice";
            let sortOrder = "desc";
            if (value === "price-asc") {
              sortBy = "specialPrice";
              sortOrder = "asc";
            } else if (value === "price-desc") {
              sortBy = "specialPrice";
              sortOrder = "desc";
            }

            setFilter({
              sortBy,
              sortOrder,
            });
          }}
          value={selectValue}
        >
          <SelectTrigger className="w-[150px] lg:w-[190px] bg-[#FAF8F5] border-[#E8E2D9] text-xs font-medium rounded-xl text-stone-800 focus:ring-[#0555A2]">
            <SelectValue placeholder="Sort by Price" />
          </SelectTrigger>
          <SelectContent className="bg-white border-[#E8E2D9] rounded-xl shadow-lg font-sans text-xs">
            <SelectGroup>
              <SelectLabel className="text-[10px] font-bold text-stone-400 uppercase tracking-widest px-2 py-1">Sort By Price</SelectLabel>
              <SelectItem value="price-desc" className="text-xs focus:bg-sky-50 focus:text-[#0555A2]">
                Price (High To Low)
                <ArrowDown10Icon className="inline ml-2 w-3.5 h-3.5" />
              </SelectItem>
              <SelectItem value="price-asc" className="text-xs focus:bg-sky-50 focus:text-[#0555A2]">
                Price (Low To High)
                <ArrowDown01Icon className="inline rotate-180 ml-2 w-3.5 h-3.5" />
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
