"use client";
import { ComboboxDemo } from "@/components/global/filter";
import React from "react";
import { TextFilter } from "@/components/global/filter/text-filter";
import { DatePickerWithRange } from "@/components/global/filter/date-filter";
import RangeFilter from "@/components/global/filter/range-filter";
import { useOrderFilter } from "@/app/(admin)/_hooks/orders.hook";
import MultiSelectFilter from "@/components/global/filter/multi-select-filter";
import { ORDER_STATUS, PAYMENT_STATUS } from "@prisma/client";

const OrderFilter = () => {
  const { filter, resetFilter, setFilter } = useOrderFilter();
  const filterOptions = [
    {
      value: "id",
      label: "🔍 Search by order ID",
      filterComponent: (
        <TextFilter
          fieldName="id"
          fn={setFilter}
          value={filter.id!}
          placeholder="search for order ID..."
        />
      ),
    },
    {
      value: "orderNumber",
      label: "🔍 Search by order number",
      filterComponent: (
        <TextFilter
          fieldName="orderNumber"
          fn={setFilter}
          value={filter.orderNumber?.toString() || ""}
          placeholder="search for order number..."
        />
      ),
    },

    {
      value: "customerName",
      label: "🔍 Search by customer name",
      filterComponent: (
        <TextFilter
          fieldName="customerName"
          fn={setFilter}
          value={filter.customerName}
          placeholder="search for customer..."
        />
      ),
    },
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
      value: "totalAmount",
      label: "💰 Total Amount Range",
      filterComponent: (
        <RangeFilter
          label="totalAmount"
          fn={setFilter}
          value={filter.totalAmount}
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
    {
      value: "orderStatus",
      label: "🛒 Order Status",
      filterComponent: (
        <MultiSelectFilter
          fieldName={"orderStatus"}
          fn={setFilter}
          selectedItems={filter.orderStatus!}
          items={Object.values(ORDER_STATUS)}
          placeholder="Filter by status"
        />
      ),
    },
    {
      value: "paymentStatus",
      label: "💳 Payment Status",
      filterComponent: (
        <MultiSelectFilter
          fieldName={"paymentStatus"}
          fn={setFilter}
          selectedItems={filter.paymentStatus!}
          items={Object.values(PAYMENT_STATUS)}
          placeholder="Filter by status"
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

export default OrderFilter;
