/** @format */
"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-zinc-100 py-6 overflow-hidden relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* 1. Minimal Brand Identity - على الشمال */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center transition-all duration-500 group-hover:rotate-12">
              <div className="w-2 h-2 bg-white rotate-45 rounded-sm"></div>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-xl font-black uppercase italic tracking-tighter text-black leading-none">
                Velo<span className="text-zinc-200 transition-colors duration-500 group-hover:text-zinc-400">core.</span>
              </span>
            </div>
          </Link>

          {/* 2. Navigation - في المنتصف ومضغوطة */}
          <nav className="flex items-center gap-8">
            {[
              { name: "Inventory", href: "/products" },
              { name: "Collections", href: "/categories" },
            ].map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-black transition-all duration-300"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* 3. Status & Back to top - على اليمين */}
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2">
              <div className="w-1 h-1 bg-emerald-500 rounded-full" />
              <span className="text-[8px] font-black uppercase tracking-widest text-zinc-300 whitespace-nowrap">Status: Optimal</span>
            </div>

            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group flex items-center gap-2 bg-transparent border-none cursor-pointer"
            >
              <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-black transition-colors">Top</span>
              <div className="w-6 h-6 rounded-full bg-zinc-50 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                <ArrowUpRight size={10} className="-rotate-45" />
              </div>
            </button>
          </div>

        </div>

        {/* سطر الحقوق السفلي - صغير جداً */}
        <div className="mt-6 pt-4 border-t border-zinc-50 flex justify-center">
          <p className="text-[8px] font-bold text-zinc-300 uppercase tracking-[0.2em]">
            © 2026 Velocore studio — Performance Archive
          </p>
        </div>
      </div>
      <div className="absolute right-4 bottom-[-10px] text-[4vw] font-black text-zinc-50/10 select-none -z-10 italic pointer-events-none">
        VC.SYSTEM
      </div>
    </footer>
  );
};

export default Footer;