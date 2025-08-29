import React from "react";
import { Skeleton } from "@heroui/react";
import { FiEdit, FiSave } from "react-icons/fi";

/**
 * Universal skeleton for tag forms (both create and edit)
 */
export const TagFormSkeleton = ({ isEditMode = false }) => {
  return (
    <div className="relative min-ah-screen text-slate-100">
      {/* Background image */}
      <div
        className="fixed inset-0 -z-20 bg-cover bg-center"
        
      />
      
      {/* Dark overlay */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#000814]/[0.99] via-[#000814]/[0.992] to-[#000814]/[0.996] backdrop-blur-sm" />

      {/* Main container */}
      <div className="mx-auto max-w-2xl px-4 py-10">
        
        {/* Page title skeleton */}
        <div className="mb-6 flex items-center gap-2">
          {isEditMode ? (
            <FiEdit className="text-emerald-400 w-5 h-5" />
          ) : (
            <FiSave className="text-blue-400 w-5 h-5" />
          )}
          <Skeleton className="h-6 w-32 rounded-md bg-slate-700/50" />
        </div>

        {/* Form container */}
        <div className={`glass rounded-2xl border border-slate-800/60 p-6 backdrop-blur-md shadow-xl ${
          isEditMode ? "hover:shadow-emerald-400/20" : "hover:shadow-blue-500/20"
        }`}>
          
          <div className="space-y-5">
            
            {/* Name field */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-16 rounded bg-slate-700/50" />
              <Skeleton className="h-12 w-full rounded-lg bg-slate-700/30" />
            </div>

            {/* Slug field */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-12 rounded bg-slate-700/50" />
              <Skeleton className="h-12 w-full rounded-lg bg-slate-700/30" />
            </div>

            {/* Description field */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-24 rounded bg-slate-700/50" />
              <Skeleton className="h-24 w-full rounded-lg bg-slate-700/30" />
            </div>

            {/* Submit button */}
            <Skeleton 
              className={`h-12 w-full rounded-xl ${
                isEditMode 
                  ? "bg-gradient-to-l from-emerald-500/30 to-green-400/30" 
                  : "bg-gradient-to-l from-blue-600/30 to-indigo-700/30"
              }`} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagFormSkeleton;
