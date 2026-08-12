import type { SideBarSiteMap } from "@/types";

export const adminNavigationPath = {
  dashboard: {
    path: "/admin",
  },
  products: {
    path: "/admin/products",
  },
  orders: {
    path: "/admin/orders",
  },
  customer: {
    path: "/admin/customers",
  },
  contact: {
    path: "/admin/contacts",
  },
  category: {
    path: "/admin/category",
  },
  banner: {
    path: "/admin/banner",
  },
  brand: {
    path: "/admin/brand",
  },
  discountCode: {
    path: "/admin/discount",
  },
  heroSliderImage: {
    path: "/admin/hero-slider-image",
  },
  bulkOrderInquiry: {
    path: "/admin/bulk-order-inquiry",
  },
  reviews: {
    path: "/admin/reviews",
  },
  googleReviews: {
    path: "/admin/google-reviews",
  },
  foodInfluencerProgram: {
    path: "/admin/food-influencer-program",
  },
  blog: {
    path: "/admin/blog",
  },
  draftOrder: {
    path: "/admin/draft-order",
  },
  globalPriceSetting: {
    path: "/admin/global-price-setting",
  },
};

export const adminNavigationSiteMap: SideBarSiteMap[] = [
  {
    name: "Dashboard",
    path: adminNavigationPath.dashboard.path,
    icon: "dashboard",
    visible: true,
  },
  {
    name: "Products",
    path: adminNavigationPath.products.path,
    icon: "products",
    visible: true,
  },
  {
    name: "Global Price Setting",
    path: adminNavigationPath.globalPriceSetting.path,
    icon: "globalPriceSetting",
    visible: true,
  },
  {
    name: "Orders",
    path: adminNavigationPath.orders.path,
    icon: "orders",
    visible: true,
  },
  {
    name: "Bulk Order Inquiry",
    path: adminNavigationPath.bulkOrderInquiry.path,
    icon: "bulkOrderInquiry",
    visible: true,
  },
  {
    name: "Customers",
    path: adminNavigationPath.customer.path,
    icon: "customers",
    visible: true,
  },
  {
    name: "Category",
    path: adminNavigationPath.category.path,
    icon: "category",
    visible: true,
  },
  {
    name: "Brand",
    path: adminNavigationPath.brand.path,
    icon: "category",
    visible: true,
  },
  {
    name: "Banner",
    path: adminNavigationPath.banner.path,
    icon: "category",
    visible: true,
  },
  {
    name: "Discount Code",
    path: adminNavigationPath.discountCode.path,
    icon: "contact",
    visible: true,
  },
  {
    name: "Hero Slider Image",
    path: adminNavigationPath.heroSliderImage.path,
    icon: "heroSliderImage",
    visible: true,
  },

  {
    name: "Contact",
    path: adminNavigationPath.contact.path,
    icon: "contact",
    visible: true,
  },
  {
    name: "Reviews",
    path: adminNavigationPath.reviews.path,
    icon: "products",
    visible: true,
  },
  {
    name: "Google Reviews",
    path: adminNavigationPath.googleReviews.path,
    icon: "contact",
    visible: true,
  },
  {
    name: "Food Influencer Program",
    path: adminNavigationPath.foodInfluencerProgram.path,
    icon: "contact",
    visible: true,
  },
  {
    name: "Blog",
    path: adminNavigationPath.blog.path,
    icon: "blog",
    visible: true,
  },
  {
    name: "Draft Order",
    path: adminNavigationPath.draftOrder.path,
    icon: "default",
    visible: true,
  },
];
