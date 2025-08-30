
import ControlledInput from "@/components/shared/forms/ControlledInput";
import ControlledTextarea from "@/components/shared/forms/ControlledTextarea";
import { Button } from "@heroui/react";
import React from "react";
import { FiSave, FiEdit } from "react-icons/fi";

/**
 * ProductTagForm Component
 * Shared form component for creating and editing product tags
 * Supports both create and edit modes with proper validation and error handling
 * 
 * @param {Object} control - Form control from react-hook-form
 * @param {Function} handleSubmit - Submit handler from react-hook-form
 * @param {Function} onSubmit - Custom submit function
 * @param {Object} errors - Form validation errors
 * @param {boolean} isEditMode - Whether component is in edit or create mode
 * @param {string} title - Form title
 * @param {boolean} isLoading - Loading state for submit button
 * @param {string} serverError - Server error message to display
 */
const ProductTagForm = ({
  control,
  handleSubmit,
  onSubmit,
  errors,
  isEditMode = false,
  title,
  isLoading = false,
  serverError,
}) => {
  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      {/* Main content container */}
      <main className="mx-auto w-full max-w-4xl px-4 py-8">
        {/* Form container with glass effect */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          {/* Form header with icon and title */}
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-slate-800">
            {isEditMode ? (
              <>
                <FiEdit className="text-emerald-500" />
                {title || "ویرایش تگ"}
              </>
            ) : (
              <>
                <FiSave className="text-blue-500" />
                {title || "ساخت تگ جدید"}
              </>
            )}
          </h2>

          {/* Server error display */}
          {serverError && (
            <div className="mb-6 rounded-lg border border-red-300 bg-red-50 text-red-700 px-4 py-3 text-sm">
              <strong>خطا:</strong> {serverError}
            </div>
          )}

          {/* Main form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Tag name input field */}
            <ControlledInput
              name="name"
              control={control}
              label="نام تگ"
              placeholder="نام تگ را وارد کنید"
              rules={{ required: "وارد کردن نام تگ الزامی است" }}
              errors={errors}
              variant="bordered"
              color="primary"
              className="w-full"
            />

            {/* Tag slug input field */}
            <ControlledInput
              name="slug"
              control={control}
              label="اسلاگ"
              placeholder="اسلاگ تگ را وارد کنید (برای URL استفاده می‌شود)"
              rules={{ 
                required: "وارد کردن اسلاگ الزامی است",
                pattern: {
                  value: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                  message: "اسلاگ فقط می‌تواند شامل حروف کوچک انگلیسی، اعداد و خط تیره باشد"
                }
              }}
              errors={errors}
              variant="bordered"
              color="primary"
              className="w-full"
            />

            {/* Tag description textarea field */}
            <ControlledTextarea
              name="description"
              control={control}
              label="توضیحات"
              placeholder="توضیحات تگ را وارد کنید (اختیاری)"
              errors={errors}
              rows={4}
              className="w-full resize-none"
            />

            {/* Submit button with loading state */}
            <Button
              isLoading={isLoading}
              disabled={isLoading}
              type="submit"
              size="lg"
              className={`w-full flex items-center justify-center gap-2 font-medium ${
                isEditMode
                  ? "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
                  : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
              } text-white shadow-lg hover:shadow-xl transition-all duration-200`}
            >
              {/* Button content based on mode */}
              {isEditMode ? (
                <>
                  <FiEdit className="w-5 h-5" />
                  {isLoading ? "در حال ذخیره..." : "ذخیره تغییرات"}
                </>
              ) : (
                <>
                  <FiSave className="w-5 h-5" />
                  {isLoading ? "در حال ساخت..." : "ساخت تگ"}
                </>
              )}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ProductTagForm;
