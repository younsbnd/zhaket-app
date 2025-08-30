import ControlledInput from "@/components/shared/forms/ControlledInput";
import ControlledTextarea from "@/components/shared/forms/ControlledTextarea";
import { Button } from "@heroui/react";
import React from "react";
import { FiSave, FiEdit } from "react-icons/fi";
import { maxLength } from "zod";

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
    <div className="  text-slate-100 min-h-screen selection:bg-blue-600/30">
      {/* Background overlay */}
      <div
        className="fixed inset-0 -z-20 bg-cover bg-center"
       
      />
      
      {/* Background gradient overlay */}
      <div className="fixed inset-0 -z-10     " />
 
      {/* Main content container */}
      <main className="mx-auto w-full max-w-7xl px-4 py-8">
        {/* Glass card container */}
        <div className="glass rounded-2xl p-5">
          {/* Form header with title and icon */}
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            {isEditMode ? (
              <>
                <FiEdit className="text-emerald-400" />
                {title || "ویرایش تگ"}
              </>
            ) : (
              <>
                <FiSave className="text-blue-400" />
                {title || "ساخت تگ جدید"}
              </>
            )}
          </h2>

          {/* Server error display */}
          {serverError && (
            <div className="mb-4 rounded-lg border border-red-400/30 bg-red-500/20 text-red-200 px-4 py-2 text-sm">
              {serverError}
            </div>
          )}

          {/* Form with controlled inputs */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Tag name input field */}
            <ControlledInput
              name="name"
              control={control}
              label="نام تگ"
              placeholder="نام تگ را وارد کنید"
              rules={{
                required: "وارد کردن نام تگ الزامی است",
                minLength: {
                  value: 3,
                  message: "نام باید حداقل ۳ کاراکتر باشد"
                }
              }}
              errors={errors}
              variant="bordered"
              color="primary"
              className="w-full rounded-xl border-0 bg-white/5 px-3 py-2.5 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/50"
            />

            {/* Tag slug input field */}
            <ControlledInput
              name="slug"
              control={control}
              label="اسلاگ"
              placeholder="اسلاگ تگ را وارد کنید"
                rules={{
                required: "وارد کردن نام اسلاگ تگ الزامی است",
                minLength: {
                  value: 3,
                  message: "اسلاگ باید حداقل ۳ کاراکتر باشد"
                }
              }}
              errors={errors}
              variant="bordered"
              color="primary"
              className="w-full rounded-xl border-0 bg-white/5 px-3 py-2.5 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/50"
            />

            {/* Tag description textarea field */}
            <ControlledTextarea
              name="description"
              control={control}
              label="توضیحات"
            
              placeholder="توضیحات تگ را وارد کنید"
              errors={errors}
              rows={4}
              className="w-full rounded-xl border-0 bg-white/5 px-3 py-2.5 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/50 resize-none"
            />

            {/* Submit button with loading state and conditional styling */}
            <Button
              isLoading={isLoading}
              disabled={isLoading}
              type="submit"
              size="sm"
              className={`w-full flex items-center justify-center gap-2 rounded-xl py-1.5 text-sm font-medium text-white ${
                isEditMode
                  ? "bg-gradient-to-l from-emerald-500 to-green-400"
                  : "bg-gradient-to-l from-blue-600 to-indigo-700"
              }`}
            >
              {/* Conditional button content based on edit mode */}
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
      </main>
    </div>
  );
};

export default ProductTagForm;
