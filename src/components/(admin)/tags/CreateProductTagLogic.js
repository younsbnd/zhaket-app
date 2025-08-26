"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useCrud } from "@/hooks/useCrud";
import ControlledInput from "@/components/shared/forms/ControlledInput";
import ControlledTextarea from "@/components/shared/forms/ControlledTextarea";
import { FiSave } from "react-icons/fi";
import { CreateTagSkeleton } from "@/components/skeletons/tags/CreateProductTagSkeleton";
 
export const generateMetadata = () => {
  return metadata({
    title: "ایجاد تگ",
    description: "ایجاد تگ",
  });
};

export default function CreateTagPage() {
  const router = useRouter();
  const { createRecord, isLoading, error } = useCrud("/tags");
  const [isPageLoading, setIsPageLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      slug: "",
      description: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      setIsPageLoading(true);
      await createRecord(data);
      router.push("/admin/tags/productTagForm");
    } catch (err) {
      console.error("Create Tag Error:", err);
    } finally {
      setIsPageLoading(false);
    }
  };

  // Show skeleton while processing
  if (isPageLoading) return <CreateTagSkeleton />;

  return (
    <div className="relative min-h-screen text-slate-100">
      {/* Background Layer */}
      <div
        className="fixed inset-0 -z-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1557683316-973673baf926?q=90&w=2400&auto=format&fit=crop')",
        }}
      ></div>
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#000814]/[0.99] via-[#000814]/[0.992] to-[#000814]/[0.996] backdrop-blur-sm"></div>

      {/* Page Container */}
      <div className="mx-auto max-w-2xl px-4 py-10">
        {/* Page Title */}
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <FiSave className="text-blue-400" /> ساخت تگ جدید
        </h2>

        {/* Glassy Form Card */}
        <div className="glass rounded-2xl border border-slate-800/60 p-6 backdrop-blur-md shadow-xl hover:shadow-blue-500/20 transition-shadow duration-300">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Tag name field */}
            <ControlledInput
              name="name"
              control={control}
              label="نام"
              placeholder="مثلاً: برنامه‌نویسی"
              rules={{ required: "نام الزامی است" }}
              errors={errors}
              variant="bordered"
              color="primary"
            />

            {/* Tag slug field */}
            <ControlledInput
              name="slug"
              control={control}
              label="اسلاگ"
              placeholder="مثلاً: programming"
              rules={{ required: "اسلاگ الزامی است" }}
              errors={errors}
              variant="bordered"
              color="primary"
            />

            {/* Tag description text area */}
            <ControlledTextarea
              name="description"
              control={control}
              label="توضیحات"
              placeholder="توضیح کوتاه در مورد این تگ"
              errors={errors}
              rows={4}
            />

            {/* API error alert */}
            {error && <p className="text-red-400 text-sm">خطا: {error}</p>}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-blue-600 to-indigo-700 py-2.5 text-sm font-medium text-white shadow hover:shadow-blue-400/40 hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  در حال ذخیره...
                </>
              ) : (
                <>
                  <FiSave className="w-5 h-5" />
                  ذخیره
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}