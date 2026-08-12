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
import { deleteGoogleReviewMutation } from "../../_mutation/google-review.mutation";

export function DeleteGoogleReviewDialog({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const { execute, isPending } = useAction(deleteGoogleReviewMutation, {
    onSuccess: (res) => {
      if (res?.data?.success) {
        toast.success(res.data.message);
        setIsOpen(false);
      }
    },
    onError: () => toast.error("Failed to delete review"),
  });

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this Google review?</AlertDialogTitle>
          <AlertDialogDescription>
            This will remove it from the home page. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            disabled={isPending}
            onClick={() => execute({ id })}
            variant="destructive"
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
