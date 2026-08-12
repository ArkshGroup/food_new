import React from "react";
import { OrdersList } from "@/app/(marketing)/_components/my-order/order-list";
import marketingService from "@/app/(marketing)/_services/index.service";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Package, ArrowRight } from "lucide-react";

const MyOrderRootPage = async () => {
  const { data } = await marketingService.order.getOrdersByCustomer();
  const orders = data?.data || [];

  if (orders.length === 0) {
    return (
      <div className="py-12 text-center max-w-md mx-auto space-y-4 font-sans">
        <div className="w-12 h-12 rounded-full bg-sky-50 text-[#0555A2] flex items-center justify-center mx-auto">
          <Package className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-serif font-bold text-[#1C1917]">
            No Orders Found
          </h2>
          <p className="text-xs text-stone-500 font-sans leading-relaxed">
            You haven&apos;t placed any orders yet. Discover our delicious kodo millet snacks & instant coffee!
          </p>
        </div>
        <Link href="/products" className="inline-block pt-2">
          <Button className="bg-[#0555A2] hover:bg-[#034484] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all">
            <span>Explore Products</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4 font-sans pt-2">
      {/* Page Header */}
      <div className="flex items-center justify-between gap-4 pb-2 border-b border-[#E8E2D9]">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#1C1917]">
            My Orders
          </h1>
          <p className="text-xs text-stone-500 font-sans mt-0.5">
            Track and view details of your recent purchases ({orders.length} {orders.length === 1 ? "order" : "orders"})
          </p>
        </div>
      </div>

      <OrdersList orders={orders} />
    </div>
  );
};

export default MyOrderRootPage;
