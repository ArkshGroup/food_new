import { adminService } from "@/app/(admin)/_services/index.service";
import ReviewTable from "@/app/(admin)/_components/review/table";

const ReviewsPage = async () => {
  const { data } = await adminService.review.getAllReviews();
  return (
    <div className="">
      <div className="pt-4">
        <ReviewTable data={data ?? []} />
      </div>
    </div>
  );
};

export default ReviewsPage;
