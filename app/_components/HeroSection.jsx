/** @format */
"use client";

import Link from "next/link";
import { ArrowRight, ShoppingBag, Globe, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-screen bg-white flex flex-col justify-center overflow-hidden font-sans">
      {/* الجانب الخلفي - صورة مالية الـ Background جزئياً (صورة رجل بستايل مودرن) */}
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
          {/* Layer تدرج عشان الكلام يبان بوضوح */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent z-10 lg:block hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent lg:hidden block z-10" />
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-20">
        <div className="max-w-4xl">
          {/* Label علوي */}
          <div className="flex items-center gap-4 mb-8 animate-in fade-in slide-in-from-left duration-700">
            <span className="w-12 h-[1px] bg-black"></span>
            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-black">
              The VELOCORE Standard
            </span>
          </div>

          {/* العنوان الرئيسي: ضخم ومتداخل */}
          <div className="relative mb-10">
            <h1 className="text-[15vw] lg:text-[10rem] font-black leading-[0.75] tracking-tighter uppercase italic select-none">
              LIMIT
              <span className="text-zinc-100 lg:text-zinc-50 tracking-[-0.05em]">
                LESS
              </span>{" "}
              <br />
              <span className="ml-[5vw] lg:ml-[10vw] flex items-center gap-4">
                STYL<span className="text-black">E.</span>
                <div className="hidden lg:flex w-32 h-20 bg-zinc-100 rounded-full items-center justify-center -rotate-12 border border-zinc-200 shadow-sm transition-transform hover:rotate-0 duration-500">
                  <Zap className="fill-black" size={32} />
                </div>
              </span>
            </h1>
          </div>

          {/* الكلام الفرعي والأزرار */}
          <div className="flex flex-col lg:flex-row lg:items-end gap-12 ml-[5vw] lg:ml-[10vw]">
            <div className="max-w-sm space-y-6">
              <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed tracking-tight">
                Engineered for performance. Curated for luxury. Defined by you.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/products">
                  <Button className="h-16 px-10 bg-black text-white rounded-full font-bold uppercase tracking-widest text-[11px] hover:scale-105 transition-all shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)]">
                    Explore Now
                  </Button>
                </Link>
                <Link href="/categories">
                  <button className="h-16 w-16 flex items-center justify-center rounded-full border-2 border-black group hover:bg-black transition-all">
                    <ArrowRight className="group-hover:text-white group-hover:-rotate-45 transition-all duration-300" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Stats صغيرة على الجنب */}
            <div className="hidden lg:grid grid-cols-2 gap-8 border-l border-gray-100 pl-12">
              <div>
                <p className="text-4xl font-black italic tracking-tighter text-black">
                  24k+
                </p>
                <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest">
                  Global Clients
                </p>
              </div>
              <div>
                <p className="text-4xl font-black italic tracking-tighter text-black">
                  100%
                </p>
                <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest">
                  Premium Crafted
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Badge (Bottom Left) */}
      <div className="absolute bottom-10 left-10 hidden lg:flex items-center gap-4 py-3 px-6 bg-white/50 backdrop-blur-md rounded-2xl border border-white/20 z-30">
        <div className="p-2.5 bg-black rounded-xl text-white shadow-lg">
          <Globe size={16} />
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] leading-tight text-black">
          Global Logistics <br /> / Ready to Ship
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
