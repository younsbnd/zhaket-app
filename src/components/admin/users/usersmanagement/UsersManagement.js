"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";

// Table and CRUD utilities
import { useCrud } from "@/hooks/useCrud";
import { fetcher } from "@/lib/api/fetcher";
import { logger } from "@/lib/utils/logger";
import UsersTable from "../UsersTable";

/**
 * UsersManagement component
 * Handles data fetching and CRUD operations for users
 */
export default function UsersManagement() {
  const router = useRouter();
  const [activeDeletingId, setActiveDeletingId] = useState(null);

  // Fetch all users using SWR
  const {
    data: users,
    error: fetchError,
    isLoading: isFetching,
    mutate
  } = useSWR("/api/admin/users", fetcher);

  // Debug: Log the API response structure


  // CRUD helper hook
  const { deleteRecord, error: deleteError } = useCrud("/admin/users");

  /**
   * Handle delete user action
   * @param {string} id - User ID
   */
  const handleDelete = async (id) => {
    if (!window.confirm("آیا از حذف این کاربر اطمینان دارید؟")) return;

    try {
      setActiveDeletingId(id);
      await deleteRecord(id);
      mutate(); // Refresh data after successful deletion
    } catch (err) {
      logger.error("User deletion error:", err);
    } finally {
      setActiveDeletingId(null);
    }
  };

  /**
   * Navigate to edit user page
   * @param {string} id - User ID
   */
  const handleEdit = (id) => {
    router.push(`/admin/users/edit/${id}`); // Fixed: edite → edit
  };

  /**
   * Navigate to create new user page
   */
  const handleCreate = () => {
    router.push("/admin/users/create");
  };

  // Render table component with all required props
  return (
    <UsersTable
      users={users}
      isFetching={isFetching}
      fetchError={fetchError?.message || fetchError}
      activeDeletingId={activeDeletingId}
      deleteError={deleteError}
      onCreate={handleCreate}
      onEdit={handleEdit}
      onDelete={handleDelete}
      setDeleteId={setActiveDeletingId} // Added missing prop
    />
  );
}
