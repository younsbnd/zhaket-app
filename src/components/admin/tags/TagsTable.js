"use client";

 
 
import TagsTableSkeleton from "@/components/skeletons/tags/TagsTableSkeleton";
import { Button } from "@heroui/react";
import React from "react";
import { FiEdit, FiTrash2, FiTag, FiPlus, FiAlertTriangle } from "react-icons/fi";

const TagsTable = ({
  tags,
  isFetching,
  fetchError,
  activeDeletingId,
  deleteError,
  onCreate,
  onEdit,
  onDelete,
}) => {
  const tagList = tags?.data || [];
        {/* Loading state */}
 if (isFetching && !fetchError) {
    return <TagsTableSkeleton />;
  }

  return (
    <div className="relative min-h-screen text-slate-100">
      {/* Background overlay */}
      <div className="fixed inset-0 -z-20 bg-cover bg-center" />
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#000814]/[0.99] via-[#000814]/[0.992] to-[#000814]/[0.996] backdrop-blur-sm" />

      <div className="mx-auto max-w-7xl px-4 py-8 space-y-6">
        {/* Header section */}
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FiTag className="text-emerald-400" />
            مدیریت تگ‌ها
          </h1>
          <div className="ms-auto">
            <Button
              isLoading={isFetching}
              onClick={onCreate}
              variant="gradient"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-l from-emerald-500 to-green-400 px-4 py-2 text-sm font-medium text-white shadow hover:shadow-emerald-400/40 hover:scale-105 transition-transform"
            >
              <FiPlus className="w-4 h-4" />
              تگ جدید
            </Button>
          </div>
        </div>

        {/* Fetch error notification */}
        {fetchError && (
          <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-400/40 rounded-lg text-red-400">
            <FiAlertTriangle className="w-5 h-5 shrink-0" />
            <span>خطا در بارگذاری تگ‌ها</span>
          </div>
        )}

  

        {/* Main content area */}
        {!isFetching && !fetchError && (
          <div className="glass rounded-2xl border border-slate-800/50 p-5 backdrop-blur-md shadow-xl">
            {tagList.length === 0 ? (
              // Empty state
              <div className="text-center py-12 text-slate-400">
                <FiTag className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">هیچ تگی موجود نیست</p>
                <p className="text-sm mt-2">برای شروع، تگ جدیدی ایجاد کنید</p>
              </div>
            ) : (
              // Tags grid layout
              <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
                {tagList.map((tag) => (
                  <div
                    key={tag._id}
                    className="rounded-xl bg-white/5 border border-slate-700/40 p-5 shadow-lg hover:bg-white/10 hover:border-slate-600/60 transition-all duration-200"
                  >
                    {/* Tag header with actions */}
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-medium text-emerald-400 truncate">
                        {tag.name}
                      </h3>
                      <div className="flex gap-2">
                        {/* Edit button */}
                        <Button
                          isLoading={isFetching}
                          onClick={() => onEdit(tag._id)}
                          variant="gradient"
                          className="p-1.5 rounded-full bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 hover:scale-110 transition-all"
                          title="ویرایش تگ"
                        >
                          <FiEdit className="w-4 h-4" />
                        </Button>

                        {/* Delete button */}
                        <Button
                          onClick={() => onDelete(tag._id)}
                          isLoading={isFetching}
                          variant="gradient"
                          disabled={activeDeletingId === tag._id}
                          className="p-1.5 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:scale-110 transition-all disabled:opacity-50"
                          title="حذف تگ"
                        >
                          {activeDeletingId === tag._id ? (
                            // Loading spinner for delete action
                            <div className="w-4 h-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
                          ) : (
                            <FiTrash2 className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Tag details */}
                    <p className="text-sm text-slate-400 mb-2">شناسه: {tag._id}</p>
                    <p className="text-sm text-slate-300 line-clamp-2">
                      {tag.description || "توضیحی برای این تگ وجود ندارد."}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Delete error toast notification */}
        {deleteError && (
          <div className="flex items-center gap-3 fixed bottom-4 right-4 bg-red-500/90 text-white px-4 py-2 rounded-xl shadow-lg backdrop-blur-md border border-red-400/30">
            <FiAlertTriangle className="w-5 h-5 shrink-0" />
            <span>خطا در حذف: {deleteError}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TagsTable;
