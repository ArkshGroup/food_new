"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SideBarSiteMap } from "@/types";
import { User, Package, ShieldCheck, Sparkles } from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  profile: User,
  orders: Package,
  security: ShieldCheck,
  points: Sparkles,
};

export default function CustomerTopNavTabs({
  navItems,
}: {
  navItems: SideBarSiteMap[];
}) {
  const pathname = usePathname();

  return (
    <div className="w-full border-b border-[#E8E2D9] font-sans pt-1">
      <div className="flex items-center gap-6 sm:gap-8 overflow-x-auto no-scrollbar">
        {navItems.map((item) => {
          if (!item.visible) return null;
          const isActive =
            pathname === item.path ||
            (item.path !== "/" && pathname.startsWith(item.path));
          const Icon = ICON_MAP[item.icon] || User;

          return (
            <Link
              key={item.name}
              href={item.path}
              className={cn(
                "relative flex items-center gap-2 pb-3 text-xs sm:text-sm font-serif font-bold transition-all duration-200 shrink-0 group",
                isActive
                  ? "text-[#0555A2]"
                  : "text-stone-500 hover:text-[#0555A2]"
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4 shrink-0 transition-colors",
                  isActive ? "text-[#0555A2]" : "text-stone-400 group-hover:text-[#0555A2]"
                )}
              />
              <span>{item.name}</span>
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-[#0555A2] via-[#28AAE0] to-[#0555A2]" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
