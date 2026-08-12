"use client";

import { Package, Calendar, ShoppingBag, ArrowRight } from "lucide-react";
import { IMyOrdersGetAll } from "../../_types/order";
import Link from "next/link";
import { formatDate } from "@/helper/formate-date";
import RenderCurrency from "@/helper/render-currency";

type OrderCardProps = {
  order: IMyOrdersGetAll;
};

export function OrderCard({ order }: OrderCardProps) {
  return (
    <div className="py-4 border-b border-[#E8E2D9] font-sans group transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left: Order Info & Metadata */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-white border border-[#E8E2D9] text-[#0555A2] flex items-center justify-center shrink-0 shadow-2xs">
            <Package className="w-5 h-5" />
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base font-serif font-bold text-[#1C1917]">
                Order #{order.orderNumber}
              </h3>
              <span className="text-[11px] font-bold text-[#0555A2]">
                +{Math.round(order.subTotalAmount * 0.03)} pts
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-stone-500">
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#28AAE0]" />
                <span>{formatDate(new Date(order.createdAt))}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <ShoppingBag className="w-3.5 h-3.5 text-[#28AAE0]" />
                <span>{order.itemsCount} {order.itemsCount === 1 ? "item" : "items"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Total Amount & Direct View Link */}
        <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E8E2D9]/60">
          <div className="text-left sm:text-right">
            <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block">
              Total
            </span>
            <span className="text-lg font-serif font-bold text-[#0555A2]">
              <RenderCurrency amount={order.totalAmount} />
            </span>
          </div>

          <Link
            href={`/my-orders/${order.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-serif font-bold text-[#0555A2] hover:text-[#28AAE0] transition-colors group/link"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
