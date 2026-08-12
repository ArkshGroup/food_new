import BlogForm from "@/app/(admin)/_components/blog/blog-form";
import { adminService } from "@/app/(admin)/_services/index.service";
import React from "react";

const BlogByID = async (props: { params: Promise<{ id: string }> }) => {
  const idParams = await props.params;
  const { data } = await adminService.blog.getBlogById({
    id: idParams.id,
  });

  return <BlogForm initialData={data?.data} />;
};

export default BlogByID;
