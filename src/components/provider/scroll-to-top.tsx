"use client";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const ScrollToTop = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  useEffect(() => {
    const id = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);

    return () => clearTimeout(id);
  }, [pathname]);
  return <>{children}</>;
};

export default ScrollToTop;
