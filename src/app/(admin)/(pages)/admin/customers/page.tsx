import CustomerTable from "@/app/(admin)/_components/customer/table";
import { customerFilter } from "@/app/(admin)/_hooks/customer.hook";

import { adminService } from "@/app/(admin)/_services/index.service";
import PaginationButton from "@/components/global/generic-table/pagination";
import { IndexPageProps } from "@/types";
import React from "react";

const CustomerRootPage = async (props: IndexPageProps) => {
  const searchFilters = await customerFilter.parse(props.searchParams);
  const { data } = await adminService.customer.getAllCustomers({
    ...searchFilters,
  });

  return (
    <div>
      <div>
        <CustomerTable data={data?.data!} />
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

export default CustomerRootPage;
