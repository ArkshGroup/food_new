"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format, max } from "date-fns";
import { CalendarIcon, TagIcon, CodeIcon, PercentIcon } from "lucide-react";

import { useAction } from "next-safe-action/hooks";

import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  createDiscountCodeMutation,
  updateDiscountCodeMutation,
} from "../../_mutation/discount.mutation";
import { adminNavigationPath } from "../../_config/admin.config";

const formSchema = z.object({
  name: z.string().min(1, "Discount name is required"),
  code: z.string().min(1, "Discount code is required").toUpperCase(),
  startDate: z.date(),
  endDate: z.date(),
  minOrderAmount: z.number().min(0, "Minimum order amount must be positive"),
  value: z.number().min(0, "Discount value must be positive"),
  discountPercent: z
    .number()
    .min(0)
    .max(100, "Percentage must be between 0-100"),
  maxDiscountAmount: z
    .number()
    .min(0, "Maximum discount amount must be positive")
    .optional(),
  discountType: z.enum(["FIXED_AMOUNT", "PERCENTAGE"]),
  isActive: z.boolean(),
  usageLimit: z.number().min(0, "Usage limit must be positive"),
  isDiscountCodeVisibleToPublic: z.boolean().optional(),
});

type DiscountCodeFormValues = z.infer<typeof formSchema>;
type DiscountCodeUpdateFormValues = DiscountCodeFormValues & { id: number };

export function DiscountCodeForm({
  initialData,
}: {
  initialData?: DiscountCodeUpdateFormValues;
}) {
  const router = useRouter();
  const { execute: excCreate, isPending: excCreatePending } = useAction(
    createDiscountCodeMutation,
    {
      onSuccess: (res) => {
        if (!res.data.success) {
          toast.error(res.data.message || "Failed to create discount code");
        } else {
          toast.success(
            res.data.message || "Discount code created successfully"
          );
          router.push(adminNavigationPath.discountCode.path);
        }
      },
      onError: (error) => {
        console.error("Error creating discount code:", error);
      },
    }
  );

  const { execute: excUpdate, isPending: excUpdatePending } = useAction(
    updateDiscountCodeMutation,
    {
      onSuccess: (res) => {
        if (!res.data.success) {
          toast.error(res.data.message || "Failed to update discount code");
        } else {
          toast.success(
            res.data.message || "Discount code updated successfully"
          );
          router.push(adminNavigationPath.discountCode.path);
        }
      },
      onError: (error) => {
        console.error("Error updating discount code:", error);
      },
    }
  );

  const form = useForm<DiscountCodeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: initialData?.code || "",
      name: initialData?.name || "",
      startDate: initialData?.startDate || new Date(),
      endDate: initialData?.endDate || new Date(),
      minOrderAmount: initialData?.minOrderAmount || 0,
      value: initialData?.value || 0,
      discountPercent: initialData?.discountPercent || 0,
      discountType: initialData?.discountType || "FIXED_AMOUNT",
      maxDiscountAmount: initialData?.maxDiscountAmount || 0,
      isActive: initialData?.isActive ?? true,
      usageLimit: initialData?.usageLimit || 0,
      isDiscountCodeVisibleToPublic: initialData?.isDiscountCodeVisibleToPublic,
    },
  });

  const discountType = form.watch("discountType");

  function onSubmit(values: DiscountCodeFormValues) {
    if (initialData) {
      excUpdate({ ...values, id: initialData.id });
    } else {
      excCreate({ ...values });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <TagIcon className="h-4 w-4 inline-block mr-2" />
                Discount Name
              </FormLabel>
              <FormControl>
                <Input placeholder="Summer Sale" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <CodeIcon className="h-4 w-4 inline-block mr-2" />
                Discount Code
              </FormLabel>
              <FormControl>
                <Input placeholder="SUMMER20" {...field} />
              </FormControl>
              <FormDescription>
                The unique code users will enter at checkout.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="discountType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <PercentIcon className="h-4 w-4 inline-block mr-2" />
                Discount Type
              </FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select discount type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="FIXED_AMOUNT">
                    Fixed Amount (रु)
                  </SelectItem>
                  <SelectItem value="PERCENTAGE">Percentage (%)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isDiscountCodeVisibleToPublic"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-2 space-y-0 rounded-md border p-3">
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Discount Visible To Public</FormLabel>
                <FormDescription>
                  Whether this discount should be visible to the public.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>
                  <CalendarIcon className="h-4 w-4 inline-block mr-2" />
                  Start Date
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value && field.value instanceof Date ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value as Date}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>
                  <CalendarIcon className="h-4 w-4 inline-block mr-2" />
                  End Date
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value as Date, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value as Date}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {discountType === "FIXED_AMOUNT" ? (
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>रु Discount Value</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="10.00"
                      step="0.01"
                      value={field.value}
                      onChange={(e) =>
                        field.onChange(Number.parseFloat(e.target.value) || 0)
                      }
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <>
              <FormField
                control={form.control}
                name="discountPercent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>% Discount Percentage</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="20"
                        min="0"
                        max="100"
                        step="0.01"
                        value={field.value}
                        onChange={(e) =>
                          field.onChange(Number.parseFloat(e.target.value) || 0)
                        }
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maxDiscountAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Discount Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        value={field.value}
                        onChange={(e) =>
                          field.onChange(Number.parseFloat(e.target.value) || 0)
                        }
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <FormField
            control={form.control}
            name="minOrderAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>रु Minimum Order Amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="50.00"
                    step="0.01"
                    value={field.value}
                    onChange={(e) =>
                      field.onChange(Number.parseFloat(e.target.value) || 0)
                    }
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="usageLimit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Usage Limit
                  <span className="text-xs">
                    (Number of times the code can be used in total.)
                  </span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="100"
                    value={field.value}
                    onChange={(e) =>
                      field.onChange(Number.parseInt(e.target.value) || 0)
                    }
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Is Active</FormLabel>
                <FormDescription>
                  Activate or deactivate the discount code.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button disabled={excCreatePending || excUpdatePending} type="submit">
          {initialData ? "Update Discount Code" : "Create Discount Code"}
        </Button>
      </form>
    </Form>
  );
}
