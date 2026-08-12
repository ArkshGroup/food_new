"use client";
import { ComboboxDemo } from "@/components/global/filter";
import React from "react";
import { TextFilter } from "@/components/global/filter/text-filter";
import { DatePickerWithRange } from "@/components/global/filter/date-filter";

import { useOrderFilter } from "@/app/(admin)/_hooks/orders.hook";

const BulkOrderInquiryFilter = () => {
  const { filter, setFilter } = useOrderFilter();
  const filterOptions = [
    {
      value: "customerEmail",
      label: "📧 Search by customer email",
      filterComponent: (
        <TextFilter
          fieldName="customerEmail"
          fn={setFilter}
          value={filter.customerEmail}
          placeholder="search for customer email..."
        />
      ),
    },
    {
      value: "createdAt",
      label: "📅 Product Ordered Date",
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

export default BulkOrderInquiryFilter;
