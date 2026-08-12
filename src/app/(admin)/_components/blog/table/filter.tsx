"use client";

import { ComboboxDemo } from "@/components/global/filter";
import React from "react";
import { TextFilter } from "@/components/global/filter/text-filter";
import { ToggleFilter } from "@/components/global/filter/toggle-filter";
import { DatePickerWithRange } from "@/components/global/filter/date-filter";
import { useBlogFilter } from "@/app/(admin)/_hooks/blog.hook";

const BlogFilter = () => {
  const { filter, resetFilter, setFilter } = useBlogFilter();

  const filterOptions = [
    {
      value: "title",
      label: " 🔍 Search by title",
      filterComponent: (
        <TextFilter
          fieldName="title"
          fn={setFilter}
          value={filter.title}
          placeholder="Search titles..."
        />
      ),
    },
    {
      value: "author",
      label: " ✍️ Search by author",
      filterComponent: (
        <TextFilter
          fieldName="author"
          fn={setFilter}
          value={filter.author}
          placeholder="Author name..."
        />
      ),
    },
    {
      value: "isPublished",
      label: " ✅ Published status",
      filterComponent: (
        <ToggleFilter
          fieldName="isPublished"
          fn={setFilter}
          value={filter.isPublished}
          placeholder="Is Published"
        />
      ),
    },
    {
      value: "createdAt",
      label: " 📅 Created date",
      filterComponent: (
        <DatePickerWithRange
          fn={setFilter}
          fieldName={"createdAt"}
          fieldValue={filter.createdAt!}
        />
      ),
    },
    {
      value: "publishedAt",
      label: " 🗓️ Published date",
      filterComponent: (
        <DatePickerWithRange
          fn={setFilter}
          fieldName={"publishedAt"}
          fieldValue={filter.publishedAt!}
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

export default BlogFilter;
