"use client";
import React, { useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/api/fetcher";
import { useCrud } from "@/hooks/useCrud";
import { addToast, useDisclosure } from "@heroui/react";
import { logger } from "@/lib/utils/logger";
import MenusTable from "./table/MenusTable";
import ConfirmationModal from "@/components/shared/ConfirmationModal";

const MenusTableLogic = () => {
  const [deleteId, setDeleteId] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // use crud for delete record
  const { deleteRecord, isLoading: isLoadingDelete } = useCrud("/admin/menus");

  // use swr for get data
  const { data: response, isLoading } = useSWR(
    process.env.NEXT_PUBLIC_API_BASE_URL + "/admin/menus",
    fetcher
  );

  // delete handler
  const deleteHandler = async (id) => {
    try {
      const result = await deleteRecord(id);
      logger.debug(result);
      if (result.ok) {
        addToast({
          description: "منو با موفقیت حذف شد",
          color: "success",
          shouldShowTimeoutProgress: true,
        });
        onOpenChange(); 
        setDeleteId(null);
      }
    } catch (error) {
      addToast({
        description: error.message,
        color: "danger",
        shouldShowTimeoutProgress: true,
      });
    }
  };

  return (
    <>
    <MenusTable
      menus={response?.data || []}
      isLoading={isLoading}
      deleteHandler={onOpen}
      isLoadingDelete={isLoadingDelete}
      deleteId={deleteId}
      setDeleteId={setDeleteId}
    />
    <ConfirmationModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onOpenChange}
        onConfirm={() => deleteHandler(deleteId)}
        title="حذف منو"
        description="آیا مطمئنید که می خواهید این منو را حذف کنید؟"
        size="sm"
      />
    </>
  );
};

export default MenusTableLogic;