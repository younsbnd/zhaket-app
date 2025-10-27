import React from "react";

// DashboardChartSkeleton is a skeleton for the dashboard chart
const DashboardChartSkeleton = () => {
  return (
    <div className="glass rounded-2xl p-6 animate-pulse">
      <div className="flex items-center justify-between mb-6">
        <div className="w-32 h-6 bg-slate-700 rounded"></div>
        <div className="w-40 h-10 bg-slate-700 rounded-lg"></div>
      </div>
      <div className="flex items-end justify-between gap-2 h-[250px]">
        {[60, 40, 80, 50, 90, 70, 85].map((height, index) => (
          <div
            key={index}
            className="bg-slate-700 rounded-t-lg flex-1"
            style={{ height: `${height}%` }}
          ></div>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        {[1, 2, 3, 4, 5, 6, 7].map((item) => (
          <div key={item} className="w-12 h-3 bg-slate-700 rounded"></div>
        ))}
      </div>
    </div>
  );
};

export default DashboardChartSkeleton;

