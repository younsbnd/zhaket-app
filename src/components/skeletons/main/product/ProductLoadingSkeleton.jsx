import React from "react";

const ProductLoadingSkeleton = () => {
  return (
    <div className="bg-[#f9fafc] pb-8 animate-pulse">
      {/* Top Feature Skeleton */}
      <div className="bg-white pb-7">
        <div className="max-w-[1279px] mx-auto bg-[#f9fafc]">
          <div className="md:flex md:items-end md:gap-[30px] bg-white">
            {/* Main content area - left side */}
            <div className="md:flex-1">
              {/* Breadcrumbs Skeleton */}
              <div className="p-5 rounded bg-white md:px-0">
                <div className="flex gap-2 items-center">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                  <div className="h-4 w-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                </div>
              </div>

              {/* Product info grid */}
              <div className="md:grid md:max-h-[400px] md:min-h-[360px] md:grid-cols-3 md:items-stretch md:rounded-md md:bg-[#FFFFFF] md:shadow-[0px_10px_25px_0px_#CECECE40]">
                {/* Product Info - takes 2 columns */}
                <div className="productInfo border-l-[1px] border-l-[#F6F6F6] md:col-span-2 md:flex md:flex-col">
                  {/* Top Info */}
                  <div className="p-5 mx-auto px-4 md:m-0 md:border-b-[1px] md:border-b-[#F5F6F9] md:p-[26px] space-y-4">
                    {/* Title */}
                    <div className="h-7 bg-gray-200 rounded w-3/4"></div>
                    {/* Subtitle */}
                    <div className="h-5 bg-gray-200 rounded w-1/2"></div>
                    {/* Tags */}
                    <div className="flex gap-2">
                      <div className="h-8 bg-gray-200 rounded w-20"></div>
                      <div className="h-8 bg-gray-200 rounded w-24"></div>
                      <div className="h-8 bg-gray-200 rounded w-16"></div>
                    </div>
                  </div>

                  {/* Mobile Image Skeleton */}
                  <div className="block md:hidden p-5">
                    <div className="w-full h-64 bg-gray-200 rounded"></div>
                  </div>

                  {/* Sells Info */}
                  <div className="p-5 space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="h-5 bg-gray-200 rounded w-24"></div>
                      <div className="h-6 bg-gray-200 rounded w-32"></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="h-5 bg-gray-200 rounded w-28"></div>
                      <div className="h-6 bg-gray-200 rounded w-20"></div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="p-5 flex gap-3">
                    <div className="h-12 bg-gray-200 rounded flex-1"></div>
                    <div className="h-12 bg-gray-200 rounded w-12"></div>
                  </div>
                </div>

                {/* Key Features - takes 1 column */}
                <div className="hidden md:block p-5 space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-32 mb-4"></div>
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="flex gap-2 items-center">
                      <div className="h-4 w-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded flex-1"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Desktop Image - right side */}
            <div className="hidden md:block md:max-w-[360px] !bg-white">
              <div className="w-[360px] h-[400px] bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div className="w-full bg-white border-t-[1px] border-t-[#EDEEF2] mb-6 px-5">
        <div className="gap-6 w-full relative rounded-none p-0 max-w-[1279px] mx-auto flex">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center gap-3 h-16">
              <div className="w-5 h-5 bg-gray-200 rounded"></div>
              <div className="h-5 bg-gray-200 rounded w-24"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Content Area Skeleton */}
      <section className="max-w-[1279px] mx-auto flex gap-6 relative px-4 md:px-0">
        <div className="w-full max-w-full min-w-full py-2 md:max-w-[900px] md:min-w-[900px] md:flex-1 md:p-0">
          {/* Main Content Panel */}
          <div className="pt-0 pb-8 p-5 bg-white shadow-[0px_10px_25px_0px_#969BA41A] rounded-md">
            <div className="px-4 py-8 space-y-4">
              {/* Simulate description content */}
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Skeleton */}
        <div className="hidden w-full max-w-[350px] md:block sticky top-11 h-max">
          <div className="bg-white rounded-md shadow-[0px_10px_25px_0px_#969BA41A] p-5 space-y-4">
            {/* Sidebar items */}
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex gap-3 items-center">
                  <div className="w-5 h-5 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded flex-1"></div>
                </div>
              ))}
            </div>
            <div className="h-12 bg-gray-200 rounded w-full mt-6"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductLoadingSkeleton;

