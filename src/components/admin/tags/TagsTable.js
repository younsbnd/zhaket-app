

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

  // Show skeleton loading while fetching data
  if (isFetching && !fetchError) {
    return <TagsTableSkeleton />;
  }

  return (
    <div className="  text-slate-100 min-h-screen selection:bg-blue-600/30">
      {/* Background overlay */}
      <div
        className="fixed inset-0 -z-20 bg-cover bg-center"

      />
      <div className="fixed inset-0 -z-10 " />



      <main className="mx-auto w-full max-w-7xl px-4 py-8">
        <div className="glass rounded-2xl p-5">
          {/* Header section with title and create button */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <FiTag className="text-emerald-400" />
              لیست تگ‌ها
            </h2>
            <Button
              onClick={onCreate}
              size="sm"

              className="rounded-xl bg-gradient-to-l from-blue-600 to-indigo-700 px-4 py-2 text-sm flex items-center gap-2"
            >
              <FiPlus className="w-4 h-4" />
              تگ جدید
            </Button>
          </div>

          {/* Error message display */}
          {fetchError && (
            <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-400/40 rounded-lg text-red-400 mb-4">
              <FiAlertTriangle className="w-5 h-5 shrink-0" />
              <span>خطا در بارگذاری تگ‌ها</span>
            </div>
          )}

          {/* Empty state when no tags exist */}
          {tagList.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <FiTag className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">هیچ تگی موجود نیست</p>
              <p className="text-sm mt-2">برای شروع، تگ جدیدی ایجاد کنید</p>
            </div>
          ) : (
            // Tags table display
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                {/* Table header */}
                <thead className="text-slate-300">
                  <tr className="text-right">
                    <th className="px-3 py-2 font-medium">نام تگ</th>
                    <th className="px-3 py-2 font-medium">اسلاگ</th>
                    <th className="px-3 py-2 font-medium">توضیحات</th>
                    <th className="px-3 py-2 font-medium">اقدامات</th>
                  </tr>
                </thead>
                {/* Table body with tag rows */}
                <tbody className="divide-y divide-white/10">
                  {tagList.map((tag) => (
                    <tr key={tag._id} className="hover:bg-white/5">
                      {/* Tag name column */}
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-3">
                          <div className="size-9 rounded-lg bg-emerald-500/15 flex items-center justify-center">
                            <FiTag className="text-emerald-400 size-4" />
                          </div>
                          <div>
                            <div className="font-medium">{tag.name}</div>

                          </div>
                        </div>
                      </td>
                      {/* Tag slug column */}
                      <td className="px-3 py-3 text-slate-300">{tag.slug}</td>
                      {/* Tag description column */}
                      <td className="px-3 py-3 text-slate-300">
                        <div className="max-w-xs truncate">
                          {tag.description || "توضیحی ندارد"}
                        </div>
                      </td>
                      {/* Action buttons column */}
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2">
                          {/* Edit button */}
                          <Button

                            onClick={() => onEdit(tag._id)}
                            size="sm"

                            className="rounded-lg bg-white/5 px-2 py-1 hover:bg-white/10 text-xs flex items-center gap-1"
                          >
                            <FiEdit className="w-3 h-3" />
                            ویرایش
                          </Button>
                          {/* Delete button with loading state */}
                          <Button
                            onClick={() => onDelete(tag._id)}
                            size="sm"

                            disabled={activeDeletingId === tag._id}
                            className="rounded-lg bg-white/5 px-2 py-1 hover:bg-white/10 text-xs text-rose-300 flex items-center gap-1 disabled:opacity-50"
                          >
                            {/* Show spinner when deleting, otherwise show trash icon */}
                            {activeDeletingId === tag._id ? (
                              <div className="w-3 h-3 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
                            ) : (
                              <FiTrash2 className="w-3 h-3" />
                            )}
                            حذف
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TagsTable;
