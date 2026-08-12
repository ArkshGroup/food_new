import prisma from "@/lib/db";
import { adminActionClient } from "@/lib/next-safe-action";
import type { IPrismaResponse } from "@/types";

import { Prisma } from "@prisma/client";
import { contactFilterSchema } from "../_validation/contact.validation";

export class ContactService {
  getAllContacts = adminActionClient
    .inputSchema(contactFilterSchema)
    .action(
      async ({ parsedInput }): Promise<IPrismaResponse<IGetAllContact[]>> => {
        const { createdAt, email, name, limit, page } = parsedInput;

        const where: Prisma.ContactWhereInput = {
          ...(name != null
            ? {
                name: {
                  contains: name,
                  mode: "insensitive",
                },
              }
            : {}),
          ...(email != null
            ? {
                email: {
                  contains: email,
                  mode: "insensitive",
                },
              }
            : {}),
          createdAt: createdAt
            ? {
                gte: createdAt.from,
                lte: createdAt.to,
              }
            : undefined,
        };

        const contacts = await prisma.contact.findMany({
          orderBy: { createdAt: "desc" },
          where,
          skip: (page - 1) * limit,
          take: limit,
        });

        const totalContacts = await prisma.contact.count({ where });

        const res: IGetAllContact[] = contacts.map((contact) => ({
          subject: contact.subject,
          message: contact.message,
          createdAt: contact.createdAt,
          email: contact.email,
          id: contact.id,
          name: contact.name,
        }));

        return {
          data: res,
          message: "Contacts fetched successfully",
          success: true,
          meta: {
            currentPage: page,
            totalPage: Math.ceil(totalContacts / limit),
          },
        };
      }
    );
}
