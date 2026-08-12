"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PhoneCall, MapPin, Mail, Sparkles, Send, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
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
import { useAction } from "next-safe-action/hooks";
import { createContactMutation } from "../../../_mutation/contact.mutation";
import { toast } from "sonner";

const contactDetails = [
  {
    icon: PhoneCall,
    title: "Call Us Direct",
    info: ["+977-1-4002049", "+977 9704591211"],
    subtitle: "Sun - Fri, 9:00 AM - 6:00 PM",
    linkPrefix: "tel:",
  },
  {
    icon: MapPin,
    title: "Visit Our Headquarters",
    info: ["Rani Devi Marg, Lazimpat", "Kathmandu 44600, Nepal"],
    subtitle: "Arksh Food Corporate Office",
    linkPrefix: "https://maps.app.goo.gl/cdrstjNqbFNRXd1R9",
  },
  {
    icon: Mail,
    title: "Email Support",
    info: ["info@arkshfood.com"],
    subtitle: "We typically respond within 24 hours",
    linkPrefix: "mailto:",
  },
];

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const { execute, isPending } = useAction(createContactMutation, {
    onSuccess: (res) => {
      if (res.data?.success) {
        toast.success(res.data.message || "Message sent successfully!");
        form.reset();
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    },
    onError: () => {
      toast.error("Failed to send message. Please check your connection.");
    },
  });

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: ContactFormValues) {
    execute({
      email: values.email,
      message: values.message,
      name: values.name,
      subject: values.subject,
    });
  }

  return (
    <div className="w-full bg-[#F0F7FD] min-h-screen py-12 lg:py-20 font-sans relative overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0555A2]/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#28AAE0]/5 rounded-full filter blur-3xl pointer-events-none" />

      {/* SEO-only content */}
      <div className="sr-only" aria-hidden="true">
        <p>
          Contact Arksh Food for questions about our biscuits, cookies, puffs,
          and snacks. We are a Nepal-based food brand offering high-quality
          products for retail and wholesale. Reach us by phone, email, or visit our store in Lazimpat, Kathmandu.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Editorial Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E2EEF8] text-[#0555A2] mx-auto shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#28AAE0]" />
            <span className="text-xs font-bold uppercase tracking-wider font-sans">
              WE'RE HERE TO HELP
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#1C1917] tracking-tight">
            Get in Touch with <span className="italic font-normal text-[#0555A2]">Arksh Food</span>
          </h1>

          <p className="text-stone-600 text-base font-sans leading-relaxed">
            Have questions about our artisanal snacks, bulk orders, or brand partnerships? Send us a message or reach out through our official channels.
          </p>
        </div>

        {/* Main Grid: Details + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              {contactDetails.map((detail, index) => {
                const Icon = detail.icon;
                return (
                  <div
                    key={index}
                    className="p-6 rounded-2xl bg-white border border-[#E8E2D9] shadow-xs hover:shadow-md transition-all duration-300 flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 text-[#0555A2] flex items-center justify-center shrink-0 group-hover:bg-[#0555A2] group-hover:text-white transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="space-y-1 flex-1">
                      <h3 className="text-base font-serif font-semibold text-[#1C1917]">
                        {detail.title}
                      </h3>
                      
                      <div className="text-sm text-stone-700 font-sans space-y-0.5">
                        {detail.info.map((line, lineIndex) => (
                          <p key={lineIndex} className="font-medium">
                            {detail.linkPrefix === "mailto:" ? (
                              <a
                                href={`mailto:${line}`}
                                className="hover:text-[#0555A2] transition-colors"
                              >
                                {line}
                              </a>
                            ) : detail.linkPrefix.startsWith("tel:") ? (
                              <a
                                href={`${detail.linkPrefix}${line}`}
                                className="hover:text-[#0555A2] transition-colors"
                              >
                                {line}
                              </a>
                            ) : (
                              <a
                                href={detail.linkPrefix}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-[#0555A2] transition-colors"
                              >
                                {line}
                              </a>
                            )}
                          </p>
                        ))}
                      </div>

                      <p className="text-xs text-stone-400 font-sans pt-1">
                        {detail.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Extra Trust Banner */}
            <div className="p-6 rounded-2xl bg-white border border-[#E2EEF8] space-y-2 shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0555A2] uppercase tracking-wider">
                <Clock className="w-4 h-4 text-[#28AAE0]" />
                <span>Response Guarantee</span>
              </div>
              <p className="text-xs text-stone-600 font-sans leading-relaxed">
                Our support team is dedicated to providing clear, helpful answers to all customer, retail, and wholesale inquiries within 24 business hours.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-[#E2EEF8] shadow-sm space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-[#28AAE0]">
                DIRECT MESSAGE
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#1C1917]">
                Send Us a Message
              </h2>
              <p className="text-xs text-stone-500 font-sans">
                Fill out the form below and we'll get back to you shortly.
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="space-y-1.5">
                        <FormLabel className="text-xs font-bold text-stone-700 uppercase tracking-wider">Your Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John Doe"
                            {...field}
                            className="px-4 py-3 rounded-xl bg-[#F0F7FD]/60 border-[#E2EEF8] text-stone-900 text-sm font-sans placeholder:text-stone-400 focus:bg-white focus:ring-2 focus:ring-[#0555A2]"
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />

                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="space-y-1.5">
                        <FormLabel className="text-xs font-bold text-stone-700 uppercase tracking-wider">Email Address</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="john@example.com"
                            {...field}
                            className="px-4 py-3 rounded-xl bg-[#F0F7FD]/60 border-[#E2EEF8] text-stone-900 text-sm font-sans placeholder:text-stone-400 focus:bg-white focus:ring-2 focus:ring-[#0555A2]"
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Subject */}
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel className="text-xs font-bold text-stone-700 uppercase tracking-wider">Subject</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Wholesale Inquiry / General Question"
                          {...field}
                          className="px-4 py-3 rounded-xl bg-[#F0F7FD]/60 border-[#E2EEF8] text-stone-900 text-sm font-sans placeholder:text-stone-400 focus:bg-white focus:ring-2 focus:ring-[#0555A2]"
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />

                {/* Message */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel className="text-xs font-bold text-stone-700 uppercase tracking-wider">Your Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="How can we help you today?"
                          rows={5}
                          {...field}
                          className="px-4 py-3 rounded-xl bg-[#F0F7FD]/60 border-[#E2EEF8] text-stone-900 text-sm font-sans placeholder:text-stone-400 focus:bg-white focus:ring-2 focus:ring-[#0555A2]"
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full py-4 bg-[#0555A2] hover:bg-[#28AAE0] text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-md hover:shadow-xl active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>{isPending ? "Sending Message..." : "Send Message"}</span>
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </Form>
          </div>

        </div>
      </div>
    </div>
  );
}

