import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { set } from "zod";
import { IDiscountCode } from "../../_services/discount.service";
import { DiscountCard } from "./discount-card";
import { BadgePercent } from "lucide-react";
import { AuroraText } from "@/components/animated/aurora-text";
import RenderCurrency from "@/helper/render-currency";

interface AvailableDiscountDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  applyArkshFoodPoint: ({ pointsToRedeem }: { pointsToRedeem: number }) => void;
  isArkshFoodPointPending: boolean;
  userDetails: {
    arkshFoodPoint: number;
  };
  activeDiscountCode: string | undefined;
  setDiscountAmount: React.Dispatch<React.SetStateAction<number>>;
  setActiveDiscountCode: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  arkshFoodPoint: number;
  setArkshFoodPoint: React.Dispatch<React.SetStateAction<number>>;
  setDiscountCodeInputText: React.Dispatch<React.SetStateAction<string>>;
  cartItems: ICartGetAll[];
  availableCode: IDiscountCode[];
  handleApplyDiscount: (codeParam?: string | undefined) => Promise<void>;
  isApplyDiscountCodePending: boolean;
  handleRemoveDiscount: () => void;
}

export function AvailableDiscountDialog({
  applyArkshFoodPoint,
  open,
  setOpen,
  isArkshFoodPointPending,
  userDetails,
  activeDiscountCode,
  arkshFoodPoint,
  setDiscountCodeInputText,
  setDiscountAmount,
  setActiveDiscountCode,
  setArkshFoodPoint,
  availableCode,
  cartItems,
  handleApplyDiscount,
  handleRemoveDiscount,
  isApplyDiscountCodePending,
}: AvailableDiscountDialogProps) {
  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className=" my-2">
          {" "}
          <BadgePercent /> Show Discounts
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className=" z-[999]">
        <AlertDialogHeader>
          <AlertDialogTitle className=" text-center">
            <AuroraText>Available Discounts</AuroraText>
          </AlertDialogTitle>
          <div>
            <ArkshFoodPointCard
              setDiscountAmount={setDiscountAmount}
              setActiveDiscountCode={setActiveDiscountCode}
              setArkshFoodPoint={setArkshFoodPoint}
              points={userDetails.arkshFoodPoint}
              isArkshFoodPointPending={isArkshFoodPointPending}
              onApplyArkshFoodPoint={() => {}}
              userDetails={userDetails}
              arkshFoodPoint={arkshFoodPoint}
              applyArkshFoodPoint={applyArkshFoodPoint}
            />
          </div>
          <div className=" space-y-2">
            {availableCode.map((code) => (
              <DiscountCard
                cartItems={cartItems}
                discount={code}
                handleRemoveDiscount={handleRemoveDiscount}
                activeDiscountCode={activeDiscountCode}
                handleApplyDiscount={handleApplyDiscount}
                isApplyDiscountCodePending={isApplyDiscountCodePending}
                key={code.id}
                setDiscountCodeInputText={setDiscountCodeInputText}
              />
            ))}
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

const ArkshFoodPointCard = ({
  points,
  isArkshFoodPointPending,
  onApplyArkshFoodPoint,
  userDetails,
  arkshFoodPoint,
  applyArkshFoodPoint,
  setArkshFoodPoint,
  setActiveDiscountCode,
  setDiscountAmount,
}: {
  points: number;
  arkshFoodPoint: number;
  isArkshFoodPointPending: boolean;
  onApplyArkshFoodPoint: () => void;
  userDetails: { arkshFoodPoint: number };
  applyArkshFoodPoint: ({ pointsToRedeem }: { pointsToRedeem: number }) => void;
  setArkshFoodPoint: React.Dispatch<React.SetStateAction<number>>;
  setDiscountAmount: React.Dispatch<React.SetStateAction<number>>;
  setActiveDiscountCode: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
}) => {
  return (
    <div className="flex w-full max-w-xs mx-auto rounded-lg overflow-hidden shadow-md border border-gray-100 bg-white">
      <div className="flex flex-col items-center justify-center p-3 min-w-[120px] bg-primary/10 relative">
        {/* Decorative Dotted Edge (Unchanged) */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-full overflow-hidden">
          <div className="w-1 h-full border-r-2 border-dashed border-white"></div>
        </div>
        <p className={`text-3xl font-bold text-primary `}>{points}</p>

        {/* Discount Type Subtext (Reduced margin mt-0.5) */}
        <p className="text-xs mt-0.5 text-gray-600 font-medium text-center">
          {`Arksh Food Points Available`}
        </p>
      </div>

      {/* --- Right Part: Details, Code & Action (Scaled) --- */}
      {/* Reduced padding (p-3) */}
      <div className="flex flex-col flex-grow p-3 bg-white relative">
        <div className="flex justify-between items-start mb-1">
          {/* Main Offer Title and Code (Reduced text sizes) */}
          <div className="flex flex-col">
            <p className="text-xs font-semibold text-gray-800">
              {" "}
              <RenderCurrency amount={points} /> Off
            </p>
          </div>
          {/* T&C Link (Reduced text size to text-[10px]) */}
          <a
            href={`/terms`}
            className="text-[10px] font-medium text-gray-500 hover:text-primary"
          >
            T&C
          </a>
        </div>

        <div className="mt-auto flex justify-between items-center pt-2 border-t border-gray-100">
          {arkshFoodPoint > 0 ? (
            <Button
              variant="default"
              type="button"
              className={`
              py-1.5 px-3 w-full rounded-full text-white font-semibold text-xs transition duration-300 ease-in-out
            `}
              onClick={() => {
                setArkshFoodPoint(0);
                setActiveDiscountCode(undefined);
                setDiscountAmount(0);
              }}
            >
              Remove
            </Button>
          ) : (
            <Button
              disabled={
                isArkshFoodPointPending ||
                userDetails.arkshFoodPoint <= 0 ||
                arkshFoodPoint > 0
              }
              variant="default"
              type="button"
              className={`
              py-1.5 px-3 rounded-full text-white font-semibold text-xs transition duration-300 ease-in-out
            `}
              onClick={() =>
                applyArkshFoodPoint({
                  pointsToRedeem: userDetails.arkshFoodPoint,
                })
              }
            >
              Apply Arksh Food Points
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
