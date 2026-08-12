import prisma from "@/lib/db";
import { publicActionClient } from "@/lib/next-safe-action";

import { IPrismaResponse } from "@/types";
import z from "zod";

import { Prisma } from "@prisma/client";

interface IGetAllBlogs
  extends Prisma.BlogGetPayload<{
    select: {
      id: true;
      author: true;
      imageUrl: true;
      publishedAt: true;
      slug: true;
      summary: true;
      title: true;
      createdAt: true;
      isPublished: true;
      views: true;
    };
  }> {}

interface IGetBlogById extends Prisma.BlogGetPayload<{}> {}

export class BlogService {
  getBlogBySlug = publicActionClient
    .inputSchema(
      z.object({
        slug: z.string().min(1, { message: "Blog slug is required" }),
      })
    )
    .action(async ({ parsedInput }): Promise<IPrismaResponse<IGetBlogById>> => {
      const { slug } = parsedInput;
      const blog = await prisma.blog.findUnique({
        where: { slug },
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

  getAllBlogs = publicActionClient
    .inputSchema(
      z.object({
        page: z.number().int().min(1).optional(),
      })
    )
    .action(
      async ({ parsedInput }): Promise<IPrismaResponse<IGetAllBlogs[]>> => {
        const where: Prisma.BlogWhereInput = {
          isPublished: true,
        };
        const totalCount = await prisma.blog.count({ where });
        const limit = 9;
        const totalPage = Math.ceil(totalCount / limit);
        const currentPage =
          parsedInput.page && parsedInput.page > totalPage
            ? 1
            : (parsedInput.page ?? 1);
        const data = await prisma.blog.findMany({
          where,
          orderBy: {
            createdAt: "desc",
          },
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
          views: b.views,
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

  getSimilarBlogs = publicActionClient
    .inputSchema(
      z.object({
        slug: z.string().min(1, { message: "Blog slug is required" }),
      })
    )
    .action(
      async ({ parsedInput }): Promise<IPrismaResponse<IGetAllBlogs[]>> => {
        const { slug } = parsedInput;
        const data = await prisma.blog.findMany({
          where: {
            isPublished: true,
            NOT: {
              slug: slug,
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 3,
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
          views: b.views,
        }));

        return {
          data: serialized,
          message: "Similar blogs fetched",
          success: true,
          meta: {},
        };
      }
    );

  getAllBlogSlugs = publicActionClient.action(async (): Promise<string[]> => {
    const data = await prisma.blog.findMany({
      select: {
        slug: true,
      },
    });
    return data.map((b) => b.slug);
  });
}
