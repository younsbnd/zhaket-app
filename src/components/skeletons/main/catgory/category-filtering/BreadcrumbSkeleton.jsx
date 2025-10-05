"use client";
import React from "react";

/**
 * Breadcrumb Skeleton Component
 * Handles breadcrumb navigation and category header loading states
 */
const BreadcrumbSkeleton = ({ hasCategory = false }) => {
  return (
    <section className="relative animate-pulse" role="status">
      <div className="absolute right-0 top-0 -z-10 w-full h-full bg-gradient-to-br from-gray-200 to-gray-300"></div>
      
      <div className="mx-auto max-w-[1279px] md:px-4 2xl:px-0">
        <div className={`gap-2 pb-2 pt-9 md:flex md:pb-6 md:pt-[18px] ${
          hasCategory ? 'md:min-h-[220px]' : 'md:min-h-[100px]'
        }`}>
          <div className="flex flex-col justify-center gap-1 px-4 md:flex-1 md:gap-3 md:p-0">
            {/* Breadcrumb navigation */}
            <div className="flex items-center gap-2">
              <div className="h-4 bg-gray-300 rounded w-12"></div>
              <div className="w-4 h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-20"></div>
              {hasCategory && (
                <>
                  <div className="w-4 h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded w-32"></div>
                </>
              )}
            </div>

            {/* Category header */}
            {hasCategory && (
              <div className="mt-3">
                <div className="h-8 bg-gray-300 rounded w-64 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-96"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BreadcrumbSkeleton;

