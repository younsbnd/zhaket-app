import React from "react";
import { Card, CardBody, Skeleton } from "@heroui/react";

const AdminTicketDetailSkeleton = () => {
  return (
    <div className="text-slate-100 min-h-screen selection:bg-blue-600/30">
      <div className="mx-auto w-full max-w-7xl px-6 py-10">
        <Card className="glass">
          <CardBody className="p-0">
            {/* Header Skeleton */}
            <div className="bg-gradient-to-r from-blue-600/20 to-indigo-700/20 p-4 md:p-6 border-b border-white/10 mb-3">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                <div className="space-y-2 md:space-y-3 flex-1">
                  <Skeleton className="h-8 w-3/4 rounded-lg bg-white/10" />
                  <div className="flex flex-wrap items-center gap-2 md:gap-3">
                    <Skeleton className="h-4 w-32 rounded-lg bg-white/10" />
                    <Skeleton className="h-4 w-40 rounded-lg bg-white/10" />
                    <Skeleton className="h-4 w-36 rounded-lg bg-white/10" />
                  </div>
                </div>
              </div>
            </div>

            {/* Status Controls Skeleton */}
            <div className="px-4 md:px-6 pb-4 mt-4">
              <div className="flex flex-col items-start gap-3">
                <Skeleton className="h-6 w-45 rounded-lg bg-white/10" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-3 w-32 rounded-lg bg-white/10" />
                  <Skeleton className="h-3 w-32 rounded-lg bg-white/10" />
                </div>
              </div>
            </div>

            {/* Messages Skeleton */}
            <div className="p-4 md:p-6 bg-black/20 min-h-[500px] space-y-4">
              {/* Message 1 - Admin (Left) */}
              <div className="flex justify-start">
                <div className="flex flex-row items-end gap-2 md:gap-3 max-w-[85%] md:max-w-[70%]">
                  <div className="flex flex-col gap-1 md:gap-1.5 max-w-full flex-1">
                    <div className="flex items-center gap-2 flex-row">
                      <Skeleton className="h-5 w-5 rounded-full bg-white/10" />
                      <Skeleton className="h-4 w-24 rounded-lg bg-white/10" />
                      <Skeleton className="h-3 w-32 rounded-lg bg-white/10" />
                    </div>
                    <Skeleton className="h-20 w-full rounded-2xl bg-white/10" />
                  </div>
                </div>
              </div>

              {/* Message 2 - User (Right) */}
              <div className="flex justify-end">
                <div className="flex flex-row-reverse items-end gap-2 md:gap-3 max-w-[85%] md:max-w-[70%]">
                  <div className="flex flex-col gap-1 md:gap-1.5 max-w-full flex-1">
                    <div className="flex items-center gap-2 flex-row">
                      <Skeleton className="h-5 w-5 rounded-full bg-white/10" />
                      <Skeleton className="h-4 w-28 rounded-lg bg-white/10" />
                      <Skeleton className="h-3 w-36 rounded-lg bg-white/10" />
                    </div>
                    <Skeleton className="h-24 w-full rounded-2xl bg-white/10" />
                  </div>
                </div>
              </div>

              {/* Message 3 - Admin (Left) */}
              <div className="flex justify-start">
                <div className="flex flex-row items-end gap-2 md:gap-3 max-w-[85%] md:max-w-[70%]">
                  <div className="flex flex-col gap-1 md:gap-1.5 max-w-full flex-1">
                    <div className="flex items-center gap-2 flex-row">
                      <Skeleton className="h-5 w-5 rounded-full bg-white/10" />
                      <Skeleton className="h-4 w-20 rounded-lg bg-white/10" />
                      <Skeleton className="h-3 w-28 rounded-lg bg-white/10" />
                    </div>
                    <Skeleton className="h-16 w-full rounded-2xl bg-white/10" />
                  </div>
                </div>
              </div>

              {/* Message 4 - User (Right) */}
              <div className="flex justify-end">
                <div className="flex flex-row-reverse items-end gap-2 md:gap-3 max-w-[85%] md:max-w-[70%]">
                  <div className="flex flex-col gap-1 md:gap-1.5 max-w-full flex-1">
                    <div className="flex items-center gap-2 flex-row">
                      <Skeleton className="h-5 w-5 rounded-full bg-white/10" />
                      <Skeleton className="h-4 w-24 rounded-lg bg-white/10" />
                      <Skeleton className="h-3 w-32 rounded-lg bg-white/10" />
                    </div>
                    <Skeleton className="h-18 w-full rounded-2xl bg-white/10" />
                  </div>
                </div>
              </div>
            </div>

            {/* Reply Form Skeleton */}
            <div className="p-4 md:p-6 bg-white/5 border-t border-white/10 space-y-3 md:space-y-4">
              <Skeleton className="h-24 w-full rounded-lg bg-white/10" />
              <div className="flex justify-start">
                <Skeleton className="h-10 w-32 rounded-lg bg-white/10" />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default AdminTicketDetailSkeleton;
