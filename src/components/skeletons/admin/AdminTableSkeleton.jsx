import React from "react";
import { Skeleton } from "@heroui/react";

const AdminTableSkeleton = ({ 
  columnsCount = 4, 
  rowsCount = 3,
  hasCreateButton = true 
}) => {
  return (
    <div className="glass rounded-2xl p-5">
      {/* Header section skeleton */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="ms-auto flex items-center gap-2">
          {hasCreateButton && (
            <Skeleton className="w-20 h-8 rounded-xl bg-white/10" />
          )}
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        {/* Table header skeleton */}
        <div className={`grid grid-cols-${columnsCount} gap-4 pb-3 border-b border-white/10 mt-6`}>
          {[...Array(columnsCount)].map((_, index) => (
            <Skeleton key={index} className="w-16 h-6 bg-white/20 rounded" />
          ))}
        </div>
        
        {/* Table body skeleton */}
        {[...Array(rowsCount)].map((_, index) => (
          <div 
            key={index} 
            className={`grid grid-cols-${columnsCount} gap-4 py-3 ${
              index !== rowsCount - 1 ? 'border-b border-white/10' : ''
            }`}
          >
            {[...Array(columnsCount)].map((_, colIndex) => (
              <Skeleton key={colIndex} className="w-24 h-4 bg-white/10 rounded" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTableSkeleton;