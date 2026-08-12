import { GoogleReviewDialogForm } from "@/app/(admin)/_components/google-review/google-review-dialog-form";
import GoogleReviewTable from "@/app/(admin)/_components/google-review/table";
import { adminService } from "@/app/(admin)/_services/index.service";

const GoogleReviewsPage = async () => {
  const { data } = await adminService.googleReview.getAll();
  return (
    <div>
      <div className="pt-4">
        <GoogleReviewDialogForm mode="create" />
      </div>
      <GoogleReviewTable data={data} />
    </div>
  );
};

export default GoogleReviewsPage;
