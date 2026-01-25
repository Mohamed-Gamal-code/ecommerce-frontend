/** @format */

'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PieChart,
  ShoppingBag,
  Tags,
  Users2,
  Settings2,
  Cpu,
  ArrowRight
} from "lucide-react";

const Sidebar = ({ isSidebarOpen }) => {
  const pathname = usePathname();

  const sections = [
    {
      title: "Core",
      links: [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { name: "Analytics", href: "/dashboard/analytics", icon: PieChart },
      ]
    },
    {
      title: "Management",
      links: [
        { name: "Inventory", href: "/dashboard/products", icon: ShoppingBag },
        { name: "Collections", href: "/dashboard/categories", icon: Tags },
        { name: "Customers", href: "/dashboard/users", icon: Users2 },
      ]
    }
  ];

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#FFFFFF] transition-all duration-300 border-r border-zinc-200/60
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:relative md:translate-x-0 flex flex-col`}
    >
      {/* 1. BRAND AREA */}
      <div className="h-20 flex items-center px-7 border-b border-zinc-50">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="bg-zinc-900 p-1.5 rounded-lg">
            <Cpu size={18} className="text-white" />
          </div>
          <span className="text-sm font-black uppercase tracking-[0.2em] text-zinc-900">
            Velo<span className="text-zinc-400">core</span>
          </span>
        </Link>
      </div>

      {/* 2. NAVIGATION AREA */}
      <div className="flex-1 px-4 py-6 overflow-y-auto space-y-8">
        {sections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-1">
            <p className="px-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3">
              {section.title}
            </p>
            
            <nav className="space-y-0.5">
              {section.links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all group
                      ${isActive 
                        ? "bg-zinc-100/80 text-zinc-900 font-semibold shadow-sm" 
                        : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
                      }`}
                  >
                    {/* Active Indicator Bar */}
                    {isActive && (
                      <div className="absolute left-0 w-1 h-4 bg-zinc-900 rounded-r-full" />
                    )}
                    
                    <link.icon 
                      size={18} 
                      className={`${isActive ? "text-zinc-900" : "text-zinc-400 group-hover:text-zinc-600"} transition-colors`} 
                    />
                    <span className="text-xs tracking-tight uppercase font-medium">
                      {link.name}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      {/* 3. SYSTEM STATUS (FOOTER) */}
      <div className="p-4 border-t border-zinc-100">
        <Link
          href="/dashboard/settings"
          className={`flex items-center gap-3 px-4 py-2.5 rounded-xl mb-4 transition-all
            ${pathname === "/dashboard/settings" ? "bg-zinc-900 text-white" : "text-zinc-500 hover:bg-zinc-50"}`}
        >
          <Settings2 size={18} />
          <span className="text-xs font-medium uppercase tracking-tighter">Settings</span>
        </Link>

        <div className="bg-[#F9FAFB] border border-zinc-200/50 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              <span className="text-[9px] font-bold text-zinc-600 uppercase">Production</span>
            </div>
            <span className="text-[9px] font-medium text-zinc-400">v2.1</span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold text-zinc-900 uppercase">System Stable</p>
            <ArrowRight size={10} className="text-zinc-300" />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;