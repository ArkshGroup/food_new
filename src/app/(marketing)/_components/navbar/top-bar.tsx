"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, Truck, Facebook, Instagram, Sparkles } from "lucide-react";
import {
  RiLinkedinBoxFill,
  RiTiktokFill,
  RiYoutubeFill,
} from "@remixicon/react";

export const TOP_SOCIAL_LINKS = [
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
    href: "https://www.youtube.com/watch?v=OvSvOMbitHg",
    icon: RiYoutubeFill,
  },
];

export function TopBar() {
  return (
    <div className="w-full bg-[#033B73] text-white text-[11px] font-sans border-b border-[#05488A]">
      {/* MOBILE MARQUEE BAR (Continuous Loop of Phone, Email & Free Delivery Offer) */}
      <div className="block lg:hidden py-1.5 overflow-hidden whitespace-nowrap relative bg-[#022A54]">
        <div className="inline-flex items-center gap-8 animate-marquee">
          {/* Loop Set 1 */}
          <div className="inline-flex items-center gap-8">
            <a
              href="tel:+9779704591211"
              className="inline-flex items-center gap-1.5 hover:text-[#28AAE0] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#28AAE0]" />
              <span>+977-9704591211 / +977-1-4002049</span>
            </a>

            <div className="inline-flex items-center gap-1.5 text-sky-200">
              <Truck className="w-3.5 h-3.5 text-[#28AAE0]" />
              <span>
                Free Delivery on Orders Over{" "}
                <strong className="text-white font-bold">Rs. 2,500</strong>
              </span>
            </div>

            <a
              href="mailto:info@arkshfood.com"
              className="inline-flex items-center gap-1.5 hover:text-[#28AAE0] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#28AAE0]" />
              <span>info@arkshfood.com</span>
            </a>

            <div className="inline-flex items-center gap-1.5 text-sky-200">
              <Sparkles className="w-3.5 h-3.5 text-[#28AAE0]" />
              <span>100% Nepali Millet & Grain Snacks</span>
            </div>
          </div>

          {/* Loop Set 2 (Duplicated for seamless infinite marquee) */}
          <div className="inline-flex items-center gap-8">
            <a
              href="tel:+9779704591211"
              className="inline-flex items-center gap-1.5 hover:text-[#28AAE0] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#28AAE0]" />
              <span>+977-9704591211 / +977-1-4002049</span>
            </a>

            <div className="inline-flex items-center gap-1.5 text-sky-200">
              <Truck className="w-3.5 h-3.5 text-[#28AAE0]" />
              <span>
                Free Delivery on Orders Over{" "}
                <strong className="text-white font-bold">Rs. 2,500</strong>
              </span>
            </div>

            <a
              href="mailto:info@arkshfood.com"
              className="inline-flex items-center gap-1.5 hover:text-[#28AAE0] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#28AAE0]" />
              <span>info@arkshfood.com</span>
            </a>

            <div className="inline-flex items-center gap-1.5 text-sky-200">
              <Sparkles className="w-3.5 h-3.5 text-[#28AAE0]" />
              <span>100% Nepali Millet & Grain Snacks</span>
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP TOP BAR */}
      <div className="hidden lg:block py-2 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Section 1: Email & Phone Marquee */}
          <div className="w-1/3 overflow-hidden whitespace-nowrap relative">
            <div className="inline-flex items-center gap-6 animate-marquee">
              <a
                href="mailto:info@arkshfood.com"
                className="inline-flex items-center gap-1.5 hover:text-[#28AAE0] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#28AAE0]" />
                <span>info@arkshfood.com</span>
              </a>

              <a
                href="tel:+9779704591211"
                className="inline-flex items-center gap-1.5 hover:text-[#28AAE0] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#28AAE0]" />
                <span>+977-9704591211</span> <span> +977-1-4002049</span>
              </a>
            </div>
          </div>

          {/* Section 2: Center Free Delivery Offer */}
          <div className="w-1/3 text-center flex items-center justify-center gap-2 font-medium tracking-wide">
            <Truck className="w-3.5 h-3.5 text-[#28AAE0] shrink-0" />
            <span>
              Free Delivery on Orders Over{" "}
              <strong className="text-[#28AAE0] font-bold">Rs. 2,500</strong>
            </span>
          </div>

          {/* Section 3: Right Social Icons */}
          <div className="w-1/3 flex items-center justify-end gap-3.5">
            {TOP_SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-white/80 hover:text-[#28AAE0] hover:scale-110 transition-all duration-200"
              >
                <Icon className="w-3.5 h-3.5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
