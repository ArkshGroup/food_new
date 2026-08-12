import { ProductExportButton } from "@/app/(admin)/_components/products/product-export-button";
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

const ProductRootPage = async (props: IndexPageProps) => {
  const searchFilters = await productSearchFilter.parse(props.searchParams);
  const { data } = await adminService.product.getAllProducts({
    ...searchFilters,
  });

  return (
    <>
      <section className=" pt-8">
        <div className="flex w-full flex-wrap items-center justify-end gap-2 mt-6 mb-2">
          <ProductExportButton />
          <Link href={adminNavigationPath.products.path + "/add"}>
            <Button>
              <BoxIcon />
              Add Product
            </Button>
          </Link>
        </div>
        <ProductsTable data={data?.data || []} />
        <div className="flex justify-center py-4">
          <PaginationButton
            currentPage={data?.meta?.currentPage || 1}
            totalPage={data?.meta?.totalPage}
          />
        </div>
      </section>
    </>
  );
};

export default ProductRootPage;
