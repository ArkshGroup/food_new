"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";

import { SideBarSiteMap } from "@/types";
import { Icons } from "../icons";
import { LogoImage } from "../../../../public/images";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AppSidebar({
  navItems,
}: {
  navItems: SideBarSiteMap[];
}) {
  const pathname = usePathname();
  const { open, setOpenMobile } = useSidebar();

  return (
    <Sidebar
      className="bg-[#F0F7FD] border-r border-[#E8E2D9] font-sans"
      collapsible="icon"
    >
      <SidebarContent className="bg-[#F0F7FD] pt-2">
        <SidebarGroup>
          <SidebarGroupLabel
            className={cn(open ? "pt-4 pb-4 px-3" : "pt-4 pb-2 px-1")}
          >
            <Link href="/" className="flex items-center gap-2">
              <Image
                alt="Arksh Food Logo"
                height={36}
                width={120}
                src={LogoImage}
                className="object-contain h-9 w-auto"
              />
            </Link>
          </SidebarGroupLabel>
          
          <SidebarContent className="pt-2">
            <SidebarGroup className="p-1">
              <SidebarMenu>
                {navItems.map((item) => {
                  const Icon = Icons[item.icon] || Icons.dashboard;
                  if (!item.visible) return null;
                  const isActive = pathname === item.path;

                  if (!item.subPath) {
                    return (
                      <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton
                          asChild
                          tooltip={item.name}
                          className={cn(
                            "py-2.5 px-3 rounded-xl transition-all duration-200",
                            isActive
                              ? "bg-white text-[#0555A2] font-bold shadow-2xs"
                              : "text-stone-700 hover:text-[#0555A2] hover:bg-white/60"
                          )}
                        >
                          <Link
                            href={item.path}
                            onClick={() => setOpenMobile(false)}
                            className="flex items-center gap-3 w-full"
                          >
                            <Icon className="w-4 h-4 shrink-0 text-[#0555A2]" />
                            <span>{item.name}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  } else {
                    return (
                      <Collapsible
                        key={item.name}
                        asChild
                        className="group/collapsible"
                      >
                        <SidebarMenuItem>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton
                              tooltip={item.name}
                              className={cn(
                                "py-2.5 px-3 rounded-xl transition-all duration-200",
                                isActive
                                  ? "bg-white text-[#0555A2] font-bold shadow-2xs"
                                  : "text-stone-700 hover:text-[#0555A2] hover:bg-white/60"
                              )}
                            >
                              <Icon className="w-4 h-4 shrink-0 text-[#0555A2]" />
                              <span>{item.name}</span>
                              <ChevronRight className="ml-auto w-4 h-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 text-stone-400" />
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub className="pl-4 border-l border-[#E8E2D9] my-1 space-y-1">
                              {item.subPath?.map((subItem) => {
                                const SubIcon =
                                  Icons[subItem.icon!] || Icons.default;
                                const isSubActive = pathname === subItem.path;
                                return (
                                  <SidebarMenuSubItem key={subItem.name}>
                                    <SidebarMenuSubButton asChild>
                                      <Link
                                        className={cn(
                                          "py-2 px-3 rounded-lg text-xs transition-all",
                                          isSubActive
                                            ? "bg-white text-[#0555A2] font-bold shadow-2xs"
                                            : "text-stone-600 hover:text-[#0555A2] hover:bg-white/40"
                                        )}
                                        href={subItem.path}
                                      >
                                        <SubIcon className="w-3.5 h-3.5 shrink-0 text-[#0555A2]" />
                                        <span>{subItem.name}</span>
                                      </Link>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                );
                              })}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </SidebarMenuItem>
                      </Collapsible>
                    );
                  }
                })}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
