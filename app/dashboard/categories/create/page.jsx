/** @format */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/Context/AuthContext';
import { createCategory } from '@/lib/categories';
import CategoriesForm from '../_components/CategoriesForm';
import { toast } from 'sonner';
import { ArrowLeft, Cpu, Shield } from 'lucide-react';
import Link from 'next/link';

const CreateCategoryPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { getValidToken } = useAuth();

  const handleCreateCategory = async (formData) => {
    setIsSubmitting(true);
    const toastId = toast.loading("Syncing with VELOCORE database...");

    try {
      const token = await getValidToken();
      if (!token) {
        throw new Error("Authentication failed. Please log in again.");
      }

      const response = await createCategory(formData, token);
      
      toast.success(response.message || "Category forged successfully!", { id: toastId });
      router.push('/dashboard/categories');

    } catch (err) {
      const errorMessage = err.message || 'An unexpected error occurred.';
      toast.error(errorMessage, { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-16 px-6 font-sans">
      
      {/* Top Navigation */}
      <div className="w-full max-w-2xl mb-12 flex justify-between items-center border-b border-zinc-100 pb-6">
        <Link 
          href="/dashboard/categories" 
          className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-black hover:opacity-50 transition-all"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Return to Hub
        </Link>
        <div className="flex items-center gap-2">
           <Shield size={12} className="text-zinc-300" />
           <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-300">Secure Access</span>
        </div>
      </div>

      {/* VELOCORE Branded Form Card */}
      <div className="w-full max-w-2xl bg-white rounded-[3rem] border border-zinc-100 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.06)] overflow-hidden">
        
        {/* Header Section - VELOCORE Identity */}
        <div className="p-10 md:p-14 bg-zinc-50/50">
          <div className="flex items-center gap-3 mb-4">
             <div className="w-10 h-[2px] bg-black"></div>
             <span className="text-[11px] font-black uppercase tracking-[0.4em] text-black">
                VELOCORE // SYSTEM
             </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter text-black leading-none">
            Create <br />
            <span className="text-zinc-200 not-italic">Collection.</span>
          </h1>
        </div>

        {/* Form Section */}
        <div className="p-10 md:p-14">
          <CategoriesForm
            onSubmit={handleCreateCategory}
            isSubmitting={isSubmitting}
            buttonText="Initialize Category"
          />
        </div>

      </div>

      {/* Brand Footer */}
      <div className="mt-12 flex flex-col items-center gap-2">
        <div className="flex items-center gap-4 opacity-20">
            <div className="h-[1px] w-12 bg-black"></div>
            <Cpu size={16} />
            <div className="h-[1px] w-12 bg-black"></div>
        </div>
        <p className="text-[9px] font-black text-zinc-300 uppercase tracking-[0.5em]">
          Designed for Excellence
        </p>
      </div>

    </div>
  );
};

export default CreateCategoryPage;