"use client";
import React, { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const SalesChart = ({ weeklyData, monthlyData }) => {
  const [period, setPeriod] = useState("weekly");
  const data = period === "weekly" ? weeklyData : monthlyData;

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass p-3 rounded-lg border border-blue-500/20">
          <p className="text-sm text-slate-300 mb-1">
            {payload[0].payload.name}
          </p>
          <p className="text-lg font-bold text-white">
            {payload[0].value.toLocaleString("fa-IR")} تومان
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Period Toggle */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">نمودار فروش</h2>
        <div className="flex gap-2 glass rounded-lg p-1">
          {/* Weekly button */}
          <button
            onClick={() => setPeriod("weekly")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
              period === "weekly"
                ? "bg-blue-500 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            هفتگی
          </button>
          {/* Monthly button */}
          <button
            onClick={() => setPeriod("monthly")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
              period === "monthly"
                ? "bg-blue-500 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            ماهیانه
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#1e40af" stopOpacity={0.3} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
              opacity={0.3}
            />
            <XAxis
              dataKey="name"
              stroke="#94a3b8"
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              tickLine={false}
            />
            <YAxis
              stroke="#94a3b8"
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              tickLine={false}
              tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#1e293b" }} />
            <Bar
              dataKey="value"
              fill="url(#colorValue)"
              radius={[8, 8, 0, 0]}
              maxBarSize={60}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesChart;
