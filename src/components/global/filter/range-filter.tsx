"use client";

import { useDebouncedCallback } from "@/hooks/use-debounce-callback";
import { Label } from "@radix-ui/react-label";
import { Slider } from "@/components/ui/slider";
import type { SetValues } from "nuqs";
import { useEffect, useState } from "react";

interface IRangeFilterProps {
  value?: string | null;
  fn: SetValues<any>;
  label: string;
  minRange?: number;
  maxRange?: number;
}

const RangeFilter = ({
  fn,
  label,
  value,
  minRange = 0,
  maxRange = 5_000,
}: IRangeFilterProps) => {
  const [min, max] = value?.split("-").map(Number) || [minRange, maxRange];
  const [range, setRange] = useState([min, max]);

  const debouncedSetFilterValues = useDebouncedCallback(() => {
    fn({
      [label]: `${range[0]}-${range[1]}`,
    });
  }, 500);

  // Sync state with URL changes
  useEffect(() => {
    setRange([min, max]);
  }, [min, max]);

  return (
    <div className="flex flex-col gap-y-4">
      <Label className="capitalize">
        Range: {range[0]} - {range[1]}
      </Label>
      <Slider
        defaultValue={[min, max]}
        max={maxRange}
        min={minRange}
        onValueChange={(newRange) => {
          setRange(newRange);
          debouncedSetFilterValues();
        }}
        step={1}
        value={range}
      />
    </div>
  );
};

export default RangeFilter;
