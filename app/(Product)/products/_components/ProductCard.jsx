/** @format */

"use client";
import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/app/Context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const { originalPrice, salePrice, discountPercent, effectivePrice } =
    useMemo(() => {
      const format = (num) =>
        new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: product.currency || "EGP",
          maximumFractionDigits: 0,
        }).format(num);

      const original = format(product.price);
      let sale = null;
      let effPrice = product.price;
      if (product.isOnSale && product.discountPercent > 0) {
        effPrice =
          product.price - product.price * (product.discountPercent / 100);
        sale = format(effPrice);
      }
      return {
        originalPrice: original,
        salePrice: sale,
        discountPercent: product.discountPercent,
        effectivePrice: effPrice,
      };
    }, [product]);

  return (
    <div className="group relative w-full bg-white transition-all duration-500">
      {/* 1. Image Container - Ultra Sharp Display */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#f4f4f4]">
        <Image
          src={product.coverImage.url}
          alt={product.title}
          fill
           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          className="object-cover transition-transform duration-[2s] cubic-bezier(0.2, 1, 0.3, 1) group-hover:scale-105"
        />

        {/* Overlay Labels */}
        <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
          <div className="flex justify-between items-start">
            {salePrice && (
              <span className="bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 italic">
                {discountPercent}% OFF
              </span>
            )}
            {product.stock < 5 && product.stock > 0 && (
              <span className="bg-white text-red-600 text-[9px] font-black uppercase tracking-widest px-3 py-1.5 border border-red-100">
                Low Stock
              </span>
            )}
          </div>

          {/* Quick Action Button - Modern Bar Style */}
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart({ ...product, price: effectivePrice }, 1);
              toast.success("Added to Vault");
            }}
            className="w-full bg-black text-white py-4 text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out"
          >
            <ShoppingCart size={14} />
            Quick Add
          </button>
        </div>
      </div>

      {/* 2. Product Info - High-End Layout */}
      <div className="mt-8 px-1">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.4em] mb-2">
              {product.brand || "Velocore Asset"}
            </h3>
            <Link href={`/products/${product.slug || product._id}`}>
              <h2 className="text-lg font-black uppercase italic tracking-tighter text-black leading-none group-hover:text-zinc-600 transition-colors">
                {product.title}
              </h2>
            </Link>
          </div>

          <div className="flex flex-col items-end">
            {salePrice ? (
              <div className="flex flex-col items-end leading-none">
                <span className="text-[11px] font-bold text-zinc-300 line-through mb-1 tracking-tighter">
                  {originalPrice}
                </span>
                <span className="text-xl font-black text-red-600 tracking-tighter italic">
                  {salePrice}
                </span>
              </div>
            ) : (
              <span className="text-xl font-black text-black tracking-tighter italic">
                {originalPrice}
              </span>
            )}
          </div>
        </div>

        {/* Subtle Footer Detail */}
        <div className="mt-6 flex items-center justify-between pt-4 border-t border-zinc-50">
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-1 h-1 bg-zinc-200 rounded-full" />
            ))}
          </div>
          <Link
            href={`/products/${product.slug || product._id}`}
            className="group/btn flex items-center gap-2 text-[9px] font-black uppercase tracking-widest"
          >
            View Specs
            <ArrowRight
              size={12}
              className="transition-transform group-hover/btn:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
