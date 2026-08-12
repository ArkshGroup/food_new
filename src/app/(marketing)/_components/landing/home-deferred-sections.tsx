"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { DeferredRender } from "@/components/performance/deferred-render";
import { SectionSkeleton } from "./section-skeleton";
import { StoreBenefitsStrip } from "./store-benefits-strip";

import { FeaturedProductsSection } from "./featured-products-section";

const FeaturesBenefitsSection = dynamic(
  () =>
    import("./features-benefits-section").then(
      (m) => m.FeaturesBenefitsSection,
    ),
  { ssr: false, loading: () => <SectionSkeleton /> },
);

const BackgroundVideoSection = dynamic(
  () =>
    import("./background-video-section").then(
      (m) => m.BackgroundVideoSection,
    ),
  { ssr: false, loading: () => <SectionSkeleton /> },
);

const ImpactStatisticsSection = dynamic(
  () =>
    import("./impact-statistics-section").then(
      (m) => m.ImpactStatisticsSection,
    ),
  { ssr: false, loading: () => <SectionSkeleton /> },
);

const JournalBlogSection = dynamic(
  () => import("./journal-blog-section").then((m) => m.JournalBlogSection),
  { ssr: false, loading: () => <SectionSkeleton /> },
);

const GoogleReviewsSection = dynamic(
  () => import("./google-reviews-section").then((m) => m.GoogleReviewsSection),
  { ssr: false, loading: () => <SectionSkeleton /> },
);

export function HomeDeferredSections(props: {
  flashSaleproducts?: any;
  productsNewArrivals?: any;
  productsOnSale?: any;
  categoryLatestProducts?: any;
  googleReviews?: any;
  blogs?: any;
}) {
  const getArray = (val: any): any[] => {
    if (Array.isArray(val)) return val;
    if (Array.isArray(val?.data)) return val.data;
    return [];
  };

  const categoryProducts = getArray(props.categoryLatestProducts);
  const flashProducts = getArray(props.flashSaleproducts);
  const newArrivals = getArray(props.productsNewArrivals);
  const onSale = getArray(props.productsOnSale);

  const allCombined = [
    ...categoryProducts,
    ...flashProducts,
    ...newArrivals,
    ...onSale,
  ];

  const displayProducts = allCombined
    .filter((prod, idx, self) => self.findIndex((p) => p.id === prod.id) === idx)
    .slice(0, 24);

  return (
    <>
      {/* 6. FEATURED PRODUCTS (EXPLORE OUR PRODUCTS) */}
      <FeaturedProductsSection products={displayProducts} />

      {/* 8. WHY ARKSH FOOD */}
      <DeferredRender fallback={<SectionSkeleton />}>
        <Suspense fallback={<SectionSkeleton />}>
          <FeaturesBenefitsSection />
        </Suspense>
      </DeferredRender>

      {/* BACKGROUND YOUTUBE VIDEO SECTION */}
      <DeferredRender fallback={<SectionSkeleton />}>
        <Suspense fallback={<SectionSkeleton />}>
          <BackgroundVideoSection />
        </Suspense>
      </DeferredRender>

      {/* STORE BENEFITS STRIP (FREE SHIPPING, 24/7 SUPPORT, 7 DAYS RETURN, SECURE PAYMENT) */}
      <StoreBenefitsStrip />

      {/* 11. JOURNAL / BLOG */}
      <DeferredRender fallback={<SectionSkeleton />}>
        <Suspense fallback={<SectionSkeleton />}>
          <JournalBlogSection blogs={props.blogs ?? []} />
        </Suspense>
      </DeferredRender>
      {/* 9. IMPACT / STATISTICS */}
      <DeferredRender fallback={<SectionSkeleton />}>
        <Suspense fallback={<SectionSkeleton />}>
          <ImpactStatisticsSection />
        </Suspense>
      </DeferredRender>

      {/* 12. CUSTOMER TESTIMONIALS / REVIEWS */}
      <DeferredRender fallback={<SectionSkeleton />}>
        <Suspense fallback={<SectionSkeleton />}>
          <GoogleReviewsSection reviews={props.googleReviews ?? []} />
        </Suspense>
      </DeferredRender>
    </>
  );
}
