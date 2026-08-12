import { BlogService } from "./blog.service";
import { BrandService } from "./brand.service";
import { CartService } from "./cart.service";
import { CategoryService } from "./category.service";
import { DiscountService } from "./discount.service";
import { HeroSliderImageService } from "./hero-slider-image.service";
import { OrderClass } from "./order.service";
import { ProductService } from "./product.service";
import { ReviewService } from "./review.service";
import { UserService } from "./user.service";
import { GoogleReviewService } from "./google-review.service";
import { FoodInfluencerProgramService } from "./food-influencer-program.service";

class MarketingService {
  product = new ProductService();
  category = new CategoryService();
  cart = new CartService();
  user = new UserService();
  order = new OrderClass();
  brand = new BrandService();
  heroSliderImage = new HeroSliderImageService();
  blog = new BlogService();
  discount = new DiscountService();
  review = new ReviewService();
  googleReview = new GoogleReviewService();
  foodInfluencerProgram = new FoodInfluencerProgramService();
}

const marketingService = new MarketingService();

export default marketingService;
