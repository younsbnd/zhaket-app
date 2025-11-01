"use client";
import React from "react";
import { Skeleton } from "@heroui/react";

const PaymentInformationSkeleton = () => {
  return (
    <div className="text-right bg-gray-10 opacity-80 w-full max-w-[520px] mx-auto rounded-lg p-3 sm:p-4 md:p-5">
      <div className="text-right w-full max-w-[420px] mx-auto text-gray-500 bg-gray-50 rounded-lg p-3 sm:p-4 md:p-5 space-y-4 sm:space-y-5 md:space-y-6">
        {/* Payer Information Skeleton */}
        <div className="bg-white shadow-md rounded-lg p-3 sm:p-4 w-full">
          <div className="text-right shadow-2xl shadow-gray-100 bg-white flex p-[7px] flex-row justify-between items-center gap-2">
            <div className="flex justify-center items-center">
              <Skeleton className="h-6 w-32 rounded-md" />
            </div>
            <Skeleton className="w-[50px] h-[50px] rounded-lg flex-shrink-0" />
          </div>
          
          <div className="text-right grid grid-cols-1 gap-3 sm:gap-4 pr-1.5 bg-white">
            <div className="text-right flex flex-row items-center gap-2">
              <Skeleton className="w-3 h-3 rounded-full flex-shrink-0" />
              <Skeleton className="h-4 w-40 rounded-lg" />
            </div>
            <div className="text-right flex flex-row items-center gap-2">
              <Skeleton className="w-4 h-4 rounded-full flex-shrink-0" />
              <Skeleton className="h-4 w-32 rounded-lg" />
            </div>
          </div>
        </div>

        {/* Payment Details Skeleton */}
        <div className="text-right bg-gray-50 space-y-3 sm:space-y-4 py-2 sm:py-3 px-3 sm:px-4 rounded-lg grid grid-cols-1 gap-2 sm:gap-3">
          {/* Status */}
          <div className="text-right flex flex-row justify-between items-center">
            <Skeleton className="h-4 w-20 rounded-lg" />
            <div className="text-gray-800">
              <Skeleton className="h-6 w-16 rounded-lg" />
            </div>
          </div>

          {/* Date */}
          <div className="text-right bg-transparent flex flex-row justify-between items-center">
            <Skeleton className="h-4 w-12 rounded-lg" />
            <Skeleton className="h-4 w-24 rounded-lg" />
          </div>

          {/* Order Code */}
          <div className="text-right bg-transparent flex flex-row justify-between items-center">
            <Skeleton className="h-4 w-16 rounded-lg" />
            <Skeleton className="h-4 w-20 rounded-lg" />
          </div>

          {/* Tracking Code */}
          <div className="text-right bg-transparent flex flex-row justify-between items-center">
            <Skeleton className="h-4 w-20 rounded-lg" />
            <Skeleton className="h-4 w-24 rounded-lg" />
          </div>

          {/* Total Amount */}
          <div className="text-right bg-transparent flex flex-row justify-between items-center">
            <Skeleton className="h-4 w-16 rounded-lg" />
            <Skeleton className="h-4 w-28 rounded-lg" />
          </div>

          {/* Button */}
          <Skeleton className="h-10 sm:h-11 md:h-12 w-full rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default PaymentInformationSkeleton;
