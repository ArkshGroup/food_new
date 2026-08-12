import OrderTable from "@/app/(admin)/_components/order/table";
import { orderSearchFilter } from "@/app/(admin)/_hooks/orders.hook";
import { adminService } from "@/app/(admin)/_services/index.service";
import PaginationButton from "@/components/global/generic-table/pagination";
import { IndexPageProps } from "@/types";
import React from "react";

const DraftOrdersRootPage = async (props: IndexPageProps) => {
  const searchFilters = await orderSearchFilter.parse(props.searchParams);

  const { data } = await adminService.order.getAllDraftOrders({
    ...searchFilters,
    id: searchFilters.id ? searchFilters.id : undefined,
    orderNumber: searchFilters.orderNumber
      ? searchFilters.orderNumber
      : undefined,
  });

  return (
    <div>
      <OrderTable data={data?.data || []} />
      <div className=" flex items-center justify-center py-4 w-full">
        <PaginationButton
          currentPage={data?.meta?.currentPage || 1}
          totalPage={data?.meta?.totalPage || 1}
          limit={searchFilters.limit || 7}
        />
      </div>
    </div>
  );
};

export default DraftOrdersRootPage;
