"use client";

import React from "react";
import { useProductFilter } from "../../_hooks/useProductFilter.hook";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const AppliedFilterDisplayContainer = () => {
  const { filter, resetFilter, setFilter } = useProductFilter();

  const clearAllFilters = () => {
    resetFilter();
  };

  const removeFilter = (key: string, value?: string) => {
    if (key === "categoryNames" && filter.categoryNames) {
      const updated = filter.categoryNames
        .split(",")
        .filter((v: string) => v !== value)
        .join(",");
      setFilter({ categoryNames: updated || null });
      return;
    }

    if (key === "brandNames" && filter.brandNames) {
      const updated = filter.brandNames
        .split(",")
        .filter((v: string) => v !== value)
        .join(",");
      setFilter({ brandNames: updated || null });
      return;
    }

    setFilter({
      [key]: null,
    });
  };

  const appliedFilters: { label: string; key: string; value?: string }[] = [];

  if (filter?.name) {
    appliedFilters.push({ label: `search: ${filter.name}`, key: "name" });
  }

  if (filter?.specialPrice) {
    const [min, max] = filter.specialPrice.split("-");
    appliedFilters.push({
      label: `Price: ${min} - ${max}`,
      key: "specialPrice",
    });
  }

  if (filter?.categoryNames) {
    filter.categoryNames.split(",").forEach((name: string) =>
      appliedFilters.push({
        label: `category: ${name}`,
        key: "categoryNames",
        value: name,
      })
    );
  }

  if (filter?.brandNames) {
    filter.brandNames.split(",").forEach((name: string) =>
      appliedFilters.push({
        label: `brand: ${name}`,
        key: "brandNames",
        value: name,
      })
    );
  }

  if (filter?.newArrivals)
    appliedFilters.push({ label: "New Arrivals", key: "newArrivals" });

  if (filter?.onSale) appliedFilters.push({ label: "On Sale", key: "onSale" });

  if (filter?.isFeatured)
    appliedFilters.push({ label: "Featured", key: "isFeatured" });

  if (appliedFilters.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mt-4">
      {appliedFilters.map((f, i) => (
        <div
          key={i}
          className={cn(
            "flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-sm rounded-full"
          )}
        >
          <span>{f.label}</span>
          <button
            onClick={() => removeFilter(f.key, f.value)}
            className="hover:text-red-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}

      <Button
        variant="ghost"
        size="sm"
        onClick={clearAllFilters}
        className="text-gray-600 hover:text-gray-900"
      >
        Clear All
      </Button>
    </div>
  );
};

export default AppliedFilterDisplayContainer;
