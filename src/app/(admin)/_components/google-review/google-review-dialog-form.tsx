"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
  CreateGoogleReviewFormData,
  UpdateGoogleReviewFormData,
  createGoogleReviewValidationSchema,
  updateGoogleReviewValidationSchema,
} from "../../_validation/google-review.validation";
import {
  createGoogleReviewMutation,
  updateGoogleReviewMutation,
} from "../../_mutation/google-review.mutation";

interface GoogleReviewDialogFormProps {
  initialData?: UpdateGoogleReviewFormData;
  mode: "create" | "update";
}

export function GoogleReviewDialogForm({
  initialData,
  mode,
}: GoogleReviewDialogFormProps) {
  const [open, setOpen] = useState(false);

  const schema =
    mode === "create"
      ? createGoogleReviewValidationSchema
      : updateGoogleReviewValidationSchema;

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: initialData?.name ?? "",
      starRating: initialData?.starRating ?? 5,
      reviewText: initialData?.reviewText ?? "",
      sortOrder: initialData?.sortOrder ?? 0,
      ...(mode === "update" && initialData?.id ? { id: initialData.id } : {}),
    },
  });

  const { execute, isPending } = useAction(createGoogleReviewMutation, {
    onSuccess: (res) => {
      if (res?.data?.success) {
        toast.success(res.data.message);
        form.reset();
        setOpen(false);
      }
    },
    onError: (e) => {
      toast.error(e.error.serverError?.message ?? "Failed to add review");
    },
  });

  const { execute: executeUpdate, isPending: isPendingUpdate } = useAction(
    updateGoogleReviewMutation,
    {
      onSuccess: (res) => {
        if (res?.data?.success) {
          toast.success(res.data.message);
          form.reset();
          setOpen(false);
        }
      },
      onError: (e) => {
        toast.error(e.error.serverError?.message ?? "Failed to update review");
      },
    },
  );

  const handleSubmit = (data: unknown) => {
    const typed =
      mode === "create"
        ? (data as CreateGoogleReviewFormData)
        : (data as UpdateGoogleReviewFormData);

    if (mode === "create") {
      execute(typed as CreateGoogleReviewFormData);
    } else {
      executeUpdate(typed as UpdateGoogleReviewFormData);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{mode === "create" ? "Add Google Review" : "Edit"}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Add Google Review" : "Edit Google Review"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Add a review to show on the home page."
              : "Update this review."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Reviewer name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="starRating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stars (1-5)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      max={5}
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value) || 1)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reviewText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Review text</FormLabel>
                  <FormControl>
                    <Textarea rows={4} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sortOrder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sort order</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={mode === "create" ? isPending : isPendingUpdate}
              >
                {mode === "create"
                  ? isPending
                    ? "Adding..."
                    : "Add"
                  : isPendingUpdate
                    ? "Saving..."
                    : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
