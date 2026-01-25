/** @format */
"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";
import { useAuth } from "@/app/Context/AuthContext";
import { DataTable } from "./_components/DataTable";
import { getAllUsers } from "@/lib/user";

export default function UsersPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, getValidToken } = useAuth();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    async function fetchData() {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const response = await getAllUsers(getValidToken);
        setData(response.data || []);
      } catch (error) {
        console.error("Failed to load users:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [user, getValidToken]);

  const handleDeleteUser = (userId) => {
    setData((prevData) => prevData.filter((u) => u._id !== userId));
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentItems = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <div className="w-10 h-10 border-2 border-zinc-100 border-t-black animate-spin rounded-full" />
        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Syncing User Base...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] p-6 md:p-12 font-sans">
      
      {/* --- Section 01: Header & Stats --- */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
             <div className="w-10 h-[2px] bg-black"></div>
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Management Hub</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-black leading-none">
            Users <span className="text-zinc-200 not-italic uppercase">Archive.</span>
          </h1>
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.3em] ml-1">
            Global directory of registered accounts.
          </p>
        </div>

        {/* Total Users Pill */}
        <div className="flex items-center gap-6 bg-white border border-zinc-100 rounded-[1.5rem] py-3 px-6 shadow-sm group hover:border-black transition-all duration-500">
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-zinc-300 uppercase tracking-[0.2em]">Live Database</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black italic tracking-tighter text-black">
                {data.length.toString().padStart(2, '0')}
              </span>
              <span className="text-[8px] font-bold text-indigo-500 uppercase tracking-widest italic">Accounts</span>
            </div>
          </div>
          <div className="w-[1px] h-8 bg-zinc-100"></div>
          <div className="p-2 text-zinc-400 group-hover:text-indigo-600 transition-colors">
            <ShieldCheck size={20} />
          </div>
        </div>
      </div>

      {/* --- Section 02: Table Container --- */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-[2rem] border border-zinc-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.02)] overflow-hidden">
          <div className="p-2 md:p-4">
            <DataTable data={currentItems} onDelete={handleDeleteUser} />
          </div>

          {/* Pagination */}
          <div className="px-8 py-6 border-t border-zinc-50 flex items-center justify-between bg-zinc-50/30">
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-400">
              Page {currentPage} of {totalPages || 1}
            </span>
            <div className="flex gap-3">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 rounded-xl border border-zinc-200 flex items-center justify-center hover:bg-black hover:text-white disabled:opacity-20 transition-all bg-white"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages || data.length === 0}
                className="w-10 h-10 rounded-xl border border-zinc-200 flex items-center justify-center hover:bg-black hover:text-white disabled:opacity-20 transition-all bg-white"
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