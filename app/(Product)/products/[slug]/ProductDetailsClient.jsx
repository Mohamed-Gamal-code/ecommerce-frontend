/** @format */

"use client";

import { useState, useEffect, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/app/Context/AuthContext";
import { useCart } from "@/app/Context/CartContext";
import { addToCart as addToCartAPI } from "@/lib/user";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import StarRating from "../_components/StarRating";
import { ShoppingCart, Minus, Plus, ChevronRight, LayoutGrid } from "lucide-react";
import { toast } from "sonner";

const parseOptions = (options) => {
  if (!options) return [];
  return options
    .flatMap((opt) => opt.split(","))
    .map((s) => s.trim())
    .filter(Boolean);
};

const ProductDetailsClient = ({ product }) => {
  const { user, getValidToken } = useAuth();
  const { addToCart: addToCartContext } = useCart();
  const [isPending, startTransition] = useTransition();

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [mainImage, setMainImage] = useState(product.coverImage.url);

  const colors = parseOptions(product.color);
  const sizes = parseOptions(product.size);

  useEffect(() => {
    if (colors.length > 0 && !selectedColor) setSelectedColor(colors[0]);
    if (sizes.length > 0 && !selectedSize) setSelectedSize(sizes[0]);
  }, [colors, sizes]);

  const handleQuantityChange = (amount) => {
    setQuantity((prev) => Math.max(1, Math.min(product.stock, prev + amount)));
  };

  const handleAddToCart = async () => {
    if (product.stock === 0) {
      toast.error("This product is out of stock.");
      return;
    }
    startTransition(async () => {
      try {
        if (user) {
          await addToCartAPI(getValidToken, { productId: product._id, quantity });
          addToCartContext(product, quantity, selectedColor, selectedSize);
          toast.success("Secured in your bag.");
        } else {
          addToCartContext(product, quantity, selectedColor, selectedSize);
          toast.success("Added to bag!");
        }
      } catch (error) {
        toast.error(error.message || "Something went wrong.");
      }
    });
  };

  const originalPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: product.currency || "EGP",
  }).format(product.price);
  
  let salePrice;
  if (product.isOnSale && product.discountPercent > 0) {
    salePrice = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: product.currency || "EGP",
    }).format(product.price * (1 - product.discountPercent / 100));
  }

  const allImages = [product.coverImage, ...(product.images || [])];

  return (
    <div className="bg-white min-h-screen">
      {/* 1. ULTRA-SLIM WHITE HEADER - الهيدر الصغير جداً وبنفس لون الموقع */}
      <section className="bg-white border-b border-zinc-100 py-4 mb-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-row justify-between items-center">
            <div className="flex items-center gap-6">
               <h1 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter text-black leading-none">
                Asset<span className="text-zinc-200">.</span>Overview
              </h1>
              <div className="hidden md:block h-4 w-[1px] bg-zinc-100" />
              <nav className="hidden md:flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-zinc-300">
                <Link href="/" className="hover:text-black transition-colors">Home</Link>
                <ChevronRight size={8} />
                <Link href="/products" className="hover:text-black transition-colors">Shop</Link>
                <ChevronRight size={8} />
                <span className="text-black italic underline">Detail</span>
              </nav>
            </div>
            
            <div className="flex items-center gap-2 text-zinc-400">
              <LayoutGrid size={12} />
              <span className="text-[8px] font-black uppercase tracking-widest">v2.0_Interface</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* 2. Visual Gallery */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-zinc-50 border border-zinc-100 group">
              <Image src={mainImage} alt={product.title} fill className="object-contain p-10 transition-transform duration-700 group-hover:scale-105" priority />
              {product.isOnSale && (
                <div className="absolute top-6 right-6 bg-black text-white px-3 py-1 rounded-full text-[8px] font-black italic tracking-widest">
                  SALE {product.discountPercent}%
                </div>
              )}
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {allImages.map((image, index) => (
                <button
                  key={index}
                  className={`relative flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                    mainImage === image.url ? "border-black scale-95 shadow-sm" : "border-transparent opacity-40 hover:opacity-100"
                  }`}
                  onClick={() => setMainImage(image.url)}
                >
                  <Image src={image.url} alt="Gallery" fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* 3. Product Details */}
          <div className="lg:col-span-5 flex flex-col pt-2 h-full">
            <div className="mb-6">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-300 block mb-2">
                Brand // {product.brand || "Velocore"}
              </span>
              <h2 className="text-4xl font-black uppercase tracking-tighter text-zinc-900 leading-[0.85] mb-4">
                {product.title}
              </h2>
              <div className="flex items-center gap-4 py-3 border-y border-zinc-50">
                <StarRating rating={product.averageRating} />
                <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">
                  {product.numReviews} Verified Reviews
                </span>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-3">
                <span className={`text-6xl font-black italic tracking-tighter leading-none ${salePrice ? "text-red-600" : "text-black"}`}>
                  {salePrice || originalPrice}
                </span>
                {salePrice && (
                  <span className="text-xl text-zinc-200 line-through font-bold italic tracking-tight">{originalPrice}</span>
                )}
              </div>
            </div>

            <p className="text-zinc-400 text-sm leading-relaxed mb-10 font-medium max-w-sm">
              {product.description}
            </p>

            {/* Config & Action */}
            <div className="space-y-10 mt-auto">
              {sizes.length > 0 && (
                <div className="space-y-4">
                  <label className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-300">Selected Option</label>
                  <div className="flex gap-2 flex-wrap">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                          selectedSize === size ? "bg-black text-white border-black shadow-lg" : "bg-white text-zinc-300 border-zinc-100 hover:border-zinc-300"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-zinc-50 rounded-2xl p-1 border border-zinc-100">
                    <button className="p-2 hover:text-black transition-colors" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}><Minus size={14}/></button>
                    <span className="w-10 text-center font-black text-sm italic">{quantity}</span>
                    <button className="p-2 hover:text-black transition-colors" onClick={() => handleQuantityChange(1)} disabled={quantity >= product.stock}><Plus size={14}/></button>
                  </div>
                  
                  <Button 
                    onClick={handleAddToCart}
                    disabled={product.stock === 0 || isPending}
                    className="flex-grow py-8 bg-black text-white rounded-[1.5rem] hover:bg-zinc-800 transition-all shadow-xl shadow-black/5 group"
                  >
                    <div className="flex items-center justify-center gap-3">
                      <ShoppingCart size={18} />
                      <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                        {isPending ? "Syncing..." : "Add to Core Bag"}
                      </span>
                    </div>
                  </Button>
                </div>
                
                <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-[0.4em] text-zinc-300 pt-4 border-t border-zinc-50">
                   <span>Ref: {product.sku || "V-TERM-01"}</span>
                   <span className={product.stock > 0 ? "text-green-500" : "text-red-500"}>
                     {product.stock > 0 ? "Asset Available" : "Asset Depleted"}
                   </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsClient;