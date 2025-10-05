"use client";
import React from "react";

/**
 * Generic Skeleton Component
 * Reusable skeleton utilities for various UI elements
 */

// Base skeleton
const BaseSkeleton = ({ variant = "rectangle", width = "w-full", height = "h-4", className = "" }) => {
  const variantClasses = {
    text: "rounded",
    circle: "rounded-full",
    rectangle: "rounded-md"
  };

  return (
    <div 
      className={`bg-gray-200 animate-pulse ${width} ${height} ${variantClasses[variant]} ${className}`}
      role="status"
      aria-label="Loading..."
    />
  );
};

// Text lines
export const TextSkeleton = ({ lines = 3, className = "" }) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, index) => (
      <BaseSkeleton 
        key={index}
        variant="text"
        width={index === lines - 1 ? "w-3/4" : "w-full"}
      />
    ))}
  </div>
);

// Image
export const ImageSkeleton = ({ width = "w-full", height = "h-64", className = "" }) => (
  <BaseSkeleton variant="rectangle" width={width} height={height} className={className} />
);

// Avatar
export const AvatarSkeleton = ({ size = "w-10 h-10", className = "" }) => (
  <BaseSkeleton variant="circle" width={size} height="" className={className} />
);

// Button
export const ButtonSkeleton = ({ width = "w-32", height = "h-10", className = "" }) => (
  <BaseSkeleton variant="rectangle" width={width} height={height} className={className} />
);

// Card
export const CardSkeleton = ({ hasImage = true, hasFooter = true }) => (
  <div className="rounded-lg border border-gray-200 shadow-sm overflow-hidden animate-pulse">
    {hasImage && <div className="w-full h-48 bg-gray-200"></div>}
    <div className="p-4">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
      </div>
      {hasFooter && (
        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <div className="h-4 bg-gray-200 rounded w-20"></div>
          <div className="h-8 bg-gray-200 rounded w-24"></div>
        </div>
      )}
    </div>
  </div>
);

// List
export const ListSkeleton = ({ count = 5, hasAvatar = true, hasSecondaryText = true }) => (
  <div className="space-y-3 animate-pulse">
    {Array.from({ length: count }).map((_, index) => (
      <div key={index} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
        {hasAvatar && <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-full"></div>}
        <div className="flex-1">
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
          {hasSecondaryText && <div className="h-4 bg-gray-200 rounded w-1/2"></div>}
        </div>
        <div className="flex-shrink-0 w-20 h-8 bg-gray-200 rounded"></div>
      </div>
    ))}
  </div>
);

// Table
export const TableSkeleton = ({ rows = 5, columns = 4 }) => (
  <div className="w-full overflow-x-auto animate-pulse">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {Array.from({ length: columns }).map((_, index) => (
            <th key={index} className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
              <div className="h-4 bg-gray-300 rounded w-24"></div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <tr key={rowIndex}>
            {Array.from({ length: columns }).map((_, colIndex) => (
              <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default BaseSkeleton;

