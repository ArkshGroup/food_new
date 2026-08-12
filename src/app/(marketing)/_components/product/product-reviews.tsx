"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useAction } from "next-safe-action/hooks";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, Loader2Icon, MessageSquare, Pencil, User } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { createReviewMutation } from "@/app/(marketing)/_mutation/review.mutation";
import type { IProductReview } from "@/app/(marketing)/_types/review";
import {
  getProductReviewsAction,
  getProductReviewStatsAction,
  getMyReviewForProductAction,
} from "@/app/(marketing)/_actions/review.actions";

function StarRating({
  value,
  max = 5,
  size = "default",
  interactive,
  onSelect,
}: {
  value: number;
  max?: number;
  size?: "sm" | "default";
  interactive?: boolean;
  onSelect?: (v: number) => void;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const display = interactive ? hover ?? value : value;
  const iconClass = size === "sm" ? "w-3.5 h-3.5" : "w-5 h-5";

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }, (_, i) => i + 1).map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          className={
            interactive
              ? "p-0.5 rounded focus:outline-none focus:ring-2 focus:ring-[#0555A2]/30 transition-transform hover:scale-110"
              : "cursor-default"
          }
          onMouseEnter={() => interactive && setHover(star)}
          onMouseLeave={() => interactive && setHover(null)}
          onClick={() => interactive && onSelect?.(star)}
        >
          <Star
            className={`${iconClass} transition-colors ${
              star <= display
                ? "fill-amber-400 text-amber-400"
                : "text-stone-300"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

function formatDate(d: Date) {
  return new Date(d).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function maskEmail(email: string) {
  const [local, domain] = email.split("@");
  if (!local || !domain) return "Verified Customer";
  const masked = local.slice(0, 2) + "***";
  return `${masked}@${domain}`;
}

export function ProductReviews({ productId }: { productId: string }) {
  const { status } = useSession();
  const [reviews, setReviews] = useState<IProductReview[]>([]);
  const [total, setTotal] = useState(0);
  const [stats, setStats] = useState<{
    total: number;
    averageRating: number;
    distribution: Record<number, number>;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [myReview, setMyReview] = useState<IProductReview | null>(null);
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getProductReviewsAction({
        productId,
        limit: 50,
        offset: 0,
      });
      const payload = result?.data as { data?: IProductReview[]; total?: number } | undefined;
      const list = Array.isArray(payload?.data) ? payload.data : [];
      setReviews(list);
      setTotal(typeof payload?.total === "number" ? payload.total : list.length);
    } catch (e) {
      console.error("Failed to fetch reviews:", e);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  const fetchStats = useCallback(async () => {
    try {
      const result = await getProductReviewStatsAction({
        productId,
      });
      const payload = result?.data as {
        total?: number;
        averageRating?: number;
        distribution?: Record<number, number>;
      } | undefined;
      if (payload && typeof payload.total === "number") {
        setStats({
          total: payload.total,
          averageRating: payload.averageRating ?? 0,
          distribution: payload.distribution ?? {},
        });
      }
    } catch (e) {
      console.error("Failed to fetch review stats:", e);
    }
  }, [productId]);

  const fetchMyReview = useCallback(async () => {
    if (status !== "authenticated") return;
    try {
      const result = await getMyReviewForProductAction({ productId });
      const payload = result?.data as IProductReview | null | undefined;
      setMyReview(payload ?? null);
      if (payload) {
        setRating(payload.rating);
        setComment(payload.comment ?? "");
      }
    } catch (e) {
      console.error("Failed to fetch my review:", e);
    }
  }, [productId, status]);

  useEffect(() => {
    fetchReviews();
    fetchStats();
  }, [fetchReviews, fetchStats]);

  useEffect(() => {
    fetchMyReview();
  }, [fetchMyReview]);

  const { execute: submitReview, isPending: isSubmitting } = useAction(
    createReviewMutation,
    {
      onSuccess(res) {
        if (res.data?.success) {
          toast.success(
            res.data.updated ? "Review updated." : "Thank you for your review!"
          );
          if (!res.data.updated) {
            setRating(0);
            setComment("");
          }
          setEditingReviewId(null);
          fetchReviews();
          fetchStats();
          fetchMyReview();
        }
      },
      onError() {
        toast.error("Failed to submit review. Please try again.");
      },
    }
  );

  const handleSubmit = () => {
    if (rating < 1 || rating > 5) {
      toast.error("Please select a rating (1–5 stars).");
      return;
    }
    submitReview({ productId, rating, comment: comment.trim() || undefined });
  };

  const startEdit = (review: IProductReview) => {
    setRating(review.rating);
    setComment(review.comment ?? "");
    setEditingReviewId(review.id);
  };

  const cancelEdit = () => {
    if (myReview) {
      setRating(myReview.rating);
      setComment(myReview.comment ?? "");
    } else {
      setRating(0);
      setComment("");
    }
    setEditingReviewId(null);
  };

  return (
    <div className="py-4 space-y-8 font-sans">
      
      {/* Minimal Header & Score Card */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-[#E2EEF8] shadow-2xs">
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#28AAE0]">
            VERIFIED FEEDBACK
          </span>
          <h3 className="text-xl font-serif font-bold text-[#1C1917]">Customer Reviews</h3>
          <p className="text-xs text-stone-500">Real feedback from verified buyers across Nepal.</p>
        </div>

        {stats && stats.total > 0 ? (
          <div className="flex items-center gap-3 bg-[#F0F7FD] px-4 py-2.5 rounded-xl border border-[#E2EEF8]">
            <StarRating value={Math.round(stats.averageRating * 2) / 2} />
            <div className="text-left border-l border-sky-200/80 pl-3">
              <span className="block text-base font-serif font-bold text-[#0555A2]">
                {stats.averageRating.toFixed(1)} / 5
              </span>
              <span className="block text-[10px] font-medium text-stone-500">
                {stats.total} {stats.total === 1 ? "rating" : "ratings"}
              </span>
            </div>
          </div>
        ) : (
          <div className="text-xs font-medium text-stone-500 bg-sky-50 px-3 py-1.5 rounded-lg border border-sky-100">
            No reviews yet
          </div>
        )}
      </div>

      {/* Review Form (Logged-in only) */}
      {status === "authenticated" && (
        <div className="p-6 rounded-2xl bg-white border border-[#E2EEF8] shadow-2xs space-y-5">
          <div className="space-y-1">
            <h4 className="text-base font-serif font-bold text-[#1C1917]">
              {myReview ? "Edit Your Review" : "Write a Review"}
            </h4>
            <p className="text-xs text-stone-500">
              Select your star rating and share your experience.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                Your Rating
              </label>
              <StarRating
                value={rating}
                interactive
                onSelect={setRating}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                Your Review (Optional)
              </label>
              <Textarea
                placeholder="How did you enjoy the taste, texture, and packaging?"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                maxLength={2000}
                rows={3}
                className="px-4 py-3 rounded-xl bg-[#F0F7FD]/50 border-[#E2EEF8] text-stone-900 text-xs font-sans placeholder:text-stone-400 focus:bg-white focus:ring-2 focus:ring-[#0555A2] resize-none"
              />
              <span className="text-[10px] text-stone-400 mt-1 block text-right">
                {comment.length}/2000
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || rating < 1}
                className="py-2.5 px-6 bg-[#0555A2] hover:bg-[#28AAE0] text-white text-xs font-bold uppercase tracking-wider rounded-full transition-all shadow-2xs active:scale-95"
              >
                {isSubmitting ? (
                  <Loader2Icon className="w-4 h-4 animate-spin" />
                ) : myReview ? (
                  "Update Review"
                ) : (
                  "Submit Review"
                )}
              </Button>
              {editingReviewId && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={cancelEdit}
                  disabled={isSubmitting}
                  className="py-2.5 px-5 rounded-full border-[#E2EEF8] text-stone-600 hover:text-stone-900 text-xs font-bold uppercase tracking-wider"
                >
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {status !== "authenticated" && (
        <div className="p-4 rounded-xl bg-white border border-[#E2EEF8] text-xs text-stone-600 text-center font-sans">
          Want to share your experience?{" "}
          <Link href="/auth/login" className="text-[#0555A2] font-bold hover:underline">
            Sign in
          </Link>{" "}
          to write a review.
        </div>
      )}

      {/* Review List */}
      <div className="space-y-4 pt-2">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2Icon className="w-6 h-6 animate-spin text-[#0555A2]" />
          </div>
        ) : reviews.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-[#E2EEF8] space-y-2">
            <MessageSquare className="w-8 h-8 mx-auto text-sky-300" />
            <p className="text-stone-800 font-serif text-base font-bold">No Reviews Yet</p>
            <p className="text-xs text-stone-500 max-w-xs mx-auto">
              Be the first customer to share feedback for this product!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {reviews.map((r) => (
              <div
                key={r.id}
                className="p-5 rounded-2xl bg-white border border-[#E2EEF8] shadow-2xs space-y-2 transition-all hover:shadow-xs"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-sky-50 text-[#0555A2] flex items-center justify-center font-bold text-xs border border-sky-100 shrink-0">
                      {(r.user?.userName || r.user?.email || "C")[0].toUpperCase()}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#1C1917] block">
                        {r.user?.userName || maskEmail(r.user?.email || "")}
                      </span>
                      <span className="text-[10px] text-stone-400 block font-mono">
                        {formatDate(r.createdAt)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <StarRating value={r.rating} size="sm" />
                    {status === "authenticated" && myReview?.id === r.id && (
                      <button
                        type="button"
                        onClick={() => startEdit(r)}
                        className="text-xs font-bold text-[#0555A2] hover:text-[#28AAE0] flex items-center gap-1 transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        Edit
                      </button>
                    )}
                  </div>
                </div>

                {r.comment && (
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans pt-1">
                    "{r.comment}"
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
