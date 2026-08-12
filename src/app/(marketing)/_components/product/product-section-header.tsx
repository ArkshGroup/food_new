import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function ProductSectionViewAllLink({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex shrink-0 items-center gap-1.5 rounded-full bg-gradient-to-r from-[#0756A3] to-[#209AEA] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white shadow-sm transition-all duration-200 hover:shadow-md hover:brightness-105 md:gap-2 md:px-4 md:py-1.5 md:text-xs"
    >
      View all
      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white/20 transition-transform duration-200 group-hover:translate-x-0.5 md:h-5 md:w-5">
        <ArrowRight className="h-2.5 w-2.5 md:h-3 md:w-3" aria-hidden />
      </span>
    </Link>
  );
}

export function ProductSectionHeader({
  title,
  subtitle,
  icon: Icon,
  href,
  extra,
}: {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  href: string;
  extra?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 px-2 py-3 md:py-4">
      <div className="flex min-w-0 flex-1 items-center gap-2 md:gap-3">
        {Icon && (
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#209AEA]/10 text-[#0756A3] md:h-9 md:w-9">
            <Icon className="h-4 w-4 md:h-5 md:w-5" strokeWidth={1.75} />
          </div>
        )}
        <div className="min-w-0">
          <h2 className="font-serif text-base font-semibold text-slate-900 md:text-xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-0.5 text-[11px] text-slate-500 md:text-sm">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {extra && (
        <div className="order-3 w-full pl-10 md:order-none md:w-auto md:pl-0">
          {extra}
        </div>
      )}

      <div className={extra ? "order-2 md:order-none" : ""}>
        <ProductSectionViewAllLink href={href} />
      </div>
    </div>
  );
}
