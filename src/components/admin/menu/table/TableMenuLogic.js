"use client";
import React, { useState } from "react";
import AdminTable from "@/components/shared/AdminTable";
import useSWR from "swr";
import { fetcher } from "@/lib/api/fetcher";
import { useCrud } from "@/hooks/useCrud";
import { addToast, useDisclosure } from "@heroui/react";
import ConfirmationModal from "@/components/shared/ConfirmationModal";

const TableMenuLogic = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  
  // use crud for delete record
  const { deleteRecord, isLoading: isLoadingDelete } = useCrud(
    "/admin/menu"
  );

  const [deleteId, setDeleteId] = useState(null);

  // use swr for get data
  const { data: response, isLoading, mutate } = useSWR(
   "/api/admin/menu",
    fetcher
  );

  // Delete handler
  const deleteHandler = async (id) => {
    try {
      const response = await deleteRecord(id);
      if (response.ok) {
        // Invalidate and revalidate SWR cache to refresh the table
        await mutate();
        
        addToast({
          description: "منو با موفقیت حذف شد",
          color: "success",
          shouldShowTimeoutProgress: true,
        });
        onOpenChange();
      }
    } catch (error) {
      addToast({
        description: error.message,
        color: "danger",
        shouldShowTimeoutProgress: true,
      });
    }
  };

  // Define columns for AdminTable
  const columns = [
    {
      key: "name",
      header: "نام منو",
      render: (menu) => <span className="font-medium">{menu.name}</span>
    },
    {
      key: "path",
      header: "مسیر",
      render: (menu) => <span className="text-slate-400">{menu.path}</span>
    },
    {
      key: "menuType",
      header: "نوع منو",
      render: (menu) => {
        const typeLabels = {
          "mega-menu": "مگا منو",
          "header-menu": "منوی هدر",
          "footer-menu": "منوی فوتر"
        };
        return <span className="text-slate-400">{typeLabels[menu.menuType] || menu.menuType}</span>;
      }
    },
    {
      key: "children",
      header: "تعداد زیرمنو",
      render: (menu) => <span className="text-slate-400">{menu.children?.length || 0}</span>
    }
  ];

  return (
    <div className={`${(response?.data || []).length > 10 ? 'max-h-[600px] overflow-y-auto' : ''}`}>
      <AdminTable
        isLoading={isLoading}
        data={response?.data || []}
        columns={columns}
        createLink="/admin/menu/create"
        createButtonText="منوی جدید"
        editLinkPrefix="/admin/menu/edit"
        editButtonText="ویرایش"
        onDelete={(id) => {
          setDeleteId(id);
          onOpenChange();
        }}
        deleteId={deleteId}
        setDeleteId={setDeleteId}
        isLoadingDelete={isLoadingDelete}
        emptyMessage="منویی وجود ندارد"
        tableId="menus-table"
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
    </div>
  );
};

export default TableMenuLogic;