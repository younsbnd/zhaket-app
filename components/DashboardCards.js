"use client"; // Marks this component as a Client Component (runs only in the browser in Next.js)

import { FaPlus } from "react-icons/fa"; // Import the "plus" icon from react-icons

export default function DashboardCards() {
  // Array of statistics to be displayed as cards
  const stats = [
    {
      title: "سفارشات امروز",        // Card title ("Today's Orders")
      value: "۸۷۶",                  // Main value (number of orders)
      subValue: "۱۲۸+",               // Change compared to previous period
      subColor: "text-green-500",     // Text color for subValue
      chart: "bar",                   // Chart type for the card
    },
    {
      title: "نرخ تبدیل",             // "Conversion Rate"
      value: "۳.۹٪",                  // Conversion rate percentage
      subValue: "۸۲–",                 // Change (negative)
      subColor: "text-red-500",       // Red color for negative change
      chart: "progress",              // Chart type
    },
    {
      title: "کاربران فعال",          // "Active Users"
      value: "۵۳,۱۲۸",                // Number of active users
      subValue: "۱,۲۰۰+",              // Positive growth
      subColor: "text-green-500",     // Green color for positive change
      chart: "bars",                  // Chart type
    },
    {
      title: "درآمد امروز",           // "Today's Revenue"
      value: "۲۴,۸۵۰,۰۰۰ تومان",       // Revenue amount
      subValue: "۵.۴٪+",               // Positive percentage growth
      subColor: "text-green-500",
      chart: "wave",                  // Wave-style chart
    },
  ];

  return (
    <div className="w-full space-y-6"> {/* Main container with vertical gap between child elements */}
      
      {/* Header section with welcome text and "Add Report" button */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Welcome message */}
        <div className="text-center lg:text-leftL">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
            خوش آمدید 👋 {/* "Welcome" text */}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            چشم‌انداز کلی کسب‌وکار شما در یک نگاه. {/* "Your business overview in one glance" */}
          </p>
        </div>

        {/* "Add Report" button with icon */}
        <button className="flex items-center gap-2 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition">
          <FaPlus size={14} />
          افزودن گزارش {/* "Add Report" */}
        </button>
      </div>

      {/* Statistics cards section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((item, idx) => (
          <div
            key={idx} // Unique key for React list rendering
            className="p-4 rounded-xl shadow-md space-y-3 transition-colors bg-white dark:bg-gray-800"
          >
            {/* Sub value (growth or decrease indicator) */}
            <div className={`text-xs ${item.subColor} font-semibold`}>
              {item.subValue}
            </div>

            {/* Main statistic value */}
            <div className="text-xl font-bold text-gray-900 dark:text-white">
              {item.value}
            </div>

            {/* Card title */}
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {item.title}
            </div>

            {/* Chart rendering based on the "chart" type */}
            <div className="mt-2">

              {/* "bar" type chart */}
              {item.chart === "bar" && (
                <div className="flex gap-1 items-end h-10">
                  {[3, 5, 4, 6, 7, 4].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded transition-colors bg-blue-500 dark:bg-blue-400"
                      style={{ height: `${h * 6}px` }} // Dynamic height
                    ></div>
                  ))}
                </div>
              )}

              {/* "progress" type chart (progress bar) */}
              {item.chart === "progress" && (
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div className="bg-blue-500 dark:bg-blue-400 h-2 w-1/2"></div>
                </div>
              )}

              {/* "bars" type chart (multiple bars) */}
              {item.chart === "bars" && (
                <div className="flex gap-1 items-end h-10">
                  {[6, 8, 7, 5, 9, 4].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded transition-colors bg-green-500 dark:bg-green-400"
                      style={{ height: `${h * 4}px` }}
                    ></div>
                  ))}
                </div>
              )}

              {/* "wave" type chart (SVG wave graphic) */}
              {item.chart === "wave" && (
                <div className="h-6 overflow-hidden">
                  <svg
                    viewBox="0 0 500 150"
                    preserveAspectRatio="none"
                    className="h-full w-full"
                  >
                    <path
                      d="M0.00,49.98 C150.00,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
                      className="fill-blue-400 dark:fill-blue-300"
                    ></path>
                  </svg>
                </div>
              )}

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
