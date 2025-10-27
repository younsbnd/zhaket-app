"use client";
import React from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/api/fetcher";
import SalesChart from "./SalesChart";
import DashboardChartSkeleton from "@/components/skeletons/admin/DashboardChartSkeleton";

const SalesChartContent = () => {
  // Fetch data from API using SWR
  const { data: result, error, isLoading } = useSWR(
    process.env.NEXT_PUBLIC_API_BASE_URL + "/admin/dashboard/stats",
    fetcher
  );

  // If loading, show the skeleton
  if (isLoading) {
    return <DashboardChartSkeleton />;
  }

  // If error, show the error message
  if (error) {
    return (
      <div className="glass rounded-2xl p-6">
        <div className="text-center py-12">
          <p className="text-red-400">خطا در دریافت داده‌های نمودار</p>
          <p className="text-slate-400 text-sm mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  // If no data, show the skeleton
  if (!result?.data) {
    return <DashboardChartSkeleton />;
  }

  // Extract weekly and monthly sales data
  const { weeklySales, monthlySales } = result.data;

  return (
    <div className="w-full glass rounded-2xl p-6">
      <SalesChart weeklyData={weeklySales} monthlyData={monthlySales} />
    </div>
  );
};

export default SalesChartContent;

