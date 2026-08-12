import BlogTable from "@/app/(admin)/_components/blog/table";
import { adminNavigationPath } from "@/app/(admin)/_config/admin.config";
import { blogSearchFilter } from "@/app/(admin)/_hooks/blog.hook";
import { adminService } from "@/app/(admin)/_services/index.service";
import PaginationButton from "@/components/global/generic-table/pagination";
import { Button } from "@/components/ui/button";
import { IndexPageProps } from "@/types";
import { BoxIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = async (props: IndexPageProps) => {
  const searchFilters = await blogSearchFilter.parse(props.searchParams);
  const { data } = await adminService.blog.getAllBlogs({
    ...searchFilters,
  });
  return (
    <section className=" pt-8">
      <div className=" flex justify-end w-full">
        <Link
          className=" absolute"
          href={adminNavigationPath.blog.path + "/add"}
        >
          <Button className=" mt-6 mb-2">
            <BoxIcon />
            Add Blog
          </Button>
        </Link>
      </div>
      <BlogTable data={data?.data || []} />
      <div className="flex justify-center py-4">
        <PaginationButton
          currentPage={data?.meta?.currentPage || 1}
          totalPage={data?.meta?.totalPage}
        />
      </div>
    </section>
  );
};

export default page;
