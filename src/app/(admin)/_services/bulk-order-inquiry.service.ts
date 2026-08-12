import prisma from "@/lib/db";
import { adminActionClient } from "@/lib/next-safe-action";
import type { IPrismaResponse } from "@/types";
import { bulkOrderInquirySearchFilterSchema } from "../_validation/bulk-order-inquiry.validation";
import { Prisma } from "@prisma/client";

export class BulkOrderInquiryService {
  getAllBulkOrders = adminActionClient
    .inputSchema(bulkOrderInquirySearchFilterSchema)
    .action(
      async ({
        parsedInput,
      }): Promise<IPrismaResponse<IGetAllBulkOrderInquiry[]>> => {
        const { page, limit, customerEmail, createdAt } = parsedInput;

        const where: Prisma.BulkInquiryWhereInput = {
          user: customerEmail
            ? { email: { contains: customerEmail, mode: "insensitive" } }
            : undefined,
          createdAt: createdAt
            ? {
                gte: createdAt.from,
                lte: createdAt.to,
              }
            : undefined,
        };

        const bulkOrders = await prisma.bulkInquiry.findMany({
          orderBy: { createdAt: "desc" },
          include: {
            user: true,
          },
          where,
          skip: (page - 1) * limit,
          take: limit,
        });

        const totalBulkOrders = await prisma.bulkInquiry.count({ where });
        const formattedBulkOrders: IGetAllBulkOrderInquiry[] = bulkOrders.map(
          (order) => ({
            id: order.id,
            productId: order.productId,
            productName: order.productName,
            productQuantity: order.productQuantity,
            productPrice: order.productPrice.toNumber(),
            productUnit: order.productUnit,
            userEmail: order.user?.email || undefined,
            notes: order.notes || undefined,
            userId: order.userId,
            createdAt: order.createdAt.toISOString(),
            updatedAt: order.updatedAt.toISOString(),
          })
        );

        return {
          data: formattedBulkOrders,
          message: "Bulk orders fetched successfully",
          success: true,
          meta: {
            currentPage: page,
            totalPage: Math.ceil(totalBulkOrders / limit),
          },
        };
      }
    );
}
