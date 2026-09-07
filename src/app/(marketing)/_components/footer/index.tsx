"use client";

import Link from "next/link";
import {
  RiLinkedinBoxFill,
  RiTiktokFill,
  RiYoutubeFill,
} from "@remixicon/react";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Leaf,
  ShieldCheck,
  BookOpen,
  Cookie,
  Coffee,
  Droplet,
  Heart,
  Zap,
  Headset,
  HelpCircle,
  MessageSquareHeart,
  Star,
  Clock,
} from "lucide-react";

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

const COMPANY_STORY_LINKS = [
  { label: "Our Story & Mission", href: "/about-us", icon: Sparkles },
  { label: "Social Impact", href: "/social-impact", icon: Leaf },
  { label: "Our Brands Portfolio", href: "/our-brands", icon: ShieldCheck },
  { label: "Blogs & Nutrition Tips", href: "/blog", icon: BookOpen },
];

const PRODUCT_CATEGORIES = [
  { label: "Biscuits", href: "/products?categoryNames=Biscuits", icon: Cookie },
  { label: "Cookies", href: "/products?categoryNames=Cookies", icon: Cookie },
  { label: "Puffs & Snacks", href: "/products?categoryNames=Puffs", icon: Zap },
  { label: "Coffee", href: "/products?categoryNames=Coffee", icon: Coffee },
  { label: "Creamer", href: "/products?categoryNames=Creamer", icon: Droplet },
  { label: "Chocolate", href: "/products?categoryNames=Chocolate", icon: Heart },
];

const SUPPORT_LINKS = [
  { label: "Customer Support", href: "/contact", icon: Headset },
  { label: "FAQ & Answers", href: "/faq", icon: HelpCircle },
  { label: "Share Feedback", href: "/feedback", icon: MessageSquareHeart },
  { label: "Food Influencer Program", href: "/food-influencer-program", icon: Star },
];

const POLICY_LINKS = [
  { label: "Terms & Conditions", href: "/terms-conditions" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Return Policy", href: "/return-policy" },
  { label: "Shipping Policy", href: "/shipping-policy" },
];

function FooterSection() {
  return (
    <footer className="w-full bg-[#0d64ba] text-white font-sans relative overflow-hidden border-t border-white/20">

      {/* Top Dual Brand Accent Gradient Line */}
      <div className="h-1 w-full bg-gradient-to-r from-[#0555A2] via-white to-[#0555A2]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-12">

        {/* Main Grid: 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-white/30">

          {/* Column 1: Brand & Identity (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block group space-y-0.5 leading-none">
              <span className="block text-2xl sm:text-3xl font-serif font-extrabold tracking-widest text-white group-hover:text-white/80 transition-colors drop-shadow-xs">
                ARKSH
              </span>
              <span className="block text-[11px] font-sans font-extrabold tracking-[0.35em] text-white uppercase">
                FOOD
              </span>
            </Link>

            <p className="text-white text-xs sm:text-sm leading-relaxed font-sans max-w-sm font-semibold">
              Crafted with pride in Nepal. We blend traditional Himalayan recipes with locally grown grains like Kodo millet and native corn to create wholesome, everyday food products.
            </p>

            {/* Social Media Links */}
            <div className="space-y-2">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-white block">
                Connect With Us
              </span>
              <div className="flex items-center gap-2.5">
                {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-full bg-white/25 hover:bg-white border border-white/40 text-white hover:text-[#0555A2] flex items-center justify-center transition-all duration-300 shadow-xs hover:scale-110"
                  >
                    <Icon className="w-4 h-4" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Our Story (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-white">
              Our Story
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm font-semibold text-white">
              {COMPANY_STORY_LINKS.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors duration-200 group font-semibold"
                    >
                      <Icon className="w-3.5 h-3.5 text-white group-hover:scale-110 transition-transform shrink-0" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 3: Product Collections (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-white">
              Collections
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm font-semibold text-white">
              {PRODUCT_CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                return (
                  <li key={cat.label}>
                    <Link
                      href={cat.href}
                      className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors duration-200 group font-semibold"
                    >
                      <Icon className="w-3.5 h-3.5 text-white group-hover:scale-110 transition-transform shrink-0" />
                      <span>{cat.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 4: Help & Headquarters (3 Cols) */}
          <div className="lg:col-span-3 space-y-5">
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-white">
                Customer Help
              </h4>
              <ul className="space-y-3 text-xs sm:text-sm font-semibold text-white">
                {SUPPORT_LINKS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors duration-200 group font-semibold"
                      >
                        <Icon className="w-3.5 h-3.5 text-white group-hover:scale-110 transition-transform shrink-0" />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="pt-3 border-t border-white/30 space-y-2.5 text-xs text-white font-semibold">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span className="text-white">Rani Devi Marg, Lazimpat, Kathmandu, Nepal</span>
              </p>
              <p className="flex items-center gap-2 flex-wrap">
                <Phone className="w-4 h-4 text-white shrink-0" />
                <a href="tel:+9779704591211" className="text-white hover:text-white/80 transition-colors">
                  +977 9704591211
                </a>
                <span className="text-white/80">·</span>
                <a href="tel:+97714002049" className="text-white hover:text-white/80 transition-colors">
                  +977-1-4002049
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-white shrink-0" />
                <a href="mailto:info@arkshfood.com" className="text-white hover:text-white/80 transition-colors">
                  info@arkshfood.com
                </a>
              </p>
              {/* some information */}
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-white shrink-0" />
                <span className="text-white">Sun - Fri, 9:00 AM - 6:00 PM</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Legal Bar & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white font-bold">
          <p>© {new Date().getFullYear()} Arksh Food. All rights reserved. Proudly Made in Nepal.</p>

          <div className="flex flex-wrap items-center gap-5 sm:gap-6">
            {POLICY_LINKS.map((p) => (
              <Link key={p.href} href={p.href} className="text-white hover:text-white/80 transition-colors">
                {p.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}

export { FooterSection };
