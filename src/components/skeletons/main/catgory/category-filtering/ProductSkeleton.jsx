"use client";
import React, { useEffect, useState } from "react";

/**
 * Product Skeleton Component
 * Handles product card and grid loading states
 */
const ProductSkeleton = ({ viewMode = "grid", count = 1 }) => {
  // Keep skeleton layout consistent with ProductCardsGrid
  const [forceGrid, setForceGrid] = useState(true);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 1023px)");
    const handler = (e) => setForceGrid(e.matches);
    setForceGrid(mq.matches);
    mq.addEventListener?.("change", handler);
    mq.addListener?.(handler);
    return () => {
      mq.removeEventListener?.("change", handler);
      mq.removeListener?.(handler);
    };
  }, []);

  const effectiveViewMode = forceGrid ? "grid" : viewMode;
  // Single card skeleton
  const CardSkeleton = () => {
    if (effectiveViewMode === "list") {
      return (
        <div className="flex gap-4 p-4 overflow-hidden rounded-xl border border-[#F4F4F4] shadow-[0px_5px_25px_0px_rgba(126,137,155,0.11)] animate-pulse">
          <div className="flex-shrink-0 w-[250px] h-[250px] bg-gray-200 rounded-lg"></div>
          <div className="flex flex-1 flex-col justify-around">
            <div className="flex items-center justify-center gap-8">
              <div className="flex-1">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="flex items-center gap-3 pb-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
              <div className="flex justify-center flex-col items-start gap-3.5">
                <div className="h-16 w-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-s-md"></div>
                <div className="h-6 w-24 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div className="h-[1px] w-full mt-8 mb-4 bg-[#F6F7F8]"></div>
            <div className="flex items-center justify-between">
              <div className="w-full max-w-[135px]"></div>
              <div className="flex items-center justify-center mr-auto gap-3">
                <div className="h-[51px] w-[168px] bg-gray-200 rounded-lg"></div>
                <div className="h-[51px] w-[168px] bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Grid view (vertical card)
    return (
      <div className="flex flex-col justify-between overflow-hidden relative h-auto w-full max-w-[400px] rounded-md shadow-[0px_5px_25px_0px_rgba(126,137,155,0.11)] md:max-h-[410px] md:max-w-[304px] mx-auto border-[1px] border-solid border-[#E5E8EB] md:mx-0 animate-pulse">
        <div className="w-full h-[272px] bg-gray-200"></div>
        <div className="p-[20px]">
          <div className="h-6 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="flex w-full items-end justify-between pb-4">
            <div className="h-8 bg-gray-200 rounded w-24"></div>
            <div className="flex gap-3">
              <div className="h-6 w-12 bg-gray-200 rounded"></div>
              <div className="h-6 w-12 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="h-[42px] flex-1 bg-gray-200 rounded-lg"></div>
            <div className="h-[42px] flex-1 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  };

  // Grid container
  const containerClasses = effectiveViewMode === "list" 
    ? "flex flex-col gap-4 p-4 md:p-6" 
    : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4";

  return (
    <div className={containerClasses} role="status" aria-label="Loading products">
      {Array.from({ length: count }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
};

export default ProductSkeleton;

