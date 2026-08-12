import { Button } from "@/components/ui/button";
import type { Row } from "@tanstack/react-table";
import {
  BanknoteIcon,
  CalendarIcon,
  EyeIcon,
  MailIcon,
  NotebookPenIcon,
  Package2Icon,
  PackageIcon,
  UserIcon,
} from "lucide-react";
import React from "react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const Action = ({ row }: { row: Row<IGetAllBulkOrderInquiry> }) => {
  return <BulkOrderInquiryDialog row={row} />;
};

export default Action;

export function BulkOrderInquiryDialog({
  row,
}: {
  row: Row<IGetAllBulkOrderInquiry>;
}) {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant={"outline"} className="btn btn-sm btn-primary">
            <EyeIcon />
            View
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <Package2Icon className="w-4 h-4" />
                Product Name
              </p>
              <p className="font-medium leading-none">
                {row.original.productName}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <PackageIcon className="w-4 h-4" />
                Quantity
              </p>
              <p className="font-medium leading-none">
                {row.original.productQuantity} {row.original.productUnit}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <MailIcon className="w-4 h-4" />
                User Email
              </p>
              <p className="font-medium leading-none">
                {row.original.userEmail || "N/A"}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <UserIcon className="w-4 h-4" />
                User ID
              </p>
              <p className="font-medium leading-none">{row.original.userId}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                Created At
              </p>
              <p className="font-medium leading-none">
                {row.original.createdAt}
              </p>
            </div>
            {row.original.notes && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <NotebookPenIcon className="w-4 h-4" />
                  Notes
                </p>
                <p className="font-medium leading-none">{row.original.notes}</p>
              </div>
            )}
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
}
