"use client";

import type React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  Globe,
  MapPin,
  ChevronsUpDown,
  Check,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { registerValidationSchema } from "@/app/(auth)/_validation/register.validation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LoginRegisterImage, LogoImage } from "../../../../../../public/images";
import { countries } from "@/constant/countries";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useAction } from "next-safe-action/hooks";
import { handleRegisterMutation } from "@/app/(auth)/_mutation/register.mutation";

type FormData = z.infer<typeof registerValidationSchema>;

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const router = useRouter();

  const { execute, isPending } = useAction(handleRegisterMutation, {
    onSuccess: (response) => {
      if (response.data.success) {
        toast.success(response.data.message);
        router.push("/auth/login");
      } else {
        toast.error(response.data.message);
      }
    },
    onError: (error) => {
      console.error("Registration Error:", error);
      toast.error("An error occurred during registration.");
    },
  });

  const form = useForm<FormData>({
    resolver: zodResolver(registerValidationSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      userName: "",
      country: "",
      zipCode: "",
      address: "",
      phoneNumber: "",
      termsAndConditionsAccepted: false,
    },
  });

  const onSubmit = (data: FormData) => {
    execute(data);
  };

  const getCountryDialCode = (countryName?: string) => {
    if (!countryName) return "+977";
    const c = countries.find((item) => item.name === countryName);
    if (!c) return "+977";
    const dialCodes: Record<string, string> = {
      NP: "+977",
      IN: "+91",
      US: "+1",
      GB: "+44",
      AU: "+61",
      JP: "+81",
      DE: "+49",
      FR: "+33",
      CA: "+1",
      AE: "+971",
      KR: "+82",
      SG: "+65",
      MY: "+60",
      QA: "+974",
      SA: "+966",
      CN: "+86",
    };
    return dialCodes[c.code] || "+977";
  };

  const selectedCountry = form.watch("country");

  return (
    <div className="w-full min-h-screen bg-[#FAF8F5] py-8 lg:py-12 font-sans relative overflow-hidden flex flex-col items-center justify-center">
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0555A2]/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#28AAE0]/5 rounded-full filter blur-3xl pointer-events-none" />

      <main className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 my-auto">
        
        {/* Brand Header */}
        <div className="text-center max-w-md mx-auto space-y-2 mb-6">
          <Link href="/" className="inline-block transition-transform hover:scale-105">
            <Image
              src={LogoImage}
              alt="Arksh Food Logo"
              width={150}
              height={46}
              className="h-11 w-auto mx-auto object-contain"
              priority
            />
          </Link>
          <h1 className="text-2xl sm:text-3xl font-serif text-[#1C1917] tracking-tight">
            Create Your <span className="italic font-normal text-[#0555A2]">Account</span>
          </h1>
        </div>

        {/* Split Grid Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl border border-[#E8E2D9] shadow-xl p-6 sm:p-10 w-full max-w-5xl mx-auto">
          
          {/* Left Register Form */}
          <div className="lg:col-span-6 space-y-6 w-full max-w-md mx-auto">
            <div className="space-y-1">
              <h2 className="text-xl font-serif text-[#1C1917]">Account Information</h2>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-[#0555A2]" />
                        Email Address *
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="name@example.com"
                          {...field}
                          className="px-4 py-3 h-11 rounded-xl bg-[#FAF8F5] border-[#E8E2D9] text-stone-900 text-sm font-sans placeholder:text-stone-400 focus:bg-white focus:ring-2 focus:ring-[#0555A2]"
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-[#0555A2]" />
                        Password *
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            {...field}
                            className="px-4 py-3 h-11 pr-10 rounded-xl bg-[#FAF8F5] border-[#E8E2D9] text-stone-900 text-sm font-sans placeholder:text-stone-400 focus:bg-white focus:ring-2 focus:ring-[#0555A2]"
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-[#0555A2] transition-colors"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />

                {/* Confirm Password Field */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-[#0555A2]" />
                        Confirm Password *
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="••••••••"
                            {...field}
                            className="px-4 py-3 h-11 pr-10 rounded-xl bg-[#FAF8F5] border-[#E8E2D9] text-stone-900 text-sm font-sans placeholder:text-stone-400 focus:bg-white focus:ring-2 focus:ring-[#0555A2]"
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-[#0555A2] transition-colors"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />

                {/* Row: Full Name & Phone Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name Field */}
                  <FormField
                    control={form.control}
                    name="userName"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-[#0555A2]" />
                          Full Name *
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your full name"
                            {...field}
                            className="px-4 py-3 h-11 rounded-xl bg-[#FAF8F5] border-[#E8E2D9] text-stone-900 text-sm font-sans placeholder:text-stone-400 focus:bg-white focus:ring-2 focus:ring-[#0555A2]"
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />

                  {/* Phone Number Field */}
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-[#0555A2]" />
                          Phone Number *
                        </FormLabel>
                        <FormControl>
                          <div className="flex rounded-xl bg-[#FAF8F5] border border-[#E8E2D9] overflow-hidden focus-within:ring-2 focus-within:ring-[#0555A2]">
                            <span className="inline-flex items-center px-3 text-stone-500 text-xs font-semibold bg-[#F3EEE8] border-r border-[#E8E2D9]">
                              {getCountryDialCode(selectedCountry)}
                            </span>
                            <Input
                              type="tel"
                              placeholder="98XXXXXXXX"
                              {...field}
                              className="px-4 py-3 h-11 border-none shadow-none focus-visible:ring-0 bg-transparent text-stone-900 text-sm font-sans"
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Row: Country & Address */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Country Selector */}
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                          <Globe className="w-3.5 h-3.5 text-[#0555A2]" />
                          Country *
                        </FormLabel>
                        <Popover open={countryOpen} onOpenChange={setCountryOpen}>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "w-full justify-between h-11 px-4 rounded-xl bg-[#FAF8F5] border-[#E8E2D9] text-stone-900 text-sm font-sans hover:bg-white",
                                  !field.value && "text-stone-400 font-normal"
                                )}
                              >
                                {field.value
                                  ? countries.find(
                                      (country) => country.name === field.value
                                    )?.name
                                  : "Select country"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0 max-h-60 overflow-y-auto">
                            <Command>
                              <CommandInput placeholder="Search country..." />
                              <CommandList>
                                <CommandEmpty>No country found.</CommandEmpty>
                                <CommandGroup>
                                  {countries.map((country) => (
                                    <CommandItem
                                      value={country.name}
                                      key={country.code}
                                      onSelect={() => {
                                        form.setValue("country", country.name);
                                        setCountryOpen(false);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          country.name === field.value
                                            ? "opacity-100 text-[#0555A2]"
                                            : "opacity-0"
                                        )}
                                      />
                                      <span className="mr-2">{country.flag}</span>
                                      {country.name}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />

                  {/* Address Field */}
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#0555A2]" />
                          Address *
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="City, Street address"
                            {...field}
                            className="px-4 py-3 h-11 rounded-xl bg-[#FAF8F5] border-[#E8E2D9] text-stone-900 text-sm font-sans placeholder:text-stone-400 focus:bg-white focus:ring-2 focus:ring-[#0555A2]"
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Terms and Conditions Checkbox */}
                <FormField
                  control={form.control}
                  name="termsAndConditionsAccepted"
                  render={({ field }) => (
                    <FormItem className="space-y-1 pt-1">
                      <div className="flex items-start gap-2.5">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="mt-0.5 border-[#E8E2D9] data-[state=checked]:bg-[#0555A2]"
                          />
                        </FormControl>
                        <FormLabel className="text-xs text-stone-600 font-sans font-normal leading-relaxed">
                          I agree to the{" "}
                          <Link
                            href="/terms-conditions"
                            className="font-semibold text-[#0555A2] hover:underline"
                          >
                            Terms & Conditions
                          </Link>{" "}
                          and{" "}
                          <Link
                            href="/privacy-policy"
                            className="font-semibold text-[#0555A2] hover:underline"
                          >
                            Privacy Policy
                          </Link>
                        </FormLabel>
                      </div>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full h-12 bg-[#0555A2] hover:bg-[#28AAE0] text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2 mt-2"
                >
                  <span>{isPending ? "Creating Account..." : "Create Account"}</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>

                {/* Sign In Link */}
                <div className="text-center pt-4 border-t border-[#E8E2D9]">
                  <p className="text-xs text-stone-600 font-sans">
                    Already have an account?{" "}
                    <Link
                      href="/auth/login"
                      className="font-bold text-[#0555A2] hover:text-[#28AAE0] underline ml-1 transition-colors"
                    >
                      Sign In
                    </Link>
                  </p>
                </div>
              </form>
            </Form>
          </div>

          {/* Right Brand Showcase Image */}
          <div className="hidden lg:block lg:col-span-6 relative h-full">
            <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-[#F3EEE8]">
              <Image
                src={LoginRegisterImage}
                alt="Arksh Food Heritage Snacks"
                fill
                priority
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="500px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-white/60 text-[#1C1917] shadow-lg space-y-1">
                <p className="text-xs font-bold uppercase tracking-widest text-[#28AAE0]">PROUDLY MADE IN NEPAL</p>
                <p className="text-sm font-serif font-semibold">Artisanal Millet & Corn Goodness</p>
                <p className="text-xs text-stone-500 font-sans">Discover authentic Himalayan flavors delivered fresh.</p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
