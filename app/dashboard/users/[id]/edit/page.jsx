/** @format */
"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/app/Context/AuthContext";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Camera, User, Mail, Lock, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { getUser, updateUser } from "@/lib/user";

export default function EditUserPage() {
  const { id } = useParams();
  const { user: authUser, getValidToken, loading: authLoading } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isOwner = authUser?._id === id;
  const isAdmin = authUser?.role === "admin";

  useEffect(() => {
    if (authLoading) return;
    if (!isOwner && !isAdmin) {
      toast.error("Access Denied.");
      router.push("/dashboard");
      return;
    }

    const fetchUserData = async () => {
      try {
        setLoading(true);
        const userData = await getUser(getValidToken, id);
        if (userData) {
          setFormData({ name: userData.name, email: userData.email, password: "" });
          if (userData.avatar?.url) setAvatarPreview(userData.avatar.url);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [id, getValidToken, authLoading, isOwner, isAdmin, router]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const toastId = toast.loading("Updating your profile...");

    try {
      const updateData = { ...formData };
      if (!updateData.password) delete updateData.password;
      if (avatarFile) updateData.avatar = avatarFile;

      await updateUser(getValidToken, id, updateData);
      toast.success("Profile Updated!", { id: toastId });
      router.push(`/dashboard/users/${id}`);
    } catch (err) {
      toast.error(err.message || "Update failed", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || authLoading) return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="w-12 h-12 border-4 border-zinc-100 border-t-black animate-spin rounded-full" />
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-50/30 p-4 md:p-12 font-sans">
      <div className="max-w-2xl mx-auto">
        
        {/* Navigation */}
        <Link
          href={`/dashboard/users/${id}`}
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-black mb-8 text-[10px] font-black uppercase tracking-[0.3em] transition-all"
        >
          <ArrowLeft size={16} /> Back to Details
        </Link>

        <div className="bg-white rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] border border-zinc-100 overflow-hidden">
          
          <div className="p-8 md:p-12">
            <h1 className="text-3xl font-black uppercase italic tracking-tighter mb-10 border-b border-zinc-50 pb-6">
              Account <span className="text-zinc-200 not-italic">Settings.</span>
            </h1>

            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Modern Avatar Section - التصميم الجديد للصورة */}
              <div className="flex justify-center mb-12">
                <div className="relative group">
                  {/* الدائرة المحيطة بالصورة بتصميم بوهيمي/مودرن */}
                  <div className="absolute -inset-2 border border-dashed border-zinc-200 rounded-full animate-[spin_20s_linear_infinite] group-hover:border-black transition-colors" />
                  
                  <div className="relative w-32 h-32 md:w-40 md:h-40 bg-zinc-100 rounded-full p-1 border border-white shadow-inner overflow-hidden">
                    <Image
                      src={avatarPreview || "/default-avatar.png"}
                      alt="Avatar"
                      fill
                      className="object-cover rounded-full group-hover:scale-110 transition-transform duration-700"
                    />
                    <label
                      htmlFor="avatar-input"
                      className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                    >
                      <Camera className="text-white mb-1" size={24} />
                      <span className="text-[8px] text-white font-black uppercase tracking-widest">Change</span>
                    </label>
                  </div>
                  
                  <input type="file" id="avatar-input" className="hidden" onChange={handleAvatarChange} accept="image/*" />
                </div>
              </div>

              {/* Form Inputs */}
              <div className="space-y-6">
                
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-2 px-1">
                    <User size={12} /> Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="Enter your full name"
                    className="w-full px-6 py-4 bg-zinc-50 border border-transparent focus:border-zinc-200 focus:bg-white rounded-2xl outline-none transition-all font-medium"
                    required
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-2 px-1">
                    <Mail size={12} /> Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="email@velocore.com"
                    className="w-full px-6 py-4 bg-zinc-50 border border-transparent focus:border-zinc-200 focus:bg-white rounded-2xl outline-none transition-all font-medium"
                    required
                  />
                </div>

                {/* Reset Password */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-2 px-1">
                    <Lock size={12} /> Reset Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleFormChange}
                    placeholder="••••••••"
                    className="w-full px-6 py-4 bg-zinc-50 border border-transparent focus:border-zinc-200 focus:bg-white rounded-2xl outline-none transition-all font-medium"
                  />
                  <p className="text-[9px] text-zinc-300 font-bold uppercase tracking-tight px-1">
                    * Leave empty to keep your current password secure.
                  </p>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-5 bg-black text-white rounded-full font-black uppercase tracking-[0.2em] text-[11px] hover:bg-zinc-800 transition-all flex items-center justify-center gap-3 shadow-xl disabled:opacity-30"
                >
                  {isSubmitting ? (
                    "Processing..."
                  ) : (
                    <>
                      Save Changes <CheckCircle2 size={16} />
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}