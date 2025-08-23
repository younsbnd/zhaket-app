"use client"; // Mark this as a Client Component (runs in the browser in Next.js)
import React from "react";

export default function OrdersTable() {
  // Orders data array (mock dataset for table display)
  const orders = [
    { id: 1, customer: "علی رحیمی", date: "1404/06/01", status: "تحویل شده", amount: "250,000" },
    { id: 2, customer: "مریم احمدی", date: "1404/06/03", status: "در حال ارسال", amount: "180,000" },
    { id: 3, customer: "حسین قاسمی", date: "1404/06/05", status: "لغو شده", amount: "90,000" },
  ];

  // Function returns Tailwind classes based on order status
  const getStatusClasses = (status) => {
    switch (status) {
      case "تحویل شده": // Delivered
        return "bg-green-100 text-green-800 dark:bg-green-600 dark:text-white";
      case "در حال ارسال": // In transit / shipping
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-600 dark:text-white";
      case "لغو شده": // Cancelled
        return "bg-red-100 text-red-800 dark:bg-red-600 dark:text-white";
      default:
        return "";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md overflow-x-auto">
      {/* Responsive table with horizontal scroll on small screens */}
      <table className="min-w-full text-gray-800 dark:text-gray-200">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            {/* Table headers */}
            <th className="px-4 py-2 text-right">شماره سفارش</th> {/* Order ID */}
            <th className="px-4 py-2 text-right">نام مشتری</th> {/* Customer name */}
            <th className="px-4 py-2 text-right">تاریخ</th> {/* Date */}
            <th className="px-4 py-2 text-right">وضعیت</th> {/* Status */}
            <th className="px-4 py-2 text-right">مبلغ</th> {/* Amount */}
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id} // Unique key for React rendering
              className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              {/* Order ID */}
              <td className="px-4 py-2">{order.id}</td>

              {/* Customer name */}
              <td className="px-4 py-2">{order.customer}</td>

              {/* Order date */}
              <td className="px-4 py-2">{order.date}</td>

              {/* Status label with dynamic classes */}
              <td className="px-4 py-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${getStatusClasses(order.status)}`}
                >
                  {order.status}
                </span>
              </td>

              {/* Amount with currency label */}
              <td className="px-4 py-2">{order.amount} تومان</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
