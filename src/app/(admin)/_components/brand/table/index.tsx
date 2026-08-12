import GenericTable from "@/components/global/generic-table";
import { columns } from "./column";
import { IGetAllBrand } from "@/app/(admin)/types/brand";

interface ITableProps {
  data: IGetAllBrand[];
}

export default function BrandTable({ data }: ITableProps) {
  return <GenericTable<IGetAllBrand> columns={columns} data={data} />;
}
