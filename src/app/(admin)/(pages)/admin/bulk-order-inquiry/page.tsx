import BulkOrderInquiryTable from "@/app/(admin)/_components/bulk-order-inquiry/table";
import { bulkOrderInquiryFilter } from "@/app/(admin)/_hooks/bulk-order-inquiry.hook";

import { adminService } from "@/app/(admin)/_services/index.service";
import PaginationButton from "@/components/global/generic-table/pagination";
import { IndexPageProps } from "@/types";
import React from "react";

const BulkOrderInquiryRootPage = async (props: IndexPageProps) => {
  const searchFilters = await bulkOrderInquiryFilter.parse(props.searchParams);
  const { data } = await adminService.bulkOrderInquiry.getAllBulkOrders({
    ...searchFilters,
  });

  return (
    <div>
      <div>
        <BulkOrderInquiryTable data={data?.data!} />
        <div className=" flex items-center justify-center py-4 w-full">
          <PaginationButton
            currentPage={data?.meta?.currentPage || 1}
            totalPage={data?.meta?.totalPage || 1}
            limit={searchFilters.limit || 7}
          />
        </div>
      </div>
    </div>
  );
};

export default BulkOrderInquiryRootPage;
