import prisma from "@/lib/db";
import { adminActionClient } from "@/lib/next-safe-action";

import { IPrismaResponse } from "@/types";
import z from "zod";

import { Prisma } from "@prisma/client";
import { blogSearchFilterSchema } from "../_validation/blog.validation";
import { IGetAllBlogs, IGetBlogById } from "../types/blog";

export class BlogService {
  getBlogById = adminActionClient
    .inputSchema(
      z.object({
        id: z.string().min(1, { message: "Blog ID is required" }),
      })
    )
    .action(async ({ parsedInput }): Promise<IPrismaResponse<IGetBlogById>> => {
      const { id } = parsedInput;
      const blog = await prisma.blog.findUnique({
        where: { id },
      });
      if (!blog) {
        throw new Error("Blog not found");
      }
      const data: IGetBlogById = {
        ...blog,
      };
      return {
        data,
        message: "Blog fetched successfully",
        success: true,
        meta: {},
      };
    });

  getAllBlogs = adminActionClient
    .inputSchema(blogSearchFilterSchema)
    .action(
      async ({ parsedInput }): Promise<IPrismaResponse<IGetAllBlogs[]>> => {
        const where: Prisma.BlogWhereInput = {
          title: parsedInput.title
            ? { contains: parsedInput.title, mode: "insensitive" }
            : undefined,
          author: parsedInput.author
            ? { contains: parsedInput.author, mode: "insensitive" }
            : undefined,
          isPublished: parsedInput.isPublished ?? undefined,
          createdAt: parsedInput.createdAt
            ? {
                gte: parsedInput.createdAt.from
                  ? new Date(parsedInput.createdAt.from)
                  : undefined,
                lte: parsedInput.createdAt.to
                  ? new Date(parsedInput.createdAt.to)
                  : undefined,
              }
            : undefined,
        };

        const totalCount = await prisma.blog.count({ where });
        const limit = parsedInput.limit ?? 10;
        const totalPage = Math.ceil(totalCount / limit);
        const currentPage =
          parsedInput.page && parsedInput.page > totalPage
            ? 1
            : (parsedInput.page ?? 1);

        const data = await prisma.blog.findMany({
          where,
          take: limit,
          skip: (currentPage - 1) * limit,
        });

        const serialized: IGetAllBlogs[] = data.map((b) => ({
          author: b.author,
          createdAt: b.createdAt,
          id: b.id,
          imageUrl: b.imageUrl ?? "",
          isPublished: b.isPublished,
          publishedAt: b.publishedAt || null,
          slug: b.slug,
          summary: b.summary,
          title: b.title,
          updatedAt: b.updatedAt,
        }));

        return {
          data: serialized,
          message: "Blogs fetched",
          success: true,
          meta: {
            totalPage,
            currentPage,
          },
        };
      }
    );
}
