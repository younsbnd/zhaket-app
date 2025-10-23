import React from "react";
import { Card, CardBody, Skeleton } from "@heroui/react";

const TicketDetailSkeleton = () => {
  return (
    <div className="p-4 md:py-0 min-h-[calc(100vh-200px)] mt-5">
      <Card className="shadow-[0px_25px_10px_0px_#5B5E6812]">
        <CardBody className="p-0">
          {/* Header Skeleton */}
          <div className="bg-gradient-to-r from-orange-50/20 to-orange-100/20 p-4 md:p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-2 md:space-y-3 flex-1">
                <Skeleton className="h-8 w-3/4 rounded-lg" />
                <div className="flex flex-wrap items-center gap-2 md:gap-3">
                  <Skeleton className="h-4 w-32 rounded-lg" />
                  <Skeleton className="h-4 w-40 rounded-lg" />
                  <Skeleton className="h-4 w-36 rounded-lg" />
                </div>
              </div>
              <Skeleton className="h-8 w-28 rounded-full" />
            </div>
          </div>

          {/* Messages Skeleton */}
          <div className="p-4 md:p-6 bg-gray-50/50 min-h-[500px] space-y-4">
            {/* Message 1 - Right */}
            <div className="flex justify-start">
              <div className="flex flex-row-reverse items-end gap-2 md:gap-3 max-w-[85%] md:max-w-[70%]">
                <div className="flex flex-col gap-1 md:gap-1.5 max-w-full flex-1">
                  <div className="flex items-center gap-2 flex-row">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-24 rounded-lg" />
                    <Skeleton className="h-3 w-32 rounded-lg" />
                  </div>
                  <Skeleton className="h-20 w-full rounded-2xl" />
                </div>
              </div>
            </div>

            {/* Message 2 - Left */}
            <div className="flex justify-end">
              <div className="flex flex-row items-end gap-2 md:gap-3 max-w-[85%] md:max-w-[70%]">
                <div className="flex flex-col gap-1 md:gap-1.5 max-w-full flex-1">
                  <div className="flex items-center gap-2 flex-row">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-28 rounded-lg" />
                    <Skeleton className="h-3 w-36 rounded-lg" />
                  </div>
                  <Skeleton className="h-24 w-full rounded-2xl" />
                  <Skeleton className="h-4 w-24 rounded-full" />
                </div>
              </div>
            </div>

            {/* Message 3 - Right */}
            <div className="flex justify-start">
              <div className="flex flex-row-reverse items-end gap-2 md:gap-3 max-w-[85%] md:max-w-[70%]">
                <div className="flex flex-col gap-1 md:gap-1.5 max-w-full flex-1">
                  <div className="flex items-center gap-2 flex-row">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-20 rounded-lg" />
                    <Skeleton className="h-3 w-28 rounded-lg" />
                  </div>
                  <Skeleton className="h-16 w-full rounded-2xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Reply Form Skeleton */}
          <div className="p-4 md:p-6 bg-white border-t border-gray-200 space-y-3 md:space-y-4">
            <Skeleton className="h-24 w-full rounded-lg" />
            <div className="flex justify-start">
              <Skeleton className="h-10 w-32 rounded-lg" />
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default TicketDetailSkeleton;

