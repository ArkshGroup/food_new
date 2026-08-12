import React from "react";
import { Navbar } from "./_components/navbar";
import { TopBar } from "./_components/navbar/top-bar";
import { MobileTopHeader, MobileBottomNav } from "./_components/navbar/mobile-nav";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full">
      <a
        href="#main-content"
        className="absolute left-[-10000px] top-0 z-[10001] overflow-hidden focus:left-4 focus:top-4 focus:h-auto focus:w-auto focus:overflow-visible focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:shadow-md focus:outline-none focus:ring-2 focus:ring-ring"
      >
        Skip to main content
      </a>
      <TopBar />
      <Navbar />
      <MobileTopHeader />
      <div className="pb-16 lg:pb-0">{children}</div>
      <MobileBottomNav />
    </div>
  );
};

export default MarketingLayout;
