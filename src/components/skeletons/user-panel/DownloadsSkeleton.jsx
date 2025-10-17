"use client";
import React from "react";
import { Card, CardBody, Skeleton } from "@heroui/react";

const DownloadsSkeleton = () => {
  return (
    <div className="text-right bg-transparent p-1 md:py-0 min-h-[calc(100vh-200px)] mt-5">
      <div className="rounded-lg bg-white shadow-[0px_25px_10px_0px_#5B5E6812]">
        <div className="p-6.5 pt-6 space-y-3.5 !bg-[#FBFCFD]">
          {/* Render 3 skeleton items */}
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="rounded-lg bg-white text-card-foreground gap-3.5 shadow-none border border-gray-200/85">
              <CardBody className="p-6.5 px-0 py-0 w-full">
                <div className="text-right bg-transparent flex justify-start flex-nowrap gap-4 lg:justify-between items-center w-full md:px-6 px-3.5 flex-col md:flex-row min-h-[108px]">
                  {/* Product info skeleton */}
                  <div className="text-right bg-transparent flex flex-row justify-start flex-nowrap lg:gap-4.5 gap-3 items-center w-full md:py-6 pt-6 pr-2 md:pr-0">
                    {/* Product image skeleton */}
                    <div className="text-right bg-transparent min-w-[60px] min-h-[60px] rounded-lg relative">
                      <Skeleton className="h-[60px] w-[60px] rounded-lg" />
                    </div>
                    {/* Product title skeleton */}
                    <div className="text-right bg-transparent">
                      <div className="text-right bg-transparent flex justify-start flex-nowrap gap-5 flex-col md:flex-row items-start">
                        <Skeleton className="h-6 w-48 rounded-md" />
                      </div>
                    </div>
                  </div>
                  {/* Download button skeleton */}
                  <div className="text-right bg-transparent flex justify-start items-start flex-nowrap xl:flex-row flex-col gap-3.75 lg:flex-wrap lg:justify-end lg:items-end lg:shrink-0 w-full lg:w-auto py-6">
                    <div className="text-right bg-transparent lg:w-auto w-full">
                      <Skeleton className="h-[46px] w-[138px] rounded-md" />
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DownloadsSkeleton;
