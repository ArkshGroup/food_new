import GenericTable from "@/components/global/generic-table";
import { columns } from "./column";
import BulkOrderInquiryFilter from "./filter";

interface ITableProps {
  data: IGetAllContact[];
}

export default function ContactTable({ data }: ITableProps) {
  return (
    <div className=" overflow-x-hidden">
      <GenericTable<IGetAllContact>
        filterComponent={<BulkOrderInquiryFilter />}
        columns={columns}
        data={data}
      />
    </div>
  );
}
