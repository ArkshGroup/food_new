import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FilterIcon } from "lucide-react";

export function ProductFilterSheet({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Sheet>
      <SheetTrigger className=" lg:hidden " asChild>
        <Button variant="outline">
          <FilterIcon /> Product Filters
        </Button>
      </SheetTrigger>
      <SheetHeader className=" sr-only">
        <SheetTitle> Filters</SheetTitle>
      </SheetHeader>
      <SheetContent
        side="left"
        className=" h-full flex items-start justify-start"
      >
        {children}
      </SheetContent>
    </Sheet>
  );
}
