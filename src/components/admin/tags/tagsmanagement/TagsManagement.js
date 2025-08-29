"use client";

// React and Next.js imports
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";

// Table and CRUD utilities
import TagsTable from "../TagsTable";
import { useCrud } from "@/hooks/useCrud";
import { fetcher } from "@/lib/api/fetcher";

/**
 * TagsManagement component
 * Handles fetching, creating, editing, and deleting tags.
 */
export default function TagsManagement() {
  const router = useRouter();
  const [activeDeletingId, setActiveDeletingId] = useState(null);

  // Fetch all tags using SWR
  const {
    data: tags,
    error: fetchError,
    isLoading: isFetching,
    setError,
    mutate,
  } = useSWR("/api/tags", fetcher);

  // CRUD hook for deleting tags
  const { deleteRecord, error: deleteError } = useCrud("/tags");

  /**
   * Handle tag deletion
   * @param {string} id - Tag ID to delete
   */
  const handleDelete = async (id) => {
    try {
      setActiveDeletingId(id);
      await deleteRecord(id);
      mutate(); // Refetch tags after deletion
    } catch (err) {
      // Handle server validation errors (if any)
      if (err?.errors) {
        Object.entries(err.errors).forEach(([field, message]) => {
       
          setError(field, { message });
        });
      }
    } finally {
      setActiveDeletingId(null);
    }
  };

  /**
   * Navigate to edit tag page
   * @param {string} id - Tag ID to edit
   */
  const handleEdit = (id) => router.push(`/admin/tags/${id}`);

  /**
   * Navigate to create tag page
   */
  const handleCreate = () => router.push("/admin/tags/create");

  // Render tags table with all handlers and state
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