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
import { Eye, EyeOff, Mail, Lock, Sparkles, ArrowRight } from "lucide-react";

import { signIn } from "next-auth/react";

import Link from "next/link";
import { loginValidationSchema } from "@/app/(auth)/_validation/login.validation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LoginRegisterImage, LogoImage } from "../../../../../../public/images";

type FormData = z.infer<typeof loginValidationSchema>;

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(loginValidationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error && result?.code) {
        toast.error(result.code);
        return;
      }
      if (!result?.error && result?.ok) {
        toast.success("Login successful!");
        router.push("/");
      }
    } catch {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#FAF8F5] py-8 lg:py-12 font-sans border-b border-[#E8E2D9] relative overflow-hidden flex flex-col items-center justify-center">
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
            Sign In to Your <span className="italic font-normal text-[#0555A2]">Account</span>
          </h1>
        </div>

        {/* Split Grid Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl border border-[#E8E2D9] shadow-xl p-6 sm:p-10 w-full max-w-4xl mx-auto">
          
          {/* Left Login Form */}
          <div className="lg:col-span-6 space-y-6 w-full max-w-md mx-auto">
            <div className="space-y-1">
              <h2 className="text-xl font-serif text-[#1C1917]">Account Credentials</h2>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                
                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-[#0555A2]" />
                        Email Address
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
                    <FormItem className="space-y-1.5">
                      <FormLabel className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-[#0555A2]" />
                        Password
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

                <div className="flex items-center justify-end pt-1">
                  <Link
                    href="/auth/forgot-password"
                    className="text-xs font-semibold text-[#0555A2] hover:text-[#28AAE0] transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-[#0555A2] hover:bg-[#28AAE0] text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>{isLoading ? "Signing in..." : "Sign In"}</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>

                {/* Register Link */}
                <div className="text-center pt-4 border-t border-[#E8E2D9]">
                  <p className="text-xs text-stone-600 font-sans">
                    Don't have an account yet?{" "}
                    <Link
                      href="/auth/register"
                      className="font-bold text-[#0555A2] hover:text-[#28AAE0] underline ml-1 transition-colors"
                    >
                      Register Now
                    </Link>
                  </p>
                </div>

              </form>
            </Form>
          </div>

          {/* Right Brand Showcase Image */}
          <div className="hidden lg:block lg:col-span-6 relative">
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-[#F3EEE8]">
              <Image
                src={LoginRegisterImage}
                alt="Arksh Food Heritage Snacks"
                fill
                priority
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="500px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-xl bg-white/95 backdrop-blur-md border border-white/60 text-[#1C1917] shadow-lg space-y-1">
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

