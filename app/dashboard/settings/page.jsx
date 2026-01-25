/** @format */

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../Context/AuthContext";
import { User, Save, Eye, EyeOff } from "lucide-react";
import { updateUserProfile } from "../../../lib/user";

const SettingsPage = () => {
  const { accessToken, user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form states - Profile Only
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user) {
      setProfileData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  if (authLoading) {
    return (
      <div className="pt-24 pb-10 max-w-7xl mx-auto px-4">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!user || !accessToken || user.role !== "admin") {
    return (
      <div className="pt-24 pb-10 max-w-7xl mx-auto px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-4">
            You need to be logged in as an admin to access settings.
          </p>
          <button
            onClick={() => router.push("/login")}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    
    if (profileData.newPassword && profileData.newPassword !== profileData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const updateData = {
        name: profileData.name,
        email: profileData.email,
      };
      
      if (profileData.newPassword) {
        updateData.currentPassword = profileData.currentPassword;
        updateData.newPassword = profileData.newPassword;
      }

      const response = await updateUserProfile(
        accessToken,
        user._id,
        updateData
      );

      if (response.success) {
        alert("Profile updated successfully!");
      }
    } catch (error) {
      alert(error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col gap-2 mb-12">
          <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-black">
            Account <span className="text-zinc-200">Settings</span>
          </h1>
          <div className="w-12 h-1 bg-black mb-4"></div>
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-[0.2em]">
            Manage your personal profile and security.
          </p>
        </div>

        <div className="bg-white border border-zinc-100 rounded-[2rem] p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <User className="text-black" size={24} />
            <h2 className="text-2xl font-black uppercase italic tracking-tighter">
              Profile Information
            </h2>
          </div>

          <form onSubmit={handleProfileUpdate} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-zinc-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) =>
                    setProfileData({ ...profileData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-zinc-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) =>
                    setProfileData({ ...profileData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="border-t border-zinc-100 pt-6">
              <h3 className="text-lg font-bold mb-4">Security & Password</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-zinc-700 mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={profileData.currentPassword}
                      onChange={(e) =>
                        setProfileData({ ...profileData, currentPassword: e.target.value })
                      }
                      className="w-full px-4 py-3 pr-12 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="Required to change password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-zinc-700 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={profileData.newPassword}
                      onChange={(e) =>
                        setProfileData({ ...profileData, newPassword: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="Enter new password"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-zinc-700 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={profileData.confirmPassword}
                      onChange={(e) =>
                        setProfileData({ ...profileData, confirmPassword: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-8 py-3 bg-black text-white rounded-lg font-bold hover:bg-zinc-800 transition-all disabled:opacity-50"
              >
                <Save size={20} />
                {loading ? "Saving..." : "Update Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;