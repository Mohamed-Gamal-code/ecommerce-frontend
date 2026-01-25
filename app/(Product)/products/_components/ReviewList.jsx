/** @format */
"use client";

import { useAuth } from "@/app/Context/AuthContext";
import { deleteProductReview } from "@/lib/product";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import StarRating from "./StarRating";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Trash2, Quote, Calendar } from "lucide-react";

const ReviewList = ({ reviews, productId }) => {
  const { user, getValidToken } = useAuth();
  const router = useRouter();

  const handleDelete = async (reviewId) => {
    const confirmDelete = window.confirm("Are you sure you want to purge this review?");
    if (!confirmDelete) return;

    try {
      const token = await getValidToken();
      await deleteProductReview(productId, reviewId, token);
      toast.success("Review deleted successfully.");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Failed to delete review.");
    }
  };

  if (!reviews || reviews.length === 0) {
    return (
      <div className="py-20 text-center bg-zinc-50/50 rounded-[3rem] border border-dashed border-zinc-200">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-300">
          No feedback data available
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between border-b border-zinc-100 pb-6">
        <div>
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-black">
            Community Intel
          </h2>
          <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 mt-1">
            {reviews.length} Verified Technical Reviews
          </p>
        </div>
      </div>

      <div className="grid gap-8">
        {reviews.map((review) => (
          <div key={review._id} className="group relative">
            <div className="flex flex-col md:flex-row gap-6 p-8 bg-white rounded-[2.5rem] border border-zinc-100 shadow-sm hover:shadow-md transition-all duration-300">
              
              {/* User Identity Column */}
              <div className="flex flex-row md:flex-col items-center md:items-start gap-4 md:w-48 flex-shrink-0">
                {/* استبدال الـ Image و الـ Fallback بـ div احترافي */}
                <div className="h-14 w-14 rounded-2xl bg-black flex items-center justify-center text-white text-xs font-black shadow-lg ring-4 ring-zinc-50">
                  {review.user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
                
                <div className="flex flex-col">
                  <span className="text-sm font-black uppercase tracking-tight text-black truncate max-w-[150px]">
                    {review.user?.name || "Anonymous User"}
                  </span>
                  <div className="flex items-center gap-1.5 mt-1 text-zinc-400">
                    <Calendar size={10} />
                    <span className="text-[9px] font-bold uppercase">
                      {new Date(review.createdAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Review Content Column */}
              <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between">
                  <StarRating rating={review.rating} />
                  
                  {user && user._id === review.user?._id && (
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-9 w-9 rounded-xl border-zinc-100 text-red-400 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all opacity-0 group-hover:opacity-100"
                      onClick={() => handleDelete(review._id)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  )}
                </div>

                <div className="relative">
                  <Quote size={32} className="absolute -top-4 -left-4 text-zinc-50 -z-10" />
                  <p className="text-zinc-600 text-sm font-medium leading-relaxed italic">
                    "{review.comment}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;