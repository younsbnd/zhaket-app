"use client";
import React from "react";
import { Skeleton } from "@heroui/react";

const InvoicesDesignTableSkeleton = () => {
  return (
    <div className="bg-white mt-20 shadow-sm rounded-[12px]">
      {/* Header Section */}
      <div className="px-9 py-10 border-b border-gray-200">
        <Skeleton className="h-6 w-48 rounded-lg" />
      </div>
      
      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Table Header */}
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-10 py-5 text-right">
                <Skeleton className="h-4 w-16 rounded-lg" />
              </th>
              <th className="px-10 py-5 text-right">
                <Skeleton className="h-4 w-20 rounded-lg" />
              </th>
              <th className="px-10 py-5 text-right">
                <Skeleton className="h-4 w-16 rounded-lg" />
              </th>
              <th className="px-10 py-5 text-right">
                <Skeleton className="h-4 w-20 rounded-lg" />
              </th>
              <th className="px-10 py-5 text-right">
                <Skeleton className="h-4 w-24 rounded-lg" />
              </th>
            </tr>
          </thead>
          
          {/* Table Body */}
          <tbody>
            {[1, 2, 3, 4, 5].map((item) => (
              <tr key={item} className="border-b border-gray-200 bg-gray-50">
                {/* Order Number */}
                <td className="px-9 py-6 text-right">
                  <Skeleton className="h-5 w-20 rounded-lg" />
                </td>
                
                {/* Status Badge */}
                <td className="px-9 py-6">
                  <Skeleton className="h-8 w-24 rounded-lg" />
                </td>
                
                {/* Date */}
                <td className="px-9 py-6 text-right">
                  <Skeleton className="h-5 w-24 rounded-lg" />
                </td>
                
                {/* Amount */}
                <td className="px-9 py-6 text-right">
                  <Skeleton className="h-5 w-20 rounded-lg" />
                </td>
                
                {/* Action Button */}
                <td className="pl-[1px] pr-9 py-6">
                  <Skeleton className="h-8 w-28 rounded-lg" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Bottom Spacing */}
      <div className="h-6"></div>
    </div>
  );
};

export default InvoicesDesignTableSkeleton;
