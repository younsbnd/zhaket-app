"use client";
import React, { useState } from "react";
import ProductCategoryTable from "./ProductCategoryTable";
import useSWR from "swr";
import { fetcher } from "@/lib/api/fetcher";
import { useCrud } from "@/hooks/useCrud";
import { addToast, useDisclosure } from "@heroui/react";
import { logger } from "@/lib/utils/logger";
import ProductCategoriesTableSkeleton from "@/components/skeletons/product-categories/ProductCategoriesTableSkeleton";
import ConfirmationModal from "@/components/shared/ConfirmationModal";

const ProductCategoryTableLogic = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // use crud for delete record
  const { deleteRecord, isLoading: isLoadingDelete } = useCrud(
    "/admin/product-categories"
  );

  const [deleteId, setDeleteId] = useState(null);

  // use swr for get data
  const { data: response, isLoading } = useSWR(
    process.env.NEXT_PUBLIC_API_BASE_URL + "/admin/product-categories",
    fetcher
  );

  // delete handler
  const deleteHandler = async (id) => {
    try {
      const response = await deleteRecord(id);
      logger.debug(response);
      if (response.ok) {
        addToast({
          description: "دسته بندی محصول با موفقیت حذف شد",
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

  if (isLoading) {
    return <ProductCategoriesTableSkeleton />;
  }
  return (
    <div>
      <ProductCategoryTable
        productCategories={response?.data || []}
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
        title="حذف دسته بندی"
        description="آیا مطمئنید که می خواهید این دسته بندی را حذف کنید؟"
        size="sm"
      />
    </div>
  );
};

export default ProductCategoryTableLogic;
