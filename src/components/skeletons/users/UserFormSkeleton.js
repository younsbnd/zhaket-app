"use client";

import { Skeleton } from "@heroui/react";
import React from "react";
import { FiUser, FiLock } from "react-icons/fi";

/**
 * UserFormSkeleton component
 * Loading skeleton for UserForm component
 */
const UserFormSkeleton = () => {
  return (
    <div className="text-slate-100 min-h-screen selection:bg-blue-600/30">
      {/* Background layers */}
      <div className="fixed inset-0 -z-20 bg-cover bg-center" />
      <div className="fixed inset-0 -z-10" />

      {/* Main container */}
      <main className="mx-auto w-full max-w-7xl px-4 py-8">
        <div className="glass rounded-2xl p-5">
          {/* Header skeleton */}
          <div className="mb-6 flex items-center gap-2">
            <FiUser className="text-blue-400" />
            <Skeleton className="h-6 w-40 rounded-lg bg-white/10" />
          </div>

          {/* Form skeleton */}
          <div className="space-y-5">
            {/* Full name field skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-20 rounded-lg bg-white/10" />
              <Skeleton className="h-12 w-full rounded-xl bg-white/5" />
            </div>

            {/* Email field skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-16 rounded-lg bg-white/10" />
              <Skeleton className="h-12 w-full rounded-xl bg-white/5" />
            </div>

            {/* Phone number field skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-24 rounded-lg bg-white/10" />
              <Skeleton className="h-12 w-full rounded-xl bg-white/5" />
            </div>

            {/* Password field skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-20 rounded-lg bg-white/10" />
              <div className="relative">
                <Skeleton className="h-12 w-full rounded-xl bg-white/5" />
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <FiLock className="text-slate-400" />
                </div>
              </div>
            </div>

            {/* Role field skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-20 rounded-lg bg-white/10" />
              <Skeleton className="h-12 w-full rounded-xl bg-white/5" />
            </div>

            {/* Submit button skeleton */}
            <Skeleton className="h-10 w-full rounded-xl bg-gradient-to-l from-blue-600/30 to-indigo-700/30" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserFormSkeleton;
