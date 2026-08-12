"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  ListIcon,
  Instagram,
  Facebook,
  ChevronRight,
} from "lucide-react";
import {
  RiLinkedinBoxFill,
  RiTiktokFill,
  RiYoutubeFill,
} from "@remixicon/react";
import { LogoImage } from "../../../../../public/images";

export const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/Arksh.Food",
    icon: Facebook,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/Arksh.Food",
    icon: Instagram,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@arksh.food",
    icon: RiTiktokFill,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/arksh-group/?originalSubdomain=np",
    icon: RiLinkedinBoxFill,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/watch?v=OvSvOMbitHg&list=PLOjfiphkH26Mteg6HL85-nW5YfdHCXLyy&index=13",
    icon: RiYoutubeFill,
  },
];

export const MAIN_NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "All Products", href: "/products" },
  { label: "Biscuits", href: "/products?categoryNames=Biscuits" },
  { label: "Cookies", href: "/products?categoryNames=Cookies" },
  { label: "Puffs & Snacks", href: "/products?categoryNames=Puffs" },
  { label: "Coffee & Creamers", href: "/products?categoryNames=Coffee" },
  { label: "Chocolates", href: "/products?categoryNames=Chocolate" },
  { label: "Our Story", href: "/about-us" },
  { label: "Social Impact", href: "/social-impact" },
  { label: "Our Brands", href: "/our-brands" },
  { label: "Blogs & Nutrition", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
  { label: "FAQ", href: "/faq" },
];

export function MenuButton() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="bg-transparent hover:bg-stone-100/80 border-none h-12 w-12 p-0 text-[#1C1917]"
          variant="ghost"
          aria-label="Open site menu"
        >
          <ListIcon className="w-9 h-9 text-[#1C1917]" aria-hidden="true" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[82vw] sm:max-w-sm p-0 bg-[#F0F7FD] border-l-0 shadow-2xl z-[10000] flex flex-col justify-between overflow-y-auto font-sans"
      >
        <div className="p-4 pt-8 space-y-2">
          {/* Clean Aesthetic Links List (Borderless Sky Blue) */}
          <nav className="space-y-1">
            {MAIN_NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-2.5 px-3.5 rounded-none flex items-center justify-between text-stone-800 hover:text-[#0555A2] hover:bg-white/80 text-sm font-medium transition-all group shadow-[2px_2px_6px_rgba(5,85,162,0.04)]"
              >
                <span className="group-hover:translate-x-1 transition-transform">{item.label}</span>
                <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-[#0555A2] group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </nav>
        </div>

        {/* Enhanced Compact Social Media Footer */}
        <div className="px-4 py-4 border-t border-[#0555A2]/10 bg-[#E2EEF8]/40 space-y-2.5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#0555A2] text-center">
            Follow Arksh Food
          </p>

          <div className="flex items-center justify-center gap-2.5">
            {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                className="p-2 rounded-none bg-white text-[#0555A2] hover:bg-[#0555A2] hover:text-white transition-all shadow-2xs hover:scale-105"
                aria-label={label}
              >
                <Icon className="w-3.5 h-3.5" />
              </Link>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
