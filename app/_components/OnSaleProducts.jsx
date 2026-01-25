/** @format */
import { getOnSaleProducts } from "@/lib/product";
import ProductList from "../(Product)/products/_components/ProductList";
import { Tag, ArrowRight } from "lucide-react"; // ضفنا ArrowRight هنا
import Link from "next/link"; // ضفنا Link هنا

const OnSaleProducts = async () => {
  const onSaleProducts = await getOnSaleProducts();

  if (!onSaleProducts || onSaleProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-white border-t border-zinc-50">
      <div className="container mx-auto px-6">
        
        {/* Header - تم إصلاح القفلات والـ Imports */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center text-red-600 border border-zinc-100 shadow-sm">
              <Tag size={24} strokeWidth={2.5} />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600 mb-2 block">
                Seasonal Drop
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-black uppercase italic tracking-tighter leading-none">
                Special <span className="text-zinc-100">Offers</span>
              </h2>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end gap-4">
            <p className="hidden md:block text-[10px] font-bold text-zinc-400 uppercase tracking-widest text-right max-w-[220px] leading-relaxed">
              Premium selections with <br /> 
              <span className="text-black">Exclusive Price Tags</span>
            </p>
            <Link 
              href="/products" 
              className="group flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-black border-b-2 border-zinc-100 hover:border-black transition-all pb-1"
            >
              View All Products
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Product Grid Container */}
        <div className="relative">
          <ProductList products={onSaleProducts} />
        </div>

        {/* Decorative Line */}
        <div className="mt-20 w-full h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
      </div>
    </section>
  );
};

export default OnSaleProducts;