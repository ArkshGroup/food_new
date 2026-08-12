"use client";

import type React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Upload, X, ImageIcon, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import z from "zod";
import { useAction } from "next-safe-action/hooks";
import { confirmPaymentMethod } from "../../_mutation/payment.mutation";
import { paymentScreenShotValidation } from "../../_validations/payment-screenshot.validation";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { QrImage } from "../../../../../public/images";
import { queryClient } from "@/components/provider/tanstack-query-provider";
import { CART_COUNT_QUERY_KEY } from "../../_hooks/useCart.hook";

const MAX_FILE_SIZE_MB = 5;

const ImagePreview = ({
  src,
  onRemove,
}: {
  src: string;
  onRemove: () => void;
}) => (
  <div className="relative mt-4 border-2 border-border flex justify-center rounded-lg overflow-hidden  ">
    <img
      src={src || "/placeholder.svg"}
      alt="Payment Screenshot Preview"
      className="w-full md:w-1/2 h-auto object-contain  object-center"
    />
    <Button
      type="button"
      variant="destructive"
      size="icon"
      className="absolute top-2 right-2 h-8 w-8 rounded-full shadow-lg"
      onClick={onRemove}
    >
      <X className="h-4 w-4" />
    </Button>
  </div>
);

export const PaymentScreenShotInputField = ({
  orderId,
}: {
  orderId: string;
}) => {
  const router = useRouter();

  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const { execute, isPending } = useAction(confirmPaymentMethod, {
    onSuccess: (data) => {
      if (data.data.success) {
        queryClient.invalidateQueries({
          queryKey: [CART_COUNT_QUERY_KEY],
        });
        toast.success(data.data.message);
        router.push(`/checkout/success/${orderId}`);
      }
    },
    onError: (error) => {
      console.error("Error uploading payment screenshot:", error);
      toast.error("Error uploading payment screenshot:");
    },
  });

  const form = useForm<z.infer<typeof paymentScreenShotValidation>>({
    resolver: zodResolver(paymentScreenShotValidation),
    defaultValues: {
      orderId: orderId,
      paymentScreenShot: undefined,
    },
  });

  const uploadFileToServer = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    setIsUploading(true);
    try {
      const response = await fetch("/api/qr", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        return data.url as string;
      } else {
        console.error("Upload failed:", data.error);
        return null;
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      alert(`File size should be less than ${MAX_FILE_SIZE_MB} MB`);
      form.setValue("paymentScreenShot", "", { shouldValidate: true });
      return;
    }
    form.setValue("paymentScreenShot", "", { shouldValidate: false });
    const imageUrl = await uploadFileToServer(file);
    if (imageUrl) {
      form.setValue("paymentScreenShot", imageUrl, { shouldValidate: true });
    } else {
      form.setValue("paymentScreenShot", "", { shouldValidate: true });
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const imageUrl = await uploadFileToServer(file);
      if (imageUrl) {
        form.setValue("paymentScreenShot", imageUrl, { shouldValidate: true });
      } else {
        form.setValue("paymentScreenShot", "", { shouldValidate: true });
      }
    }
  };

  const handleRemoveImage = () => {
    form.setValue("paymentScreenShot", "", { shouldValidate: true });
  };

  const uploadedImageUrl = form.watch("paymentScreenShot");

  const handlePaymentScreenShotSubmit = async (
    values: z.infer<typeof paymentScreenShotValidation>
  ) => {
    const isValid = await form.trigger();
    if (isValid) {
      execute({
        id: orderId,
        paymentType: "ONLINE_PAYMENT",
        paymentScreenShot: values.paymentScreenShot!,
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handlePaymentScreenShotSubmit)}
        className="space-y-4 p-2"
      >
        <Image
          src={QrImage}
          alt="Payment Screenshot Illustration"
          width={400}
          height={200}
          className="mx-auto mb-4"
        />
        <FormField
          control={form.control}
          name="paymentScreenShot"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-foreground">
                Payment Screenshot
              </FormLabel>
              <FormControl>
                <div className="space-y-4">
                  {!uploadedImageUrl ? (
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                      }}
                      onDragLeave={(e) => {
                        e.preventDefault();
                        setIsDragging(false);
                      }}
                      onDrop={handleDrop}
                      className={cn(
                        "relative border-2 border-dashed rounded-lg transition-all duration-200",
                        isDragging
                          ? "border-primary bg-primary/5 scale-[1.02]"
                          : "border-border hover:border-primary/50 hover:bg-accent/50",
                        isUploading && "opacity-50 pointer-events-none"
                      )}
                    >
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        onBlur={field.onBlur}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        disabled={isUploading}
                      />
                      <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
                        <div className="mb-4 p-4 rounded-full bg-primary/10">
                          {isUploading ? (
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                          ) : (
                            <Upload className="h-8 w-8 text-primary" />
                          )}
                        </div>
                        <p className="text-sm font-medium text-foreground mb-1">
                          {isUploading
                            ? "Uploading..."
                            : isDragging
                              ? "Drop your image here"
                              : "Click to upload or drag and drop"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg">
                        <div className="flex-shrink-0 p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                          <ImageIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-green-800 dark:text-green-300">
                            Image uploaded successfully
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={handleRemoveImage}
                          className="flex-shrink-0 text-green-700 hover:text-green-900 dark:text-green-300 dark:hover:text-green-100"
                        >
                          <X className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                      <ImagePreview
                        src={uploadedImageUrl || "/placeholder.svg"}
                        onRemove={handleRemoveImage}
                      />
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={isPending || isUploading}
          type="submit"
          className=" w-full"
        >
          {isPending ? (
            "Submitting..."
          ) : (
            <>
              <CheckCircle />
              Confirm Order
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};
