"use client";
import TagsTableSkeleton from "@/components/skeletons/tags/TagsTableSkeleton";
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
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
    <div className="text-slate-100 min-h-screen selection:bg-blue-600/30">
      {/* Background overlay */}
      <div className="fixed inset-0 -z-20 bg-cover bg-center" />
      <div className="fixed inset-0 -z-10" />

      <main className="mx-auto w-full max-w-7xl px-4 py-8">
        <div className="glass rounded-2xl p-5">
          {/* Header section with title and create button */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <FiTag className="text-emerald-400" />
              لیست تگ‌ها
            </h2>
            <div className="ms-auto flex items-center gap-2">
              <Button
                onClick={onCreate}
                size="sm"
                className="rounded-xl bg-gradient-to-l from-blue-600 to-indigo-700 px-3 py-2 text-[10px] text-white flex items-center gap-2"
              >
                <FiPlus className="w-4 h-4" />
                تگ جدید
              </Button>
            </div>
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
            // Tags table display using HeroUI Table component
            <div className="mt-4 overflow-x-auto">
              <Table
                radius="sm"
                shadow="none"
                aria-labelledby="tags-table"
                classNames={{
                  wrapper: "bg-transparent",
                  th: "bg-transparent text-white font-semibold",
                  td: "text-[11px]",
                  tr: "h-[47px] not-last:not-first:border-y border-white/10 hover:bg-white/5",
                }}
              >
                <TableHeader>
                  <TableColumn>نام تگ</TableColumn>
                  <TableColumn>اسلاگ</TableColumn>
                  <TableColumn>توضیحات</TableColumn>
                  <TableColumn>اقدامات</TableColumn>
                </TableHeader>
                <TableBody>
                  {tagList.map((tag) => (
                    <TableRow key={tag._id}>
                      {/* Tag name column with icon */}
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="size-9 rounded-lg bg-emerald-500/15 flex items-center justify-center">
                            <FiTag className="text-emerald-400 size-4" />
                          </div>
                          <div>
                            <div className="font-medium text-white">{tag.name}</div>
                          </div>
                        </div>
                      </TableCell>
                      
                      {/* Tag slug column */}
                      <TableCell>
                        <span className="text-slate-300">{tag.slug}</span>
                      </TableCell>
                      
                      {/* Tag description column */}
                      <TableCell>
                        <div className="max-w-xs truncate text-slate-300">
                          {tag.description || "توضیحی ندارد"}
                        </div>
                      </TableCell>
                      
                      {/* Action buttons column */}
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {/* Edit button */}
                          <Button
                            onClick={() => onEdit(tag._id)}
                            size="sm"
                            variant="shadow"
                            color="default"
                            className="text-[11px] rounded-[2px] w-auto h-[20px] flex items-center gap-1"
                          >
                            <FiEdit className="w-3 h-3" />
                            ویرایش
                          </Button>
                          
                          {/* Delete button with loading state */}
                          <Button
                            onClick={() => onDelete(tag._id)}
                            size="sm"
                            variant="shadow"
                            color="danger"
                            disabled={activeDeletingId === tag._id}
                            className="text-[11px] w-auto h-[20px] rounded-[2px] disabled:opacity-50 flex items-center gap-1"
                          >
                            {/* Show spinner when deleting, otherwise show trash icon */}
                            {activeDeletingId === tag._id ? (
                              <div className="w-3 h-3 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
                            ) : (
                              <FiTrash2 className="w-3 h-3" />
                            )}
                            <span className="whitespace-nowrap">حذف</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TagsTable;
