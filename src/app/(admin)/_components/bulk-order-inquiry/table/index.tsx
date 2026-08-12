import GenericTable from "@/components/global/generic-table";
import { columns } from "./column";
import BulkOrderInquiryFilter from "./filter";

interface ITableProps {
  data: IGetAllBulkOrderInquiry[];
}

export default function BulkOrderInquiryTable({ data }: ITableProps) {
  return (
    <div className=" overflow-x-hidden">
      <GenericTable<IGetAllBulkOrderInquiry>
        filterComponent={<BulkOrderInquiryFilter />}
        columns={columns}
        data={data}
      />
    </div>
  );
}
