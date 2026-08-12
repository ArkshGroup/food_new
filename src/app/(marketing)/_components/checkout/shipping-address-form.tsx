"use client";

import { useRef, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

import { checkoutFormSchema } from "./check-out-client-wrapper";
import { DELIVERY_TYPE, DELIVERY_METHOD, PAYMENT_METHOD } from "@prisma/client";
import { Check, ChevronsUpDownIcon, Globe, Banknote, QrCode } from "lucide-react";
import { countries } from "@/constant/delivery-available-countries";
import { cn } from "@/lib/utils";
import RenderCurrency from "@/helper/render-currency";
import { getCities, getZonesByCity } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export function CheckoutForm({
  form,
}: {
  form: UseFormReturn<
    z.infer<typeof checkoutFormSchema>,
    any,
    z.infer<typeof checkoutFormSchema>
  >;
}) {
  const countryButtonRef = useRef<HTMLButtonElement | null>(null);

  const isInternational = form.watch("deliveryType") === "INTERNATIONAL";
  const [countryOpen, setCountryOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const [zoneOpen, setZoneOpen] = useState(false);

  const getSelectedCountry = () => {
    return countries.find((country) => country.name === form.watch("country"));
  };

  const { data: cities = [], isLoading: cityLoading, isError: cityError } = useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
    staleTime: 1000 * 60 * 60 * 24, // 1 day
  });

  const { data: zones = [], isLoading: zoneLoading } = useQuery({
    queryKey: ["zones", form.watch("cityId")],
    queryFn: () => getZonesByCity(form.watch("cityId")!),
    enabled: !!form.watch("cityId"),
    staleTime: 1000 * 60 * 60 * 24, // 1 day
  });

  return (
    <Form {...form}>
      <form className="space-y-4 font-sans">
        <Card className="border-none shadow-none bg-transparent">
          <CardContent className="space-y-5 p-0">
            {/* Row 1: Recipient Name & Recipient Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {/* Recipient Name Field */}
              <FormField
                control={form.control}
                name="recipientName"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="text-xs font-bold uppercase tracking-wider text-[#1C1917]">
                      Full Name *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Recipient full name"
                        className="h-11 rounded-xl border-[#E8E2D9] focus:border-[#0555A2] focus:ring-2 focus:ring-[#0555A2]/10 bg-white text-stone-800 font-sans text-sm shadow-2xs"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Recipient Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="text-xs font-bold uppercase tracking-wider text-[#1C1917]">
                      Email Address *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="recipient@example.com"
                        className="h-11 rounded-xl border-[#E8E2D9] focus:border-[#0555A2] focus:ring-2 focus:ring-[#0555A2]/10 bg-white text-stone-800 font-sans text-sm shadow-2xs"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Row 2: Delivery Type & Phone Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {/* Delivery Type Field */}
              <FormField
                control={form.control}
                name="deliveryType"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="text-xs font-bold uppercase tracking-wider text-[#1C1917]">
                      Delivery Type *
                    </FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        form.trigger("deliveryMethod");
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full h-11 rounded-xl border-[#E8E2D9] focus:border-[#0555A2] bg-white text-stone-800 font-sans text-sm shadow-2xs">
                          <SelectValue placeholder="Select delivery type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="z-[99999] bg-white border border-[#E8E2D9] shadow-xl rounded-xl">
                        {Object.values(DELIVERY_TYPE).map((type) => (
                          <SelectItem key={type} value={type}>
                            {type
                              .replace("_", " ")
                              .toLowerCase()
                              .replace(/\b\w/g, (c) => c.toUpperCase())}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone Number Field */}
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="text-xs font-bold uppercase tracking-wider text-[#1C1917]">
                      Phone Number *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Mobile or phone number"
                        className="h-11 rounded-xl border-[#E8E2D9] focus:border-[#0555A2] focus:ring-2 focus:ring-[#0555A2]/10 bg-white text-stone-800 font-sans text-sm shadow-2xs"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Row 3: Street Address & Country (if International) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {/* Street Address Field */}
              <FormField
                control={form.control}
                name="addressLine1"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="text-xs font-bold uppercase tracking-wider text-[#1C1917]">
                      Street Address *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="House no, street name, area"
                        className="h-11 rounded-xl border-[#E8E2D9] focus:border-[#0555A2] focus:ring-2 focus:ring-[#0555A2]/10 bg-white text-stone-800 font-sans text-sm shadow-2xs"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Country Field (Only for International) */}
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <>
                    {!isInternational && (
                      <input
                        type="hidden"
                        {...field}
                        value={field.value ?? ""}
                      />
                    )}
                    {isInternational && (
                      <FormItem className="space-y-1.5">
                        <FormLabel className="text-xs font-bold uppercase tracking-wider text-[#1C1917] flex items-center gap-1.5">
                          <Globe className="w-3.5 h-3.5 text-[#0555A2]" />
                          Destination Country *
                        </FormLabel>
                        <FormControl>
                          <Popover
                            open={countryOpen}
                            onOpenChange={setCountryOpen}
                          >
                            <PopoverTrigger asChild>
                              <Button
                                ref={countryButtonRef}
                                variant="outline"
                                role="combobox"
                                aria-expanded={countryOpen}
                                className="w-full h-11 justify-between rounded-xl border-[#E8E2D9] bg-white text-stone-800 font-sans text-sm shadow-2xs"
                              >
                                {field.value ? (
                                  <div className="flex items-center gap-2">
                                    <span className="text-lg">
                                      {getSelectedCountry()?.flag}
                                    </span>
                                    <span>{getSelectedCountry()?.name}</span>
                                  </div>
                                ) : (
                                  "Select destination country"
                                )}
                                <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-[var(--radix-popover-trigger-width)] min-w-[280px] p-0 z-[99999] bg-white border border-[#E8E2D9] shadow-xl rounded-xl overflow-hidden font-sans"
                              align="start"
                            >
                              <Command>
                                <CommandInput
                                  placeholder="Search countries..."
                                  className="h-9"
                                />
                                <CommandList>
                                  <CommandEmpty>No country found.</CommandEmpty>
                                  <CommandGroup>
                                    {countries.map((country) => (
                                      <CommandItem
                                        key={country.name}
                                        value={`${country.name} ${country.code}`}
                                        onSelect={() => {
                                          field.onChange(country.name);
                                          setCountryOpen(false);
                                        }}
                                      >
                                        <div className="flex items-center justify-between w-full gap-2">
                                          <div className="flex items-center gap-2">
                                            <span className="text-lg">
                                              {country.flag}
                                            </span>
                                            <span className="text-xs font-semibold">{country.name}</span>
                                          </div>
                                          <div className="space-x-1 text-xs">
                                            <RenderCurrency
                                              amount={country.base_delivery_npr}
                                            />
                                            <span className="text-stone-400">
                                              /kg
                                            </span>
                                          </div>
                                        </div>
                                        <Check
                                          className={cn(
                                            "ml-auto h-4 w-4 text-[#0555A2]",
                                            field.value === country.code
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
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  </>
                )}
              />
            </div>

            {/* Row 4: Domestic City & Area (Only if Domestic) */}
            {!isInternational && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {/* City Selection */}
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel className="text-xs font-bold uppercase tracking-wider text-[#1C1917]">
                        City *
                      </FormLabel>
                      <Popover open={cityOpen} onOpenChange={setCityOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            disabled={cityLoading}
                            className="w-full h-11 justify-between rounded-xl border-[#E8E2D9] bg-white text-stone-800 font-sans text-sm shadow-2xs"
                          >
                            {cityLoading
                              ? "Loading cities..."
                              : form.watch("city") || "Select city"}
                            <ChevronsUpDownIcon className="opacity-50" />
                          </Button>
                        </PopoverTrigger>

                        <PopoverContent
                          className="w-[var(--radix-popover-trigger-width)] min-w-[280px] p-0 z-[99999] bg-white border border-[#E8E2D9] shadow-xl rounded-xl overflow-hidden font-sans"
                          align="start"
                        >
                          <Command>
                            <CommandInput
                              placeholder="Search city..."
                              className="h-9"
                            />
                            <CommandList>
                              <CommandEmpty>
                                {cityLoading
                                  ? "Loading cities..."
                                  : cityError
                                    ? "Could not load cities. Refresh page."
                                    : "No city found."}
                              </CommandEmpty>
                              <CommandGroup>
                                {cities.map((city) => (
                                  <CommandItem
                                    key={city.city_id}
                                    value={city.city_name}
                                    onSelect={() => {
                                      form.setValue("city", city.city_name, {
                                        shouldValidate: true,
                                      });
                                      form.setValue(
                                        "cityId",
                                        String(city.city_id)
                                      );
                                      form.setValue("zone", undefined);
                                      form.setValue("zoneId", undefined);
                                      setCityOpen(false);
                                    }}
                                  >
                                    <span className="text-xs font-semibold">{city.city_name}</span>
                                    <Check
                                      className={cn(
                                        "ml-auto text-[#0555A2]",
                                        form.watch("cityId") ===
                                          String(city.city_id)
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
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Area / Zone Selection */}
                <FormField
                  control={form.control}
                  name="zone"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel className="text-xs font-bold uppercase tracking-wider text-[#1C1917]">
                        Area / Location *
                      </FormLabel>
                      <Popover open={zoneOpen} onOpenChange={setZoneOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            disabled={!form.watch("cityId") || zoneLoading}
                            className="w-full h-11 justify-between rounded-xl border-[#E8E2D9] bg-white text-stone-800 font-sans text-sm shadow-2xs"
                          >
                            {form.watch("zone")
                              ? form.watch("zone")
                              : !form.watch("cityId")
                                ? "Select city first"
                                : zoneLoading
                                  ? "Loading area..."
                                  : "Select area"}
                            <ChevronsUpDownIcon className="opacity-50" />
                          </Button>
                        </PopoverTrigger>

                        <PopoverContent
                          className="w-[var(--radix-popover-trigger-width)] min-w-[280px] p-0 z-[99999] bg-white border border-[#E8E2D9] shadow-xl rounded-xl overflow-hidden font-sans"
                          align="start"
                        >
                          <Command>
                            <CommandInput
                              placeholder="Search area..."
                              className="h-9"
                            />
                            <CommandList>
                              <CommandEmpty>No area found.</CommandEmpty>
                              <CommandGroup>
                                {zones.map((zone) => (
                                  <CommandItem
                                    key={zone.zone_id}
                                    value={zone.zone_name}
                                    onSelect={() => {
                                      form.setValue("zone", zone.zone_name, {
                                        shouldValidate: true,
                                      });
                                      form.setValue(
                                        "zoneId",
                                        String(zone.zone_id)
                                      );
                                      setZoneOpen(false);
                                    }}
                                  >
                                    <span className="text-xs font-semibold">{zone.zone_name}</span>
                                    <Check
                                      className={cn(
                                        "ml-auto text-[#0555A2]",
                                        form.watch("zoneId") ===
                                          String(zone.zone_id)
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Row 5: Delivery Method */}
            <FormField
              control={form.control}
              name="deliveryMethod"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-xs font-bold uppercase tracking-wider text-[#1C1917]">
                    Delivery Method *
                  </FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      form.trigger("deliveryMethod");
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full h-11 rounded-xl border-[#E8E2D9] focus:border-[#0555A2] bg-white text-stone-800 font-sans text-sm shadow-2xs">
                        <SelectValue placeholder="Select delivery method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="z-[99999] bg-white border border-[#E8E2D9] shadow-xl rounded-xl">
                      <SelectItem value={DELIVERY_METHOD.NORMAL_DELIVERY}>
                        Normal Delivery
                      </SelectItem>
                      <SelectItem
                        disabled={
                          form.getValues("deliveryType") !== "INTERNATIONAL"
                        }
                        value={DELIVERY_METHOD.SELF_COURIER}
                      >
                        Self Courier (Delivery charge bared by recipient)
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  {form.getValues("deliveryType") === "INTERNATIONAL" &&
                    form.getValues("deliveryMethod") === "NORMAL_DELIVERY" && (
                      <p className="text-xs text-[#0555A2] bg-sky-50 border border-sky-100 p-2.5 rounded-xl font-sans mt-1">
                        Note: Delivery charge will be calculated after verification and informed.
                      </p>
                    )}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Payment Method - 2 Interactive Visual Card Boxes */}
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => {
                const isCodDisabled =
                  form.getValues("deliveryType") === "INTERNATIONAL" ||
                  form.getValues("deliveryMethod") === "INSTANT_DELIVERY";

                return (
                  <FormItem className="space-y-3 pt-2">
                    <FormLabel className="text-xs font-bold uppercase tracking-wider text-[#1C1917]">
                      Payment Option *
                    </FormLabel>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Box 1: Cash on Delivery */}
                      <button
                        type="button"
                        disabled={isCodDisabled}
                        onClick={() => {
                          field.onChange(PAYMENT_METHOD.CASH_ON_DELIVERY);
                          form.trigger("paymentMethod");
                        }}
                        className={cn(
                          "relative text-left p-4 rounded-2xl border-2 transition-all flex flex-col justify-between space-y-3 font-sans",
                          field.value === PAYMENT_METHOD.CASH_ON_DELIVERY
                            ? "border-[#0555A2] bg-[#F0F7FD] shadow-2xs"
                            : "border-[#E2EEF8] bg-white hover:border-[#0555A2]/40",
                          isCodDisabled && "opacity-50 cursor-not-allowed bg-stone-50"
                        )}
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0555A2] flex items-center justify-center border border-sky-100">
                            <Banknote className="w-5 h-5" />
                          </div>
                          {field.value === PAYMENT_METHOD.CASH_ON_DELIVERY && (
                            <span className="w-5 h-5 rounded-full bg-[#0555A2] text-white flex items-center justify-center text-[10px] font-bold">
                              ✓
                            </span>
                          )}
                        </div>

                        <div className="space-y-1">
                          <p className="text-sm font-serif font-bold text-[#1C1917]">
                            Cash on Delivery (COD)
                          </p>
                          <p className="text-[11px] text-stone-500 leading-relaxed font-sans">
                            Pay with cash when package is delivered to your doorstep.
                          </p>
                        </div>
                      </button>

                      {/* Box 2: Online / QR Payment */}
                      <button
                        type="button"
                        onClick={() => {
                          field.onChange(PAYMENT_METHOD.ONLINE_PAYMENT);
                          form.trigger("paymentMethod");
                        }}
                        className={cn(
                          "relative text-left p-4 rounded-2xl border-2 transition-all flex flex-col justify-between space-y-3 font-sans",
                          field.value === PAYMENT_METHOD.ONLINE_PAYMENT
                            ? "border-[#0555A2] bg-[#F0F7FD] shadow-2xs"
                            : "border-[#E2EEF8] bg-white hover:border-[#0555A2]/40"
                        )}
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#28AAE0] flex items-center justify-center border border-sky-100">
                            <QrCode className="w-5 h-5" />
                          </div>
                          {field.value === PAYMENT_METHOD.ONLINE_PAYMENT && (
                            <span className="w-5 h-5 rounded-full bg-[#0555A2] text-white flex items-center justify-center text-[10px] font-bold">
                              ✓
                            </span>
                          )}
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <p className="text-sm font-serif font-bold text-[#1C1917]">
                              Online / QR Payment
                            </p>
                            <span className="text-[9px] font-bold uppercase tracking-wider text-[#0555A2] bg-sky-100 px-1.5 py-0.5 rounded">
                              Instant
                            </span>
                          </div>
                          <p className="text-[11px] text-stone-500 leading-relaxed font-sans">
                            Pay via Fonepay QR, eSewa, Khalti, or Mobile Banking.
                          </p>
                        </div>
                      </button>
                    </div>

                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
