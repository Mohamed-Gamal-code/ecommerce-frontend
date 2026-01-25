/** @format */
"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/app/Context/AuthContext";
import { createProductReview } from "@/lib/product";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import StarRating from "./StarRating";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { MessageSquareQuote, Send } from "lucide-react";

const ReviewForm = ({ productId }) => {
  const { isAuthenticated, getValidToken } = useAuth();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a rating.");
      return;
    }
    if (!comment.trim()) {
      toast.error("Please write a comment.");
      return;
    }

    setIsSubmitting(true);
    try {
      const token = await getValidToken();
      if (!token) {
        toast.error("You must be logged in to submit a review.");
        setIsSubmitting(false);
        return;
      }

      await createProductReview(productId, { rating, comment }, token);
      toast.success("Review submitted successfully!");
      setRating(0);
      setComment("");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Failed to submit review.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="p-8 text-center bg-zinc-50 rounded-[2rem] border border-dashed border-zinc-200">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
          Authentication Required
        </p>
        <p className="mt-2 text-sm font-medium text-zinc-600">
          Please <Link href="/login" className="text-black font-black underline underline-offset-4 hover:text-zinc-600 transition-colors">Log In</Link> to share your experience.
        </p>
      </div>
    );
  }

  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardHeader className="px-0">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-black rounded-xl text-white">
            <MessageSquareQuote size={20} />
          </div>
          <div>
            <CardTitle className="text-2xl font-black uppercase italic tracking-tighter">
              Product Feedback
            </CardTitle>
            <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">
              Share your technical evaluation
            </p>
          </div>
        </div>
      </CardHeader>
      
      <form onSubmit={handleSubmit} className="mt-4">
        <CardContent className="px-0 space-y-6">
          {/* Rating Section */}
          <div className="space-y-3 p-6 bg-white rounded-[2rem] border border-zinc-100 shadow-sm">
            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
              Experience Level
            </Label>
            <div className="flex items-center gap-2">
               <StarRating rating={rating} onRatingChange={setRating} isInput />
               <span className="text-[10px] font-black text-zinc-300 ml-2">/ 05.0</span>
            </div>
          </div>

          {/* Comment Section */}
          <div className="space-y-3">
            <Label htmlFor="comment" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-2">
              Detailed Narrative
            </Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Describe the build quality, performance, and overall value..."
              rows={5}
              className="rounded-[2rem] border-zinc-100 focus:border-black focus:ring-0 resize-none p-6 text-sm font-medium placeholder:text-zinc-300 transition-all shadow-sm"
            />
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full h-14 rounded-2xl bg-black hover:bg-zinc-800 text-white text-[11px] font-black uppercase tracking-[0.3em] transition-all shadow-lg shadow-black/10 group"
          >
            {isSubmitting ? (
              "Synchronizing..."
            ) : (
              <span className="flex items-center gap-2">
                Deploy Review <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </span>
            )}
          </Button>
        </CardContent>
      </form>
    </Card>
  );
};

export default ReviewForm;