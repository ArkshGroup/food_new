import GenericTable from "@/components/global/generic-table";
import { IGetAllCategory } from "@/app/(admin)/types/category";
import { columns } from "./column";

interface ITableProps {
	data: IGetAllCategory[];
}

export default function CategoryTable({ data }: ITableProps) {
	return <GenericTable<IGetAllCategory> columns={columns} data={data} />;
}
