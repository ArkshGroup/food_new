import { Button } from "@/components/ui/button";
import { Sparkles, ShoppingBag, Coins } from "lucide-react";
import Link from "next/link";
import marketingService from "@/app/(marketing)/_services/index.service";
import { OrdersList } from "@/app/(marketing)/_components/my-order/order-list";

const ArkshFoodPointsUI = async () => {
  const { data: userProfile } = await marketingService.user.getUserProfile();
  const { data: allOrders } = await marketingService.order.getOrdersByCustomer();
  const orders = allOrders?.data || [];

  return (
    <div className="w-full space-y-6 font-sans pt-2">
      {/* Header */}
      <div className="pb-3 border-b border-[#E8E2D9]">
        <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#1C1917]">
          Arksh Food Points
        </h1>
        <p className="text-xs text-stone-500 font-sans mt-0.5">
          Earn 3% reward points automatically on every completed purchase and redeem on future orders.
        </p>
      </div>

      {/* Available Points Balance Summary */}
      <div className="py-4 border-b border-[#E8E2D9] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white border border-[#E8E2D9] text-[#0555A2] flex items-center justify-center shrink-0 shadow-2xs">
            <Coins className="w-6 h-6" />
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block">
              Available Balance
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-serif font-bold text-[#0555A2]">
                {userProfile?.arkshFoodPoint || 0}
              </span>
              <span className="text-xs font-bold text-[#28AAE0]">Reward Points</span>
            </div>
          </div>
        </div>

        <Link href="/products">
          <Button className="bg-[#0555A2] hover:bg-[#034484] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-xs flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#28AAE0]" />
            <span>Shop & Earn Points</span>
          </Button>
        </Link>
      </div>

      {/* Points Earning Order History */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-serif font-bold text-[#1C1917] flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[#0555A2]" />
            Points Earning History
          </h3>
        </div>

        {orders.length === 0 ? (
          <p className="text-xs text-stone-500 py-6 text-center">
            No points history available yet. Start shopping to earn rewards!
          </p>
        ) : (
          <OrdersList orders={orders} />
        )}
      </div>
    </div>
  );
};

export default ArkshFoodPointsUI;
