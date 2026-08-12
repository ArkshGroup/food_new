/** biome-ignore-all lint/suspicious/noExplicitAny: <> */
import type { ParserBuilder, SetValues } from "nuqs";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Command, CommandInput, CommandItem } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface IMultiSelectFilterProps<
  T extends Record<string | any, ParserBuilder<any>>
> {
  items: string[];
  fn: SetValues<T>;
  fieldName: any;
  placeholder?: string;
  selectedItems: string;
}

const MultiSelectFilter = <T extends Record<string | any, ParserBuilder<any>>>({
  items,
  fn,
  selectedItems,
  fieldName,
  placeholder,
}: IMultiSelectFilterProps<T>) => {
  // Parse selected items into an array using useMemo for performance
  const [selected, setSelected] = useState<string>(selectedItems);

  const selectedArray = useMemo(() => {
    return selected ? selected.split(",").map((item) => item.trim()) : [];
  }, [selected]);

  const handleToggle = (item: string) => {
    const newSelected = selectedArray.includes(item)
      ? selectedArray.filter((i) => i !== item)
      : [...selectedArray, item];
    setSelected(newSelected.join(","));
    fn({
      [fieldName]: newSelected.join(","),
    } as any);
  };
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            {placeholder}{" "}
            {selectedArray.length > 0 && `(${selectedArray.length})`}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-0">
          <Command className="rounded-lg border shadow-md md:min-w-[450px]">
            <CommandInput placeholder={placeholder || "Search filter"} />
            {items.map((item) => {
              const isSelected = selectedArray.includes(item);

              return (
                <CommandItem
                  className="flex cursor-pointer items-center space-x-2"
                  key={item}
                  onSelect={() => handleToggle(item)}
                >
                  <Checkbox checked={isSelected} />
                  <span>{item}</span>
                </CommandItem>
              );
            })}
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default MultiSelectFilter;
