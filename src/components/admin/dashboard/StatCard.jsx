"use client";
import React from "react";

const StatCard = ({ title, value, icon: Icon, trend, subtitle, colorClass }) => {
  return (
    <div className="glass rounded-2xl p-6 flex flex-col gap-4 hover:scale-[1.02] transition-transform duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* icon */}
          {Icon && (
            <div
              className={`p-3 rounded-xl ${colorClass || "bg-blue-500/20"}`}
            >
              <Icon className="w-6 h-6" />
            </div>
          )}
          {/* title */}
          <h3 className="text-slate-300 text-sm font-medium">{title}</h3>
        </div>
        {trend && (
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              trend > 0
                ? "bg-green-500/20 text-green-400"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {trend > 0 ? "+" : ""}
            {trend}%
          </span>
        )}
      </div>

      {/* value */}
      <div className="flex flex-col items-center justify-center gap-1">
        <p className="text-3xl font-bold text-white">
          {typeof value === "number" ? value.toLocaleString("fa-IR") : value}
        </p>
        {subtitle && (
          <p className="text-sm text-slate-400">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default StatCard;

