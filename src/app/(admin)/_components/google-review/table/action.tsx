import type { Row } from "@tanstack/react-table";
import type { IGoogleReview } from "@/app/(admin)/types/google-review";
import { DeleteGoogleReviewDialog } from "../delete-google-review-dialog";
import { GoogleReviewDialogForm } from "../google-review-dialog-form";

export default function Action({ row }: { row: Row<IGoogleReview> }) {
  const review = row.original;
  return (
    <div className="space-x-2">
      <GoogleReviewDialogForm
        mode="update"
        initialData={{
          id: review.id,
          name: review.name,
          starRating: review.starRating,
          reviewText: review.reviewText,
          sortOrder: review.sortOrder,
        }}
      />
      <DeleteGoogleReviewDialog id={review.id} />
    </div>
  );
}
