"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, LoaderCircle, Eye, EyeOff, ArrowRight, LogIn } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useAuth } from "../Context/AuthContext";

const LoginPage = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
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
      const response = await login(formData);
      if (response.success) {
        toast.success(response.message || "Welcome back! Redirecting...");
        setTimeout(() => {
          router.push("/");
        }, 1500);
      } else {
        setError(response.message || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] relative overflow-hidden font-sans">
      {/* Mesh Gradient Background - نفس روح صفحة الـ Register */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-100/40 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-50/60 blur-[120px] rounded-full"></div>
      </div>

      <div className="w-full max-w-[460px] p-6">
        <div className="bg-white border border-gray-100 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.02)] p-10 md:p-12">
          
          {/* Header Section */}
          <div className="mb-10 text-left">
            <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-zinc-200">
              <LogIn className="text-white w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-3">
              Welcome Back
            </h1>
            <p className="text-gray-500 font-medium italic">
              Sign in to continue your shopping.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-4">
              {/* Email Field */}
              <div className="space-y-1">
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-black transition-colors" />
                  <input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:bg-white focus:ring-2 focus:ring-black transition-all font-medium text-gray-900 placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1">
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-black transition-colors" />
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-12 py-4 bg-gray-50 border-none rounded-2xl focus:bg-white focus:ring-2 focus:ring-black transition-all font-medium text-gray-900 placeholder:text-gray-400"
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
              <div className="p-4 bg-red-50 border border-red-100 rounded-2xl">
                <p className="text-red-600 text-sm font-bold text-center">{error}</p>
              </div>
            )}

            <Button
              disabled={loading}
              className="w-full py-8 bg-black hover:bg-zinc-800 text-white rounded-2xl text-[17px] font-bold shadow-2xl shadow-zinc-200 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              {loading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <>
                  Sign In <ArrowRight size={20} />
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-50 text-center">
            <p className="text-gray-500 font-medium">
              New here?{" "}
              <Link href="/register" className="text-black font-bold hover:underline underline-offset-4">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;