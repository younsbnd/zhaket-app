import React from "react";
import { Skeleton } from "@heroui/react";

const ProductCategoriesTableSkeleton = () => {
  return (
    <div className="glass rounded-2xl p-5">
      {/* Header section skeleton */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="ms-auto flex items-center gap-2">
          <Skeleton className="w-20 h-8 rounded-xl bg-white/10" />
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        {/* Table skeleton */}
        <div className="bg-transparent rounded-sm">
          {/* Table header skeleton */}
          <div className="grid grid-cols-4 gap-4 pb-3 border-b border-white/10 mt-6">
            <Skeleton className="w-16 h-6 bg-white/20 rounded" />
            <Skeleton className="w-20 h-6 bg-white/20 rounded" />
            <Skeleton className="w-16 h-6 bg-white/20 rounded" />
            <Skeleton className="w-20 h-6 bg-white/20 rounded" />
          </div>
          
          {/* Table body skeleton - 5 rows */}
          {[...Array(3)].map((_, index) => (
            <div 
              key={index} 
              className={`grid grid-cols-4 gap-4 py-3 ${
                index !== 4 ? 'border-b border-white/10' : ''
              }`}
            >
              <Skeleton className="w-24 h-4 bg-white/10 rounded" />
              <Skeleton className="w-32 h-4 bg-white/10 rounded" />
              <Skeleton className="w-16 h-6 bg-white/10 rounded-full" />
              <div className="flex items-center gap-1">
                <Skeleton className="w-16 h-5 bg-white/10 rounded-[2px]" />
                <Skeleton className="w-16 h-5 bg-white/10 rounded-[2px]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCategoriesTableSkeleton;
