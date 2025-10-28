 "use client";
import React, { useState } from "react";
import AdminTable from "@/components/shared/AdminTable";
import useSWR from "swr";
import { fetcher } from "@/lib/api/fetcher";
import { useCrud } from "@/hooks/useCrud";
import { addToast, useDisclosure } from "@heroui/react";
import { logger } from "@/lib/utils/logger";
import ConfirmationModal from "@/components/shared/ConfirmationModal";
import { Chip } from "@heroui/react";

/**
 * Build hierarchical options for parent menu selection
 * @param {Array} menus - Array of menu objects
 * @returns {Array} Array of parent menu options
 */
const buildHierarchicalOptions = (menus) => {
  const options = [{ label: "بدون منوی والد", value: "" }];
  
  // Ensure menus is an array before processing
  if (!menus || !Array.isArray(menus) || menus.length === 0) {
    return options;
  }
  
  // Show ALL menus as parent options - including children
  menus.forEach((menu) => {
    if (menu && menu._id && menu.name) {
      options.push({ 
        label: `${menu.name}`,
        value: menu._id 
      });
    }
  });
  
  return options;
};

const TableMenuLogic = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  
  // use crud for delete record
  const { deleteRecord, isLoading: isLoadingDelete } = useCrud(
    "/admin/menu"
  );

  const [deleteId, setDeleteId] = useState(null);

  // use swr for get data
  const { data: response, isLoading } = useSWR(
   "/api/admin/menu",
    fetcher
  );

  // Helper functions for rendering
  const getStatusConfig = (isActive) => {
    return isActive 
      ? { color: "success", text: "فعال" }
      : { color: "danger", text: "غیرفعال" };
  };

  const getTargetConfig = (target) => {
    switch (target) {
      case "_self":
        return { color: "primary", text: "همان صفحه" };
      case "_blank":
        return { color: "secondary", text: "صفحه جدید" };
      default:
        return { color: "default", text: "نامشخص" };
    }
  };

  // Delete handler
  const deleteHandler = async (id) => {
    try {
      const response = await deleteRecord(id);
      if (response.ok) {
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
      key: "slug",
      header: "نامک",
      render: (menu) => <span className="text-slate-400">{menu.slug}</span>
    },
    {
      key: "path",
      header: "مسیر",
      render: (menu) => <span className="text-slate-400">{menu.path}</span>
    },
    {
      key: "parent",
      header: "منوی والد",
      render: (menu) => <span className="text-slate-400">{menu.parent?.name || "-"}</span>
    },
    {
      key: "target",
      header: "نوع باز کردن",
      render: (menu) => (
        <Chip
          color={getTargetConfig(menu.target).color}
          variant="flat"
          radius="sm"
          size="sm"
          className="text-[12px] text-white"
        >
          {getTargetConfig(menu.target).text}
        </Chip>
      )
    },
    {
      key: "isActive",
      header: "وضعیت",
      render: (menu) => (
        <Chip
          color={getStatusConfig(menu.isActive).color}
          variant="flat"
          radius="sm"
          size="sm"
          className="text-[12px] text-white"
        >
          {getStatusConfig(menu.isActive).text}
        </Chip>
      )
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