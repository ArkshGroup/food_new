import GenericTable from "@/components/global/generic-table";
import { columns } from "./column";
import type { IGoogleReview } from "@/app/(admin)/types/google-review";

export default function GoogleReviewTable({ data }: { data: IGoogleReview[] }) {
  return <GenericTable<IGoogleReview> columns={columns} data={data} />;
}
