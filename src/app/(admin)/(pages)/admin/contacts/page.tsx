import ContactTable from "@/app/(admin)/_components/contact/table";
import { contactFilter } from "@/app/(admin)/_hooks/contact-filter.hook";

import { adminService } from "@/app/(admin)/_services/index.service";
import PaginationButton from "@/components/global/generic-table/pagination";
import { IndexPageProps } from "@/types";
import React from "react";

const ContactRootPage = async (props: IndexPageProps) => {
  const searchFilters = await contactFilter.parse(props.searchParams);
  const { data } = await adminService.contact.getAllContacts({
    ...searchFilters,
  });

  return (
    <div>
      <div>
        <ContactTable data={data?.data!} />
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

export default ContactRootPage;
