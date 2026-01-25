/** @format */

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/Context/AuthContext";
import { createProduct } from "@/lib/product";
import { getAllCategory } from "@/lib/categories";
import { toast } from "sonner";
import { ArrowLeft, Box, Sparkles, Layers } from "lucide-react";
import ProductForm from "../../_components/ProductForm";
import Link from "next/link";

const CreateProductPage = () => {
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { getValidToken } = useAuth();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesResponse = await getAllCategory();
        setCategories(categoriesResponse.data || []);
      } catch (err) {
        toast.error(err.message || "Failed to fetch categories.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleCreateProduct = async (formData) => {
    setIsSubmitting(true);
    const toastId = toast.loading("Forging new product into VELOCORE...");

    try {
      const token = await getValidToken();
      if (!token) throw new Error("Authentication failed.");

      const response = await createProduct(formData, token);
      toast.success(response.message || "Product launched!", { id: toastId });
      
      router.push("/dashboard/products");
      router.refresh();
    } catch (err) {
      toast.error(err.message || "An unexpected error occurred.", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-zinc-50 border-t-black animate-spin rounded-full" />
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Loading Categories</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50/30 flex flex-col items-center py-16 px-6 font-sans">
      
      {/* Navigation Header */}
      <div className="w-full max-w-3xl mb-12 flex justify-between items-center border-b border-zinc-100 pb-8">
        <Link 
          href="/dashboard/products" 
          className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 hover:text-black transition-all"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Inventory
        </Link>
        <div className="flex items-center gap-2">
           <Layers size={14} className="text-zinc-300" />
           <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-300">Vault / Production</span>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="w-full max-w-3xl bg-white rounded-[3rem] border border-zinc-100 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.04)] overflow-hidden">
        
        {/* Header - VELOCORE Style */}
        <div className="p-10 md:p-14 bg-zinc-50/50 border-b border-zinc-100">
          <div className="flex items-center gap-3 mb-4">
             <div className="w-10 h-[2px] bg-black"></div>
             <span className="text-[11px] font-black uppercase tracking-[0.4em] text-black">
                VELOCORE // PRODUCT
             </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter text-black leading-none">
            New <br />
            <span className="text-zinc-200 not-italic">Creation.</span>
          </h1>
        </div>

        {/* Form Body */}
        <div className="p-10 md:p-14">
          <ProductForm
            onSubmit={handleCreateProduct}
            isSubmitting={isSubmitting}
            categories={categories}
            buttonText="Launch Product"
          />
        </div>

      </div>

      {/* Aesthetic Footer */}
      <div className="mt-12 flex flex-col items-center gap-3 opacity-30">
        <Box size={20} className="text-black" />
        <p className="text-[9px] font-black text-black uppercase tracking-[0.6em]">
          Mastery in every detail
        </p>
      </div>

    </div>
  );
};

export default CreateProductPage;