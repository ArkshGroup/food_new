"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Trash2Icon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface IFilterOptions {
  value: string;
  label: string;
  filterComponent: React.ReactNode;
}

interface ComboboxDemoProps {
  activeFilters: Record<string, any>;
  filterOptions: IFilterOptions[];
  filterFn: (filters: Record<string, any>) => void;
}

export function ComboboxDemo({
  activeFilters,
  filterOptions,
  filterFn,
}: ComboboxDemoProps) {
  const activeFilterFromSearchParams = Object.entries(activeFilters)
    .filter(([_, value]) => value != null)
    .map(([key]) => key);

  const [open, setOpen] = React.useState(false);
  const [filters, setFilters] = React.useState<string[]>(
    activeFilterFromSearchParams
  );

  React.useEffect(() => {
    setFilters(activeFilterFromSearchParams);
  }, [JSON.stringify(activeFilterFromSearchParams)]);

  return (
    <div className=" flex flex-col">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            Select Filters
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Search filter..." className="h-9" />
            <CommandList>
              <CommandEmpty>No filter found.</CommandEmpty>
              <CommandGroup>
                {filterOptions.map((filter) => (
                  <CommandItem
                    key={filter.value}
                    value={filter.value}
                    onSelect={(currentValue) => {
                      if (!filters.includes(currentValue)) {
                        setFilters((prev) => [...prev, currentValue]);
                      }
                      setOpen(false);
                    }}
                  >
                    {filter.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        filters.includes(filter.value)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <div className="">
        <div className=" flex flex-wrap">
          {filterOptions
            .filter((opt) => filters.includes(opt.value))
            .map((f, index) => {
              return (
                <div
                  key={f.value}
                  className="flex items-center justify-between border border-dashed border-gray-300 bg-slate-50/50 dark:bg-slate-800/50 rounded-md p-3 my-2"
                >
                  <div className="flex-1">{f.filterComponent}</div>
                  <Trash2Icon
                    className="ml-2 h-4 w-4 cursor-pointer text-red-500 hover:text-red-700"
                    onClick={() => {
                      // Remove from URL params
                      filterFn({
                        [f.value]: null,
                      });
                      // Remove from local state
                      setFilters((prev) =>
                        prev.filter((filter) => filter !== f.value)
                      );
                    }}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
