"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, LoaderCircle, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useAuth } from "../Context/AuthContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const RegisterPage = () => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await register(formData);
      if (response.success) {
        toast.success("Welcome aboard!");
        setTimeout(() => router.push("/"), 1500);
      } else {
        setError(response.message || "Registration failed.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] relative overflow-hidden">
      {/* Mesh Gradient Background - لمسة فنية هادئة جداً */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-100/40 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-50/60 blur-[120px] rounded-full"></div>
      </div>

      <div className="w-full max-w-[460px] p-6">
        <div className="bg-white border border-gray-100 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.02)] p-10 md:p-12">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-3">
              Create your account
            </h1>
            <p className="text-gray-500 font-medium">
              Join thousands of users shopping with us.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-4">
              {/* Name Field */}
              <div className="space-y-2">
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-black transition-colors" />
                  <input
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:bg-white focus:ring-2 focus:ring-black transition-all font-medium text-gray-900 placeholder:text-gray-400"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-black transition-colors" />
                  <input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:bg-white focus:ring-2 focus:ring-black transition-all font-medium text-gray-900 placeholder:text-gray-400"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-black transition-colors" />
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full pl-12 pr-12 py-4 bg-gray-50 border-none rounded-2xl focus:bg-white focus:ring-2 focus:ring-black transition-all font-medium text-gray-900 placeholder:text-gray-400"
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm font-bold bg-red-50 p-3 rounded-xl border border-red-100">
                {error}
              </p>
            )}

            <Button
              disabled={loading}
              className="w-full py-8 bg-black hover:bg-zinc-800 text-white rounded-2xl text-[17px] font-bold shadow-2xl shadow-zinc-200 transition-all flex items-center justify-center gap-3"
            >
              {loading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <>
                  Get Started <ArrowRight size={20} />
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-50 text-center">
            <p className="text-gray-500 font-medium">
              Already a member?{" "}
              <Link href="/login" className="text-black font-bold hover:underline underline-offset-4">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;