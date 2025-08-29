"use client";

import { Skeleton, Card } from "@heroui/react";
import { FiTag } from "react-icons/fi";

const TagsTableSkeleton = () => {
  return (
    <div className="relative min-h-screen text-slate-100">
      {/* Background overlay */}
      <div className="fixed inset-0 -z-20 bg-cover bg-center" />
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#000814]/[0.99] via-[#000814]/[0.992] to-[#000814]/[0.996] backdrop-blur-sm" />

      <div className="mx-auto max-w-7xl px-4 py-8 space-y-6">
        {/* Header skeleton */}
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FiTag className="text-emerald-400" />
            مدیریت تگ‌ها
          </h1>
          <div className="ms-auto">
            <Skeleton className="rounded-xl">
              <div className="h-10 w-24 bg-emerald-500/20"></div>
            </Skeleton>
          </div>
        </div>

        {/* Main content skeleton */}
        <div className="glass rounded-2xl border border-slate-800/50 p-5 backdrop-blur-md shadow-xl">
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
            {/* Generate 6 skeleton cards */}
            {Array.from({ length: 6 }).map((_, index) => (
              <Card 
                key={index}
                className="rounded-xl bg-white/5 border border-slate-700/40 p-5 shadow-lg"
              >
                {/* Card header skeleton */}
                <div className="flex justify-between items-start mb-3">
                  <Skeleton className="rounded-lg">
                    <div className="h-6 w-24 bg-emerald-400/20"></div>
                  </Skeleton>
                  <div className="flex gap-2">
                    {/* Edit button skeleton */}
                    <Skeleton className="rounded-full">
                      <div className="w-8 h-8 bg-blue-500/20"></div>
                    </Skeleton>
                    {/* Delete button skeleton */}
                    <Skeleton className="rounded-full">
                      <div className="w-8 h-8 bg-red-500/20"></div>
                    </Skeleton>
                  </div>
                </div>

                {/* Tag ID skeleton */}
                <Skeleton className="rounded-md mb-2">
                  <div className="h-4 w-32 bg-slate-400/20"></div>
                </Skeleton>

                {/* Description skeleton */}
                <div className="space-y-2">
                  <Skeleton className="rounded-md">
                    <div className="h-4 w-full bg-slate-300/20"></div>
                  </Skeleton>
                  <Skeleton className="rounded-md">
                    <div className="h-4 w-3/4 bg-slate-300/20"></div>
                  </Skeleton>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagsTableSkeleton;
