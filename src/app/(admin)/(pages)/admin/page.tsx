import React from "react";
import { ProductExportButton } from "../../_components/products/product-export-button";
import { adminService } from "../../_services/index.service";
import { RoundedPieChart } from "../../_components/dashboard/pie-chart";
import { RadialChart } from "../../_components/dashboard/radial-chart";
import { Card, CardContent } from "@/components/ui/card";
import { ClippedAreaChart } from "../../_components/dashboard/area-chart";
import { formatToNPR } from "@/helper/format-npr";
import {
  BanknoteIcon,
  ChartAreaIcon,
  LucideUserStar,
  PackageIcon,
  TagIcon,
} from "lucide-react";
import { auth } from "@/lib/auth";
import AccessDeniedContainer from "../../_components/access-denied";

const AdminDashboardPage = async () => {
  const userSession = await auth();
  if (userSession?.user.role !== "ADMIN") {
    return <AccessDeniedContainer />;
  }

  const { data } = await adminService.dashboard.getDashboardMetrics();
  const {
    orderWithRevenueTimeLine,
    categoryWithProductsCount,
    brandWithProductsCount,
    orderPieChartData,
    totalPaidRevenueOfAllTime,
    totalNumberOfCategories,
    totalNumberOfCustomers,
    totalNumberOfProducts,
  } = data?.data!;
  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex text-primary text-xl font-bold items-center gap-2">
          <ChartAreaIcon size={24} /> Overall Statistics
        </h2>
        <ProductExportButton />
      </div>
      <section className=" lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className=" grid grid-cols-2 gap-2 w-full ">
          {/* Total Revenue Card */}
          <Card className="flex items-center  justify-center gap-4 p-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <BanknoteIcon className="w-6 h-6 text-primary" />
            </div>
            <CardContent className="p-0 flex flex-col items-center justify-center">
              <p className="text-sm font-medium text-muted-foreground">
                Total Revenue
              </p>
              <p className="text-2xl font-bold">
                {formatToNPR(totalPaidRevenueOfAllTime._sum.totalAmount || 0)}
              </p>
            </CardContent>
          </Card>
          {/* Total Customers Card */}
          <Card className="flex items-center justify-center gap-4 p-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <LucideUserStar className="w-6 h-6 text-primary" />
            </div>
            <CardContent className="p-0 flex flex-col items-center justify-center">
              <p className="text-sm font-medium text-muted-foreground">
                Total Customers
              </p>
              <p className="text-2xl font-bold">{totalNumberOfCustomers}</p>
            </CardContent>
          </Card>
          {/* Total Products Card */}
          <Card className="flex items-center justify-center gap-4 p-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <PackageIcon className="w-6 h-6 text-primary" />
            </div>
            <CardContent className="p-0 flex flex-col items-center justify-center">
              <p className="text-sm font-medium text-muted-foreground">
                Total Products
              </p>
              <p className="text-2xl font-bold">{totalNumberOfProducts}</p>
            </CardContent>
          </Card>
          {/* Total Categories Card */}
          <Card className="flex items-center justify-center gap-4 p-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <TagIcon className="w-6 h-6 text-primary" />
            </div>
            <CardContent className="p-0 flex flex-col items-center justify-center">
              <p className="text-sm font-medium text-muted-foreground">
                Total Categories
              </p>
              <p className="text-2xl font-bold">{totalNumberOfCategories}</p>
            </CardContent>
          </Card>
        </div>
        <div className="">
          <RoundedPieChart data={orderPieChartData} />
        </div>
      </section>
      <div>
        <ClippedAreaChart initialChartData={orderWithRevenueTimeLine} />
      </div>
      <div>
        <RadialChart
          data={{
            description:
              "A radial chart showing the product count for each category.",
            title: "Category Product Distribution",
            stats: categoryWithProductsCount,
          }}
        />
      </div>
      <div>
        <RadialChart
          data={{
            description:
              "A radial chart showing the product count for each brand.",
            title: "Brand Product Distribution",
            stats: brandWithProductsCount,
          }}
        />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
