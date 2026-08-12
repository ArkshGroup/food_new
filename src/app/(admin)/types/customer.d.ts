import { Prisma } from "@prisma/client";

interface IGetAllCustomer extends Prisma.UserGetPayload<{}> {}
