"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import {
  Globe,
  Locate,
  User,
  Phone,
  Save,
  Cake,
  ChevronsUpDown,
  Check,
  UserCheck,
} from "lucide-react";
import { useState } from "react";
import { countries } from "@/constant/countries";
import { cn } from "@/lib/utils";
import { profileEditValidation } from "../../_validations/profile-edit-validation";
import { useSession } from "next-auth/react";
import { useAction } from "next-safe-action/hooks";
import { editProfileMutation } from "../../_mutation/profile-edit.mutation";
import { toast } from "sonner";

type FormData = z.infer<typeof profileEditValidation> & { dob?: Date };

export interface ProfileEditFormProps {
  userName?: string;
  country?: string;
  zipCode?: string;
  gender?: string;
  dobYear?: string;
  dobMonth?: string;
  dobDay?: string;
  phoneNumber?: string;
}

export default function ProfileForm(props: ProfileEditFormProps) {
  const [countryOpen, setCountryOpen] = useState(false);
  const { update } = useSession();

  const { execute, isPending } = useAction(editProfileMutation, {
    onSuccess: async (data) => {
      if (data.data?.success) {
        await update({
          userName: data.data.user.userName || undefined,
        });
        toast.success("Profile updated successfully");
      } else {
        toast.error("Failed to update profile");
      }
    },
    onError: (error) => {
      toast.error("An error occurred while updating the profile");
      console.error("Error updating profile:", error);
    },
  });

  const form = useForm<FormData>({
    resolver: zodResolver(profileEditValidation),
    defaultValues: {
      userName: props.userName || "",
      country: props.country || "",
      zipCode: props.zipCode || "",
      gender: props.gender || "",
      dobYear: props.dobYear || "",
      dobMonth: props.dobMonth || "",
      dobDay: props.dobDay || "",
      phoneNumber: props.phoneNumber || "",
    },
  });

  const getSelectedCountry = () => {
    const watched = form.watch("country");
    return countries.find(
      (country) =>
        country.name.toLowerCase() === (watched ?? "").toLocaleLowerCase() ||
        country.code.toLowerCase() === (watched ?? "").toLocaleLowerCase()
    );
  };

  async function onSubmit(values: FormData) {
    execute({
      userName: values.userName,
      country: values.country,
      zipCode: values.zipCode,
      dobDay: values.dobDay,
      dobMonth: values.dobMonth,
      dobYear: values.dobYear,
      gender: values.gender,
      phoneNumber: values.phoneNumber,
    });
  }

  return (
    <div className="w-full space-y-6 font-sans">
      {/* Header */}
      <div className="pb-3 border-b border-[#E8E2D9]">
        <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#1C1917]">
          Profile Settings
        </h1>
        <p className="text-xs text-stone-500 font-sans mt-0.5">
          Manage your personal account details, preferences, and contact information.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Username */}
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-serif font-bold text-[#1C1917] flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-[#0555A2]" /> Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your username"
                      {...field}
                      className="bg-white border-[#E8E2D9] focus-visible:ring-[#0555A2] h-10 rounded-xl text-xs"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone Number */}
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-serif font-bold text-[#1C1917] flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-[#0555A2]" /> Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. 9812345678"
                      {...field}
                      className="bg-white border-[#E8E2D9] focus-visible:ring-[#0555A2] h-10 rounded-xl text-xs"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Country Selector */}
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-serif font-bold text-[#1C1917] flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-[#0555A2]" /> Country
                  </FormLabel>
                  <FormControl>
                    <Popover open={countryOpen} onOpenChange={setCountryOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={countryOpen}
                          className="w-full h-10 justify-between bg-white border-[#E8E2D9] hover:bg-white text-xs rounded-xl font-normal text-left"
                        >
                          {field.value ? (
                            <div className="flex items-center gap-2 truncate">
                              <span>{getSelectedCountry()?.flag}</span>
                              <span>{getSelectedCountry()?.name || field.value}</span>
                            </div>
                          ) : (
                            <span className="text-stone-400">Select country</span>
                          )}
                          <ChevronsUpDown className="ml-2 h-3.5 w-3.5 shrink-0 opacity-50 text-stone-500" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-64 p-0 z-[99999]" align="start">
                        <Command>
                          <CommandInput
                            placeholder="Search countries..."
                            className="h-9 text-xs"
                          />
                          <CommandList>
                            <CommandEmpty className="text-xs p-2 text-stone-500">
                              No country found.
                            </CommandEmpty>
                            <CommandGroup>
                              {countries.map((country) => (
                                <CommandItem
                                  key={country.name}
                                  value={`${country.name} ${country.code}`}
                                  onSelect={() => {
                                    field.onChange(country.name);
                                    setCountryOpen(false);
                                  }}
                                  className="text-xs cursor-pointer"
                                >
                                  <div className="flex items-center gap-2">
                                    <span>{country.flag}</span>
                                    <span>{country.name}</span>
                                  </div>
                                  <Check
                                    className={cn(
                                      "ml-auto h-3.5 w-3.5 text-[#0555A2]",
                                      field.value?.toLowerCase() === country.name.toLowerCase()
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
            />

            {/* Zip Code */}
            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-serif font-bold text-[#1C1917] flex items-center gap-1.5">
                    <Locate className="h-3.5 w-3.5 text-[#0555A2]" /> Zip / Postal Code
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter postal code"
                      {...field}
                      className="bg-white border-[#E8E2D9] focus-visible:ring-[#0555A2] h-10 rounded-xl text-xs"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Gender */}
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-serif font-bold text-[#1C1917] flex items-center gap-1.5">
                    <UserCheck className="h-3.5 w-3.5 text-[#0555A2]" /> Gender
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field?.value?.toLowerCase()}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full h-10 bg-white border-[#E8E2D9] focus:ring-[#0555A2] text-xs rounded-xl font-normal">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="z-[99999]">
                      <SelectItem value="male" className="text-xs">Male</SelectItem>
                      <SelectItem value="female" className="text-xs">Female</SelectItem>
                      <SelectItem value="other" className="text-xs">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date of Birth */}
            <div className="space-y-1.5">
              <FormLabel className="text-xs font-serif font-bold text-[#1C1917] flex items-center gap-1.5">
                <Cake className="h-3.5 w-3.5 text-[#0555A2]" /> Date of Birth
              </FormLabel>
              <div className="grid grid-cols-3 gap-2">
                <FormField
                  control={form.control}
                  name="dobYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="YYYY"
                          {...field}
                          type="number"
                          className="bg-white border-[#E8E2D9] focus-visible:ring-[#0555A2] h-10 rounded-xl text-xs text-center"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dobMonth"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="MM"
                          {...field}
                          type="number"
                          className="bg-white border-[#E8E2D9] focus-visible:ring-[#0555A2] h-10 rounded-xl text-xs text-center"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dobDay"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="DD"
                          {...field}
                          type="number"
                          className="bg-white border-[#E8E2D9] focus-visible:ring-[#0555A2] h-10 rounded-xl text-xs text-center"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2 flex justify-start">
            <Button
              type="submit"
              disabled={isPending}
              className="bg-[#0555A2] hover:bg-[#034484] text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-xs active:scale-95 flex items-center gap-2"
            >
              <Save className="h-3.5 w-3.5" />
              <span>{isPending ? "Saving..." : "Save Profile Changes"}</span>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
