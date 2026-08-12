"use client";
import React, { useState, Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

import Link from "next/link";

import { resetPasswordValidationSchema } from "@/app/(auth)/_validation/reset-password.validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { resetPasswordMutation } from "@/app/(auth)/_mutation/reset-password.mutation";

type FormData = z.infer<typeof resetPasswordValidationSchema>;

// Separate component that uses useSearchParams
const ResetPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const userId = searchParams.get("userId");

  const router = useRouter();

  useEffect(() => {
    if (!token || !userId) {
      toast.error("Invalid or missing token/userId");
      router.replace("/auth/login");
    }
  }, [token, userId, router]);

  const form = useForm<FormData>({
    resolver: zodResolver(resetPasswordValidationSchema),
    defaultValues: {
      userId: userId!,
      token: token!,
      password: "",
      confirmPassword: "",
    },
  });

  const { execute, isPending } = useAction(resetPasswordMutation, {
    onSuccess: ({ data }) => {
      if (!data.success) {
        toast.error(data.message);
        return;
      }
      toast.success("Password reset successfully");
      router.push("/auth/login");
    },
    onError: (error) => {
      toast.error("An unexpected error occurred. Please try again.");
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      execute(data);
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  return (
    <div className=" flex  justify-center min-h-[80vh] ">
      {/* register from container */}
      <div className="  md:min-w-lg flex items-start">
        <Card className="w-[90%]  shadow-none border-none mx-auto">
          <CardContent className="space-y-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        Password *
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder=" password"
                            {...field}
                            className="h-11 pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Confirm Password Field */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        Confirm Password *
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder=" password"
                            {...field}
                            className="h-11 pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full h-11 font-medium"
                >
                  Reset Password
                </Button>

                {/* Sign In Link */}
                <div className="text-center pt-4">
                  <p className="text-sm text-muted-foreground">
                    Don't have an account?
                    <Link
                      href="/auth/register"
                      className="font-medium underline hover:no-underline"
                    >
                      Register
                    </Link>
                  </p>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      {/* image container */}
      <section className="hidden md:block flex-1 relative p-4">
        <div
          className="animate-slide-right animate-delay-300 absolute inset-4 rounded-3xl bg-cover bg-center"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1642615835477-d303d7dc9ee9?w=2160&q=80)`,
          }}
        ></div>
      </section>
    </div>
  );
};

// Loading component for Suspense fallback
const ResetPasswordLoading = () => {
  return (
    <div className="flex justify-center min-h-[80vh] items-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );
};

// Main component
const ResetPasswordRootPage = () => {
  return (
    <main className=" pb-12 container  mx-auto pt-2">
      <h1 className=" text-center font-black text-2xl md:text-4xl">
        Reset
        <span className=" text-primary px-1">Your Password</span>
      </h1>
      <CardHeader className="text-center py-4">
        <CardDescription className="text-muted-foreground">
          Enter your new password below.
        </CardDescription>
      </CardHeader>
      <Suspense fallback={<ResetPasswordLoading />}>
        <ResetPasswordForm />
      </Suspense>
    </main>
  );
};

export default ResetPasswordRootPage;
