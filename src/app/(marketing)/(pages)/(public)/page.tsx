import { HeroBanner } from "../../_components/landing/hero-banner-section";
import marketingService from "../../_services/index.service";
import { HomeDeferredSections } from "@/app/(marketing)/_components/landing/home-deferred-sections";

export const revalidate = 60;
export default async function Home() {
  const [
    heroSliderResult,
    flashSaleproducts,
    productsNewArrivals,
    productsOnSale,
    categoryLatestProductsResult,
    googleReviews,
    blogsResult,
  ] = await Promise.all([
    marketingService.heroSliderImage.getAllHeroSliderImage(),
    marketingService.product.getProductsWhichAreOnFlashSale(),
    marketingService.product.getProductsWhichAreNewArrivals(),
    marketingService.product.getProductsWhichAreOnSale(),
    marketingService.product.getTwoLatestProductsPerCategory(),
    marketingService.googleReview.getPublicList(),
    marketingService.blog.getAllBlogs({ page: 1 }),
  ]);

  const heroSliderImages: IHeroSliderImage[] = Array.isArray(heroSliderResult)
    ? []
    : ((heroSliderResult as { data?: { data?: IHeroSliderImage[] } })?.data
        ?.data ?? []);

  const blogs = blogsResult?.data?.data ?? blogsResult?.data ?? [];
  const categoryLatestProducts =
    categoryLatestProductsResult?.data ??
    (Array.isArray(categoryLatestProductsResult)
      ? categoryLatestProductsResult
      : []);

  const flashProducts =
    flashSaleproducts?.data ??
    (Array.isArray(flashSaleproducts) ? flashSaleproducts : []);
  const newArrivals =
    productsNewArrivals?.data ??
    (Array.isArray(productsNewArrivals) ? productsNewArrivals : []);
  const onSale =
    productsOnSale?.data ??
    (Array.isArray(productsOnSale) ? productsOnSale : []);

  return (
    <div className="overflow-x-hidden w-full">
      <HeroBanner heroSliderImages={heroSliderImages} />
      <div className="sr-only">
        <h1>Arksh Food</h1>
        <p>Healthy food and snacks made in Nepal.</p>
      </div>
      <HomeDeferredSections
        flashSaleproducts={flashProducts}
        productsNewArrivals={newArrivals}
        productsOnSale={onSale}
        categoryLatestProducts={categoryLatestProducts}
        googleReviews={googleReviews ?? []}
        blogs={blogs}
      />
    </div>
  );
}
