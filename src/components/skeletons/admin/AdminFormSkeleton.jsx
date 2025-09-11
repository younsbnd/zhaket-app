import React from "react";
import { Skeleton } from "@heroui/react";

// AdminFormSkeleton is a skeleton for the admin form
const AdminFormSkeleton = ({
  inputsCount = 4,
  hasTextarea = true,
  hasSwitch = true,
}) => {
  return (
    <div className="glass rounded-2xl p-5 space-y-4">
      {/* Form inputs */}
      {[...Array(inputsCount)].map((_, index) => (
        <div key={`input-${index}`} className="space-y-2">
          <Skeleton className="w-20 h-4 bg-white/20 rounded" />
          <Skeleton className="w-full h-10 bg-white/10 rounded-md" />
        </div>
      ))}

      {/* Textarea */}
      {hasTextarea && (
        <div className="space-y-2">
          <Skeleton className="w-20 h-4 bg-white/20 rounded" />
          <Skeleton className="w-full h-20 bg-white/10 rounded-md" />
        </div>
      )}

      {/* Switch */}
      {hasSwitch && (
        <div className="flex items-center justify-between">
          <Skeleton className="w-20 h-4 bg-white/20 rounded" />
        </div>
      )}

      {/* Submit button */}
      <Skeleton className="w-full h-12 bg-white/10 rounded-xl" />
    </div>
  );
};

export default AdminFormSkeleton;
