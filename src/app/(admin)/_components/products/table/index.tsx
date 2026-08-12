import { IGetAllProducts } from "@/app/(admin)/types/products";
import GenericTable from "@/components/global/generic-table";
import { columns } from "./column";
import ProductFilter from "./filter";

interface ITableProps {
  data: IGetAllProducts[];
}

export default function ProductsTable({ data }: ITableProps) {
  return (
    <>
      <GenericTable<IGetAllProducts>
        columns={columns}
        data={data}
        filterComponent={<ProductFilter />}
      />
    </>
  );
}
