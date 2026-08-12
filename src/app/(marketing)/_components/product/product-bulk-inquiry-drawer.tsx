// "use client"; directive is kept at the top

"use client";

import * as React from "react";
import { TruckIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
// Import form components from shadcn/ui
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { UNIT } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { bulkOrderInquiryValidation } from "../../_validations/bulk-order-inquiry.validation";
import { useAction } from "next-safe-action/hooks";
import { createBulkOrderInquiryMutation } from "../../_mutation/bulk-order-inquiry.mutation";
import { IProductGetBySlug } from "../../_types/products";
import RenderCurrency from "@/helper/render-currency";

type BulkOrderInquiryFormData = z.infer<typeof bulkOrderInquiryValidation>;

export function BulkOrderInquiry({ product, className }: { product: IProductGetBySlug; className?: string }) {
  const { execute, isPending } = useAction(createBulkOrderInquiryMutation, {
    onSuccess: (res) => {
      if (res.data.success) {
        toast.success(
          res.data.message || "Bulk order inquiry submitted successfully!"
        );
        reset();
        setOpen(false);
      }
    },
    onError: (error) => {
      toast.error(
        error?.error?.serverError?.message ||
          "Failed to submit inquiry. Please try again."
      );
    },
  });
  const [open, setOpen] = React.useState(false);
  const session = useSession();

  const form = useForm<BulkOrderInquiryFormData>({
    resolver: zodResolver(bulkOrderInquiryValidation),
    defaultValues: {
      productId: product.id,
      notes: "",
      unit: UNIT.pcs,
      phoneNumber: "",
    },
  });

  const { handleSubmit, reset } = form;

  React.useEffect(() => {
    if (open && session.status !== "authenticated") {
      toast.message("You must be logged in for a bulk order request.");
      setOpen(false);
    }
  }, [open, session.status]);

  const onSubmit = async (values: BulkOrderInquiryFormData) => {
    execute({
      ...values,
    });
  };

  // Get the first product image or use placeholder
  const productImage =
    product.images?.[0]?.imageUrl || "/placeholder.svg?height=200&width=200";

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className={className || "w-full bg-transparent"}>
          <TruckIcon className="w-3.5 h-3.5 mr-1.5" />
          Bulk Order
        </Button>
      </DrawerTrigger>
      <DrawerContent className="min-h-[90vh] md:min-h-fit">
        <DrawerHeader>
          <DrawerTitle className="sr-only">Bulk Order Inquiry</DrawerTitle>
        </DrawerHeader>
        <div className="overflow-y-auto px-4 pb-20">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-[200px_1fr]">
                <div className="flex items-start justify-center md:justify-start">
                  <div className="relative aspect-square w-full max-w-[200px] overflow-hidden rounded-lg border bg-muted">
                    <Image
                      src={productImage}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 200px"
                      priority
                    />
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Unit Price:{" "}
                      <RenderCurrency amount={product.specialPrice} />
                    </p>
                  </div>

                  <div className="grid w-full grid-cols-2 gap-x-4">
                    {/* Quantity Field */}
                    <FormField
                      control={form.control}
                      name="quantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="quantity">
                            Quantity <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="quantity"
                              type="number"
                              min="1"
                              placeholder="Enter quantity"
                              {...field}
                              value={field.value}
                              onChange={(e) => {
                                // Update field value as number/string for internal state
                                const val = e.target.value;
                                if (val === "") {
                                  field.onChange(1); // Keep it a number, prevent empty string
                                } else {
                                  field.onChange(parseInt(val, 10));
                                }
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Unit Select Field */}
                    <FormField
                      control={form.control}
                      name="unit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="unit">
                            Unit <span className="text-destructive">*</span>
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select unit" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Available Units</SelectLabel>
                                {Object.values(UNIT).map((u) => (
                                  <SelectItem key={u} value={u}>
                                    {u}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {/* Notes Textarea Field */}
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="phoneNumber">
                          Phone Number
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="phoneNumber"
                            placeholder="Enter your phone number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Notes Textarea Field */}
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="notes">Additional Notes</FormLabel>
                        <FormControl>
                          <Textarea
                            id="notes"
                            placeholder="Enter any special requirements or questions..."
                            rows={4}
                            className="resize-none"
                            {...field}
                            // Ensure empty string for an optional field
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? "Submitting..." : "Submit Inquiry"}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
