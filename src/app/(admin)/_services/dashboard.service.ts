import prisma from "@/lib/db";
import { adminActionClient } from "@/lib/next-safe-action";
import z from "zod";

export class DashboardService {
  getDashboardMetrics = adminActionClient.action(async () => {
    // #region Orders with revenue timeline
    const ordersByDate = await prisma.$queryRaw<
      { date: string; count: number; revenue: number }[]
    >`SELECT 
      DATE("createdAt") AS date,
      COUNT(id) AS count,
      SUM("totalAmount") AS revenue
    FROM "Order"
    WHERE "paymentMethod" NOT IN ('DRAFT')
    AND "orderStatus" NOT IN ('CANCELLED')
    GROUP BY DATE("createdAt")
    ORDER BY DATE("createdAt") ASC;`;
    const orderWithRevenueTimeLine = ordersByDate.map((order) => ({
      date: order.date,
      count: Number(order.count), // just in case
      revenue: Number(order.revenue), // convert Decimal -> number
    }));
    // #endregion

    // Group by date to handle multiple orders on the same date

    const totalPaidRevenueOfAllTime = await prisma.order.aggregate({
      _sum: {
        totalAmount: true,
      },
      where: {
        paymentMethod: {
          notIn: ["DRAFT"],
        },
        orderStatus: {
          notIn: ["CANCELLED"],
        },
      },
    });

    const totalOrders = await prisma.order.groupBy({
      by: ["orderStatus"],
      _count: {
        id: true,
      },
      where: {
        paymentMethod: {
          notIn: ["DRAFT"],
        },
      },
    });

    const categoriesWithCounts = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        _count: {
          select: { product: true },
        },
      },
    });

    const categoryWithProductsCount = categoriesWithCounts.map((c) => ({
      id: c.id,
      name: c.name,
      productCount: c._count.product,
    }));

    const brandsWithCounts = await prisma.brand.findMany({
      select: {
        id: true,
        name: true,
        _count: {
          select: { product: true },
        },
      },
    });

    const brandWithProductsCount = brandsWithCounts.map((b) => ({
      id: b.id,
      name: b.name,
      productCount: b._count.product,
    }));

    const orderPieChartData = totalOrders.map((order) => ({
      status: order.orderStatus,
      count: order._count.id,
    }));

    const totalNumberOfCustomers = await prisma.user.count({
      where: {
        role: "CUSTOMER",
      },
    });

    const totalNumberOfProducts = await prisma.product.count();

    const totalNumberOfCategories = await prisma.category.count();

    return {
      data: {
        categoryWithProductsCount,
        orderPieChartData,
        totalPaidRevenueOfAllTime,
        orderWithRevenueTimeLine,
        totalNumberOfCustomers,
        totalNumberOfProducts,
        totalNumberOfCategories,
        brandWithProductsCount,
      },
      success: true,
      message: "Dashboard metrics fetched successfully",
    };
  });

  getDashboardMetricsByTimeRange = adminActionClient
    .inputSchema(
      z.object({
        startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
          message: "Invalid date format",
        }),
        endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
          message: "Invalid date format",
        }),
      })
    )
    .action(async ({ parsedInput: { startDate, endDate } }) => {
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);

      const ordersByDate = await prisma.order.groupBy({
        by: ["createdAt"],
        _count: {
          id: true,
        },
        _sum: {
          totalAmount: true,
        },
        where: {
          paymentMethod: {
            notIn: ["DRAFT"],
          },
          createdAt: {
            gte: start,
            lte: end,
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      });

      const orderWithRevenueTimeLine = ordersByDate.map((order) => ({
        date: order.createdAt.toISOString().split("T")[0],
        count: order._count.id,
        revenue: Number(order._sum.totalAmount) || 0,
      }));

      const totalNoOfCustomers = await prisma.user.count({
        where: {
          role: "CUSTOMER",
          createdAt: {
            gte: start,
            lte: end,
          },
        },
      });

      return {
        data: {
          orderWithRevenueTimeLine,
          totalNoOfCustomers,
        },
        success: true,
        message: "Dashboard metrics fetched successfully",
      };
    });
}
