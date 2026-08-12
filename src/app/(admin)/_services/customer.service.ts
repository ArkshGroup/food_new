import prisma from "@/lib/db";
import { adminActionClient } from "@/lib/next-safe-action";
import type { IPrismaResponse } from "@/types";

import { Prisma } from "@prisma/client";
import { customerFilterSchema } from "../_validation/customer.validation";
import { IGetAllCustomer } from "../types/customer";
import z from "zod";
import { IGetCustomerById } from "../types/discount";

export class CustomerService {
  getAllCustomers = adminActionClient
    .inputSchema(customerFilterSchema)
    .action(
      async ({ parsedInput }): Promise<IPrismaResponse<IGetAllCustomer[]>> => {
        const { createdAt, email, name, limit, page } = parsedInput;

        const where: Prisma.UserWhereInput = {
          userName: {
            contains: name || undefined,
            mode: "insensitive",
          },
          email: {
            contains: email || undefined,
            mode: "insensitive",
          },
          createdAt: createdAt
            ? {
                gte: createdAt.from,
                lte: createdAt.to,
              }
            : undefined,
          role: "CUSTOMER",
        };

        const contacts = await prisma.user.findMany({
          orderBy: { createdAt: "desc" },
          where,
          skip: (page - 1) * limit,
          take: limit,
        });

        const totalContacts = await prisma.user.count({ where });

        return {
          data: contacts,
          message: "Contacts fetched successfully",
          success: true,
          meta: {
            currentPage: page,
            totalPage: Math.ceil(totalContacts / limit),
          },
        };
      }
    );

  getCustomerById = adminActionClient
    .inputSchema(
      z.object({
        id: z.string(),
      })
    )
    .action(
      async ({ parsedInput }): Promise<IPrismaResponse<IGetCustomerById>> => {
        const customer = await prisma.user.findUnique({
          where: { id: parsedInput.id },
        });

        if (!customer) {
          throw new Error("Customer not found");
        }

        const orders = await prisma.order.findMany({
          where: {
            customerId: parsedInput.id,
          },
        });

        type OrderWithNumbers = Omit<
          Prisma.OrderGetPayload<{}>,
          "totalAmount" | "deliveryCharge" | "discountAmount" | "subTotalAmount"
        > & {
          totalAmount: number;
          deliveryCharge: number;
          discountAmount: number;
          subTotalAmount: number;
        };

        const serializeOrder: OrderWithNumbers[] = orders.map((order) => {
          return {
            ...order,
            totalAmount: Number(order.totalAmount),
            deliveryCharge: Number(order.deliveryCharge),
            discountAmount: Number(order.discountAmount),
            subTotalAmount: Number(order.subTotalAmount),
          };
        });

        return {
          data: { customer, orders: serializeOrder },
          message: "Customer fetched successfully",
          success: true,
        };
      }
    );
}
