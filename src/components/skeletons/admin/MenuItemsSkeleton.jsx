import React from "react";
import { Skeleton } from "@heroui/react";

// MenuItemsSkeleton is a skeleton for the menu items page
const MenuItemsSkeleton = () => {
  return (
    <div className="space-y-4">
      {/* Header skeleton */}
      <div className="glass rounded-2xl p-4 md:p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center gap-8">
            <Skeleton className="w-24 h-10 bg-white/10 rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="w-48 h-6 bg-white/20 rounded" />
              <Skeleton className="w-32 h-4 bg-white/10 rounded" />
            </div>
          </div>
          <Skeleton className="w-full sm:w-40 h-10 bg-white/10 rounded-xl" />
        </div>
      </div>

      {/* Main Content skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Items List skeleton */}
        <div className="lg:col-span-2">
          <div className="glass rounded-2xl p-5 space-y-3">
            {[...Array(5)].map((_, index) => (
              <div key={`item-${index}`} className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                <Skeleton className="w-6 h-6 bg-white/10 rounded" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="w-3/4 h-5 bg-white/20 rounded" />
                  <Skeleton className="w-1/2 h-4 bg-white/10 rounded" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="w-16 h-8 bg-white/10 rounded" />
                  <Skeleton className="w-16 h-8 bg-white/10 rounded" />
                  <Skeleton className="w-16 h-8 bg-white/10 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form skeleton */}
        <div className="lg:col-span-1">
          <div className="glass rounded-2xl p-5 space-y-4">
            <Skeleton className="w-40 h-6 bg-white/20 rounded" />
            {[...Array(2)].map((_, index) => (
              <div key={`input-${index}`} className="space-y-2">
                <Skeleton className="w-20 h-4 bg-white/20 rounded" />
                <Skeleton className="w-full h-10 bg-white/10 rounded-md" />
              </div>
            ))}
            <Skeleton className="w-full h-12 bg-white/10 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemsSkeleton;

