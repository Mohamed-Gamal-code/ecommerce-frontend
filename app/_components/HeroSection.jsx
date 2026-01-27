/** @format */
"use client";

import Link from "next/link";
import { ArrowRight, Globe, Zap, Star, TrendingUp, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-screen bg-white flex flex-col justify-center overflow-hidden font-sans">
      {/* 1. إضافة Grid Background خفيف جداً عشان يكسر بياض الخلفية ويدي لمسة احترافية */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0 pointer-events-none" />

      {/* الجانب الخلفي - الصورة */}
      <div className="absolute right-0 top-0 w-full lg:w-[55%] h-full z-0">
        <div className="relative w-full h-full grayscale hover:grayscale-0 transition-all duration-[2s] ease-in-out group">
          <Image
            src="https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?q=80&w=1200&auto=format&fit=crop"
            alt="VeloCore Male Collection"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            unoptimized
            className="object-cover object-top"
          />
          {/* تحسين الـ Gradient عشان الكلام يبان أوضح في السكرين شوت */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent z-10 lg:block hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent lg:hidden block z-10" />

          {/* 2. إضافة Floating Product Card: دي أهم حاجة للسكرين شوت بتدي إحساس المتجر */}
          <div className="absolute top-[30%] right-10 hidden xl:flex flex-col gap-3 p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl z-20 w-64 animate-in fade-in zoom-in duration-1000 delay-500">
            <div className="flex justify-between items-start">
              <span className="bg-black text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">New Arrival</span>
              <div className="flex text-yellow-500">
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <Star key={i} size={10} fill="currentColor" />
                ))}
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-white font-bold text-lg drop-shadow-md">Urban Noir Jacket</p>
              <p className="text-white/80 text-sm font-medium">$129.00</p>
            </div>
            <button className="w-full py-3 bg-white text-black font-bold text-xs rounded-xl hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
              <Plus size={14} /> Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-20 pt-20 lg:pt-0">
        <div className="max-w-4xl">
          {/* Label علوي */}
          <div className="flex items-center gap-4 mb-6 lg:mb-8 animate-in fade-in slide-in-from-left duration-700">
            <span className="w-12 h-[2px] bg-black"></span>
            <span className="text-[10px] lg:text-[11px] font-black uppercase tracking-[0.4em] text-black">
              The VELOCORE Standard
            </span>
          </div>

          {/* العنوان الرئيسي */}
          <div className="relative mb-8 lg:mb-10">
            <h1 className="text-[15vw] lg:text-[11rem] font-black leading-[0.8] tracking-tighter uppercase italic select-none text-black">
              LIMIT
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-zinc-100 to-zinc-300 lg:text-zinc-200 tracking-[-0.05em] stroke-black text-stroke">
                 LESS
              </span>{" "}
              <br />
              <span className="ml-[5vw] lg:ml-[8vw] flex items-center gap-4">
                STYL<span className="text-black">E.</span>
                {/* تعديل الأيقونة لتكون بارزة أكتر */}
                <div className="hidden lg:flex w-24 h-16 lg:w-32 lg:h-20 bg-black text-white rounded-full items-center justify-center -rotate-12 border-4 border-white shadow-xl hover:scale-110 transition-transform duration-500">
                  <Zap className="fill-white" size={32} />
                </div>
              </span>
            </h1>
          </div>

          {/* الكلام الفرعي والأزرار */}
          <div className="flex flex-col lg:flex-row lg:items-end gap-12 ml-[2vw] lg:ml-[8vw]">
            <div className="max-w-md space-y-8">
              <p className="text-lg md:text-xl text-gray-600 font-medium leading-relaxed tracking-tight border-l-4 border-black pl-6">
                Engineered for performance. Curated for luxury. <br/>
                <span className="text-black font-bold">Defined by you.</span>
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/products">
                  <Button className="h-14 lg:h-16 px-8 lg:px-10 bg-black text-white rounded-full font-bold uppercase tracking-widest text-[10px] lg:text-[11px] hover:scale-105 hover:bg-zinc-800 transition-all shadow-[0_20px_40px_-10px_rgba(0,0,0,0.4)]">
                    Start Shopping
                  </Button>
                </Link>
                <Link href="/categories">
                  <button className="h-14 w-14 lg:h-16 lg:w-16 flex items-center justify-center rounded-full border-2 border-gray-200 bg-white group hover:border-black hover:bg-black transition-all shadow-sm">
                    <ArrowRight className="text-black group-hover:text-white group-hover:-rotate-45 transition-all duration-300" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="hidden lg:grid grid-cols-2 gap-8 border-l border-gray-200 pl-12 mb-4">
              <div className="space-y-1">
                <p className="text-3xl lg:text-4xl font-black italic tracking-tighter text-black flex items-start">
                  24k <span className="text-sm mt-1">+</span>
                </p>
                <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest">
                  Happy Clients
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl lg:text-4xl font-black italic tracking-tighter text-black flex items-start">
                  100 <span className="text-sm mt-1">%</span>
                </p>
                <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest">
                  Quality Match
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Badge (Bottom Left) - معدل ليكون شكله Tech أكتر */}
      <div className="absolute bottom-10 left-10 hidden lg:flex items-center gap-4 py-3 px-5 bg-white/80 backdrop-blur-md rounded-full border border-gray-100 shadow-xl z-30 animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
        <div className="p-2 bg-green-500 rounded-full text-white shadow-lg shadow-green-500/30 animate-pulse">
          <Globe size={18} />
        </div>
        <div className="flex flex-col">
           <span className="text-[10px] font-black uppercase tracking-widest text-black">Worldwide Shipping</span>
           <span className="text-[9px] font-medium text-gray-500">Fast & Reliable</span>
        </div>
      </div>
      
       {/* Badge إضافي يوحي بالتريند (مفيد للسكرين شوت) */}
      <div className="absolute top-32 left-10 hidden lg:flex items-center gap-2 py-2 px-4 bg-black text-white rounded-full z-10 rotate-[-5deg]">
        <TrendingUp size={14} />
        <span className="text-[10px] font-bold uppercase tracking-widest">Summer Collection 2025</span>
      </div>

    </section>
  );
};

export default HeroSection;