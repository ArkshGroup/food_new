"use client";

import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import RichTextEditor from "@/components/global/rich-text-editor/editor";
import Image from "next/image";
import { PencilIcon } from "lucide-react";

import {
  CreateBlogFormData,
  UpdateBlogFormData,
  createBlogValidationSchema,
} from "../../_validation/blog.validation";
import { useAction } from "next-safe-action/hooks";

import {
  createBlogMutation,
  updateBlogMutation,
} from "@/app/(admin)/_mutation/blog.mutation";
import { Checkbox } from "@/components/ui/checkbox";

interface IBlogFormProps {
  initialData?: Partial<UpdateBlogFormData>;
}

const BlogForm = ({ initialData }: IBlogFormProps) => {
  const router = useRouter();

  const form = useForm<CreateBlogFormData>({
    resolver: zodResolver(createBlogValidationSchema),
    defaultValues: {
      title: initialData?.title || "",
      content: initialData?.content || "",
      summary: initialData?.summary || "",
      imageUrl: (initialData?.imageUrl as any) || undefined,
      author: initialData?.author || "",
      metaTitle: initialData?.metaTitle || "",
      metaDescription: initialData?.metaDescription || "",
      metaKeywords: initialData?.metaKeywords || "",
      isPublished: initialData?.isPublished || false,
    },
  });

  const [imagePreview, setImagePreview] = React.useState<string | null>(
    typeof form.getValues("imageUrl") === "string"
      ? (form.getValues("imageUrl") as unknown as string)
      : null,
  );

  const [imageRemoved, setImageRemoved] = React.useState(false);

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "imageUrl") {
        const v = value.imageUrl as any;
        if (v instanceof File) {
          setImagePreview(URL.createObjectURL(v));
          setImageRemoved(false);
        } else if (typeof v === "string") {
          setImagePreview(v);
          setImageRemoved(false);
        } else {
          setImagePreview(null);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const { execute, isPending: isCreating } = useAction(createBlogMutation, {
    onSuccess: (res) => {
      if (!res.data.success) {
        toast.error(res.data.message || "Something went wrong");
      } else {
        toast.success(res.data.message || "Blog created successfully");
        router.back();
      }
    },
    onError: (err) => {
      toast.error(JSON.stringify(err.error) || "Something went wrong");
    },
  });

  const { execute: excUpdate, isPending: isUpdating } = useAction(
    updateBlogMutation,
    {
      onSuccess: (res) => {
        if (!res.data.success) {
          toast.error(res.data.message || "Something went wrong");
        } else {
          toast.success(res.data.message || "Blog updated successfully");
          router.back();
        }
      },
      onError: (err) => {
        toast.error(JSON.stringify(err.error) || "Something went wrong");
      },
    },
  );

  const handleRemoveImage = () => {
    // Clear form value and preview, mark as removed so update can send null
    form.setValue("imageUrl", undefined as any);
    setImagePreview(null);
    setImageRemoved(true);
  };

  const onSubmit = async (data: CreateBlogFormData) => {
    if (initialData?.id) {
      const payload: UpdateBlogFormData = {
        ...data,
        id: String(initialData.id),
      } as unknown as UpdateBlogFormData;
      const finalImage = imageRemoved ? null : payload.imageUrl;
      excUpdate({
        ...payload,
        id: payload.id,
        imageUrl: finalImage as any,
      });

      return;
    }
    execute({
      ...data,
    });
  };

  return (
    <div>
      <Form {...form}>
        <form className="py-8" onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="shadow-none border-none mb-6">
            <CardContent className="flex flex-col gap-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <PencilIcon /> Title
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter blog title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <Input placeholder="Author name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="summary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Summary</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Short summary" {...field} />
                    </FormControl>
                    <FormDescription>
                      Short description shown on listing pages.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <FormLabel>Cover Image</FormLabel>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    form.setValue("imageUrl", file as any);
                    setImageRemoved(false);
                  }}
                />

                {imagePreview && (
                  <div className="mt-2 w-48 h-32 relative">
                    <Image
                      src={imagePreview}
                      alt="preview"
                      fill
                      sizes="(max-width: 48rem) 100vw, 48rem"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                )}

                {!imagePreview && initialData?.imageUrl && !imageRemoved && (
                  <div className="mt-2 w-48 h-32 relative">
                    <Image
                      src={String(initialData.imageUrl)}
                      alt="preview"
                      fill
                      sizes="(max-width: 48rem) 100vw, 48rem"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                )}

                {(imagePreview || (initialData?.imageUrl && !imageRemoved)) && (
                  <div className="mt-2">
                    <Button
                      type="button"
                      onClick={handleRemoveImage}
                      className="!px-3"
                    >
                      Remove image
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-none mb-6 p-4">
            <CardContent className="flex flex-col gap-y-4">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RichTextEditor field={field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="metaTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Title</FormLabel>
                    <FormControl>
                      <Input placeholder="meta title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="metaDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="meta description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="metaKeywords"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Keywords</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="comma separated keywords"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isPublished"
                render={({ field }) => (
                  <FormItem className=" flex py-12">
                    <FormLabel>Visible To Public</FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Button
            disabled={isCreating || isUpdating}
            type="submit"
            className="w-full md:w-1/4"
          >
            Save Blog
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BlogForm;
