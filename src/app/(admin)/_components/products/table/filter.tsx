"use client";
import { ComboboxDemo } from "@/components/global/filter";
import React from "react";
import { TextFilter } from "@/components/global/filter/text-filter";
import { ToggleFilter } from "@/components/global/filter/toggle-filter";
import { DatePickerWithRange } from "@/components/global/filter/date-filter";
import { useProductFilter } from "@/app/(admin)/_hooks/products.hook";
import RangeFilter from "@/components/global/filter/range-filter";

const ProductFilter = () => {
  const { filter, resetFilter, setFilter } = useProductFilter();
  const filterOptions = [
    {
      value: "name",
      label: " Search by product name",
      filterComponent: (
        <TextFilter
          fieldName="name"
          fn={setFilter}
          value={filter.name}
          placeholder="Search products..."
        />
      ),
    },
    {
      value: "isFeatured",
      label: "Featured Status",
      filterComponent: (
        <ToggleFilter
          fieldName="isFeatured"
          fn={setFilter}
          value={filter.isFeatured}
          placeholder="Is Product Featured"
        />
      ),
    },
    {
      value: "isFlashSale",
      label: "Flash Sale Status",
      filterComponent: (
        <ToggleFilter
          fieldName="isFlashSale"
          fn={setFilter}
          value={filter.isFlashSale}
          placeholder="Is Product Flash Sale"
        />
      ),
    },
    {
      value: "isVisible",
      label: "Visible Status",
      filterComponent: (
        <ToggleFilter
          fieldName="isVisible"
          fn={setFilter}
          value={filter.isVisible}
          placeholder="Is Product Visible"
        />
      ),
    },
    {
      value: "onSale",
      label: "On Sale Status",
      filterComponent: (
        <ToggleFilter
          fieldName="onSale"
          fn={setFilter}
          value={filter.onSale}
          placeholder="Is Product On Sale"
        />
      ),
    },
    {
      value: "stockQuantity",
      label: "Stock Quantity",
      filterComponent: (
        <RangeFilter
          fn={setFilter}
          value={filter.stockQuantity!}
          label="stockQuantity"
        />
      ),
    },
    {
      value: "unitSellingPrice",
      label: "Unit Selling Price",
      filterComponent: (
        <RangeFilter
          fn={setFilter}
          value={filter.unitSellingPrice!}
          label="unitSellingPrice"
        />
      ),
    },
    {
      value: "createdAt",
      label: " 📅 Product Created Date",
      filterComponent: (
        <DatePickerWithRange
          fn={setFilter}
          fieldName={"createdAt"}
          fieldValue={filter.createdAt!}
        />
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <ComboboxDemo
          activeFilters={filter}
          filterOptions={filterOptions}
          filterFn={setFilter}
        />
      </div>
    </div>
  );
};

export default ProductFilter;
