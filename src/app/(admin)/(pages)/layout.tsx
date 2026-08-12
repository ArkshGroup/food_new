import type React from "react";
import { BreadCrumbsTrail } from "@/components/global/bread-crumb-trail";
import AppSidebar from "@/components/global/sidebar/admin-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { auth } from "@/lib/auth";
import { adminNavigationSiteMap } from "../_config/admin.config";
import Link from "next/link";
import Image from "next/image";
import { LogoImage } from "../../../../public/images";

const AdminRootLayout = async ({ children }: { children: React.ReactNode }) => {
  const userSession = await auth();
  if (!userSession || !userSession.user || userSession.user.role !== "ADMIN" && userSession.user.role !== "MODERATOR") {
    return (
      <div className="flex items-center flex-col w-full justify-center h-screen">
        <Image
          src={LogoImage}
          alt="Arksh Food Logo"
          className=" w-32 h-32 object-contain"
          width={120}
          height={120}
        />
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <Link href="/">Go to Home</Link>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar navItems={adminNavigationSiteMap} />
        <main className=" w-full py-4 px-4">
          <BreadCrumbsTrail />
          {children}
        </main>
      </SidebarProvider>
    </TooltipProvider>
  );
};

export default AdminRootLayout;
