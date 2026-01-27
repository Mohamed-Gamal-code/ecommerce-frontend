/** @format */

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../Context/AuthContext";
import { getDashboardStats, getFeaturedProducts } from "../../lib/product";
import {
  TrendingUp,
  Users,
  Package,
  ShoppingCart,
  Layers,
  ArrowUpRight,
  ChevronRight,
  LayoutGrid,
} from "lucide-react";
import Link from "next/link";

const DashboardPage = () => {
  const { accessToken, user, getValidToken } = useAuth();
  const router = useRouter();
  
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const initDashboard = async () => {
      try {
        const validToken = await getValidToken();
        if (!validToken) {
          router.push("/login");
          return;
        }

        const [statsData, productsData] = await Promise.all([
          getDashboardStats(validToken),
          getFeaturedProducts()
        ]);

        setStats(statsData);
        setFeaturedProducts(productsData);
      } catch (err) {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    if (accessToken && user) initDashboard();
  }, [accessToken, user, router, getValidToken]);

  if (loading || !stats) {
    return (
      <div className="h-screen bg-[#fcfcfc] flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-zinc-100 border-t-black rounded-full animate-spin mb-4" />
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Initializing System...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-zinc-900 font-sans p-6 md:p-12">
      <div className="max-w-[1600px] mx-auto">
        
        {/* --- 1. HEADER --- */}
<header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
  {/* --- الجانب الأيسر --- */}
  <div className="space-y-3">
    {/* Velocore تصغير حجم الـ */}
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center shadow-md shadow-black/10">
        <Layers size={16} className="text-white" />
      </div>
      <span className="font-black text-xl tracking-tighter uppercase italic text-black">
        Velocore<span className="text-zinc-400">.</span>
      </span>
    </div>

    {/* System Dashboard تصغير حجم الـ */}
    <h1 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter leading-[0.85] text-black">
      System<br />
      <span className="text-zinc-200">Dashboard.</span>
    </h1>
  </div>

  {/* --- الجانب الأيمن --- */}
  <div className="flex flex-col items-start md:items-end gap-3">
    {/* تصغير حجم الـ Badge */}
    <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-zinc-100 shadow-sm">
      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
      <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">
        Operator: {user?.name?.split(" ")[0] || "Admin"}
      </span>
    </div>
  </div>
</header>

        {/* --- 2. STATS OVERVIEW --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { title: "Net Revenue", val: `$${stats.revenue.toLocaleString()}`, icon: <TrendingUp />, color: "bg-blue-600" },
            { title: "Active Orders", val: stats.orders.total, icon: <ShoppingCart />, color: "bg-orange-500" },
            { title: "Customer Base", val: stats.users.total, icon: <Users />, color: "bg-emerald-500" },
            { title: "Stock Assets", val: stats.products.total, icon: <Package />, color: "bg-zinc-900" },
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-[2rem] border border-zinc-100 shadow-sm hover:border-black transition-all duration-500 group">
              <div className={`${item.color} w-12 h-12 rounded-2xl text-white flex items-center justify-center mb-6 shadow-lg`}>
                {item.icon}
              </div>
              <p className="text-zinc-400 text-[10px] font-black uppercase tracking-widest mb-1">{item.title}</p>
              <h3 className="text-4xl font-black text-zinc-900 tracking-tighter italic">{item.val}</h3>
            </div>
          ))}
        </div>

        {/* --- 3. MAIN CONTENT: CATEGORIES & FEATURED --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Top Collections (Left Column) - حل مشكلة الكلام والزرار هنا */}
          <div className="lg:col-span-4 bg-white p-8 rounded-[2.5rem] border border-zinc-100 shadow-sm flex flex-col h-auto">
            <div className="mb-8">
              <h3 className="font-black text-2xl md:text-3xl tracking-tighter uppercase italic break-words leading-tight">
                Top <br /> Collections
              </h3>
              <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-2 border-l-2 border-zinc-100 pl-3">
                Direct System Nodes
              </p>
            </div>

            <div className="space-y-4">
              {stats.recentCategories.slice(0, 5).map((cat, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer hover:bg-black p-4 rounded-2xl transition-all border border-zinc-50 hover:border-black">
                  <div className="flex items-center gap-4 overflow-hidden">
                    <div className="min-w-[48px] h-[48px] bg-zinc-100 rounded-xl flex items-center justify-center font-black text-lg text-zinc-900 group-hover:bg-zinc-800 group-hover:text-white transition-colors">
                      {cat.name.charAt(0)}
                    </div>
                    <div className="truncate">
                      <p className="text-sm font-black uppercase italic group-hover:text-white transition-colors truncate">
                        {cat.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                        <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-tighter group-hover:text-zinc-500 transition-colors">Active Node</p>
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-zinc-300 group-hover:text-white shrink-0" />
                </div>
              ))}
            </div>

            {/* الزرار مربوط بنهاية القائمة مباشرة */}
            <Link href="/dashboard/categories" className="mt-8 py-5 bg-black text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-zinc-800 transition-all text-center flex items-center justify-center gap-2 group">
              Explore Directories
              <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform" />
            </Link>
          </div>

          {/* Inventory Highlights (Right Column) */}
          <div className="lg:col-span-8 bg-white p-10 rounded-[2.5rem] border border-zinc-100 shadow-sm">
            <div className="flex justify-between items-center mb-10">
              <div className="max-w-[70%]">
                <h3 className="font-black text-3xl tracking-tighter uppercase italic leading-none">Inventory Highlights</h3>
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-2">Premium Asset Selection</p>
              </div>
              <Link href="/dashboard/products" className="bg-zinc-50 hover:bg-black p-4 rounded-2xl transition-all group flex items-center gap-2">
                <span className="hidden md:block text-[9px] font-black uppercase tracking-widest group-hover:text-white">Full Catalog</span>
                <ArrowUpRight size={20} className="group-hover:rotate-45 group-hover:text-white transition-all" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {featuredProducts.length > 0 ? (
                featuredProducts.map((product, i) => (
                  <div key={i} className="group cursor-pointer">
                    <div className="aspect-square bg-zinc-50 rounded-[2rem] mb-6 overflow-hidden relative border border-zinc-100">
                      <img
                        src={product.coverImage?.url || product.images?.[0]?.url}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      {product.discountPercent > 0 && (
                        <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-full">
                          <span className="text-[10px] font-black">-{product.discountPercent}%</span>
                        </div>
                      )}
                    </div>
                    <h4 className="font-black text-xs text-zinc-900 mb-1 uppercase italic truncate">{product.title}</h4>
                    <div className="flex justify-between items-center">
                      <p className="text-zinc-600 font-black text-lg tracking-tighter italic">${product.price?.toLocaleString()}</p>
                      <span className="text-[8px] font-black text-zinc-300 uppercase tracking-widest">In Stock</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center">
                   <p className="text-zinc-400 font-black uppercase tracking-widest text-[10px]">No assets found</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DashboardPage;