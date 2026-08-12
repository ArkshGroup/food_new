"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { createPathaoOrderMutation } from "../../_mutation/order.mutation";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

const CreatePathaoOrder = ({
  orderNumber,
  paymentScreenShot,
  isDisabled,
}: {
  orderNumber: number;
  paymentScreenShot?: string | null;
  isDisabled: boolean;
}) => {
  const { execute, isPending } = useAction(createPathaoOrderMutation, {
    onSuccess: (result) => {
      if (result.data.success === false) {
        toast.error(`Error creating Pathao order: ${result.data.message}`);
        return;
      }
      toast.success("Pathao order created successfully");
    },
    onError: (error) => {
      toast.error(`Error creating Pathao order: ${error}`);
    },
  });
  return (
    <div className=" flex flex-col gap-y-2">
      <Button
        disabled={isDisabled || isPending}
        onClick={() =>
          execute({ orderNumber, paymentScreenShot, storeLocation: "balagu" })
        }
      >
        Create Pathoo Order for Balagu
      </Button>
      <Button
        disabled={isDisabled || isPending}
        onClick={() =>
          execute({
            orderNumber,
            paymentScreenShot,
            storeLocation: "lazimpath",
          })
        }
      >
        Create Pathoo Order for Lazimpath
      </Button>
    </div>
  );
};

export default CreatePathaoOrder;
