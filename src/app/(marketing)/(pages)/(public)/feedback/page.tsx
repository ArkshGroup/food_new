"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useAction } from "next-safe-action/hooks";
import { createContactMutation } from "@/app/(marketing)/_mutation/contact.mutation";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Star, MessageSquareHeart, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const feedbackSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  category: z.string().min(1, "Please select a feedback category"),
  rating: z.number().min(1, "Please select a star rating").max(5),
  title: z.string().min(3, "Subject title is required"),
  message: z.string().min(10, "Please enter at least 10 characters of feedback"),
});

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

const FEEDBACK_CATEGORIES = [
  "Product Quality & Taste",
  "Website & Shopping Experience",
  "Packaging & Delivery Service",
  "Customer Support",
  "General Suggestion",
];

export default function FeedbackPage() {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      name: "",
      email: "",
      category: "Product Quality & Taste",
      rating: 5,
      title: "",
      message: "",
    },
  });

  const { execute, isPending } = useAction(createContactMutation, {
    onSuccess: (res) => {
      if (res?.data?.success) {
        toast.success("Thank you! Your feedback has been received.");
        setSubmitted(true);
      }
    },
    onError: (e) => {
      toast.error(e.error.serverError?.message ?? "Failed to submit feedback. Please try again.");
    },
  });

  const onSubmit = (values: FeedbackFormValues) => {
    const formattedSubject = `[CUSTOMER FEEDBACK - ${values.rating}★ - ${values.category}] ${values.title}`;
    const formattedMessage = `Category: ${values.category}\nRating: ${values.rating}/5 Stars\n\nFeedback:\n${values.message}`;

    execute({
      name: values.name,
      email: values.email,
      subject: formattedSubject,
      message: formattedMessage,
    });
  };

  return (
    <div className="w-full bg-[#F0F7FD] min-h-screen py-8 lg:py-12 font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#28AAE0]">
            WE VALUE YOUR VOICE
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1C1917] tracking-tight">
            Customer Feedback
          </h1>
          <p className="text-stone-600 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            Your insights help us craft better millet snacks, improve our online service, and elevate traditional Nepali food culture.
          </p>
        </div>

        {submitted ? (
          <Card className="rounded-3xl bg-white border border-[#E8E2D9] shadow-sm p-8 sm:p-12 text-center space-y-4 py-0 gap-0">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 size={36} />
            </div>
            <h2 className="text-2xl font-serif text-[#1C1917]">Feedback Received!</h2>
            <p className="text-stone-600 text-sm max-w-md mx-auto">
              Thank you for sharing your experience with Arksh Food. Our team reviews every submission to ensure continuous quality improvement.
            </p>
            <Button
              type="button"
              onClick={() => { setSubmitted(false); form.reset(); }}
              className="mt-4 bg-[#0555A2] hover:bg-[#28AAE0] text-white rounded-full px-8 py-3 text-xs font-bold uppercase tracking-widest"
            >
              Submit Another Feedback
            </Button>
          </Card>
        ) : (
          <Card className="rounded-3xl bg-white border border-[#E8E2D9] shadow-sm font-sans overflow-hidden py-0 gap-0 p-0">
            <CardHeader className="bg-[#FAF8F5] border-b border-[#E8E2D9] p-6 sm:p-8 text-center space-y-1">
              <div className="w-10 h-10 rounded-full bg-sky-50 text-[#0555A2] mx-auto flex items-center justify-center mb-2">
                <MessageSquareHeart size={20} />
              </div>
              <CardTitle className="text-xl font-serif text-[#1C1917]">Share Your Experience</CardTitle>
              <CardDescription className="text-xs text-stone-500">
                All feedback is forwarded directly to our product and quality assurance team.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-6 sm:p-10">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  
                  {/* Star Rating Selector */}
                  <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem className="text-center space-y-2">
                        <FormLabel className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                          Overall Satisfaction Rating
                        </FormLabel>
                        <FormControl>
                          <div className="flex items-center justify-center gap-2 pt-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => field.onChange(star)}
                                className="p-1 transition-transform hover:scale-110 focus:outline-none"
                              >
                                <Star
                                  size={28}
                                  className={cn(
                                    "transition-colors",
                                    star <= field.value
                                      ? "fill-amber-400 text-amber-400"
                                      : "fill-stone-100 text-stone-300"
                                  )}
                                />
                              </button>
                            ))}
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />

                  {/* Category Buttons */}
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                          Feedback Category
                        </FormLabel>
                        <FormControl>
                          <div className="flex flex-wrap gap-2 pt-1">
                            {FEEDBACK_CATEGORIES.map((cat) => {
                              const isSelected = field.value === cat;
                              return (
                                <button
                                  key={cat}
                                  type="button"
                                  onClick={() => field.onChange(cat)}
                                  className={cn(
                                    "px-3.5 py-2 rounded-xl text-xs font-medium transition-all border border-[#E8E2D9]",
                                    isSelected
                                      ? "bg-[#0555A2] border-[#0555A2] text-white font-semibold shadow-xs"
                                      : "bg-[#FAF8F5] text-stone-700 hover:bg-white hover:text-[#0555A2]"
                                  )}
                                >
                                  {cat}
                                </button>
                              );
                            })}
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />

                  {/* Name & Email Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                            Your Full Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="px-4 py-3 h-11 rounded-xl bg-[#FAF8F5] border-[#E8E2D9] text-stone-900 text-sm focus:bg-white focus:ring-2 focus:ring-[#0555A2]"
                              placeholder="e.g. Anjali Sharma"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs text-red-500" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                            Email Address
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              className="px-4 py-3 h-11 rounded-xl bg-[#FAF8F5] border-[#E8E2D9] text-stone-900 text-sm focus:bg-white focus:ring-2 focus:ring-[#0555A2]"
                              placeholder="anjali@example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs text-red-500" />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Title / Headline */}
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                          Headline / Subject
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="px-4 py-3 h-11 rounded-xl bg-[#FAF8F5] border-[#E8E2D9] text-stone-900 text-sm focus:bg-white focus:ring-2 focus:ring-[#0555A2]"
                            placeholder="e.g. Love the Kodo Millet cookies!"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />

                  {/* Detailed Message */}
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                          Detailed Feedback & Comments
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            rows={5}
                            className="px-4 py-3 rounded-xl bg-[#FAF8F5] border-[#E8E2D9] text-stone-900 text-sm focus:bg-white focus:ring-2 focus:ring-[#0555A2]"
                            placeholder="Tell us what you loved or how we can improve..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full py-4 h-12 bg-[#0555A2] hover:bg-[#28AAE0] text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
                  >
                    {isPending ? "Submitting Feedback..." : "Submit Feedback"}
                  </Button>

                </form>
              </Form>
            </CardContent>
          </Card>
        )}

      </div>
    </div>
  );
}
