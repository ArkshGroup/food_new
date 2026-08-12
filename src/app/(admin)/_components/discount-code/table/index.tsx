import GenericTable from "@/components/global/generic-table";
import { columns } from "./column";
import { IGetAllDiscountCode } from "@/app/(admin)/types/discount";

interface ITableProps {
  data: IGetAllDiscountCode[];
}

export default function DiscountTable({ data }: ITableProps) {
  return <GenericTable<IGetAllDiscountCode> columns={columns} data={data} />;
}
