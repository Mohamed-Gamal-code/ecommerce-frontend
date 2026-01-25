/** @format */
import { getFeaturedProducts } from "@/lib/product";
import ProductList from "../(Product)/products/_components/ProductList";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const FeaturedProducts = async () => {
  const featuredProducts = await getFeaturedProducts();

  if (!featuredProducts || featuredProducts.length === 0) {
    return null;
  }

  return (
    <section className="relative py-16 bg-white overflow-hidden border-t border-zinc-50">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header Section - ملموم جداً ومحتوى احترافي */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-[1px] bg-zinc-200"></span>
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-400">
                Curated Selection
              </span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black text-black uppercase italic tracking-tighter leading-none">
              Featured <span className="text-zinc-200 not-italic font-medium lowercase tracking-normal">Collection</span>
            </h2>
          </div>

          {/* Explore All Assets - زرار واضح وشيك */}
          <Link 
            href="/products" 
            className="group relative flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full transition-all duration-500 hover:pr-8"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">
              Explore All Assets
            </span>
            <div className="absolute right-3 opacity-0 group-hover:opacity-100 group-hover:right-4 transition-all duration-500">
                <ArrowUpRight size={14} />
            </div>
          </Link>
        </div>

        {/* Products Display */}
        <div className="w-full">
          <ProductList products={featuredProducts} />
        </div>
      </div>

      {/* لمسة خلفية بسيطة جداً عشان الـ Space */}
      <div className="absolute top-10 left-10 text-[10vw] font-black text-zinc-50/50 select-none -z-10 tracking-tighter italic">
        01
      </div>
    </section>
  );
};

export default FeaturedProducts;