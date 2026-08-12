"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  type CreateHeroSliderImageFormData,
  createHeroSliderImageValidationSchema,
  type UpdateHeroSliderImageFormData,
  updateHeroSliderImageValidationSchema,
} from "@/app/(admin)/_validation/hero-slider-image.validation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

import {
  createHeroSliderImageMutation,
  updateHeroSliderImageMutation,
} from "../../_mutation/hero-slider-image.mutation";
import { Checkbox } from "@/components/ui/checkbox";

interface HeroSliderImageDialogFormProps {
  initialData?: UpdateHeroSliderImageFormData;
  mode: "create" | "update";
}

export function HeroSliderImageDialogForm({
  initialData,
  mode,
}: HeroSliderImageDialogFormProps) {
  const [open, setOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(
    mode === "update" && typeof initialData?.image === "string"
      ? initialData.image
      : null
  );

  const schema =
    mode === "create"
      ? createHeroSliderImageValidationSchema
      : updateHeroSliderImageValidationSchema;

  const form = useForm<
    CreateHeroSliderImageFormData | UpdateHeroSliderImageFormData
  >({
    resolver: zodResolver(schema),
    defaultValues: {
      isActive: initialData?.isActive,
      url: initialData?.url || "",
      name: initialData?.name || "",
      image: initialData?.image || undefined,
      detail: initialData?.detail || "",
      order: initialData?.order || 0,
      ...(mode === "update" && initialData?.id ? { id: initialData.id } : {}),
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        form.setError("image", {
          type: "manual",
          message: "Please select a valid image file",
        });
        return;
      }
      if (file.size > 15 * 1024 * 1024) {
        form.setError("image", {
          type: "manual",
          message: "Image size must be less than 15MB",
        });
        return;
      }

      form.setValue("image", file);
      form.clearErrors("image");

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    form.setValue("image", undefined);
    setImagePreview(null);
    const fileInput = document.getElementById(
      "image-upload"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const { execute, isPending } = useAction(createHeroSliderImageMutation, {
    onSuccess: () => {
      toast.success("Hero slider image created successfully");
      form.reset();
      setImagePreview(null);
      setOpen(false);
    },
    onError: (error) => {
      toast.error(
        `Error: ${error.error.serverError?.message || "Unknown error occurred"}`
      );
      form.reset();
      setImagePreview(null);
      setOpen(false);
    },
  });

  const { execute: excUpdate, isPending: isPendingUpdate } = useAction(
    updateHeroSliderImageMutation,
    {
      onSuccess: () => {
        toast.success("Category updated successfully");
        form.reset();
        setImagePreview(null);
        setOpen(false);
      },
      onError: (error) => {
        toast.error(
          `Error: ${error.error.serverError?.message || "Unknown error occurred"}`
        );
        form.reset();
        setImagePreview(null);
        setOpen(false);
      },
    }
  );

  const handleSubmit = (
    data: CreateHeroSliderImageFormData | UpdateHeroSliderImageFormData
  ) => {
    mode === "create"
      ? execute(data)
      : excUpdate({
          ...data,
          id: initialData?.id!,
          detail: initialData?.detail!,
        });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>
          {mode === "create"
            ? "New Hero Slider Image"
            : "Edit Hero Slider Image"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create"
              ? "Create Hero Slider Image"
              : "Update Hero Slider Image"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Add a new hero slider image to organize your content."
              : "Update the hero slider image information."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter hero slider image name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="detail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hero Slider Image Detail</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter hero slider image detail"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={() => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      {imagePreview ? (
                        <div className="relative">
                          <img
                            src={imagePreview || "/placeholder.svg"}
                            alt="Hero slider image preview"
                            className="w-full h-32 object-cover rounded-md border"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={removeImage}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Is Active</FormLabel>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                      disabled={field.disabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Url</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter hero slider image url"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="order"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter hero slider image order"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      type="number"
                      min={0}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button disabled={isPending || isPendingUpdate} type="submit">
                {mode === "create"
                  ? "Create Hero Slider Image"
                  : "Update Hero Slider Image"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
