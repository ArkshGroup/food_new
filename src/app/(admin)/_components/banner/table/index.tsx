import GenericTable from "@/components/global/generic-table";
import { IGetAllBanner } from "@/app/(admin)/types/banner";
import { columns } from "./column";

interface ITableProps {
  data: IGetAllBanner[];
}

export default function BannerTable({ data }: ITableProps) {
  return <GenericTable<IGetAllBanner> columns={columns} data={data} />;
}
