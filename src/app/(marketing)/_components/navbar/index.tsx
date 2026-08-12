"use client";

import { useState, useRef, useEffect } from "react";
import {
  User,
  ShoppingCart,
  ArrowRight,
  Search,
  X,
  ChevronDown,
  HelpCircle,
  MessageSquareHeart,
  Headset,
  Heart,
  Sparkles,
  Leaf,
  ShieldCheck,
  Coffee,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { LogoImage } from "../../../../../public/images";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SearchNavbar } from "./product-search-result-container";
import { useSession } from "next-auth/react";
import { AvatarFallback, Avatar } from "@/components/ui/avatar";
import { useCartCountQuery } from "../../_hooks/useCart.hook";
import { UserDropdownMenu } from "./user-drop-down-menu-box";

const PRODUCT_MEGA_CATEGORIES = [
  {
    name: "Biscuits",
    href: "/products?categoryNames=Biscuits",
    image: "/category/biscuits.avif",
  },
  {
    name: "Cookies",
    href: "/products?categoryNames=Cookies",
    image: "/category/cookies.avif",
  },
  {
    name: "Puffs",
    href: "/products?categoryNames=Puffs",
    image: "/category/puff.avif",
  },
  {
    name: "Coffee",
    href: "/products?categoryNames=Coffee",
    image: "/category/coffee.avif",
  },
  {
    name: "Creamer",
    href: "/products?categoryNames=Creamer",
    image: "/category/creamer.avif",
  },
  {
    name: "Chocolate",
    href: "/products?categoryNames=Chocolate",
    image: "/category/chocholate.avif",
  },
];

export function Navbar() {
  const session = useSession();
  const { data } = useCartCountQuery();
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchBoxRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { label: "Home", href: "/" },
    {
      label: "Our Story",
      href: "/about-us",
      hasDropdown: true,
      dropdownItems: [
        {
          label: "Our Story & Mission",
          href: "/about-us",
          description: "Our heritage, vision & core values",
          icon: Sparkles,
        },
        {
          label: "Social Impact",
          href: "/social-impact",
          description: "Local farmers & community empowerment",
          icon: Leaf,
        },
        {
          label: "Our Brands",
          href: "/our-brands",
          description: "Dami, MacCoffee, Didian & Luxury Cocoa",
          icon: ShieldCheck,
        },
      ],
    },
    {
      label: "Products",
      href: "/products",
      hasMegaMenu: true,
    },
    { label: "Blogs & Nutrition Tips", href: "/blog" },
    {
      label: "Contact Us",
      href: "/contact",
      hasDropdown: true,
      dropdownItems: [
        {
          label: "Support & Help",
          href: "/contact",
          description: "Get in touch with customer service",
          icon: Headset,
        },
        {
          label: "FAQ",
          href: "/faq",
          description: "Common questions & answers",
          icon: HelpCircle,
        },
        {
          label: "Feedback",
          href: "/feedback",
          description: "Share your thoughts & experience",
          icon: MessageSquareHeart,
        },
      ],
    },
  ];

  // Close search overlay on click outside or escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSearchOpen]);

  return (
    <nav className="sticky top-0 z-[9999] w-full backdrop-blur-md  transition-all duration-300 hidden lg:block">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-17 sm:h-19">
          {/* Logo on Left */}
          <div className="flex items-center shrink-0">
            <Link className="flex items-center gap-3 group" href={"/"}>
              <div className="relative overflow-hidden transition-transform duration-300 group-hover:scale-105">
                <Image
                  src={LogoImage}
                  height={56}
                  width={180}
                  alt="Arksh Food"
                  className="object-contain h-11 sm:h-12 lg:h-13 w-auto"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Center Navigation Links */}
          <div className="hidden xl:flex items-center space-x-6 text-sm font-medium text-stone-700">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                link.dropdownItems?.some((item) => pathname === item.href);

              if (link.hasMegaMenu) {
                return (
                  <div key={link.label} className="relative group py-4">
                    <Link
                      href={link.href}
                      className={`relative inline-flex items-center gap-1.5 py-1 text-xs tracking-wider uppercase font-sans font-semibold transition-colors duration-200 ${
                        isActive
                          ? "text-[#0555A2]"
                          : "text-stone-700 hover:text-[#0555A2]"
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180 text-stone-400 group-hover:text-[#0555A2]" />
                      <span
                        className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 rounded-full bg-gradient-to-r from-[#0555A2] via-[#28AAE0] to-[#0555A2] transition-all duration-300 ease-out ${
                          isActive
                            ? "w-8 opacity-100 shadow-2xs"
                            : "w-1.5 opacity-0 group-hover:w-8 group-hover:opacity-100"
                        }`}
                      />
                    </Link>

                    {/* Neumorphic Sky Light Blue Mega Menu Dropdown (Sharp Corners / No Border Radius) */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-[540px] lg:w-[580px] bg-[#F0F7FD] rounded-none p-5 shadow-[0_15px_35px_rgba(5,85,162,0.12)] hidden group-hover:block transition-all duration-300 z-[9999] animate-in fade-in slide-in-from-top-3">
                      {/* Minimal Header (Borderless) */}
                      <div className="flex items-center justify-between pb-2.5 mb-3.5 text-xs font-sans">
                        <span className="font-bold text-[#0555A2] tracking-wider uppercase text-[11px]">
                          Categories
                        </span>
                        <Link
                          href="/products"
                          className="text-[#0555A2] hover:text-[#28AAE0] font-semibold flex items-center gap-1.5 text-xs transition-colors group/all"
                        >
                          <span>All Products</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover/all:translate-x-1 transition-transform" />
                        </Link>
                      </div>

                      {/* 3x2 Category Grid (Sharp Neumorphic Image & Title Only, Borderless) */}
                      <div className="grid grid-cols-3 gap-4">
                        {PRODUCT_MEGA_CATEGORIES.map((cat) => (
                          <Link
                            key={cat.name}
                            href={cat.href}
                            className="group/item flex flex-col items-center justify-center text-center p-3.5 rounded-none bg-white/70 hover:bg-white transition-all duration-300 shadow-[3px_3px_8px_rgba(5,85,162,0.06),_-3px_-3px_8px_rgba(255,255,255,0.85)] hover:shadow-[5px_5px_15px_rgba(5,85,162,0.12),_-5px_-5px_15px_rgba(255,255,255,1)] hover:-translate-y-1"
                          >
                            {/* 3D Gourmet Porcelain Serving Plate Category Image Container */}
                            <div className="relative w-16 h-16 rounded-full bg-gradient-to-b from-white via-[#F0F7FD] to-[#E2EEF8] border-2 border-white shadow-xs ring-1 ring-[#0555A2]/15 flex items-center justify-center shrink-0 mb-2.5 group-hover/item:scale-110 transition-transform duration-300">
                              <div className="relative w-11 h-11 rounded-full bg-white border border-sky-100/80 shadow-inner overflow-hidden flex items-center justify-center p-0.5">
                                <Image
                                  src={cat.image}
                                  alt={cat.name}
                                  fill
                                  className="object-cover rounded-full group-hover/item:scale-110 transition-transform duration-500"
                                />
                              </div>
                            </div>

                            {/* Title Directly Below Image */}
                            <span className="text-xs sm:text-sm font-serif font-bold text-[#1C1917] group-hover/item:text-[#0555A2] transition-colors leading-tight">
                              {cat.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              if (link.hasDropdown && link.dropdownItems) {
                return (
                  <div key={link.label} className="relative group py-4">
                    <Link
                      href={link.href}
                      className={`relative inline-flex items-center gap-1.5 py-1 text-xs tracking-wider uppercase font-sans font-semibold transition-colors duration-200 ${
                        isActive
                          ? "text-[#0555A2]"
                          : "text-stone-700 hover:text-[#0555A2]"
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180 text-stone-400 group-hover:text-[#0555A2]" />
                      <span
                        className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 rounded-full bg-gradient-to-r from-[#0555A2] via-[#28AAE0] to-[#0555A2] transition-all duration-300 ease-out ${
                          isActive
                            ? "w-8 opacity-100 shadow-2xs"
                            : "w-1.5 opacity-0 group-hover:w-8 group-hover:opacity-100"
                        }`}
                      />
                    </Link>

                    {/* Neumorphic Sky Light Blue Dropdown Menu Box (Sharp Corners) */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-80 bg-[#F0F7FD] rounded-none p-3 shadow-[0_15px_35px_rgba(5,85,162,0.12)] hidden group-hover:block transition-all duration-300 z-[9999] animate-in fade-in slide-in-from-top-2">
                      <div className="space-y-2">
                        {link.dropdownItems.map((subItem) => {
                          const Icon = subItem.icon;
                          const isSubActive = pathname === subItem.href;
                          return (
                            <Link
                              key={subItem.label}
                              href={subItem.href}
                              className={`group/sub flex items-center gap-3.5 p-3 rounded-none transition-all duration-300 shadow-[3px_3px_8px_rgba(5,85,162,0.06),_-3px_-3px_8px_rgba(255,255,255,0.85)] hover:shadow-[5px_5px_15px_rgba(5,85,162,0.12),_-5px_-5px_15px_rgba(255,255,255,1)] hover:-translate-y-0.5 ${
                                isSubActive ? "bg-white text-[#0555A2]" : "bg-white/70 hover:bg-white"
                              }`}
                            >
                              <div className="p-2 rounded-none bg-[#F0F7FD] text-[#0555A2] group-hover/sub:bg-[#0555A2] group-hover/sub:text-white transition-colors shrink-0 shadow-[inset_2px_2px_4px_rgba(5,85,162,0.12),inset_-2px_-2px_4px_rgba(255,255,255,0.9)]">
                                <Icon className="w-5 h-5" />
                              </div>
                              <div className="flex flex-col min-w-0">
                                <span className="text-sm font-serif font-bold text-[#1C1917] group-hover/sub:text-[#0555A2] transition-colors">
                                  {subItem.label}
                                </span>
                                <span className="text-xs text-stone-500 font-sans leading-tight mt-0.5">
                                  {subItem.description}
                                </span>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div key={link.label} className="relative group py-4">
                  <Link
                    href={link.href}
                    className={`relative inline-flex items-center py-1 text-xs tracking-wider uppercase font-sans font-semibold transition-colors duration-200 ${
                      isActive
                        ? "text-[#0555A2]"
                        : "text-stone-700 hover:text-[#0555A2]"
                    }`}
                  >
                    <span>{link.label}</span>
                    <span
                      className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 rounded-full bg-gradient-to-r from-[#0555A2] via-[#28AAE0] to-[#0555A2] transition-all duration-300 ease-out ${
                        isActive
                          ? "w-8 opacity-100 shadow-2xs"
                          : "w-1.5 opacity-0 group-hover:w-8 group-hover:opacity-100"
                      }`}
                    />
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-1 sm:space-x-1.5">
            {/* Search Icon Trigger */}
            <button
              type="button"
              onClick={() => setIsSearchOpen((prev) => !prev)}
              className={`p-2.5 rounded-full text-stone-700 hover:text-[#0555A2] hover:bg-sky-50 transition-all duration-200 ${
                isSearchOpen
                  ? "bg-[#0555A2] text-white hover:bg-[#0555A2] hover:text-white"
                  : ""
              }`}
              aria-label="Toggle Search"
              title="Search Products"
            >
              {isSearchOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Search className="w-5 h-5" />
              )}
            </button>

            {/* Wishlist Icon */}
            <Link
              href={"/wishlist"}
              className="p-2.5 rounded-full text-stone-700 hover:text-[#0555A2] hover:bg-sky-50 transition-colors"
              aria-label="View Wishlist"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
            </Link>

            {/* Cart Icon with Live Badge */}
            <Link
              href={"/cart"}
              className="relative p-2.5 rounded-full text-stone-700 hover:text-[#0555A2] hover:bg-sky-50 transition-colors"
              aria-label="View Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {(data?.count ?? 0) > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-[#28AAE0] text-white text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full p-0 border-2 border-white">
                  {data?.count}
                </Badge>
              )}
            </Link>

            {/* Account / User Menu */}
            {session.data?.user ? (
              <UserDropdownMenu>
                <button className="flex items-center gap-2 p-1.5 rounded-full text-stone-700 hover:bg-stone-200/50 transition-colors">
                  <Avatar className="w-8 h-8 border border-[#E8E2D9]">
                    <AvatarFallback className="bg-[#0555A2] text-white font-medium text-xs">
                      {session.data.user.userName
                        ? session.data.user.userName.charAt(0).toUpperCase()
                        : "U"}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </UserDropdownMenu>
            ) : (
              <Link
                href={"/auth/login"}
                className="p-2.5 rounded-full text-stone-700 hover:text-[#0555A2] hover:bg-sky-50 transition-colors"
                title="Sign In"
              >
                <User className="w-5 h-5" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Aesthetic Dropdown Search Box */}
      {isSearchOpen && (
        <div
          ref={searchBoxRef}
          className="absolute top-full left-0 right-0 w-full bg-white/98 backdrop-blur-xl border-b border-[#E8E2D9] shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-top-3 py-6 z-[9999]"
        >
          <div className="max-w-2xl mx-auto px-6 relative space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#28AAE0]">
                Search Products & Snacks
              </span>
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="text-stone-400 hover:text-[#0555A2] text-xs flex items-center gap-1 font-sans uppercase tracking-wider transition-colors"
              >
                <span>Close</span>
                <X className="w-4 h-4" />
              </button>
            </div>
            <SearchNavbar isFocusInput={isSearchOpen} />
          </div>
        </div>
      )}
    </nav>
  );
}
