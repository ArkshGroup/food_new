import { Prisma } from "@prisma/client";

export interface IGetAllBlogs
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
    };
  }> {}

export interface IGetBlogById extends Prisma.BlogGetPayload<{}> {}
