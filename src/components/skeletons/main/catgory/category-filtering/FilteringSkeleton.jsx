"use client";
import React from "react";

/**
 * Filtering Skeleton Component
 * Handles navbar filtering and sidebar filtering loading states
 */
const FilteringSkeleton = ({ type = "both" }) => {
  // Navbar Filtering Skeleton
  const NavbarSkeleton = () => (
    <div className="relative my-6 flex items-center bg-[#FFFFFF] pr-4 shadow-[0px_10px_25px_0px_#5B5E6812] md:rounded-sm animate-pulse">
      <div className="flex items-center w-full justify-start gap-3 pb-2 max-w-[100px]">
        <div className="w-5 h-5 bg-gray-200 rounded"></div>
        <div className="h-5 bg-gray-200 rounded w-20"></div>
      </div>
      <div className="flex max-w-fit gap-4 overflow-x-auto">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="min-w-fit py-4 h-10 bg-gray-200 rounded w-20 first:mr-4 last:ml-4"></div>
        ))}
      </div>
      <div className="absolute left-0 hidden h-full p-[5px] md:flex items-center justify-center">
        <div className="flex h-[53px] w-[103px] items-center justify-center rounded-lg bg-[#F9FAFC] gap-1">
          <div className="h-11 w-11 bg-gray-200 rounded-lg"></div>
          <div className="h-11 w-11 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );

  // Sidebar Filtering Skeleton
  const SidebarSkeleton = () => (
    <div className="sticky top-0 hidden p-4 md:block animate-pulse">
      <div className="h-10 bg-gray-200 rounded mb-4 w-full"></div>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-5 h-5 bg-gray-200 rounded"></div>
          <div className="h-5 bg-gray-200 rounded w-24"></div>
        </div>
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center gap-3 my-3">
            <div className="w-4 h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded flex-1"></div>
          </div>
        ))}
      </div>
      <div className="bg-[#F4F5F6] h-[1px] w-full my-5"></div>
      <div className="space-y-4 mb-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-gray-200 rounded"></div>
              <div className="h-5 bg-gray-200 rounded w-32"></div>
            </div>
            <div className="w-11 h-6 bg-gray-200 rounded-full"></div>
          </div>
        ))}
      </div>
      <div className="bg-[#F4F5F6] h-[1px] w-full my-5"></div>
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-4 h-4 bg-gray-200 rounded"></div>
          <div className="h-5 bg-gray-200 rounded w-28"></div>
        </div>
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex items-center justify-between my-3">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-36"></div>
            </div>
            <div className="w-9 h-9 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );

  if (type === "navbar") return <NavbarSkeleton />;
  if (type === "sidebar") return <SidebarSkeleton />;
  
  // Both
  return (
    <>
      <div className="md:relative md:w-[25%]">
        <SidebarSkeleton />
      </div>
      <div className="bg-[#F4F5F6] w-[1px]"></div>
      <div className="w-full md:w-[75%] md:pb-4">
        <NavbarSkeleton />
      </div>
    </>
  );
};

export default FilteringSkeleton;

