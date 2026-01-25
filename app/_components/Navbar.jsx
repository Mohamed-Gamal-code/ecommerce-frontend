/** @format */
"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Menu, 
  ShoppingCart, 
  X, 
  User as UserIcon, 
  LogOut, 
  LayoutDashboard, 
  UserCircle 
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../Context/AuthContext";
import { useCart } from "../Context/CartContext";
import { usePathname, useRouter } from "next/navigation";
import Search from "./Search";

const Navbar = () => {
  const { isAuthenticated, user, logout, loading } = useAuth();
  const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // تأثير السكرول لتحويل الـ Navbar لشكل عائم
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // إغلاق المنيو عند تغيير حجم الشاشة
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    { href: "/", text: "Home" },
    { href: "/products", text: "Curated Shop" },
    { href: "/categories", text: "Collections" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 px-4 md:px-8 ${
        scrolled ? "mt-4" : "mt-0"
      }`}
    >
      <div 
        className={`mx-auto max-w-screen-xl transition-all duration-500 ${
          scrolled 
          ? "bg-white/80 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] rounded-[24px] px-6 py-2 border border-white/20" 
          : "bg-white py-6 border-transparent"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          
          {/* --- Logo Area --- */}
          <Link 
            href="/" 
            className="flex-shrink-0 transition-all active:scale-95 group" 
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                <span className="text-white font-black text-xl italic leading-none">V</span>
              </div>
              <span className="text-xl md:text-2xl font-black tracking-tighter text-black uppercase italic group-hover:tracking-normal transition-all duration-500">
                VELO<span className="text-gray-300 group-hover:text-black transition-colors underline decoration-black/10 underline-offset-8 decoration-2">CORE</span>
              </span>
            </div>
          </Link>

          {/* --- Search (Desktop) --- */}
          <div className="hidden md:block flex-1 max-w-sm">
            <Search />
          </div>

          {/* --- Navigation (Desktop) --- */}
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-8 text-[11px] font-black uppercase tracking-[0.2em]">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href} className="relative group">
                    <Link
                      href={link.href}
                      className={`${
                        isActive ? "text-black" : "text-gray-400 hover:text-black"
                      } transition-all duration-300 flex items-center gap-1.5`}
                    >
                      {link.text}
                      {isActive && <span className="w-1 h-1 bg-black rounded-full animate-pulse" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* --- Actions Area --- */}
          <div className="flex items-center gap-2 md:gap-4">
            
            {/* Cart Button */}
            <Link href="/cart" className="relative group transition-transform active:scale-90">
              <div className="p-2.5 rounded-full bg-gray-50 group-hover:bg-black transition-all duration-300">
                <ShoppingCart className="h-5 w-5 text-gray-700 group-hover:text-white transition-colors" />
              </div>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black border-2 border-white text-[9px] font-black text-white group-hover:bg-red-500 transition-colors">
                  {cart.length}
                </span>
              )}
            </Link>

            {/* Auth/User Dropdown */}
            {loading ? (
              <div className="h-10 w-10 animate-pulse rounded-full bg-gray-100"></div>
            ) : isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center outline-none group">
                    <div className="h-10 w-10 rounded-xl border-2 border-gray-100 p-0.5 transition-all group-hover:border-black group-hover:rotate-3 overflow-hidden">
                      {user?.avatar?.url ? (
                        <Image 
                          src={user.avatar.url} 
                          alt="Profile" 
                          width={40} 
                          height={40} 
                          className="rounded-[8px] object-cover h-full w-full" 
                        />
                      ) : (
                        <div className="h-full w-full rounded-[8px] bg-gray-50 flex items-center justify-center text-gray-400">
                          <UserIcon size={18} />
                        </div>
                      )}
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 p-3 rounded-[24px] shadow-2xl border-gray-100 mt-4 bg-white/95 backdrop-blur-xl">
                  <DropdownMenuLabel className="font-normal p-4">
                    <div className="flex flex-col space-y-1">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Account Member</p>
                      <p className="text-sm font-bold text-black truncate">{user?.name}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-100" />
                  <DropdownMenuItem asChild className="rounded-xl cursor-pointer p-3 my-1">
                    <Link href="/profile" className="flex items-center gap-3 font-bold text-[11px] uppercase tracking-widest">
                      <UserCircle size={18} className="text-gray-400" /> My Profile
                    </Link>
                  </DropdownMenuItem>
                  {user?.role === "admin" && (
                    <DropdownMenuItem asChild className="rounded-xl cursor-pointer p-3 my-1 bg-zinc-950 text-white hover:bg-black">
                      <Link href="/dashboard" className="flex items-center gap-3 font-bold text-[11px] uppercase tracking-widest">
                        <LayoutDashboard size={18} /> Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator className="bg-gray-100" />
                  <DropdownMenuItem
                    onClick={() => { logout(); router.push("/login"); }}
                    className="rounded-xl cursor-pointer p-3 text-red-500 focus:bg-red-50 focus:text-red-600 font-bold text-[11px] uppercase tracking-widest flex items-center gap-3"
                  >
                    <LogOut size={18} /> Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden sm:flex items-center gap-4">
                <Link href="/login" className="text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-all">
                  Login
                </Link>
                <Link href="/register">
                  <Button className="bg-black text-white hover:bg-zinc-800 rounded-full px-8 h-10 text-[11px] font-black uppercase tracking-widest transition-all">
                    Join Now
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden rounded-full p-2 text-black hover:bg-gray-100 transition-all"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* --- Mobile Menu Drawer --- */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[90px] z-50 bg-white animate-in fade-in slide-in-from-bottom-2 px-8 py-10">
          <div className="mb-8">
            <Search />
          </div>
          <nav>
            <ul className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-4xl font-black italic uppercase tracking-tighter ${
                      pathname === link.href ? "text-black" : "text-gray-200"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
              {!isAuthenticated && (
                <div className="grid grid-cols-1 gap-4 pt-10 border-t border-gray-100">
                  <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full h-14 rounded-2xl font-black uppercase tracking-widest border-2">Login</Button>
                  </Link>
                  <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full h-14 rounded-2xl bg-black text-white font-black uppercase tracking-widest">Register</Button>
                  </Link>
                </div>
              )}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;