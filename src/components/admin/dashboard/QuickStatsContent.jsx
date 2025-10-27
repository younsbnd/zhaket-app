"use client";
import React from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/api/fetcher";
import StatCard from "./StatCard";
import DashboardStatsSkeleton from "@/components/skeletons/admin/DashboardStatsSkeleton";
import {
  FiUsers,
  FiDollarSign,
  FiShoppingCart,
  FiPackage,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";

const QuickStatsContent = () => {
  // Fetch data from API using SWR
  const {
    data: result,
    error,
    isLoading,
  } = useSWR(
    process.env.NEXT_PUBLIC_API_BASE_URL + "/admin/dashboard/stats",
    fetcher
  );

  // If loading, show the skeleton
  if (isLoading) {
    return <DashboardStatsSkeleton />;
  }

  // If error, show the error message
  if (error) {
    return (
      <div className="glass rounded-2xl p-6">
        <div className="text-center py-12">
          <p className="text-red-400">خطا در دریافت آمار داشبورد</p>
          <p className="text-slate-400 text-sm mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  // If no data, show the skeleton
  if (!result?.data) {
    return <DashboardStatsSkeleton />;
  }

  // Extract stats data
  const { stats } = result.data;

  // Create stats cards
  const statsCards = [
    {
      title: "کاربران فعال",
      value: stats.activeUsers,
      icon: FiUsers,
      subtitle: "30 روز اخیر",
      colorClass: "bg-blue-500/20 text-blue-400",
    },
    {
      title: "فروش این ماه",
      value: `${(stats.monthSales / 1000000).toFixed(1)}M`,
      icon: FiDollarSign,
      subtitle: "تومان",
      colorClass: "bg-green-500/20 text-green-400",
    },
    {
      title: "سفارشات تکمیل شده",
      value: stats.completedOrders,
      icon: FiCheckCircle,
      subtitle: "تمام زمان ‌ها",
      colorClass: "bg-emerald-500/20 text-emerald-400",
    },
    {
      title: "سفارشات در انتظار",
      value: stats.pendingOrders,
      icon: FiClock,
      subtitle: "نیاز به بررسی",
      colorClass: "bg-yellow-500/20 text-yellow-400",
    },
    {
      title: "کل محصولات",
      value: stats.totalProducts,
      icon: FiPackage,
      subtitle: "محصولات فعال",
      colorClass: "bg-purple-500/20 text-purple-400",
    },
    {
      title: "کل کاربران",
      value: stats.totalUsers,
      icon: FiShoppingCart,
      subtitle: "تمام زمان‌ ها",
      colorClass: "bg-pink-500/20 text-pink-400",
    },
  ];

  // Render the stats cards
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {statsCards.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default QuickStatsContent;
