"use client";
import React, { useState } from "react";
import TicketsTable from "./TicketsTable";
import useSWR from "swr";
import { fetcher } from "@/lib/api/fetcher";
import { useCrud } from "@/hooks/useCrud";
import { addToast, useDisclosure } from "@heroui/react";
import { logger } from "@/lib/utils/logger";
import ConfirmationModal from "@/components/shared/ConfirmationModal";
import AdminTableSkeleton from "@/components/skeletons/admin/AdminTableSkeleton";

const TicketsTableLogic = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  
  // Use crud for delete record
  const { deleteRecord, isLoading: isLoadingDelete } = useCrud(
    "/admin/tickets"
  );

  const [deleteId, setDeleteId] = useState(null);

  // Use swr for get data
  const { data: response, isLoading } = useSWR(
    process.env.NEXT_PUBLIC_API_BASE_URL + "/admin/tickets",
    fetcher
  );

  // Delete handler
  const deleteHandler = async (id) => {
    try {
      const response = await deleteRecord(id);
      logger.debug(response);
      if (response.ok) {
        addToast({
          description: "تیکت با موفقیت حذف شد",
          color: "success",
          shouldShowTimeoutProgress: true,
        });
        onOpenChange();
      }
    } catch (error) {
      addToast({
        description: error.message || "خطا در حذف تیکت",
        color: "danger",
        shouldShowTimeoutProgress: true,
      });
    }
  };

  // if loading, show the skeleton
  if (isLoading) {
    return <AdminTableSkeleton />;
  }

  return (
    <div>
      <TicketsTable
        tickets={response?.data || []}
        isLoading={isLoading}
        deleteRecord={deleteHandler}
        isLoadingDelete={isLoadingDelete}
        deleteId={deleteId}
        setDeleteId={setDeleteId}
        onOpenChange={onOpenChange}
      />
      {/* confirmation modal for delete ticket */}
      <ConfirmationModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onOpenChange}
        onConfirm={() => deleteHandler(deleteId)}
        title="حذف تیکت"
        description="آیا مطمئنید که می‌خواهید این تیکت و تمام پاسخ‌های آن را حذف کنید؟"
        size="sm"
      />
    </div>
  );
};

export default TicketsTableLogic;

