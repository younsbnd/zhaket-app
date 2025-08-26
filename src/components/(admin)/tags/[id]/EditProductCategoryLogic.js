"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import useSWR from "swr";
import { useForm } from "react-hook-form";
import { useCrud } from "@/hooks/useCrud";
import { fetcher } from "@/lib/api/fetcher";
import ControlledInput from "@/components/shared/forms/ControlledInput";
import ControlledTextarea from "@/components/shared/forms/ControlledTextarea";
import { FiEdit } from "react-icons/fi";
import { EditTagErrorSkeleton, EditTagSkeleton } from "@/components/skeletons/tags/EditTagSkeleton";
 
 
// Page metadata (SEO, title, description)
export const generateMetadata = () => {
  return {
    title: "ویرایش تگ",
    description: "صفحه ویرایش تگ",
  };
};

export default function EditTagPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get tagId from URL query or dynamic route
  const tagId = useMemo(() => {
    return searchParams.get("id") || params?.id || null;
  }, [searchParams, params]);

  // CRUD hook for update
  const { updateRecord, isLoading: updating, error: updateError } =
    useCrud("/tags");

  // Fetch tag data (only if tagId is valid)
  const {
    data: tagData,
    error: fetchError,
    isLoading: loadingTag,
  } = useSWR(tagId ? `/api/tags/${tagId}` : null, fetcher);

  // RHF form setup
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { name: "", slug: "", description: "" },
  });

  // Populate form when data fetched
  useEffect(() => {
    if (tagData?.data) {
      reset({
        name: tagData.data.name || "",
        slug: tagData.data.slug || "",
        description: tagData.data.description || "",
      });
    }
  }, [tagData, reset]);

  // Form submit handler
  const onSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      await updateRecord(tagId, formData);
      router.push("/admin/tags/productTagForm");
    } catch (err) {
      console.error("Edit Tag Error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state
  if (loadingTag || isSubmitting) {
    return <EditTagSkeleton />;
  }

  // Error state (fetch)
  if (fetchError) {
    return <EditTagErrorSkeleton message="Failed to load tag data" />;
  }

  // No data case
  if (!tagData?.data) {
    return <EditTagErrorSkeleton message="Tag not found" />;
  }

  // Main Page
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

      {/* Content Container */}
      <div className="mx-auto max-w-2xl px-4 py-10">
        {/* Page Title */}
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <FiEdit className="text-emerald-400" />
          ویرایش تگ
        </h2>

        {/* Glassy Form Card */}
        <div className="glass rounded-2xl border border-slate-800/60 p-6 backdrop-blur-md shadow-xl hover:shadow-emerald-400/20 transition-shadow duration-300">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name field */}
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

            {/* Slug field */}
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

            {/* Description field */}
            <ControlledTextarea
              name="description"
              control={control}
              label="توضیحات"
              placeholder="توضیح کوتاه در مورد این تگ"
              errors={errors}
              rows={4}
            />

            {/* API error alert */}
            {updateError && (
              <p className="text-red-400 text-sm">Error: {updateError}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={updating}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-emerald-500 to-green-400 py-2.5 text-sm font-medium text-white shadow hover:shadow-emerald-400/40 hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {updating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  در حال ذخیره...
                </>
              ) : (
                <>
                  <FiEdit className="w-5 h-5" />
                  ذخیره تغییرات
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}