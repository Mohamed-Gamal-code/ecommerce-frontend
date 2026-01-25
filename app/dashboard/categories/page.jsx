/** @format */
"use client";

import { useState, useEffect } from "react";
import { getAllCategory } from "@/lib/categories";
import Link from "next/link";
import CategoriesTable from "./_components/CategoriesTable";
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  Layers,
  LayoutGrid,
} from "lucide-react";

export default function CategoriesPage() {
  const [allCategories, setAllCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await getAllCategory();
        setAllCategories(response.data || []);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const totalPages = Math.ceil(allCategories.length / itemsPerPage);
  const currentItems = allCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-[#fafafa] p-6 md:p-12 font-sans">
      {/* --- Section 01: Top Part (Title & Subtitle) --- */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex items-center gap-4 mb-3">
          <div className="w-10 h-[2px] bg-black"></div>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">
            Inventory Management
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-black leading-none">
          Categories{" "}
          <span className="text-zinc-200 not-italic uppercase">Dashboard</span>
        </h1>
        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.3em] mt-3 ml-1">
          Organize and refine your product collections.
        </p>
      </div>

      {/* --- Section 02: Action Bar (Unified Height & Spacing) --- */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        {/* Create New Button - Optimized Spacing */}
        <Link
          href="/dashboard/categories/create"
          className="group h-14 px-8 bg-black text-white rounded-2xl flex items-center justify-center gap-4 hover:bg-zinc-800 transition-all shadow-lg shadow-black/5 w-full md:w-auto active:scale-95"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">
            Create New
          </span>
          <div className="w-6 h-6 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
            <Plus size={14} />
          </div>
        </Link>

        {/* Category Stats Card - Minimalist & Compact */}
        <div className="flex items-center gap-6 bg-white border border-zinc-100 rounded-[1.5rem] py-3 px-6 shadow-sm group hover:border-black transition-all duration-500">
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-zinc-300 uppercase tracking-[0.2em]">
              Total Archives
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black italic tracking-tighter text-black">
                {loading
                  ? ".."
                  : allCategories.length.toString().padStart(2, "0")}
              </span>
              <span className="text-[8px] font-bold text-emerald-500 uppercase tracking-widest">
                Active
              </span>
            </div>
          </div>
          <div className="w-[1px] h-8 bg-zinc-100"></div>
          <div className="p-2 text-zinc-400 group-hover:text-black transition-colors">
            <LayoutGrid size={20} />
          </div>
        </div>
      </div>

      {/* --- Section 03: Table Container --- */}
      <div className="w-full">
        <div className="bg-white rounded-[2rem] border border-zinc-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.02)] overflow-hidden">
          <div className="p-2 md:p-4">
            <CategoriesTable data={currentItems} />
          </div>

          {/* Pagination Controls - Better Button Spacing */}
          <div className="px-8 py-6 border-t border-zinc-50 flex items-center justify-between bg-zinc-50/30">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-400">
                Index {currentPage} / {totalPages || 1}
              </span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 rounded-xl border border-zinc-200 flex items-center justify-center hover:bg-black hover:text-white disabled:opacity-20 transition-all bg-white shadow-sm"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={
                  currentPage === totalPages || allCategories.length === 0
                }
                className="w-10 h-10 rounded-xl border border-zinc-200 flex items-center justify-center hover:bg-black hover:text-white disabled:opacity-20 transition-all bg-white shadow-sm"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
