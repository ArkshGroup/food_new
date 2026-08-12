import { Prisma } from "@prisma/client";

export interface IGetAllCategory extends Prisma.CategoryGetPayload<{}> {
  noOfProducts: number;
}
