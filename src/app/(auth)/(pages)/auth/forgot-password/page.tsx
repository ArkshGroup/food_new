"use client";

import type React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Mail } from "lucide-react";

import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { forgotPasswordValidationSchema } from "@/app/(auth)/_validation/forgot-password.validation";
import { useAction } from "next-safe-action/hooks";
import { forgotPasswordMutation } from "@/app/(auth)/_mutation/forgot-password.mutation";

type FormData = z.infer<typeof forgotPasswordValidationSchema>;

export default function LoginForm() {
  const router = useRouter();

  const { execute, isPending } = useAction(forgotPasswordMutation, {
    onSuccess: ({ data }) => {
      if (!data.success) {
        toast.error(data.message);
        return;
      }
      toast.success("Password reset email sent successfully");
      router.push("/auth/login");
    },
    onError: (error) => {
      toast.error("An unexpected error occurred. Please try again.");
    },
  });

  const form = useForm<FormData>({
    resolver: zodResolver(forgotPasswordValidationSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      execute(data);
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <>
      <main className=" pb-12 container  mx-auto pt-8">
        <h1 className=" text-center font-black text-2xl md:text-4xl">
          Forgot Password of
          <span className=" text-primary px-1">Your Account</span>
        </h1>
        <CardHeader className="text-center py-4">
          <CardDescription className="text-muted-foreground">
            Fill in the details below to get started.
          </CardDescription>
        </CardHeader>
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
                    {/* Email Field */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            Email Address *
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Enter your email"
                              {...field}
                              className="h-11"
                            />
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
                      Send Reset Password Token
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
      </main>
    </>
  );
}
