"use client";
import React from "react";
import { Skeleton } from "@heroui/react";
import PaymentInformationSkeleton from "./PaymentInformationSkeleton";

const OrderDetailsSkeletons = () => {
  return (
    <div className="grid lg:grid-cols-[2fr_1fr] md:gap-1 gap-3 md:p-2 md:pl-1 p-2.5 !z-1 relative bg-white mt-4">
      {/* Left Side - Product Details */}
      <div className="text-right mt-2 flex flex-col md:gap-5 gap-2.5">
        {[1, 2].map((item) => (
          <div key={item} className="text-right relative">
            <div className="rounded-lg bg-white text-card-foreground border border-gray-200 shadow-gray-200 shadow-2xl lg:p-6 p-4 flex lg:flex-row lg:gap-2 gap-5 justify-between lg:items-center !z-1 relative">
              <div className="text-right bg-transparent flex flex-row gap-3 items-center flex-grow">
                {/* Product Image Skeleton */}
                <Skeleton className="w-[100px] h-[90px] rounded-lg flex-shrink-0" />
                
                {/* Product Info Skeleton */}
                <div className="text-right bg-transparent space-y-1.5 flex-1">
                  <div className="text-right bg-transparent flex flex-row">
                    <div className="text-right bg-transparent leading-7 flex-1">
                      <Skeleton className="h-6 w-full max-w-64 rounded-lg mb-2" />
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-1 bg-gray-300 rounded-full" />
                        <Skeleton className="h-5 w-24 rounded-lg" />
                      </div>
                    </div>
                  </div>
                  <div className="text-right bg-transparent flex flex-row items-center gap-1.5">
                    <Skeleton className="w-[23px] h-[23px] rounded-full flex-shrink-0" />
                    <Skeleton className="h-4 w-32 rounded-lg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right Side - Payment Information */}
      <PaymentInformationSkeleton />
    </div>
  );
};

export default OrderDetailsSkeletons;
