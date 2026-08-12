import { CategoryService } from "./category.service";
import { OrderService } from "./order.service";
import { ProductService } from "./products.service";
import { BannerService } from "./banner.service";
import { DashboardService } from "./dashboard.service";
import { DiscountService } from "./discount.service";
import { BrandService } from "./brand.service";
import { HeroSliderImageService } from "./hero-slider-image.service";
import { BulkOrderInquiryService } from "./bulk-order-inquiry.service";
import { ContactService } from "./contact.service";
import { CustomerService } from "./customer.service";
import { BlogService } from "./blog.service";
import { ReviewService } from "./review.service";
import { GoogleReviewService } from "./google-review.service";
import { FoodInfluencerProgramService } from "./food-influencer-program.service";

class AdminService {
  product = new ProductService();
  category = new CategoryService();
  order = new OrderService();
  banner = new BannerService();
  dashboard = new DashboardService();
  discount = new DiscountService();
  brand = new BrandService();
  heroSliderImage = new HeroSliderImageService();
  bulkOrderInquiry = new BulkOrderInquiryService();
  contact = new ContactService();
  customer = new CustomerService();
  blog = new BlogService();
  review = new ReviewService();
  googleReview = new GoogleReviewService();
  foodInfluencerProgram = new FoodInfluencerProgramService();
}

const adminService = new AdminService();

export { adminService };
