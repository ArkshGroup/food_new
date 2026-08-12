"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";
import { deleteHeroSliderImageMutation } from "../../_mutation/hero-slider-image.mutation";

export function DeleteHeroSliderImageDialog({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const { execute, isPending } = useAction(deleteHeroSliderImageMutation, {
    onSuccess: (res) => {
      if (res.data.success && !isPending) {
        toast.success(res.data.message);
        setIsOpen(false);
      } else {
        toast.error(res.data.message);
      }
    },
    onError: (error) => {
      toast.error("Failed to delete brand. Please try again.");
    },
  });
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            disabled={isPending}
            onClick={() => {
              execute({ id: id.toString() });
            }}
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
