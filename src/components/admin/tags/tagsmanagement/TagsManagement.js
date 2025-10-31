"use client";

// React and Next.js imports
import React, { useState } from "react";
import useSWR from "swr";
import { FiTag } from "react-icons/fi";
import { addToast } from "@heroui/react";

// Table and CRUD utilities
import AdminTable from "@/components/shared/AdminTable";
import { useCrud } from "@/hooks/useCrud";
import { fetcher } from "@/lib/api/fetcher";
import { logger } from "@/lib/utils/logger";

/**
 * TagsManagement component
 * Handles fetching, creating, editing, and deleting tags
 * Main container component for tag management operations
 */
export default function TagsManagement() {
  const [deleteId, setDeleteId] = useState(null);

  // Fetch all tags using SWR
  const {
    data: tags,
    isLoading: isFetching,
    mutate,
  } = useSWR("/api/tags", fetcher);

  // CRUD hook for deleting tags
  const { deleteRecord, isLoading: isLoadingDelete } = useCrud("/tags");

  /**
   * Handle tag deletion
   * @param {string} id - Tag ID to delete
   */
  const handleDelete = async (id) => {
    try {
      await deleteRecord(id);
      mutate();
      addToast({
        description: "تگ با موفقیت حذف شد",
        color: "success",
        shouldShowTimeoutProgress: true,
      });
    } catch (err) {
      logger.error("Tag deletion error:", err);
      addToast({
        description: err?.message || "خطا در حذف تگ",
        color: "danger",
        shouldShowTimeoutProgress: true,
      });
    }
  };

  // Define table columns
  const columns = [
    {
      header: "نام تگ",
      key: "name",
      render: (tag) => (
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-lg bg-emerald-500/15 flex items-center justify-center">
            <FiTag className="text-emerald-400 size-4" />
          </div>
          <div>
            <div className="font-medium text-white">{tag.name}</div>
          </div>
        </div>
      ),
    },
    {
      header: "اسلاگ",
      key: "slug",
      render: (tag) => <span className="text-slate-300">{tag.slug}</span>,
    },
    {
      header: "توضیحات",
      key: "description",
      render: (tag) => (
        <div className="max-w-xs truncate text-slate-300">
          {tag.description || "توضیحی ندارد"}
        </div>
      ),
    },
  ];

  return (
    <AdminTable
      isLoading={isFetching}
      data={tags?.data || []}
      columns={columns}
      createLink="/admin/tags/create"
      createButtonText="تگ جدید"
      editLinkPrefix="/admin/tags"
      onDelete={handleDelete}
      deleteId={deleteId}
      setDeleteId={setDeleteId}
      isLoadingDelete={isLoadingDelete}
      emptyMessage="هیچ تگی موجود نیست"
      tableId="tags-table"
    />
  );
}
