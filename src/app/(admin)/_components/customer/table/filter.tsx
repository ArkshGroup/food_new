"use client";
import { ComboboxDemo } from "@/components/global/filter";
import React from "react";
import { TextFilter } from "@/components/global/filter/text-filter";
import { DatePickerWithRange } from "@/components/global/filter/date-filter";

import { useCustomerFilter } from "@/app/(admin)/_hooks/customer.hook";

const CustomerFilter = () => {
  const { filter, setFilter } = useCustomerFilter();
  const filterOptions = [
    {
      value: "name",
      label: " Search by customer name",
      filterComponent: (
        <TextFilter
          fieldName="name"
          fn={setFilter}
          value={filter.name}
          placeholder="search for customer name..."
        />
      ),
    },
    {
      value: "email",
      label: " Search by customer email",
      filterComponent: (
        <TextFilter
          fieldName="email"
          fn={setFilter}
          value={filter.email}
          placeholder="search for customer email..."
        />
      ),
    },
    {
      value: "createdAt",
      label: " Created Date",
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

export default CustomerFilter;
