"use client";
import {
  AlertDialog,
  AlertDialogAction,
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
import { deleteBrandMutation } from "../../_mutation/brand.mutation";
import { useState } from "react";
import { toast } from "sonner";

export function DeleteBrandDialog({ id }: { id: number }) {
  const [isOpen, setIsOpen] = useState(false);

  const { execute, isPending } = useAction(deleteBrandMutation, {
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
              execute({ id });
            }}
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
