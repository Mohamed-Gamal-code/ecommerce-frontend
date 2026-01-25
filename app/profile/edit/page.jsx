/** @format */
"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { getUser, updateUser } from "../../../lib/user";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Image from "next/image";
import { ChevronLeft, Camera, User, Mail, Lock, Loader2 } from "lucide-react";

const EditProfilePage = () => {
  const { user, getValidToken } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    async function fetchUserData() {
      if (!user?._id) { setLoading(false); return; }
      try {
        const userData = await getUser(getValidToken, user._id);
        setFormData({
          name: userData.name,
          email: userData.email,
          password: "",
        });
        if (userData.avatar?.url) {
          setAvatarPreview(userData.avatar.url);
        }
      } catch (error) {
        console.error("Failed to load user data:", error);
        toast.error("Failed to load user data.");
      } finally { setLoading(false); }
    }
    fetchUserData();
  }, [user, getValidToken]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?._id) return;
    setIsUpdating(true);

    const updateData = new FormData();
    updateData.append("name", formData.name);
    updateData.append("email", formData.email);
    if (formData.password) updateData.append("password", formData.password);
    if (avatar) updateData.append("avatar", avatar);

    try {
      await updateUser(getValidToken, user._id, updateData);
      toast.success("Profile updated successfully!");
      router.push("/profile");
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center">
        <Loader2 className="animate-spin text-gray-300" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] py-12 px-6">
      <div className="max-w-2xl mx-auto">
        
        {/* Navigation & Title */}
        <div className="flex items-center justify-between mb-12">
          <button 
            onClick={() => router.back()}
            className="group flex items-center gap-2 text-gray-400 hover:text-black transition-colors"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-bold uppercase tracking-widest">Back</span>
          </button>
          <h1 className="text-xl font-black uppercase tracking-[0.2em] text-gray-900">Settings</h1>
          <div className="w-10"></div> {/* Spacer */}
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          
          {/* Avatar Upload Section */}
          <div className="flex flex-col items-center">
            <div className="relative group">
              <div className="relative w-32 h-32 md:w-40 md:h-40">
                <Image
                  src={avatarPreview || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
                  alt="Avatar Preview"
                  fill
                  className="rounded-[48px] object-cover border-4 border-white shadow-xl"
                />
                <label 
                  htmlFor="avatar" 
                  className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 rounded-[48px] cursor-pointer transition-all duration-300 backdrop-blur-[2px]"
                >
                  <Camera className="text-white" size={28} />
                </label>
              </div>
              <input
                type="file"
                name="avatar"
                id="avatar"
                className="hidden"
                onChange={handleAvatarChange}
                accept="image/*"
              />
            </div>
            <p className="mt-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Update Portrait</p>
          </div>

          {/* Form Fields */}
          <div className="bg-white border border-gray-100 rounded-[32px] p-8 md:p-10 shadow-sm space-y-8">
            
            {/* Name Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Full Identity</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="pl-12 h-14 bg-gray-50/50 border-none rounded-2xl focus-visible:ring-1 focus-visible:ring-black transition-all"
                  placeholder="Your Name"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Digital Mail</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-12 h-14 bg-gray-50/50 border-none rounded-2xl focus-visible:ring-1 focus-visible:ring-black transition-all"
                  placeholder="Email Address"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Security Cipher</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-12 h-14 bg-gray-50/50 border-none rounded-2xl focus-visible:ring-1 focus-visible:ring-black transition-all"
                  placeholder="Leave blank to keep current"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col gap-4">
              <Button 
                type="submit" 
                disabled={isUpdating}
                className="h-14 bg-black hover:bg-zinc-800 text-white rounded-2xl font-bold transition-all shadow-lg shadow-black/5"
              >
                {isUpdating ? <Loader2 className="animate-spin mr-2" /> : "SAVE CHANGES"}
              </Button>
              <Button 
                type="button"
                variant="ghost"
                onClick={() => router.back()}
                className="h-14 rounded-2xl text-gray-400 font-bold hover:bg-gray-50 transition-all"
              >
                CANCEL
              </Button>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;