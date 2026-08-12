/** biome-ignore-all lint/suspicious/noExplicitAny: <> */
import type { ParserBuilder, SetValues } from "nuqs";
import { useEffect, useMemo, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface IMultiCheckBoxFilterProps<
  T extends Record<string | any, ParserBuilder<any>>,
> {
  items: Array<{ value: string; label: string }>;
  fn: SetValues<T>;
  fieldName: any;
  selectedItems: string;
}

const MultiCheckBoxFilter = <
  T extends Record<string | any, ParserBuilder<any>>,
>({
  items,
  fn,
  selectedItems,
  fieldName,
}: IMultiCheckBoxFilterProps<T>) => {
  const [selected, setSelected] = useState<string>(selectedItems);

  useEffect(() => {
    setSelected(selectedItems);
  }, [selectedItems]);

  const selectedArray = useMemo(() => {
    return selected ? selected.split(",").map((item) => item.trim()) : [];
  }, [selected]);

  const handleToggle = (value: string) => {
    const newSelected = selectedArray.includes(value)
      ? selectedArray.filter((i) => i !== value)
      : [...selectedArray, value];

    setSelected(newSelected.join(","));
    fn({
      [fieldName]: newSelected.join(","),
    } as any);
  };

  return (
    <div className="flex flex-col gap-2">
      {items.map((item) => {
        const isSelected = selectedArray.includes(item.value);

        return (
          <div key={item.value} className="flex   items-center space-x-2">
            <Checkbox
              checked={isSelected}
              onCheckedChange={() => handleToggle(item.value)}
            />
            <span
              className="cursor-pointer"
              onClick={() => handleToggle(item.value)}
            >
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default MultiCheckBoxFilter;
