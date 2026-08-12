"use server";

import { ReviewService } from "@/app/(marketing)/_services/review.service";

const reviewService = new ReviewService();

/** Server-only: fetch reviews for a product. Call from client; runs on server. */
export const getProductReviewsAction = reviewService.getProductReviews;

/** Server-only: fetch review stats for a product. Call from client; runs on server. */
export const getProductReviewStatsAction = reviewService.getProductReviewStats;

/** Logged-in only: get current user's review for this product, or null. */
export const getMyReviewForProductAction = reviewService.getMyReviewForProduct;
