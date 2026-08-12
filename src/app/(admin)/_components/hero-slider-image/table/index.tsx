import GenericTable from "@/components/global/generic-table";
import { IGetAllHeroSliderImage } from "@/app/(admin)/types/hero-slider-image";
import { columns } from "./column";

interface ITableProps {
  data: IGetAllHeroSliderImage[];
}

export default function HeroSliderImageTable({ data }: ITableProps) {
  return <GenericTable<IGetAllHeroSliderImage> columns={columns} data={data} />;
}
