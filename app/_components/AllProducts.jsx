/** @format */

"use client";
import { getAllProducts } from "@/lib/product";
import ProductList from "../(Product)/products/_components/ProductList";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getAllProducts(1);
        setProducts(productsData?.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="py-40 flex justify-center items-center bg-white">
        <div className="w-10 h-10 border-2 border-zinc-100 border-t-black rounded-full animate-spin" />
      </div>
    );
  }

  if (!products || products.length === 0) return null;

  return (
    <section className="relative py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header Section - More Compact & Sophisticated */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="relative">
            {/* Badge خفيف ومنظم */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[1.5px] bg-black" />
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-400">
                Complete Archive
              </span>
            </div>
            
            <h2 className="flex flex-col leading-tight">
              <span className="text-4xl md:text-5xl font-black text-black uppercase italic tracking-tighter">
                Full
              </span>
              <span className="text-4xl md:text-5xl font-black uppercase tracking-tighter stroke-text">
                Arsenal
              </span>
            </h2>
          </div>

          <div className="pb-1">
            <Link href="/products" className="group">
              <Button
                variant="outline"
                className="h-14 px-8 border-black border-2 rounded-full text-[10px] font-black uppercase tracking-[0.15em] bg-white hover:bg-black hover:text-white transition-all duration-500 flex items-center gap-3 group-hover:-translate-y-1"
              >
                Enter Full Store
                <div className="bg-zinc-100 group-hover:bg-white/20 p-1.5 rounded-full transition-colors">
                    <ArrowUpRight size={14} className="text-black group-hover:text-white" />
                </div>
              </Button>
            </Link>
          </div>
        </div>

        {/* Products Grid */}
        <div className="w-full relative">
          <ProductList products={products} />
        </div>
      </div>

      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 1.5px #27272a; /* خليت الـ Stroke أغمق شوية عشان يبان مع الحجم الأصغر */
          color: transparent;
        }
        @media (max-width: 768px) {
          .stroke-text {
            -webkit-text-stroke: 1px #27272a;
          }
        }
      `}</style>
    </section>
  );
};

export default AllProducts;