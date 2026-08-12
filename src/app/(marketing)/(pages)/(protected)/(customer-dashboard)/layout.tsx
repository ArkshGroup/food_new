import { BreadCrumbsTrail } from "@/components/global/bread-crumb-trail";
import CustomerTopNavTabs from "@/components/global/sidebar/customer-top-nav-tabs";
import React from "react";
import { marketingNavigationSiteMap } from "../../../_config/marketing.config";
import { Metadata } from "next";
import { siteConfig } from "@/app/(marketing)/_config/seo.config";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "Arksh Food | Customer Dashboard",
  description:
    "Access your orders, account settings, and more in the Arksh Food customer dashboard.",
  keywords: [
    "Arksh Food",
    "customer dashboard",
    "order management",
    "account settings",
    "food delivery",
  ],
};

const CustomerDashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="w-full min-h-screen bg-[#F0F7FD] py-6 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        <BreadCrumbsTrail />
        <CustomerTopNavTabs navItems={marketingNavigationSiteMap} />
        <main className="w-full">{children}</main>
      </div>
    </div>
  );
};

export default CustomerDashboardLayout;
