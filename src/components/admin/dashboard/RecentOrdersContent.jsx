"use client";
import React from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/api/fetcher";
import Link from "next/link";
import { FiArrowLeft, FiUser } from "react-icons/fi";
import DashboardOrdersSkeleton from "@/components/skeletons/admin/DashboardOrdersSkeleton";

const RecentOrdersContent = () => {
  // Fetch recent orders using SWR
  const {
    data: result,
    error,
    isLoading,
  } = useSWR(
    process.env.NEXT_PUBLIC_API_BASE_URL + "/admin/dashboard/recent-orders",
    fetcher
  );

  // if loading, show loading skeleton
  if (isLoading) {
    return <DashboardOrdersSkeleton />;
  }

  // if error, show error message
  if (error) {
    return (
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">آخرین سفارشات</h2>
        </div>
        <div className="text-center py-12">
          <p className="text-red-400">خطا در دریافت سفارشات</p>
          <p className="text-slate-400 text-sm mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  const orders = result?.data || [];

  // get status badge
  const getStatusBadge = (status) => {
    const statusMap = {
      PENDING: {
        label: "در انتظار",
        class: "bg-yellow-500/20 text-yellow-400",
      },
      PAID: { label: "پرداخت شده", class: "bg-blue-500/20 text-blue-400" },
      COMPLETED: {
        label: "تکمیل شده",
        class: "bg-green-500/20 text-green-400",
      },
      FAILED: { label: "ناموفق", class: "bg-red-500/20 text-red-400" },
      CANCELLED: { label: "لغو شده", class: "bg-gray-500/20 text-gray-400" },
    };
    return statusMap[status] || statusMap.PENDING;
  };

  // format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="glass rounded-2xl p-6">
      {/* header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">آخرین سفارشات</h2>
        <Link
          href="/admin/orders"
          className="text-blue-400 hover:text-blue-300 transition-colors text-sm flex items-center gap-2"
        >
          مشاهده همه
          <FiArrowLeft />
        </Link>
      </div>

      {/* orders list */}
      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-400">هیچ سفارشی وجود ندارد</p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => {
            const statusInfo = getStatusBadge(order.status);
            return (
              <div
                key={order._id}
                className="flex items-center justify-between p-4 bg-slate-800/40 rounded-lg hover:bg-slate-800/60 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  {/* user avatar */}
                  <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400">
                    <FiUser />
                  </div>
                  {/* order info */}
                  <div className="flex-1">
                    <p className="text-white font-medium">
                      سفارش #{order.orderNumber}
                    </p>
                    <p className="text-sm text-slate-400">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                </div>
                {/* order price and status */}
                <div className="flex items-center gap-4">
                  <p className="text-white font-medium">
                    {order.totalPrice.toLocaleString("fa-IR")} تومان
                  </p>
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${statusInfo.class}`}
                  >
                    {statusInfo.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RecentOrdersContent;
