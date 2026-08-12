import type { Row } from "@tanstack/react-table";
import React from "react";
import type { IGetAllDiscountCode } from "@/app/(admin)/types/discount";
import Link from "next/link";
import { adminNavigationPath } from "@/app/(admin)/_config/admin.config";
import { Button } from "@/components/ui/button";
const Action = ({ row }: { row: Row<IGetAllDiscountCode> }) => {
  return (
    <div>
      <Link
        href={`${adminNavigationPath.discountCode.path}/${row.original.id}`}
      >
        <Button variant={"link"}>Edit</Button>
      </Link>
    </div>
  );
};

export default Action;
