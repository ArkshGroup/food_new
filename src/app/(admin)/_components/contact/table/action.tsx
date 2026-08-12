import { Button } from "@/components/ui/button";
import type { Row } from "@tanstack/react-table";
import { EyeIcon } from "lucide-react";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter, // Added for potential future actions
} from "@/components/ui/dialog";
import { format } from "date-fns"; // For formatting the date
import { Separator } from "@/components/ui/separator"; // For visual separation

const Action = ({ row }: { row: Row<IGetAllContact> }) => {
  return <ContactDialog row={row} />;
};

export default Action;

export function ContactDialog({ row }: { row: Row<IGetAllContact> }) {
  const contact = row.original; // Destructure for cleaner access

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} size="sm">
          <EyeIcon className="mr-2 h-4 w-4" />
          View
        </Button>
      </DialogTrigger>
      {/* Increased max width for better message reading */}
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          {/* Using the Subject as the dialog title */}
          <DialogTitle>
            Subject : {contact.subject || "Contact Message Details"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Key Contact Info Section */}
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium text-gray-500">Sender Details</p>
            <p className="text-lg font-semibold">name:{contact.name}</p>
            <p className="text-sm text-blue-600 hover:underline cursor-pointer">
              email:{contact.email}
            </p>
          </div>
          <Separator className="my-2" />
          <div className="flex flex-col space-y-2">
            <h4 className="text-base font-semibold">Message:</h4>
            <div className="max-h-72 overflow-y-auto p-3 border rounded-md bg-gray-50 text-gray-700 whitespace-pre-wrap">
              {contact.message}
            </div>
          </div>
        </div>
        <DialogDescription>
          Message received from {contact.name} on
          {format(new Date(contact.createdAt), "PPP p")}.
        </DialogDescription>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => window.open(`mailto:${contact.email}`)}
          >
            Reply to Email
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
