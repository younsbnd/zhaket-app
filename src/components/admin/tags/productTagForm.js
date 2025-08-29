 

import ControlledInput from "@/components/shared/forms/ControlledInput";
import ControlledTextarea from "@/components/shared/forms/ControlledTextarea";
import { Button } from "@heroui/react";
import React from "react";
import { FiSave, FiEdit } from "react-icons/fi";

/**
 * Shared form component for creating and editing tags
 * Works for both create and edit modes
 */
const ProductTagForm = ({
  control,           // Form control from react-hook-form
  handleSubmit,      // Submit handler from react-hook-form
  onSubmit,          // Custom submit function
  errors,            // Form validation errors
  isEditMode = false, // Whether we're editing or creating
  title,             // Form title
  isLoading = false, // Loading state
  serverError,       // Server error message
}) => {
  return (
    <div className="relative min-h-screen text-slate-100">
      {/* Background image */}
      <div
        className="fixed inset-0 -z-20 bg-cover bg-center"
        
      />
      
      {/* Dark overlay */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#000814]/[0.99] via-[#000814]/[0.992] to-[#000814]/[0.996] backdrop-blur-sm" />

      {/* Main container */}
      <div className="mx-auto max-w-2xl px-4 py-10">
        
        {/* Page title */}
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          {isEditMode ? (
            <>
              <FiEdit className="text-emerald-400" />
              {title || "Edit Tag"}
            </>
          ) : (
            <>
              <FiSave className="text-blue-400" />
              {title || "Create New Tag"}
            </>
          )}
        </h2>

        {/* Form container */}
        <div className={`glass rounded-2xl border border-slate-800/60 p-6 backdrop-blur-md shadow-xl transition-shadow duration-300 ${
          isEditMode ? "hover:shadow-emerald-400/20" : "hover:shadow-blue-500/20"
        }`}>
          
          {/* Show server errors */}
          {serverError && (
            <div className="mb-4 rounded-lg border border-red-400/30 bg-red-500/20 text-red-200 px-4 py-2 text-sm">
              {serverError}
            </div>
          )}

          {/* Main form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            
            {/* Name field */}
            <ControlledInput
              name="name"
              control={control}
              label="Name"
              placeholder="e.g., Programming"
              rules={{ required: "Name is required" }}
              errors={errors}
              variant="bordered"
              color="primary"
            />

            {/* Slug field */}
            <ControlledInput
              name="slug"
              control={control}
              label="Slug"
              placeholder="e.g., programming"
              rules={{ required: "Slug is required" }}
              errors={errors}
              variant="bordered"
              color="primary"
            />

            {/* Description field */}
            <ControlledTextarea
              name="description"
              control={control}
              label="Description"
              placeholder="Short description about this tag"
              errors={errors}
              rows={4}
            />

            {/* Submit button */}
            <Button
              isLoading={isLoading}
              disabled={isLoading}
              type="submit"
              variant={isEditMode ? "gradient" : "solid"}
              className={`w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium text-white shadow transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed ${
                isEditMode
                  ? "bg-gradient-to-l from-emerald-500 to-green-400 hover:shadow-emerald-400/40"
                  : "bg-gradient-to-l from-blue-600 to-indigo-700 hover:shadow-blue-400/40"
              }`}
            >
              {isEditMode ? (
                <>
                  <FiEdit className="w-5 h-5" />
                ذخیره تغییرات
                </>
              ) : (
                <>
                  <FiSave className="w-5 h-5" />
                 ساخت تگ 
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductTagForm;