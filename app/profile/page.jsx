/** @format */
"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { getUser } from "@/lib/user";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Heart, Settings, ArrowRight, Store } from "lucide-react";

// --- Loading Skeleton ---
const ProfileSkeleton = () => (
  <div className="min-h-screen bg-white flex items-center justify-center p-8">
    <div className="w-full max-w-4xl h-[500px] bg-zinc-50 rounded-[32px] animate-pulse"></div>
  </div>
);

const ProfilePage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, getValidToken } = useAuth();

  useEffect(() => {
    async function fetchData() {
      if (!user?._id) { setLoading(false); return; }
      try {
        const userData = await getUser(getValidToken, user._id);
        setData(userData);
      } catch (error) {
        console.error("Profile Load Error:", error);
      } finally { setLoading(false); }
    }
    fetchData();
  }, [user, getValidToken]);

  if (loading) return <ProfileSkeleton />;
  if (!data) return (
    <div className="min-h-screen bg-white flex items-center justify-center text-center">
      <div className="space-y-4">
        <h2 className="text-2xl font-black uppercase italic italic tracking-tighter">Session Timeout</h2>
        <Link href="/login" className="text-[10px] font-black underline uppercase tracking-widest">Login to Access</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* --- 1. Profile Identity Header --- */}
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="relative w-28 h-28 md:w-32 md:h-32">
            <Image
              src={data.avatar?.url || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
              alt={data.name}
              fill
              className="rounded-full object-cover border-[6px] border-zinc-50 grayscale"
            />
          </div>

          <div className="flex-1 text-center md:text-left">
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-400 block mb-2">Member Profile</span>
            <h1 className="text-4xl md:text-5xl font-black text-black uppercase italic tracking-tighter leading-none mb-3">
              {data.name}
            </h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
              <span>{data.email}</span>
              <span className="hidden md:block text-zinc-200">/</span>
              <span className="text-black italic">{data.role}</span>
            </div>
          </div>

          <Link href="/profile/edit" className="p-4 rounded-full bg-zinc-50 hover:bg-black hover:text-white transition-all group">
            <Settings size={18} className="group-hover:rotate-90 transition-transform duration-500" />
          </Link>
        </div>

        {/* --- 2. Action Cards Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Shopping Cart Card - بديلة للـ Orders */}
          <Link href="/cart" className="group p-10 bg-black rounded-[40px] hover:shadow-2xl hover:shadow-black/20 transition-all duration-500 flex flex-col justify-between h-64 border border-black">
            <div>
              <div className="flex justify-between items-start mb-6">
                <ShoppingBag size={28} className="text-white" />
                <ArrowRight size={20} className="text-zinc-600 group-hover:translate-x-2 group-hover:text-white transition-all" />
              </div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">My Cart</h2>
              <p className="text-zinc-500 text-[10px] uppercase tracking-widest mt-2 group-hover:text-zinc-300">Complete your pending acquisition</p>
            </div>
            <span className="text-4xl font-black text-zinc-900 leading-none select-none">CART.01</span>
          </Link>

          {/* Return to Store Card - ستايل شيك جداً */}
          <Link href="/" className="group p-10 bg-zinc-50 rounded-[40px] border border-zinc-100 hover:border-black transition-all duration-500 flex flex-col justify-between h-64">
            <div>
              <div className="flex justify-between items-start mb-6">
                <Store size={28} className="text-zinc-400 group-hover:text-black transition-colors" />
                <ArrowRight size={20} className="text-zinc-200 group-hover:translate-x-2 group-hover:text-black transition-all" />
              </div>
              <h2 className="text-2xl font-black text-black uppercase italic tracking-tighter">Storefront</h2>
              <p className="text-zinc-400 text-[10px] uppercase tracking-widest mt-2 group-hover:text-black">Browse full global inventory</p>
            </div>
            <span className="text-4xl font-black text-white leading-none select-none transition-colors group-hover:text-zinc-200">SHOP.02</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;