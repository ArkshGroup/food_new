"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CoinsIcon, LogOutIcon, Package, UserIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { CurrencySelector } from "./currency-selector";

export function UserDropdownMenu({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

      {session?.user ? (
        <DropdownMenuContent
          className="w-64 z-[999999] bg-[#F0F7FD] rounded-none border-none shadow-[0_15px_35px_rgba(5,85,162,0.15)] p-2.5 font-sans space-y-1.5"
          align="end"
        >
          {/* User Profile Header Badge */}
          <div className="px-3 py-2 mb-1 bg-white/80 rounded-none shadow-[2px_2px_6px_rgba(5,85,162,0.04)]">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#28AAE0]">
              Signed in as
            </p>
            <p className="text-sm font-serif font-bold text-[#0555A2] truncate">
              {session.user.userName || session.user.email || "Valued Customer"}
            </p>
          </div>

          <DropdownMenuGroup className="space-y-1">
            <DropdownMenuItem asChild className="p-0 focus:bg-transparent cursor-pointer">
              <Link
                href="/my-orders"
                className="flex items-center gap-3 p-2.5 rounded-none bg-white/70 hover:bg-white transition-all duration-300 shadow-[2px_2px_6px_rgba(5,85,162,0.04)] hover:shadow-[4px_4px_10px_rgba(5,85,162,0.1)] hover:-translate-y-0.5 group"
              >
                <div className="p-1.5 rounded-none bg-[#F0F7FD] text-[#0555A2] group-hover:bg-[#0555A2] group-hover:text-white transition-colors shrink-0 shadow-[inset_2px_2px_4px_rgba(5,85,162,0.12),inset_-2px_-2px_4px_rgba(255,255,255,0.9)]">
                  <Package className="w-4 h-4" />
                </div>
                <span className="text-xs font-serif font-bold text-[#1C1917] group-hover:text-[#0555A2] transition-colors">
                  My Orders
                </span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild className="p-0 focus:bg-transparent cursor-pointer">
              <Link
                href="/profile"
                className="flex items-center gap-3 p-2.5 rounded-none bg-white/70 hover:bg-white transition-all duration-300 shadow-[2px_2px_6px_rgba(5,85,162,0.04)] hover:shadow-[4px_4px_10px_rgba(5,85,162,0.1)] hover:-translate-y-0.5 group"
              >
                <div className="p-1.5 rounded-none bg-[#F0F7FD] text-[#0555A2] group-hover:bg-[#0555A2] group-hover:text-white transition-colors shrink-0 shadow-[inset_2px_2px_4px_rgba(5,85,162,0.12),inset_-2px_-2px_4px_rgba(255,255,255,0.9)]">
                  <UserIcon className="w-4 h-4" />
                </div>
                <span className="text-xs font-serif font-bold text-[#1C1917] group-hover:text-[#0555A2] transition-colors">
                  Profile Settings
                </span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <div className="md:hidden pt-1">
            <DropdownMenuItem
              onClick={(e) => e.preventDefault()}
              className="p-2.5 rounded-none bg-white/70 flex items-center gap-2 cursor-pointer text-xs font-serif font-bold text-[#1C1917]"
            >
              <CoinsIcon className="w-4 h-4 text-[#0555A2]" />
              <CurrencySelector />
            </DropdownMenuItem>
          </div>

          <div className="pt-1">
            <DropdownMenuItem
              onSelect={() => {
                signOut({
                  redirectTo: "/",
                });
              }}
              className="flex items-center gap-3 p-2.5 rounded-none bg-rose-50/80 hover:bg-rose-100/90 text-rose-700 transition-all duration-300 shadow-[2px_2px_6px_rgba(225,29,72,0.06)] hover:-translate-y-0.5 cursor-pointer group"
            >
              <div className="p-1.5 rounded-none bg-white text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-colors shrink-0 shadow-[inset_1px_1px_3px_rgba(225,29,72,0.12)]">
                <LogOutIcon className="w-4 h-4" />
              </div>
              <span className="text-xs font-serif font-bold group-hover:text-rose-800 transition-colors">
                Log Out
              </span>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      ) : (
        <DropdownMenuContent
          className="w-60 z-[999999] bg-[#F0F7FD] rounded-none border-none shadow-[0_15px_35px_rgba(5,85,162,0.15)] p-2.5 font-sans space-y-1"
          align="end"
        >
          <DropdownMenuGroup>
            <DropdownMenuItem asChild className="p-0 focus:bg-transparent cursor-pointer">
              <Link
                href="/auth/login"
                className="flex items-center gap-3 p-2.5 rounded-none bg-white/80 hover:bg-white transition-all duration-300 shadow-[2px_2px_6px_rgba(5,85,162,0.04)] hover:shadow-[4px_4px_10px_rgba(5,85,162,0.1)] hover:-translate-y-0.5 group"
              >
                <div className="p-1.5 rounded-none bg-[#F0F7FD] text-[#0555A2] group-hover:bg-[#0555A2] group-hover:text-white transition-colors shrink-0 shadow-[inset_2px_2px_4px_rgba(5,85,162,0.12),inset_-2px_-2px_4px_rgba(255,255,255,0.9)]">
                  <UserIcon className="w-4 h-4" />
                </div>
                <span className="text-xs font-serif font-bold text-[#1C1917] group-hover:text-[#0555A2] transition-colors">
                  Sign In / Register
                </span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <div className="md:hidden pt-1">
            <DropdownMenuItem className="p-2.5 rounded-none bg-white/70 flex items-center gap-2 cursor-pointer text-xs font-serif font-bold text-[#1C1917]">
              <CoinsIcon className="w-4 h-4 text-[#0555A2]" />
              <CurrencySelector />
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
