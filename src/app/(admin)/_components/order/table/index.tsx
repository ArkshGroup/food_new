import GenericTable from "@/components/global/generic-table";
import { columns } from "./column";
import { IOrderGetAll } from "@/app/(admin)/types/order";
import OrderFilter from "./filter";

interface ITableProps {
  data: IOrderGetAll[];
}

export default function OrderTable({ data }: ITableProps) {
  return (
    <div className=" overflow-x-hidden">
      <GenericTable<IOrderGetAll>
        columns={columns}
        data={data}
        filterComponent={<OrderFilter />}
      />
    </div>
  );
}
