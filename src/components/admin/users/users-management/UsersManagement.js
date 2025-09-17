"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";

import { useCrud } from "@/hooks/useCrud";
import { fetcher } from "@/lib/api/fetcher";
import { logger } from "@/lib/utils/logger";
import UsersTable from "../UsersTable";
import ConfirmationModal from "@/components/shared/ConfirmationModal";
import { addToast } from "@heroui/react";


export default function UsersManagement() {
  const router = useRouter();


  // ID of the user being deleted
  const [activeDeletingId, setActiveDeletingId] = useState(null);

  // Controls modal visibility
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // SWR data fetching
  const {
    data: users,
    error: fetchError,
    isLoading: isFetching,
    mutate
  } = useSWR("/api/admin/users", fetcher);

  // CRUD helper
  const { deleteRecord, error: deleteError } = useCrud("/admin/users");

  /** Opens confirmation modal for a specific user */
  const openDeleteModal = (id) => {
    setActiveDeletingId(id);
    setIsConfirmOpen(true);
  };

  /** Called when user confirms deletion in modal */
  const confirmDelete = async () => {
    try {
      await deleteRecord(activeDeletingId);
      mutate();

      // Show success toast
      addToast({
        description: "کاربر با موفقیت حذف شد",
        color: "success",
        shouldShowTimeoutProgress: true,
      });

      logger.info("User deleted", { userId: activeDeletingId });
    } catch (err) {
      logger.error("User deletion error:", err);

      // (اختیاری) نمایش توست خطا
      addToast({
        description: "خطا در حذف کاربر",
        color: "danger",
        shouldShowTimeoutProgress: true,
      });
    } finally {
      setActiveDeletingId(null);
      setIsConfirmOpen(false);
    }
  };

  /** Navigate to edit page */
  const handleEdit = (id) => router.push(`/admin/users/edit/${id}`);

  /** Navigate to create page */
  const handleCreate = () => router.push("/admin/users/create");

  return (
    <>
      <UsersTable
        users={users}
        isFetching={isFetching}
        fetchError={fetchError?.message || fetchError}
        activeDeletingId={activeDeletingId}
        deleteError={deleteError}
        onCreate={handleCreate}
        onEdit={handleEdit}
        onDelete={openDeleteModal}
        setDeleteId={setActiveDeletingId}
      />

      <ConfirmationModal
        title="حذف کاربر"
        description="آیا از حذف این کاربر مطمئن هستید؟"
        isOpen={isConfirmOpen}
        onOpenChange={setIsConfirmOpen}
        onConfirm={confirmDelete}
      />
    </>
  );
}
