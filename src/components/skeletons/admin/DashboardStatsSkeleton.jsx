import React from "react";

// DashboardStatsSkeleton is a skeleton for the dashboard stats
const DashboardStatsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className="glass rounded-2xl p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-slate-700 rounded-xl"></div>
              <div className="w-24 h-4 bg-slate-700 rounded"></div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="w-20 h-8 bg-slate-700 rounded"></div>
            <div className="w-32 h-3 bg-slate-700 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStatsSkeleton;

