/** biome-ignore-all lint/suspicious/noExplicitAny: <> */
"use client";

import type { ParserBuilder, SetValues, Values } from "nuqs";
import { type ChangeEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { useDebouncedCallback } from "@/hooks/use-debounce-callback";

export const TextFilter = <T extends Record<string | any, ParserBuilder<any>>>({
  fn,
  fieldName,
  placeholder,
  value,
}: {
  fn: SetValues<T>;
  fieldName: any;
  placeholder?: string;
  value: string | null;
}) => {
  const [text, setText] = useState(value || "");

  const debouncedSetFilterValues = useDebouncedCallback(
    (inputValue: string) => {
      fn({
        [fieldName]: inputValue,
      } as unknown as Partial<{ [K in keyof Values<T>]: Values<T>[K] | null }>);
    },
    500
  );

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    debouncedSetFilterValues(e.target.value);
  }

  return (
    <div className="flex flex-col gap-y-2">
      <Input
        className="min-w-[2rem] bg-background shadow-none"
        onChange={(e) => {
          setText(e.target.value);
          handleChange(e);
        }}
        placeholder={placeholder || ""}
        value={text}
      />
    </div>
  );
};
