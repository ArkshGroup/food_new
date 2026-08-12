import { IGetAllProducts } from "@/app/(admin)/types/products";
import GenericTable from "@/components/global/generic-table";
import { columns } from "./column";
import { IGetAllBlogs } from "@/app/(admin)/types/blog";
import BlogFilter from "./filter";

interface ITableProps {
  data: IGetAllBlogs[];
}

export default function BlogTable({ data }: ITableProps) {
  return (
    <>
      <GenericTable<IGetAllBlogs>
        columns={columns}
        data={data}
        filterComponent={<BlogFilter />}
      />
    </>
  );
}
