"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2, X } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  type CreateBrandFormData,
  createBrandValidationSchema,
  type UpdateBrandFormData,
  updateBrandValidationSchema,
} from "@/app/(admin)/_validation/brand.validation";
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
  createBrandMutation,
  updateBrandMutation,
} from "../../_mutation/brand.mutation";

interface BrandDialogFormProps {
  initialData?: UpdateBrandFormData;
  mode: "create" | "update";
}

export function BrandDialogForm({ initialData, mode }: BrandDialogFormProps) {
  const [open, setOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(
    mode === "update" && typeof initialData?.imageUrl === "string"
      ? initialData.imageUrl
      : null
  );

  const schema =
    mode === "create"
      ? createBrandValidationSchema
      : updateBrandValidationSchema;

  const form = useForm<CreateBrandFormData | UpdateBrandFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: initialData?.name || "",
      imageUrl: initialData?.imageUrl || undefined,
      brandDetail: initialData?.brandDetail || "",
      subBrands: initialData?.subBrands || [],
      brandPosition: initialData?.brandPosition || 0,
      ...(mode === "update" && initialData?.id ? { id: initialData.id } : {}),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "subBrands",
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

  const { execute, isPending } = useAction(createBrandMutation, {
    onSuccess: () => {
      toast.success("Category created successfully");
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
    updateBrandMutation,
    {
      onSuccess: (res) => {
        if (res.data.success) {
          toast.success("Brand updated successfully");
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
    }
  );

  const handleSubmit = (data: CreateBrandFormData | UpdateBrandFormData) => {
    mode === "create"
      ? execute(data)
      : excUpdate({
          ...data,
          id: initialData?.id as number,
          subBrands: data.subBrands?.map((sb) => ({
            id: sb.id,
            name: sb.name,
            position: sb.position,
          })),
        });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>{mode === "create" ? "New Brand" : "Edit Brand"}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create Brand" : "Update Brand"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Add a new brand to organize your content."
              : "Update the brand information."}
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
              name="brandDetail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand Detail</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter brand	 detail" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="brandPosition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand Position</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter brand position"
                      {...field}
                      onChange={(e) => {
                        const value = parseInt(e.target.value, 10);
                        field.onChange(value);
                      }}
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

            <div className="space-y-4 h-40 overflow-y-scroll">
              <div className="flex items-center justify-between">
                <FormLabel>Sub Brands</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ name: "", position: 0 })}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Sub-brand
                </Button>
              </div>
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-4 items-end">
                  <FormField
                    control={form.control}
                    name={`subBrands.${index}.name`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className={index !== 0 ? "sr-only" : ""}>
                          Name
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Sub-brand name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`subBrands.${index}.position`}
                    render={({ field }) => (
                      <FormItem className="w-24">
                        <FormLabel className={index !== 0 ? "sr-only" : ""}>
                          Position
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value, 10))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                    className="mb-2"
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>

            <DialogFooter>
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button disabled={isPending || isPendingUpdate} type="submit">
                {mode === "create" ? "Create Brand" : "Update Brand"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
