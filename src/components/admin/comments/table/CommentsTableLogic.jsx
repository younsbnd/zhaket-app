"use client";
import React, { useState } from "react";
import CommentsTable from "./CommentsTable";
import useSWR from "swr";
import { fetcher } from "@/lib/api/fetcher";
import { useCrud } from "@/hooks/useCrud";
import { addToast, useDisclosure } from "@heroui/react";
import { logger } from "@/lib/utils/logger";
import ConfirmationModal from "@/components/shared/ConfirmationModal";
import AdminTableSkeleton from "@/components/skeletons/admin/AdminTableSkeleton";

const CommentsTableLogic = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Use crud for delete and update records
  const { deleteRecord, isLoading: isLoadingDelete } =
    useCrud("/admin/comments");

  const [deleteId, setDeleteId] = useState(null);

  // Use swr for get data
  const {
    data: response,
    isLoading,
    mutate,
  } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/comments`, fetcher);

  // Delete handler
  const deleteHandler = async (id) => {
    try {
      const response = await deleteRecord(id);
      logger.debug(response);
      if (response.ok) {
        addToast({
          description: "نظر و تمام پاسخ‌های آن با موفقیت حذف شد",
          color: "success",
          shouldShowTimeoutProgress: true,
        });
        mutate();
        onOpenChange();
      }
    } catch (error) {
      addToast({
        description: error.message || "خطا در حذف نظر",
        color: "danger",
        shouldShowTimeoutProgress: true,
      });
    }
  };

  if (isLoading) {
    return <AdminTableSkeleton />;
  }

  return (
    <div>
      <CommentsTable
        comments={response?.data || []}
        isLoading={isLoading}
        deleteRecord={deleteHandler}
        isLoadingDelete={isLoadingDelete}
        deleteId={deleteId}
        setDeleteId={setDeleteId}
        onOpenChange={onOpenChange}
      />
      <ConfirmationModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onOpenChange}
        onConfirm={() => deleteHandler(deleteId)}
        title="حذف نظر"
        description="آیا مطمئنید که می‌خواهید این نظر و تمام پاسخ‌های آن را حذف کنید؟"
        size="sm"
      />
    </div>
  );
};

export default CommentsTableLogic;
