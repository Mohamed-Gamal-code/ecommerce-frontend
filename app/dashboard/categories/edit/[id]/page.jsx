/** @format */

"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/app/Context/AuthContext";
import { getSingleCategory, updateCategory } from "@/lib/categories";
import CategoriesForm from "../../_components/CategoriesForm";
import { toast } from "sonner";
import { ArrowLeft, Edit3, Fingerprint } from "lucide-react";
import Link from "next/link";

const EditCategoryPage = () => {
  const [category, setCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const params = useParams();
  const { getValidToken } = useAuth();
  const { id } = params;

  useEffect(() => {
    if (id) {
      const fetchCategory = async () => {
        setIsLoading(true);
        try {
          const response = await getSingleCategory(id);
          setCategory(response);
        } catch (err) {
          toast.error(err.message || "Failed to fetch category data.");
        } finally {
          setIsLoading(false);
        }
      };
      fetchCategory();
    }
  }, [id]);

  const handleUpdateCategory = async (formData) => {
    setIsSubmitting(true);
    const toastId = toast.loading("Updating VELOCORE collection...");

    try {
      const token = await getValidToken();
      if (!token) throw new Error("Authentication failed.");

      const response = await updateCategory(id, formData, token);
      toast.success(response.message || "Collection updated!", { id: toastId });
      router.push("/dashboard/categories");
    } catch (err) {
      toast.error(err.message || "An unexpected error occurred.", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="w-10 h-10 border-2 border-zinc-100 border-t-black animate-spin rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-16 px-6 font-sans">
      
      {/* Top Meta Navigation */}
      <div className="w-full max-w-2xl mb-12 flex justify-between items-center border-b border-zinc-50 pb-6">
        <Link 
          href="/dashboard/categories" 
          className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-black hover:opacity-50 transition-all"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Hub
        </Link>
        <div className="flex items-center gap-2">
           <Fingerprint size={12} className="text-zinc-300" />
           <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-300">ID: {id?.slice(-8)}</span>
        </div>
      </div>

      {/* Main Edit Card */}
      <div className="w-full max-w-2xl bg-white rounded-[3rem] border border-zinc-100 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.06)] overflow-hidden">
        
        {/* Header - VELOCORE Identity */}
        <div className="p-10 md:p-14 bg-zinc-50/50 border-b border-zinc-100">
          <div className="flex items-center gap-3 mb-4">
             <div className="w-8 h-[2px] bg-black"></div>
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black">
                VELOCORE // UPDATE
             </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter text-black leading-none">
            Edit <br />
            <span className="text-zinc-200 not-italic">Refinement.</span>
          </h1>
        </div>

        {/* Form Body */}
        <div className="p-10 md:p-14">
          <CategoriesForm
            onSubmit={handleUpdateCategory}
            isSubmitting={isSubmitting}
            initialData={category}
            buttonText="Save Refinements"
          />
        </div>

      </div>

      {/* Footer Branding */}
      <div className="mt-12 flex flex-col items-center gap-3">
        <Edit3 size={18} className="text-zinc-200" />
        <p className="text-[9px] font-black text-zinc-300 uppercase tracking-[0.6em]">
          Precision over everything
        </p>
      </div>

    </div>
  );
};

export default EditCategoryPage;