/** @format */

import { getAllProducts } from "@/lib/product";
import ProductList from "@/app/(Product)/products/_components/ProductList";
import Pagination from "@/components/ui/Pagination";
import { LayoutGrid } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ProductsPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const page = resolvedSearchParams.page
    ? Number(resolvedSearchParams.page)
    : 1;
  const limit = 10;

  const productsData = await getAllProducts(page, limit);
  const {
    data: products,
    totalProducts,
    totalPages: backendTotalPages,
  } = productsData;
  const totalPages = backendTotalPages || Math.ceil(totalProducts / limit);

  return (
    <main className="min-h-screen bg-white pt-32 pb-24">
      <div className="container mx-auto px-6">
        {/* 1. Header Section - ستايل Velocore الاحترافي */}
        <div className="mb-12 border-b border-zinc-100 pb-12 text-left">
          {/* Badge صغير وهادي */}
          <div className="flex items-center gap-3 mb-5">
            <LayoutGrid size={12} className="text-black" />
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-400">
              All Products
            </span>
          </div>

          {/* العنوان - صغرنا الـ 9xl لـ 5xl و 6xl عشان التناسق */}
          <h1 className="flex flex-col leading-tight">
            <span className="text-5xl md:text-6xl font-black text-black uppercase italic tracking-tighter">
              The
            </span>
            <span className="text-5xl md:text-6xl font-black uppercase tracking-tighter stroke-text">
              Collection
            </span>
          </h1>
        </div>

        {/* 2. Products Grid & Pagination */}
        <div className="min-h-[500px] flex flex-col">
          {products && products.length > 0 ? (
            <>
              <ProductList products={products} />

              {/* هنا التعديل السحري لإخفاء النصوص وتظبيط الزراير على اليمين */}
              <div className="mt-12 pt-8 border-t border-zinc-50 flex justify-end">
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  totalProducts={totalProducts}
                  basePath="/products"
                />
              </div>
            </>
          ) : (
            <div className="py-40 text-center text-zinc-300 uppercase font-black tracking-widest">
              No products available at the moment.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
