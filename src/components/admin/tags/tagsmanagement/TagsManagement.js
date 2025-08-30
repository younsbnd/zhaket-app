"use client";

// React and Next.js imports
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { toast } from "@heroui/react";

// Table and CRUD utilities
import TagsTable from "../TagsTable";
import { useCrud } from "@/hooks/useCrud";
import { fetcher } from "@/lib/api/fetcher";
import { logger } from "@/lib/utils/logger";

/**
 * TagsManagement component
 * Handles fetching, creating, editing, and deleting tags
 * Main container component for tag management operations
 */
export default function TagsManagement() {
  const router = useRouter();
  const [activeDeletingId, setActiveDeletingId] = useState(null);

  // Fetch all tags using SWR
  // SWR provides data, error, isLoading, and mutate (NOT setError)
  const {
    data: tags,
    error: fetchError,
    isLoading: isFetching,
    mutate, // Used to refetch data after operations
  } = useSWR("/api/tags", fetcher);

  // CRUD hook for deleting tags
  // Only using deleteRecord and error from useCrud
  const { deleteRecord, error: deleteError } = useCrud("/tags");

  /**
   * Handle tag deletion with confirmation
   * Shows toast notifications for success/error states
   * @param {string} id - Tag ID to delete
   */
  const handleDelete = async (id) => {
    // Show confirmation dialog before deletion
    if (!window.confirm("آیا از حذف این تگ اطمینان دارید؟")) {
      return;
    }

    try {
      setActiveDeletingId(id);
      await deleteRecord(id);
      mutate();
      toast.success("تگ با موفقیت حذف شد");
    } catch (err) {
      // Show error toast notification (not setError)
      const errorMessage = err?.message || (typeof err === "string" ? err : "خطا در حذف تگ");
      toast(errorMessage, { type: "error" });
      logger.error("Tag deletion error:", err);
    } finally {
      setActiveDeletingId(null);
    }
  };

  /**
   * Navigate to edit tag page
   * @param {string} id - Tag ID to edit
   */
  const handleEdit = (id) => {
    router.push(`/admin/tags/${id}`);
  };

  /**
   * Navigate to create new tag page
   */
  const handleCreate = () => {
    router.push("/admin/tags/create");
  };

  // Render tags table component with all necessary props
  // Pass down handlers and state to child component
  return (
    <TagsTable
      tags={tags}
      isFetching={isFetching}
      fetchError={fetchError}
      activeDeletingId={activeDeletingId}
      deleteError={deleteError}
      onCreate={handleCreate}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}
