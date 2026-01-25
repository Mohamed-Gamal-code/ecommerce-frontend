/** @format */

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../Context/AuthContext";
import { getDashboardStats } from "../../../lib/product";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";
import {
  TrendingUp,
  Users,
  Package,
  ShoppingCart,
  ArrowUpRight,
  Activity,
  Calendar,
  Filter,
  Download,
} from "lucide-react";

const AnalyticsPage = () => {
  const { accessToken, user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeFilter, setTimeFilter] = useState("30d");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats(accessToken);
        setStats(data);
      } catch (err) {
        if (err.message.includes("Invalid or expired token")) {
          router.push("/login");
          return;
        }
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (accessToken && user) {
      fetchStats();
    } else if (!authLoading) {
      setLoading(false);
    }
  }, [accessToken, user, authLoading, router]);

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
            You need to be logged in as an admin to view analytics.
          </p>
          <a
            href="/login"
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-zinc-100 border-t-black rounded-full animate-spin" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
            Loading Analytics...
          </span>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="pt-32 text-center text-red-500 font-black uppercase tracking-widest">
        {error}
      </div>
    );

  if (!stats)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-zinc-100 border-t-black rounded-full animate-spin" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
            Loading Analytics...
          </span>
        </div>
      </div>
    );

  // بيانات تجريبية للرسوم البيانية الزمنية (في الواقع ستأتي من API)
  const salesData = [
    { date: "2024-01-01", sales: 1200, orders: 12 },
    { date: "2024-01-02", sales: 1800, orders: 18 },
    { date: "2024-01-03", sales: 2400, orders: 24 },
    { date: "2024-01-04", sales: 1600, orders: 16 },
    { date: "2024-01-05", sales: 2800, orders: 28 },
    { date: "2024-01-06", sales: 3200, orders: 32 },
    { date: "2024-01-07", sales: 2900, orders: 29 },
  ];

  const productPerformanceData = [
    { name: "Electronics", value: 35, color: "#8884d8" },
    { name: "Clothing", value: 25, color: "#82ca9d" },
    { name: "Books", value: 20, color: "#ffc658" },
    { name: "Home", value: 15, color: "#ff7c7c" },
    { name: "Sports", value: 5, color: "#8dd1e1" },
  ];

  const COLORS = ["#f4f4f5", "#000000"];

  return (
    <div className="bg-white min-h-screen pt-24 pb-20">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-black">
              Analytics <span className="text-zinc-200">Center</span>
            </h1>
            <div className="w-12 h-1 bg-black mb-4"></div>
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-[0.2em]">
              Deep insights into your business performance.
            </p>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="p-8 bg-zinc-50 rounded-[2rem] border border-zinc-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-2">
                  Total Revenue
                </p>
                <h3 className="text-3xl font-black italic tracking-tighter">
                  ${stats.revenue.toFixed(2)}
                </h3>
              </div>
              <TrendingUp className="text-green-500" size={24} />
            </div>
            <div className="flex items-center gap-1">
              <span className="text-green-500 text-xs font-bold">+12.5%</span>
              <span className="text-zinc-400 text-xs">vs last month</span>
            </div>
          </div>

          <div className="p-8 bg-zinc-50 rounded-[2rem] border border-zinc-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-2">
                  Conversion Rate
                </p>
                <h3 className="text-3xl font-black italic tracking-tighter">
                  3.2%
                </h3>
              </div>
              <Activity className="text-blue-500" size={24} />
            </div>
            <div className="flex items-center gap-1">
              <span className="text-green-500 text-xs font-bold">+0.8%</span>
              <span className="text-zinc-400 text-xs">vs last month</span>
            </div>
          </div>

          <div className="p-8 bg-zinc-50 rounded-[2rem] border border-zinc-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-2">
                  Avg Order Value
                </p>
                <h3 className="text-3xl font-black italic tracking-tighter">
                  ${(stats.revenue / stats.orders.total).toFixed(2)}
                </h3>
              </div>
              <ShoppingCart className="text-purple-500" size={24} />
            </div>
            <div className="flex items-center gap-1">
              <span className="text-red-500 text-xs font-bold">-2.1%</span>
              <span className="text-zinc-400 text-xs">vs last month</span>
            </div>
          </div>

          <div className="p-8 bg-zinc-50 rounded-[2rem] border border-zinc-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-2">
                  Customer Lifetime
                </p>
                <h3 className="text-3xl font-black italic tracking-tighter">
                  24d
                </h3>
              </div>
              <Users className="text-orange-500" size={24} />
            </div>
            <div className="flex items-center gap-1">
              <span className="text-green-500 text-xs font-bold">+5.2%</span>
              <span className="text-zinc-400 text-xs">vs last month</span>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Sales Trend */}
          <div className="lg:col-span-2 p-10 bg-white border border-zinc-100 rounded-[3rem] shadow-sm">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-xl font-black uppercase italic tracking-tighter">
                Sales Trend
              </h3>
              <div className="flex gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-black rounded-full" />{" "}
                  <span className="text-[10px] font-bold uppercase">
                    Revenue
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-zinc-300 rounded-full" />{" "}
                  <span className="text-[10px] font-bold uppercase">
                    Orders
                  </span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart
                data={salesData}
                margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#000000" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#000000" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#e4e4e7" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#e4e4e7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f4f4f5"
                />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fontWeight: 900, fill: "#a1a1aa" }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fontWeight: 900, fill: "#a1a1aa" }}
                />
                <Tooltip
                  cursor={{ fill: "#fafafa" }}
                  contentStyle={{
                    borderRadius: "20px",
                    border: "none",
                    boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#000000"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                  strokeWidth={3}
                />
                <Area
                  type="monotone"
                  dataKey="orders"
                  stroke="#a1a1aa"
                  fillOpacity={1}
                  fill="url(#colorOrders)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Product Categories Performance */}
          <div className="p-10 bg-zinc-950 rounded-[3rem] text-white overflow-hidden relative">
            <h3 className="text-xl font-black uppercase italic tracking-tighter mb-8 relative z-10">
              Category Performance
            </h3>
            <div className="relative h-[300px] z-10">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={productPerformanceData}
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {productPerformanceData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                  Total
                </span>
                <p className="text-3xl font-black italic">100%</p>
              </div>
            </div>
            <div className="mt-6 space-y-3 relative z-10">
              {productPerformanceData.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest border-b border-zinc-800 pb-2"
                >
                  <span className="text-zinc-400">{item.name}</span>
                  <span>{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Performing Products */}
          <div className="p-10 bg-zinc-50 rounded-[3rem] border border-zinc-100">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-black uppercase italic tracking-tighter">
                Top Products
              </h3>
              <ArrowUpRight size={20} className="text-zinc-300" />
            </div>
            <div className="space-y-6">
              {stats.topProducts.slice(0, 5).map((product, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 group cursor-pointer"
                >
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-zinc-50 border border-zinc-100 p-2 flex items-center justify-center">
                    {product.coverImage ? (
                      <img
                        src={product.coverImage.url}
                        alt={product.title}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0].url}
                        alt={product.title}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      <Package size={24} className="text-zinc-400" />
                    )}
                  </div>
                  <div className="flex-grow">
                    <p className="text-xs font-black uppercase tracking-tight text-zinc-900 mb-1">
                      {product.title}
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="text-[10px] font-bold text-zinc-400 italic">
                        ${product.price.toFixed(2)}
                      </p>
                      <div className="flex items-center gap-1">
                        <span className="text-[9px] font-black uppercase tracking-widest text-green-600">
                          +{Math.floor(Math.random() * 50) + 10}%
                        </span>
                        <TrendingUp size={12} className="text-green-600" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="p-10 bg-white border border-zinc-100 rounded-[3rem]">
            <h3 className="text-xl font-black uppercase italic tracking-tighter mb-8">
              Recent Activity
            </h3>
            <div className="space-y-4">
              {stats.recentCategories.slice(0, 5).map((category, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-5 bg-zinc-50 rounded-2xl border border-zinc-100 group hover:scale-[1.02] transition-transform"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <div>
                      <p className="text-sm font-black italic tracking-tight">
                        New category added
                      </p>
                      <p className="text-[9px] font-black uppercase text-zinc-400 tracking-widest">
                        {category.name}
                      </p>
                    </div>
                  </div>
                  <span className="text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-blue-100 text-blue-600">
                    Category
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
