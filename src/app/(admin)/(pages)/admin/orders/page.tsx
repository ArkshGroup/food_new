import AccessDeniedContainer from "@/app/(admin)/_components/access-denied";
import OrderTable from "@/app/(admin)/_components/order/table";
import { orderSearchFilter } from "@/app/(admin)/_hooks/orders.hook";
import { adminService } from "@/app/(admin)/_services/index.service";
import PaginationButton from "@/components/global/generic-table/pagination";
import { auth } from "@/lib/auth";
import { IndexPageProps } from "@/types";
import React from "react";

const OrdersRootPage = async (props: IndexPageProps) => {
  const userSession = await auth();
  if (userSession?.user.role !== "ADMIN") {
    return <AccessDeniedContainer />;
  }

  const searchFilters = await orderSearchFilter.parse(props.searchParams);

  const { data } = await adminService.order.getAllOrders({
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

export default OrdersRootPage;
