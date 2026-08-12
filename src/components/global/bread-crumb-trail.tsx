"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { ChevronRight } from "lucide-react";

export const BreadCrumbsTrail = () => {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);

  return (
    <nav aria-label="Breadcrumb" className="py-1 font-sans text-xs">
      <ol className="flex items-center gap-2 flex-wrap">
        <li>
          <Link
            href="/"
            className="text-stone-500 hover:text-[#0555A2] transition-colors font-medium"
          >
            Home
          </Link>
        </li>
        {pathNames.map((link, index) => {
          const href = `/${pathNames.slice(0, index + 1).join("/")}`;
          const formattedLink = link
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
          const isLast = index === pathNames.length - 1;

          return (
            <React.Fragment key={href}>
              <ChevronRight className="w-3 h-3 text-stone-400 shrink-0" />
              <li>
                {isLast ? (
                  <span className="font-bold text-[#1C1917]">
                    {formattedLink}
                  </span>
                ) : (
                  <Link
                    href={href}
                    className="text-stone-500 hover:text-[#0555A2] transition-colors font-medium"
                  >
                    {formattedLink}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};
