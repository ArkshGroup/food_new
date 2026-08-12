import GenericTable from "@/components/global/generic-table";
import { columns } from "./column";
import { IGetAllReview } from "@/app/(admin)/types/review";

interface ITableProps {
  data: IGetAllReview[];
}

export default function ReviewTable({ data }: ITableProps) {
  return <GenericTable<IGetAllReview> columns={columns} data={data} />;
}
