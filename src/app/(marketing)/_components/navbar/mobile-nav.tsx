"use client";

import type React from "react";
import { useState } from "react";
import {
  Home,
  Search,
  ShoppingCart,
  HeadsetIcon,
  UserCircle2Icon,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { LogoImage } from "../../../../../public/images";
import { cn } from "@/lib/utils";
import { SearchNavbar } from "./product-search-result-container";
import { useCartCountQuery } from "../../_hooks/useCart.hook";
import { UserDropdownMenu } from "./user-drop-down-menu-box";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MenuButton } from "./nav-bar-menu";

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
  url?: string;
  isChildren?: boolean;
}

export function MobileTopHeader() {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [focusSearchInput, setFocusSearchInput] = useState(false);

  return (
    <>
      {/* Mobile Top Header (Left: Logo, Right: Hamburger Menu) */}
      <header className="sticky top-0 left-0 right-0 lg:hidden z-[9998] bg-white/95 backdrop-blur-md border-b border-[#E8E2D9] px-4 py-2.5 flex items-center justify-between shadow-2xs">
        <Link href="/" className="flex items-center">
          <Image
            src={LogoImage}
            height={52}
            width={160}
            alt="Arksh Food"
            className="object-contain h-10.5 sm:h-11.5 w-auto"
            priority
          />
        </Link>

        <div className="flex items-center gap-1">
          <MenuButton />
        </div>
      </header>

      {/* Pop-up Search Overlay (Shows when activated) */}
      {showSearchBar && (
        <div className="fixed top-12 left-0 right-0 z-[9999] lg:hidden p-3 bg-white/95 backdrop-blur-xl border-b border-[#E8E2D9] shadow-lg animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0555A2]">Search Products</span>
            <button
              type="button"
              onClick={() => setShowSearchBar(false)}
              className="p-1 text-[#0555A2] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <SearchNavbar
            isFocusInput={focusSearchInput}
            onClose={() => setShowSearchBar(false)}
          />
        </div>
      )}
    </>
  );
}

export function MobileBottomNav() {
  const [activeTab, setActiveTab] = useState("home");
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [focusSearchInput, setFocusSearchInput] = useState(false);
  const { data } = useCartCountQuery();
  const session = useSession();

  const navItems: NavItem[] = [
    { id: "home", label: "Home", icon: Home, url: "/" },
    {
      id: "search",
      label: "Search",
      icon: Search,
      url: "/products",
    },
    {
      id: "cart",
      label: "Cart",
      icon: ShoppingCart,
      badge: data?.count ?? 0,
      url: "/cart",
    },
    {
      id: "contact",
      label: "Contact",
      icon: HeadsetIcon,
      url: "/contact",
    },
  ];

  return (
    <>
      {/* Pop-up Search Overlay (Triggered from Bottom Search Icon) */}
      {showSearchBar && (
        <div className="fixed top-12 left-0 right-0 z-[9999] lg:hidden p-3 bg-white/95 backdrop-blur-xl border-b border-[#E8E2D9] shadow-lg animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0555A2]">Search Products</span>
            <button
              type="button"
              onClick={() => setShowSearchBar(false)}
              className="p-1 text-[#0555A2] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <SearchNavbar
            isFocusInput={focusSearchInput}
            onClose={() => setShowSearchBar(false)}
          />
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-[999] lg:hidden">
        {/* Backdrop blur effect */}
        <div className="absolute inset-0 bg-white/90 backdrop-blur-xl border-t border-nav-border shadow-md" />

        {/* Navigation content */}
        <div className="relative px-2 py-1.5">
          <div className="flex items-center justify-around">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <a
                  key={item.id}
                  href={item.url ?? "#"}
                  onClick={(e) => {
                    if (item.id === "search") {
                      e.preventDefault();
                      setShowSearchBar((prev) => !prev);
                      setFocusSearchInput((prev) => !prev);
                    }
                    setActiveTab(item.id);
                  }}
                  className={cn(
                    "relative flex flex-col items-center justify-center min-w-0 flex-1 px-2 py-1.5 rounded-xl transition-all duration-200 ease-out group",
                    "hover:bg-accent/50 active:scale-95",
                    isActive && "bg-accent/30"
                  )}
                  aria-label={
                    item.id === "cart" && (item.badge ?? 0) > 0
                      ? `Cart, ${item.badge} items`
                      : undefined
                  }
                >
                  {/* Icon container with badge */}
                  <div className="relative mb-0.5">
                    <Icon
                      aria-hidden="true"
                      className={cn(
                        "h-5 w-5 transition-colors duration-200",
                        isActive ? "text-[#0555A2]" : "text-stone-500"
                      )}
                    />

                    {/* Badge */}
                    {(item.badge ?? -1) >= 0 && (
                      <div className="absolute -top-1.5 -right-2 min-w-[16px] h-[16px] bg-[#0555A2] text-white rounded-full flex items-center justify-center px-1">
                        <span className="text-[10px] font-bold leading-none">
                          {item.badge}
                        </span>
                      </div>
                    )}
                  </div>
                  {/* Visible label */}
                  <span
                    className={cn(
                      "text-[11px] font-medium transition-colors duration-200",
                      isActive ? "text-[#0555A2] font-bold" : "text-stone-600"
                    )}
                  >
                    {item.label}
                  </span>
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#0555A2] rounded-full" />
                  )}
                </a>
              );
            })}

            <UserDropdownMenu>
              <button
                type="button"
                className={cn(
                  "relative flex flex-col items-center justify-center min-w-0 flex-1 px-2 py-1.5 rounded-xl transition-all duration-200 ease-out",
                  "hover:bg-accent/50 active:scale-95",
                  activeTab === "profile" && "bg-accent/30"
                )}
                onClick={() => setActiveTab("profile")}
              >
                <div className="relative mb-0.5">
                  {session.status === "authenticated" ? (
                    <Avatar className="w-5 h-5">
                      <AvatarFallback className="bg-[#0555A2] text-white text-[10px]">
                        {session.data.user.userName?.charAt(0).toUpperCase() ??
                          "U"}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <UserCircle2Icon
                      className={cn(
                        "h-5 w-5 transition-colors duration-200",
                        activeTab === "profile"
                          ? "text-[#0555A2]"
                          : "text-stone-500"
                      )}
                    />
                  )}
                </div>
                <span
                  className={cn(
                    "text-[11px] font-medium transition-colors duration-200",
                    activeTab === "profile"
                      ? "text-[#0555A2] font-bold"
                      : "text-stone-600"
                  )}
                >
                  {session.status === "authenticated" ? "Profile" : "Account"}
                </span>
                {activeTab === "profile" && (
                  <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#0555A2] rounded-full" />
                )}
              </button>
            </UserDropdownMenu>
          </div>
        </div>

        {/* Safe area padding */}
        <div className="h-safe-area-inset-bottom bg-white" />
      </nav>
    </>
  );
}
