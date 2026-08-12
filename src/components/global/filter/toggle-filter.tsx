/** biome-ignore-all lint/suspicious/noExplicitAny: <> */
"use client";

import type { ParserBuilder, SetValues } from "nuqs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function ToggleFilter<
  T extends Record<string | any, ParserBuilder<any>>
>({
  fn,
  fieldName,
  placeholder,
  value,
}: {
  fn: SetValues<T>;
  fieldName: keyof T;
  placeholder?: string;
  value: boolean | null;
}) {
  return (
    <div className="flex items-center space-x-2">
      <Label>{placeholder}</Label>
      <Switch
        checked={value ?? false}
        onCheckedChange={(checked) => {
          fn({
            [fieldName]: checked,
          } as any);
        }}
      />
    </div>
  );
}
