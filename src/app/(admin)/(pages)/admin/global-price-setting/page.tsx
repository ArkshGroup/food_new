"use client";

import { useState } from "react";

// Shadcn UI components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

// Lucid Icons
import { Percent, Loader2, Check, X } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { updateAllProductSpecialPriceMutation } from "@/app/(admin)/_mutation/global-price-setting.mutation";
import { useSession } from "next-auth/react";
import AccessDeniedContainer from "@/app/(admin)/_components/access-denied";

export default function UpdateSpecialPriceForm() {
  const session = useSession();

  if (session.data?.user.role !== "ADMIN") {
    return <AccessDeniedContainer />;
  }
  const [percentage, setPercentage] = useState<number | "">("");
  const { execute, status, result, isPending } = useAction(
    updateAllProductSpecialPriceMutation
  );

  const isLoading = isPending;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof percentage === "number" && percentage >= 0 && percentage <= 55) {
      execute({ percentage });
    } else {
      toast.error("Invalid input.", {
        description: "Please enter a percentage between 0 and 55.",
      });
    }
  };

  if (status === "hasSucceeded" && result.data) {
    const { success, message } = result.data;
    if (success) {
      toast.success("Update Successful", {
        description: message,
        icon: <Check className="h-4 w-4" />,
      });
    } else {
      toast.error("Update Failed", {
        description: message,
        icon: <X className="h-4 w-4" />,
      });
    }
    // Optional: Reset percentage after success/failure notification
    // setPercentage('');
  }

  // Handle error (e.g., network error, Zod validation failure)
  if (status === "hasErrored" && result.serverError) {
    toast.error("Server Error");
  }

  return (
    <div className=" flex flex-col items-center justify-center h-screen">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Percent className="h-5 w-5 text-primary" />
            Global Special Price Setting
          </CardTitle>
          <CardDescription>
            Apply a fixed percentage discount to the special price of all
            products based on their current unit selling price.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="percentage">Discount Percentage (0-55%)</Label>
              <div className="relative">
                <Input
                  id="percentage"
                  type="number"
                  min="0"
                  max="55"
                  step="0.1"
                  placeholder="e.g., 10 or 5.5"
                  value={percentage}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setPercentage(isNaN(val) ? "" : val);
                  }}
                  disabled={isLoading}
                  required
                  className="pr-10" // Make room for the icon
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  <Percent className="h-4 w-4" />
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full my-4"
              disabled={
                isLoading ||
                typeof percentage !== "number" ||
                percentage < 0 ||
                percentage > 55
              }
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Percent className="mr-2 h-4 w-4" />
              )}
              Apply Global Discount
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
