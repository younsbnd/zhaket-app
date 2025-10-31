"use client";
import React, { useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/api/fetcher";
import { useCrud } from "@/hooks/useCrud";
import { addToast, Chip } from "@heroui/react";
import { logger } from "@/lib/utils/logger";
import AdminTable from "@/components/shared/AdminTable";

const ProductCategoryTableLogic = () => {
  const [deleteId, setDeleteId] = useState(null);

  // use crud for delete record
  const { deleteRecord, isLoading: isLoadingDelete } = useCrud(
    "/admin/product-categories"
  );

  // use swr for get data
  const { data: response, isLoading, mutate } = useSWR(
    process.env.NEXT_PUBLIC_API_BASE_URL + "/admin/product-categories",
    fetcher
  );

  // delete handler
  const deleteHandler = async (id) => {
    try {
      const response = await deleteRecord(id);
      logger.debug(response);
      if (response.ok) {
        mutate();
        addToast({
          description: "دسته بندی محصول با موفقیت حذف شد",
          color: "success",
          shouldShowTimeoutProgress: true,
        });
      }
    } catch (error) {
      addToast({
        description: error.message,
        color: "danger",
        shouldShowTimeoutProgress: true,
      });
    }
  };

  // Define table columns
  const columns = [
    {
      header: "نام",
      key: "name",
    },
    {
      header: "نامک",
      key: "slug",
    },
    {
      header: "وضعیت",
      key: "isActive",
      render: (category) => (
        <Chip
          color={category.isActive ? "success" : "danger"}
          variant="flat"
          radius="sm"
          size="sm"
          className="text-[12px] text-white"
        >
          {category.isActive ? "فعال" : "غیرفعال"}
        </Chip>
      ),
    },
  ];

  return (
    <AdminTable
      isLoading={isLoading}
      data={response?.data || []}
      columns={columns}
      createLink="/admin/product-categories/create"
      createButtonText="دسته بندی جدید"
      editLinkPrefix="/admin/product-categories/edit"
      onDelete={deleteHandler}
      deleteId={deleteId}
      setDeleteId={setDeleteId}
      isLoadingDelete={isLoadingDelete}
      emptyMessage="دسته بندی محصولی وجود ندارد"
      tableId="product-category-table"
    />
  );
};

export default ProductCategoryTableLogic;
