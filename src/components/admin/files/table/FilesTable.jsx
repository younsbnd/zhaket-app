"use client";
import AdminTable from "@/components/shared/AdminTable";
import { Chip } from "@heroui/react";
import React from "react";

const FilesTable = ({
  files,
  isLoading,
  onOpenChange,
  isLoadingDelete,
  deleteId,
  setDeleteId,
}) => {
  // format file size
  const formatFileSize = (sizeInBytes) => {
    if (sizeInBytes < 1024) return `${sizeInBytes} B`;
    if (sizeInBytes < 1024 * 1024) return `${(sizeInBytes / 1024).toFixed(2)} KB`;
    if (sizeInBytes < 1024 * 1024 * 1024) return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
    return `${(sizeInBytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  };

  // columns configuration
  const columns = [
    {
      key: "fileName",
      header: "نام فایل",
      render: (file) => file.fileName,
    },
    {
      key: "product",
      header: "محصول",
      render: (file) => file.product?.title || "نامشخص",
    },
    {
      key: "fileType",
      header: "نوع فایل",
      render: (file) => (
        <Chip
          color="default"
          variant="flat"
          radius="sm"
          size="sm"
          className="text-[13px] text-white"
        >
          {file.fileType}
        </Chip>
      ),
    },
    {
      key: "fileSize",
      header: "حجم فایل",
      render: (file) => formatFileSize(file.fileSize),
    },
    {
      key: "version",
      header: "نسخه",
      render: (file) => `${file.version}`,
    },
    {
      key: "downloadCount",
      header: "تعداد دانلود",
      render: (file) => file.downloadCount || 0,
    },
  ];

  return (
    <AdminTable
      data={files}
      columns={columns}
      createLink="/admin/files/create"
      createButtonText="فایل جدید"
      editLinkPrefix="/admin/files/edit"
      onDelete={onOpenChange}
      deleteId={deleteId}
      setDeleteId={setDeleteId}
      isLoadingDelete={isLoadingDelete}
      emptyMessage="فایلی وجود ندارد"
      tableId="files-table"
      isLoading={isLoading}
    />
  );
};

export default FilesTable;
