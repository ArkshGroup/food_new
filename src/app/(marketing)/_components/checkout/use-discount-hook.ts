import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import {
  applyArkshFoodPointMutation,
  applyDiscountCodeMutation,
} from "../../_mutation/discount.mutation";
import { toast } from "sonner";

export const useDiscountHook = ({ subtotal }: { subtotal: number }) => {
  const [discountCodeInputText, setDiscountCodeInputText] = useState("");
  const [activeDiscountCode, setActiveDiscountCode] = useState<string>();
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [arkshFoodPoint, setArkshFoodPoint] = useState<number>(0);
  const [discountError, setDiscountError] = useState<string | null>(null);
  const [openDiscountDialog, setOpenDiscountDialog] = useState(false);

  const { execute: applyArkshFoodPoint, isPending: isArkshFoodPointPending } =
    useAction(applyArkshFoodPointMutation, {
      onSuccess: ({ data }) => {
        if (!data.success) {
          return setDiscountError(data.message);
        } else {
          toast.success(data.message);
          setDiscountError(null);
          if (subtotal < (data.data?.pointsRedeemed || 0)) {
            setArkshFoodPoint(subtotal);
            setDiscountAmount(subtotal);
          } else {
            setArkshFoodPoint(data.data?.pointsRedeemed || 0);
            setDiscountAmount(data.data?.pointsRedeemed || 0);
          }
          setActiveDiscountCode(undefined);
          setDiscountCodeInputText("");
          setOpenDiscountDialog(false);
        }
      },
      onError: (error) => {
        console.error(error);
        toast.error("Something went wrong");
      },
    });

  const { execute: applyDiscountCode, isPending: isApplyDiscountCodePending } =
    useAction(applyDiscountCodeMutation, {
      onSuccess: (res) => {
        if (!res.data.success) {
          return setDiscountError(res.data.message);
        } else {
          toast.success(res.data.message);
          setActiveDiscountCode(res.data.data?.code);
          setDiscountCodeInputText("");
          setArkshFoodPoint(0);
          setDiscountError(null);
          setDiscountAmount(Number(res.data.data?.value));
        }
        setOpenDiscountDialog(false);
      },
      onError: (error) => {
        console.error(error);
        toast.error("Something went wrong");
      },
    });

  const handleApplyDiscount = async (codeParam?: string) => {
    const codeToUse = codeParam ?? discountCodeInputText;
    applyDiscountCode({
      code: codeToUse,
    });
    setOpenDiscountDialog(false);
  };

  const handleRemoveDiscount = () => {
    setActiveDiscountCode(undefined);
    setDiscountAmount(0);
    setArkshFoodPoint(0);
    setDiscountError(null);
    toast.success("Discount removed successfully");
    setOpenDiscountDialog(false);
  };

  return {
    discountCodeInputText,
    setDiscountCodeInputText,
    activeDiscountCode,
    setActiveDiscountCode,
    discountAmount,
    setDiscountAmount,
    arkshFoodPoint,
    setArkshFoodPoint,
    discountError,
    setDiscountError,
    applyArkshFoodPoint,
    isArkshFoodPointPending,
    applyDiscountCode,
    isApplyDiscountCodePending,
    handleApplyDiscount,
    handleRemoveDiscount,
    openDiscountDialog,
    setOpenDiscountDialog,
  };
};
