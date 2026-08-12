"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { passwordChangeValidation } from "@/app/(marketing)/_validations/password-change.validation";
import { useAction } from "next-safe-action/hooks";
import { passwordChangeMutation } from "@/app/(marketing)/_mutation/password-change.mutation";
import { toast } from "sonner";
import { Lock, KeyRound, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { useState } from "react";

type PasswordChangeFormValues = z.infer<typeof passwordChangeValidation>;

export default function PasswordChangeForm() {
  const { execute, isPending } = useAction(passwordChangeMutation, {
    onSuccess: (res) => {
      if (res.data?.success) {
        toast.success(res.data.message || "Password changed successfully");
        form.reset();
      } else {
        toast.error(res.data?.message || "Failed to change password");
      }
    },
    onError: (error) => {
      toast.error(error.error.serverError?.message || "An error occurred");
    },
  });

  const form = useForm<PasswordChangeFormValues>({
    resolver: zodResolver(passwordChangeValidation),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = (data: PasswordChangeFormValues) => {
    execute(data);
  };

  return (
    <div className="w-full space-y-6 font-sans pt-2">
      {/* Header */}
      <div className="pb-3 border-b border-[#E8E2D9]">
        <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#1C1917]">
          Password & Security
        </h1>
        <p className="text-xs text-stone-500 font-sans mt-0.5">
          Ensure your account stays safe with a strong, updated password.
        </p>
      </div>

      <div className="max-w-xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Current Password */}
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-serif font-bold text-[#1C1917] flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-[#0555A2]" /> Current Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showCurrentPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="bg-white border-[#E8E2D9] focus-visible:ring-[#0555A2] h-10 pr-10 rounded-xl text-xs w-full"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword((prev) => !prev)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-[#0555A2] transition-colors p-1.5 cursor-pointer z-20"
                      >
                        {showCurrentPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* New Password */}
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-serif font-bold text-[#1C1917] flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5 text-[#0555A2]" /> New Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showNewPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="bg-white border-[#E8E2D9] focus-visible:ring-[#0555A2] h-10 pr-10 rounded-xl text-xs w-full"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword((prev) => !prev)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-[#0555A2] transition-colors p-1.5 cursor-pointer z-20"
                      >
                        {showNewPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormDescription className="text-[11px] text-stone-400">
                    Must be at least 8 characters long
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="confirmNewPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-serif font-bold text-[#1C1917] flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5 text-[#0555A2]" /> Confirm New Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="bg-white border-[#E8E2D9] focus-visible:ring-[#0555A2] h-10 pr-10 rounded-xl text-xs w-full"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-[#0555A2] transition-colors p-1.5 cursor-pointer z-20"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="pt-2">
              <Button
                disabled={isPending}
                type="submit"
                className="bg-[#0555A2] hover:bg-[#034484] text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-xs active:scale-95 flex items-center gap-2"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{isPending ? "Updating..." : "Update Password"}</span>
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
