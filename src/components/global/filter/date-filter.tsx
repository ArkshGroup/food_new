/** biome-ignore-all lint/suspicious/noExplicitAny: <> */
/** biome-ignore-all lint/complexity/noBannedTypes: <> */
"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export function DatePickerWithRange({
  fn,
  fieldName,
  fieldValue,
}: {
  fn: Function;
  fieldName?: string;
  fieldValue?: string;
}) {
  const [to, from] = fieldValue?.split("|") || [];

  const [date, setDate] = useState<DateRange | undefined>({
    from: from ? new Date(from.trim()) : undefined,
    to: to ? new Date(to.trim()) : undefined,
  });

  const handleDateChange = (value: DateRange | undefined) => {
    setDate(value);
    if (value && fieldName) {
      const fromString = value.from ? value.from.toISOString() : "";
      const toDateString = value.to ? value.to.toISOString() : "";
      if (fromString === toDateString) {
        fn({
          [fieldName]: fromString,
        });
      } else {
        fn({
          [fieldName]: `${fromString}|${toDateString}`,
        });
      }
    }
  };

  return (
    <div className={cn("grid gap-2")}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
            id="date"
            variant={"outline"}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-0">
          <Calendar
            defaultMonth={date?.from ?? new Date()}
            autoFocus
            mode="range"
            numberOfMonths={2}
            onSelect={handleDateChange}
            selected={date}
            className=" w-fit"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
