"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/lib/api/fetcher";
import { useCrud } from "@/hooks/useCrud";
import { FiEdit, FiTrash2, FiTag, FiPlus } from "react-icons/fi";
import { TagsListSkeleton } from "@/components/skeletons/tags/productTagSkeleton";

export const generateMetadata = () => {
  return {
    title: "مدیریت تگ‌ها",
    description: "صفحه مدیریت و ویرایش تگ‌های محصولات",
  };
};

export default function TagsList() {
  const router = useRouter();
  const [deletingTagId, setDeletingTagId] = useState(null);

  // Fetch tags data
  const {
    data: tagsData,
    error: fetchError,
    isLoading,
    mutate,
  } = useSWR("/api/tags", fetcher);

  // CRUD operations
  const { deleteRecord, isLoading: deleting, error: deleteError } = useCrud("/tags");

  // Handle delete tag
  const handleDeleteTag = async (tagId) => {
    if (!confirm("آیا از حذف این تگ مطمئن هستید؟")) return;

    try {
      setDeletingTagId(tagId);
      await deleteRecord(tagId);
      mutate(); // Revalidate data
    } catch (err) {
      console.error("Delete Tag Error:", err);
      alert("خطا در حذف تگ");
    } finally {
      setDeletingTagId(null);
    }
  };

  // Navigate to edit page
  const handleEditTag = (tagId) => {
    router.push(`/admin/tags/EditProductCategoryLogic/${tagId}`);
  };

  // Navigate to create page
  const handleCreateTag = () => {
    router.push("/admin/tags/CreateProductTagLogic");
  };

  // Loading state
  if (isLoading) {
    return <TagsListSkeleton />;
  }

  // Error state
  if (fetchError) {
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

        <div className="flex justify-center items-center min-h-screen">
          <div className="text-red-400 text-lg p-6 bg-white/5 border border-red-400/20 rounded-xl backdrop-blur-md shadow-xl">
            خطا در بارگذاری تگ‌ها
          </div>
        </div>
      </div>
    );
  }

  // Main page content
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
      <div className="mx-auto max-w-7xl px-4 py-8 space-y-6">
        {/* Header Section */}
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FiTag className="text-emerald-400" />
            مدیریت تگ‌ها
          </h1>
          <div className="ms-auto">
            <button
              onClick={handleCreateTag}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-l from-emerald-500 to-green-400 px-4 py-2 text-sm font-medium text-white shadow hover:shadow-emerald-400/40 hover:scale-105 transition-transform"
            >
              <FiPlus className="w-4 h-4" />
              تگ جدید
            </button>
          </div>
        </div>

        {/* Tags Grid */}
        <div className="glass rounded-2xl border border-slate-800/50 p-5 backdrop-blur-md shadow-xl hover:shadow-emerald-400/20 transition-shadow duration-300">
          {tagsData?.data?.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <FiTag className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">هیچ تگی موجود نیست</p>
              <p className="text-sm mt-2">برای شروع، تگ جدیدی ایجاد کنید</p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
              {tagsData?.data?.map((tag) => (
                <div
                  key={tag._id}
                  className="rounded-xl bg-white/5 border border-slate-700/40 p-5 shadow-lg hover:bg-white/10 hover:border-slate-600/60 transition-all duration-200"
                >
                  {/* Tag Header with Actions */}
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-medium text-emerald-400 truncate">
                      {tag.name}
                    </h3>
                    <div className="flex gap-2">
                      {/* Edit Button */}
                      <button
                        onClick={() => handleEditTag(tag._id)}
                        className="p-1.5 rounded-full bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 hover:scale-110 transition-all duration-200"
                        title="ویرایش تگ"
                      >
                        <FiEdit className="w-4 h-4" />
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDeleteTag(tag._id)}
                        disabled={deletingTagId === tag.id}
                        className="p-1.5 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:scale-110 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        title="حذف تگ"
                      >
                        {deletingTagId === tag.id ? (
                          <div className="w-4 h-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin"></div>
                        ) : (
                          <FiTrash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Tag ID */}
                  <p className="text-sm text-slate-400 mb-2">
                    شناسه: {tag.id}
                  </p>

                  {/* Tag Description */}
                  <p className="text-sm text-slate-300 line-clamp-2">
                    {tag.description || "توضیحی برای این تگ وجود ندارد."}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Delete Error Display */}
        {deleteError && (
          <div className="fixed bottom-4 right-4 bg-red-500/90 text-white px-4 py-2 rounded-xl shadow-lg backdrop-blur-md border border-red-400/30">
            خطا در حذف: {deleteError}
          </div>
        )}
      </div>
    </div>
  );
}
