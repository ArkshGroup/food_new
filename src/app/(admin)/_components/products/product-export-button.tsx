"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Download } from "lucide-react";

export function ProductExportButton({ className }: { className?: string }) {
  return (
    <Button
      variant="outline"
      className={cn("gap-2", className)}
      asChild
    >
      <a href="/api/admin/export/products" download>
        <Download className="size-4" />
        Export CSV
      </a>
    </Button>
  );
}
