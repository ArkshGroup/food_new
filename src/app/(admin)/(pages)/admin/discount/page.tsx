import DiscountTable from "@/app/(admin)/_components/discount-code/table";
import ProductsTable from "@/app/(admin)/_components/products/table";
import { adminNavigationPath } from "@/app/(admin)/_config/admin.config";
import { productSearchFilter } from "@/app/(admin)/_hooks/products.hook";
import { adminService } from "@/app/(admin)/_services/index.service";
import PaginationButton from "@/components/global/generic-table/pagination";
import { Button } from "@/components/ui/button";
import { IndexPageProps } from "@/types";
import { BoxIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const DiscountRootPage = async (props: IndexPageProps) => {
  const searchFilters = await productSearchFilter.parse(props.searchParams);
  const { data } = await adminService.discount.getAllDiscountCode();

  return (
    <>
      <section className=" pt-8">
        <div className=" flex justify-end w-full">
          <Link
            className=" absolute"
            href={adminNavigationPath.discountCode.path + "/add"}
          >
            <Button className=" mt-6 mb-2">
              <BoxIcon />
              Add Discount Code
            </Button>
          </Link>
        </div>
        <DiscountTable data={data || []} />
      </section>
    </>
  );
};

export default DiscountRootPage;
