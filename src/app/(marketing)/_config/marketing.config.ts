import type { SideBarSiteMap } from "@/types";

export const marketingNavigationPath = {
  profile: {
    path: "/profile",
  },
  orders: {
    path: "/my-orders",
  },
  security: {
    path: "/security",
  },
  points: {
    path: "/points",
  },
};

export const marketingNavigationSiteMap: SideBarSiteMap[] = [
  {
    name: "Profile",
    path: marketingNavigationPath.profile.path,
    icon: "profile",
    visible: true,
  },
  {
    name: "My Orders",
    path: marketingNavigationPath.orders.path,
    icon: "orders",
    visible: true,
  },
  {
    name: "Password & Security",
    path: marketingNavigationPath.security.path,
    icon: "security",
    visible: true,
  },
  {
    name: "Arksh Food Points",
    path: marketingNavigationPath.points.path,
    icon: "points",
    visible: true,
  },
];
