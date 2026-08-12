/** biome-ignore-all lint/performance/noImgElement: <> */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  type CreateCategoryFormData,
  createCategoryValidationSchema,
  type UpdateCategoryFormData,
  updateCategoryValidationSchema,
} from "@/app/(admin)/_validation/category.validation";
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
  createCategoryMutation,
  updateCategoryMutation,
} from "../../_mutation/category.mutation";
import { Checkbox } from "@/components/ui/checkbox";

interface CategoryDialogFormProps {
  initialData?: UpdateCategoryFormData;
  mode: "create" | "update";
}

export function CategoryDialogForm({
  initialData,
  mode,
}: CategoryDialogFormProps) {
  const [open, setOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(
    mode === "update" && typeof initialData?.imageUrl === "string"
      ? initialData.imageUrl
      : null
  );

  const schema =
    mode === "create"
      ? createCategoryValidationSchema
      : updateCategoryValidationSchema;

  const form = useForm<CreateCategoryFormData | UpdateCategoryFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: initialData?.name || "",
      imageUrl: initialData?.imageUrl || undefined,
      position: initialData?.position || 0,
      categoryDetail: initialData?.categoryDetail || "",
      ...(mode === "update" && initialData?.id ? { id: initialData.id } : {}),
      isVisible: initialData?.isVisible ?? true,
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        form.setError("imageUrl", {
          type: "manual",
          message: "Please select a valid image file",
        });
        return;
      }
      if (file.size > 15 * 1024 * 1024) {
        form.setError("imageUrl", {
          type: "manual",
          message: "Image size must be less than 15MB",
        });
        return;
      }

      form.setValue("imageUrl", file);
      form.clearErrors("imageUrl");

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    form.setValue("imageUrl", undefined);
    setImagePreview(null);
    const fileInput = document.getElementById(
      "image-upload"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const { execute, isPending } = useAction(createCategoryMutation, {
    onSuccess: (res) => {
      if (res.data.success) {
        toast.success("Category created successfully");
        form.reset();
        setImagePreview(null);
        setOpen(false);
      }
    },
    onError: (error) => {
      toast.error(
        `Error: ${error.error.serverError?.message || "Unknown error occurred"}`
      );
    },
  });

  const { execute: excUpdate, isPending: isPendingUpdate } = useAction(
    updateCategoryMutation,
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
    data: CreateCategoryFormData | UpdateCategoryFormData
  ) => {
    mode === "create"
      ? execute(data)
      : excUpdate({
          ...data,
          id: initialData?.id as number,
        });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>{mode === "create" ? "New Category" : "Edit Category"}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create Category" : "Update Category"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Add a new category to organize your content."
              : "Update the category information."}
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
                    <Input placeholder="Enter category name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => {
                        form.setValue("position", parseInt(e.target.value));
                      }}
                      placeholder="Enter position"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryDetail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Detail</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter category detail" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isVisible"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Is Visible {field.value ? "Yes" : "No"}</FormLabel>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={() => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      {imagePreview ? (
                        <div className="relative">
                          <img
                            src={imagePreview || "/placeholder.svg"}
                            alt="Category preview"
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

            <DialogFooter>
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button disabled={isPending || isPendingUpdate} type="submit">
                {mode === "create" ? "Create Category" : "Update Category"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
