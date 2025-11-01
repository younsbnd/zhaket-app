import React from "react";

// DashboardOrdersSkeleton is a skeleton for the dashboard orders
const DashboardOrdersSkeleton = () => {
  return (
    <div className="glass rounded-2xl p-6 animate-pulse">
      <div className="flex items-center justify-between mb-6">
        <div className="w-32 h-6 bg-slate-700 rounded"></div>
        <div className="w-24 h-8 bg-slate-700 rounded"></div>
      </div>
      
      <div className="space-y-4">
        {/* Render 3 skeleton items */}
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="flex items-center justify-between p-4 bg-slate-800/40 rounded-lg"
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="w-10 h-10 bg-slate-700 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="w-32 h-4 bg-slate-700 rounded"></div>
                <div className="w-48 h-3 bg-slate-700 rounded"></div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-20 h-4 bg-slate-700 rounded"></div>
              <div className="w-16 h-6 bg-slate-700 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardOrdersSkeleton;

