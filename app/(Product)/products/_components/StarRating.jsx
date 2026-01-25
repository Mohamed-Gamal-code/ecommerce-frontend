/** @format */
"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const StarRating = ({ rating, onRatingChange, isInput = false }) => {
  // هنستخدم state داخلي للـ hover عشان اليوزر يحس بالتفاعل قبل ما يدوس
  const [hover, setHover] = useState(0);

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button" // مهم جداً عشان ميعملش Submit للفورم بالخطأ
          disabled={!isInput}
          className={cn(
            "relative p-0.5 transition-all duration-200 outline-none",
            isInput && "hover:scale-125 active:scale-90 cursor-pointer"
          )}
          onClick={() => isInput && onRatingChange(star)}
          onMouseEnter={() => isInput && setHover(star)}
          onMouseLeave={() => isInput && setHover(0)}
        >
          <Star
            className={cn(
              "h-5 w-5 transition-all duration-300",
              (hover || rating) >= star
                ? "text-black fill-black" // خليناه أسود عشان الـ Branding بتاعك
                : "text-zinc-200 fill-transparent",
              isInput && "group-hover:drop-shadow-[0_0_8px_rgba(0,0,0,0.1)]"
            )}
          />
          
          {/* تأثير توهج بسيط لما تكون النجمة مختارة */}
          {rating >= star && (
            <span className="absolute inset-0 bg-black/5 blur-lg rounded-full -z-10" />
          )}
        </button>
      ))}
      
      {/* لو هو Input بنظهر الرقم جنبه للتأكيد */}
      {isInput && rating > 0 && (
        <span className="ml-2 text-[10px] font-black text-black bg-zinc-100 px-2 py-0.5 rounded-md">
          {rating}.0
        </span>
      )}
    </div>
  );
};

export default StarRating;