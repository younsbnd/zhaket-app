"use client";
import React from "react";
import { Chip } from "@heroui/react";
import AdminTable from "@/components/shared/AdminTable";

const ProductTable = ({
  products,
  isLoading,
  onOpenChange,
  isLoadingDelete,
  deleteId,
  setDeleteId,
}) => {
  // get status config for status
  const getStatusConfig = (status) => {
    switch (status) {
      case "PUBLISHED":
        return { color: "success", text: "منتشر شده" };
      case "DRAFT":
        return { color: "warning", text: "پیش‌نویس" };
      case "ARCHIVED":
        return { color: "danger", text: "آرشیو شده" };
      default:
        return { color: "default", text: "نامشخص" };
    }
  };

  // format price for price
  const formatPrice = (price) => {
    return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
  };

  // columns configuration
  const columns = [
    {
      key: "title",
      header: "عنوان",
    },
    {
      key: "slug",
      header: "نامک",
      render: (product) => product.slug,
    },
    {
      key: "category",
      header: "دسته بندی",
      render: (product) => product.category.name,
    },
    {
      key: "price",
      header: "قیمت",
      render: (product) => formatPrice(product.price),
    },
    {
      key: "status",
      header: "وضعیت",
      render: (product) => {
        const statusConfig = getStatusConfig(product.status);
        return (
          <Chip
            color={statusConfig.color}
            variant="flat"
            radius="sm"
            size="sm"
            className="text-[15px] text-white"
          >
            {statusConfig.text}
          </Chip>
        );
      },
    },
  ];

  return (
    <AdminTable
      data={products}
      columns={columns}
      createLink="/admin/products/create"
      createButtonText="محصول جدید"
      editLinkPrefix="/admin/products/edit"
      onDelete={onOpenChange}
      deleteId={deleteId}
      setDeleteId={setDeleteId}
      isLoadingDelete={isLoadingDelete}
      emptyMessage="محصولی وجود ندارد"
      tableId="products-table"
    />
  );
};

export default ProductTable;
