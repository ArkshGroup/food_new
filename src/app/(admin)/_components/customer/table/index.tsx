import GenericTable from "@/components/global/generic-table";
import { columns } from "./column";
import BulkOrderInquiryFilter from "./filter";
import { IGetAllCustomer } from "@/app/(admin)/types/customer";

interface ITableProps {
  data: IGetAllCustomer[];
}

export default function CustomerTable({ data }: ITableProps) {
  return (
    <div className=" overflow-x-hidden">
      <GenericTable<IGetAllCustomer>
        filterComponent={<BulkOrderInquiryFilter />}
        columns={columns}
        data={data}
      />
    </div>
  );
}
