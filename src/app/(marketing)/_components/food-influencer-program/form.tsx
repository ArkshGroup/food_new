"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
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
import { createFoodInfluencerProgramMutation } from "../../_mutation/food-influencer-program.mutation";
import {
  foodInfluencerProgramValidation,
  type FoodInfluencerProgramFormData,
} from "../../_validations/food-influencer-program.validation";
import type { IMyFoodInfluencerProgram } from "../../_services/food-influencer-program.service";

const FOOD_CATEGORIES = [
  "Biscuits",
  "Cookies",
  "Puffs",
  "Coffee",
  "Creamer",
  "Chocolate",
] as const;

export function FoodInfluencerProgramForm({
  initialData,
}: {
  initialData: IMyFoodInfluencerProgram | null;
}) {
  if (initialData?.id) {
    return (
      <Card className="max-w-4xl mx-auto rounded-3xl bg-white border border-[#E8E2D9] shadow-sm p-6 sm:p-10 space-y-6 font-sans">
        <CardHeader className="p-0 pb-4 border-b border-[#E8E2D9]">
          <span className="text-xs font-bold uppercase tracking-widest text-[#28AAE0]">APPLICATION STATUS</span>
          <CardTitle className="text-2xl font-serif text-[#1C1917]">Application Submitted</CardTitle>
        </CardHeader>
        <CardContent className="p-0 space-y-4 text-stone-700 text-sm font-sans">
          <p className="text-xs text-stone-500">
            Thank you! Your creator application has already been received. Further updates will be sent via email.
          </p>
          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] space-y-2 text-xs">
            <p><span className="font-bold text-stone-900">Concept Title:</span> {initialData.title}</p>
            <p><span className="font-bold text-stone-900">Preferred Category:</span> {initialData.category}</p>
            <p><span className="font-bold text-stone-900">Description:</span> {initialData.description}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const form = useForm<FoodInfluencerProgramFormData>({
    resolver: zodResolver(foodInfluencerProgramValidation),
    defaultValues: {
      title: initialData?.title ?? "",
      category: initialData?.category ?? "",
      description: initialData?.description ?? "",
      instagramUrl: initialData?.instagramUrl ?? "",
      facebookUrl: initialData?.facebookUrl ?? "",
      tiktokUrl: initialData?.tiktokUrl ?? "",
    },
  });

  const { execute: createExecute, isPending: isCreating } = useAction(
    createFoodInfluencerProgramMutation,
    {
      onSuccess: (res) => {
        if (res?.data?.success) toast.success(res.data.message);
      },
      onError: (e) =>
        toast.error(e.error.serverError?.message ?? "Failed to submit application"),
    },
  );
  const onSubmit = (data: FoodInfluencerProgramFormData) => createExecute(data);

  return (
    <Card className="max-w-4xl mx-auto rounded-3xl bg-white border border-[#E8E2D9] shadow-sm font-sans overflow-hidden">
      <CardContent className="p-8 sm:p-12">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Title / Concept */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                    Content Idea / Video Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="px-4 py-3 h-11 rounded-xl bg-[#FAF8F5] border-[#E8E2D9] text-stone-900 text-sm font-sans placeholder:text-stone-400 focus:bg-white focus:ring-2 focus:ring-[#0555A2]"
                      placeholder="e.g. Nepali Biscuit Taste Test & Tea Pairing Reel"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />

            {/* Category Selector */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                    Target Product Focus
                  </FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                      {FOOD_CATEGORIES.map((item) => {
                        const isSelected = field.value === item;
                        return (
                          <Button
                            key={item}
                            type="button"
                            variant="outline"
                            className={cn(
                              "justify-center h-11 rounded-xl text-xs font-medium transition-all border-[#E8E2D9]",
                              isSelected
                                ? "border-[#0555A2] bg-[#0555A2] text-white font-bold shadow-xs"
                                : "bg-[#FAF8F5] text-stone-700 hover:bg-white hover:text-[#0555A2]"
                            )}
                            onClick={() => field.onChange(item)}
                          >
                            {item}
                          </Button>
                        );
                      })}
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />

            {/* Social Links */}
            <div className="space-y-2">
              <p className="text-xs font-bold text-stone-700 uppercase tracking-wider">Social Media Handles</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <FormField
                  control={form.control}
                  name="instagramUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="px-4 py-3 h-11 rounded-xl bg-[#FAF8F5] border-[#E8E2D9] text-stone-900 text-xs font-sans placeholder:text-stone-400 focus:bg-white focus:ring-2 focus:ring-[#0555A2]"
                          placeholder="Instagram URL"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="facebookUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="px-4 py-3 h-11 rounded-xl bg-[#FAF8F5] border-[#E8E2D9] text-stone-900 text-xs font-sans placeholder:text-stone-400 focus:bg-white focus:ring-2 focus:ring-[#0555A2]"
                          placeholder="Facebook Page URL"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tiktokUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="px-4 py-3 h-11 rounded-xl bg-[#FAF8F5] border-[#E8E2D9] text-stone-900 text-xs font-sans placeholder:text-stone-400 focus:bg-white focus:ring-2 focus:ring-[#0555A2]"
                          placeholder="TikTok Handle / URL"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                    Why do you want to collaborate with Arksh Food?
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      rows={5}
                      className="px-4 py-3 rounded-xl bg-[#FAF8F5] border-[#E8E2D9] text-stone-900 text-sm font-sans placeholder:text-stone-400 focus:bg-white focus:ring-2 focus:ring-[#0555A2]"
                      placeholder="Share details about your audience, engagement rates, or creative pitch..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isCreating}
              className="w-full py-4 h-12 bg-[#0555A2] hover:bg-[#28AAE0] text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
            >
              {isCreating ? "Submitting Application..." : "Submit Application"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
