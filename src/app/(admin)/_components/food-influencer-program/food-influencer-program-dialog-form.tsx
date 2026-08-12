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
  UpdateFoodInfluencerProgramFormData,
  updateFoodInfluencerProgramValidationSchema,
} from "../../_validation/food-influencer-program.validation";
import { updateFoodInfluencerProgramMutation } from "../../_mutation/food-influencer-program.mutation";

interface FoodInfluencerProgramDialogFormProps {
  initialData: UpdateFoodInfluencerProgramFormData;
}

export function FoodInfluencerProgramDialogForm({
  initialData,
}: FoodInfluencerProgramDialogFormProps) {
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(updateFoodInfluencerProgramValidationSchema),
    defaultValues: {
      id: initialData.id,
      title: initialData.title,
      category: initialData.category,
      description: initialData.description,
      instagramUrl: initialData.instagramUrl,
      facebookUrl: initialData.facebookUrl,
      tiktokUrl: initialData.tiktokUrl,
    },
  });

  const { execute: executeUpdate, isPending: isPendingUpdate } = useAction(
    updateFoodInfluencerProgramMutation,
    {
      onSuccess: (res) => {
        if (res?.data?.success) {
          toast.success(res.data.message);
          setOpen(false);
          form.reset();
        }
      },
      onError: () => toast.error("Failed to update entry"),
    },
  );

  const onSubmit = (data: unknown) =>
    executeUpdate(data as UpdateFoodInfluencerProgramFormData);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Entry</DialogTitle>
          <DialogDescription>Update social profile links.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Food creator title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Recipe, Review" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea rows={4} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instagramUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://instagram.com/..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="facebookUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facebook URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://facebook.com/..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tiktokUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>TikTok URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://tiktok.com/@..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button disabled={isPendingUpdate}>Update</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
