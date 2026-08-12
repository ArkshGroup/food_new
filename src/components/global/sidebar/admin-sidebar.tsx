"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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

import UserProfileBox from "./user-profile-box";
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

  const { open } = useSidebar();
  return (
    <Sidebar className="h-screen " collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={cn(open ? "pt-10 pb-8" : " pt-14")}>
            <Link href={"/"} className="flex items-center gap-2">
              {open && (
                <>
                  <Image
                    alt="png"
                    height={150}
                    className=" mix-blend-darken"
                    src={LogoImage}
                    width={150}
                  />
                  <div className=" flex sr-only text-nowrap flex-col">
                    <span className="text-lg font-bold text-primary">
                      Arksh Food
                    </span>
                    <span className="text-xs">Delicious Delights</span>
                  </div>
                </>
              )}
              {!open && (
                <div className=" size-10 -translate-x-3  items-center flex justify-start  ">
                  <Image
                    alt="png"
                    height={10}
                    className=" "
                    src={LogoImage}
                    width={90}
                  />
                </div>
              )}
            </Link>
          </SidebarGroupLabel>
          <SidebarContent className="pt-5 ">
            <SidebarGroup className=" ">
              <SidebarMenu className="  -translate-x-2  ">
                {navItems.map((item) => {
                  const Icon = Icons[item.icon] || Icons.dashboard;
                  if (!item.visible) return null;
                  if (!item.subPath) {
                    return (
                      <SidebarMenuItem key={item.name}>
                        <Link
                          href={item.path}
                          className={cn(
                            pathname === item.path && "text-primary"
                          )}
                        >
                          <SidebarMenuButton tooltip={item.name}>
                            <Icon className="size-40" />
                            <span>{item.name}</span>
                          </SidebarMenuButton>
                        </Link>
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
                            {open ? (
                              <SidebarMenuButton
                                className={cn(
                                  pathname == `${item.path} && text-primary`
                                )}
                                tooltip={item.name}
                              >
                                <Icon className="size-40" />
                                <span>{item.name}</span>
                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                              </SidebarMenuButton>
                            ) : (
                              <Link
                                className={cn(
                                  pathname == `${item.path} && text-primary`
                                )}
                                href={item.path}
                              >
                                <SidebarMenuButton tooltip={item.name}>
                                  <Icon className="size-40" />
                                  <span>{item.name}</span>
                                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                </SidebarMenuButton>
                              </Link>
                            )}
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {item.subPath?.map((subItem) => {
                                const SubIcon =
                                  Icons[subItem.icon!] || Icons.default;
                                return (
                                  <SidebarMenuSubItem key={subItem.name}>
                                    <SidebarMenuSubButton asChild>
                                      <Link
                                        className={cn(
                                          pathname === subItem.path &&
                                            "text-primary"
                                        )}
                                        href={subItem.path}
                                      >
                                        <SubIcon className="size-40" />
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

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <UserProfileBox />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
