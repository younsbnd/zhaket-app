"use client";
import React from "react";
import { Chip } from "@heroui/react";
import AdminTable from "@/components/shared/AdminTable";
import { formatDate } from "@/lib/utils/formatDate";

const CommentsTable = ({
  comments,
  isLoading,
  onOpenChange,
  isLoadingDelete,
  deleteId,
  setDeleteId,
}) => {
  // Columns configuration
  const columns = [
    // user column
    {
      key: "user",
      header: "کاربر",
      render: (comment) => (
        <div className="flex flex-col gap-1">
          <span className="text-white/90 text-sm">
            {comment.user?.fullName || "نامشخص"}
          </span>
          {comment.user?.email && (
            <span className="text-white/60 text-xs">{comment.user.email}</span>
          )}
        </div>
      ),
    },
    // product column
    {
      key: "product",
      header: "محصول",
      render: (comment) => (
        <span className="text-white/90 line-clamp-1">
          {comment.product?.title || "نامشخص"}
        </span>
      ),
    },
    // replies count column
    {
      key: "repliesCount",
      header: "وضعیت پاسخ",
      render: (comment) => (
        <div className="flex items-center gap-2">
          {comment.repliesCount > 0 ? (
            <Chip
              color="success"
              variant="flat"
              size="sm"
              radius="sm"
              className="text-white"
            >
              پاسخ داده شده ({comment.repliesCount})
            </Chip>
          ) : (
            <Chip
              color="warning"
              variant="flat"
              size="sm"
              radius="sm"
              className="text-white"
            >
              بدون پاسخ
            </Chip>
          )}
        </div>
      ),
    },
    // approval status column
    {
      key: "isApproved",
      header: "وضعیت تایید",
      render: (comment) => (
        <Chip
          color={comment.isApproved ? "success" : "warning"}
          variant="flat"
          radius="sm"
          size="sm"
          className="text-[14px] text-white"
        >
          {comment.isApproved ? "تایید شده" : "در انتظار تایید"}
        </Chip>
      ),
    },
    // created at column
    {
      key: "createdAt",
      header: "تاریخ ایجاد",
      render: (comment) => (
        <span className="text-white/70 text-sm">
          {formatDate(comment.createdAt)}
        </span>
      ),
    },
  ];

  return (
    <div className="overflow-x-auto">
      <AdminTable
        data={comments}
        columns={columns}
        editLinkPrefix="/admin/comments"
        editButtonText="مشاهده "
        onDelete={onOpenChange}
        deleteId={deleteId}
        setDeleteId={setDeleteId}
        isLoadingDelete={isLoadingDelete}
        emptyMessage="نظری وجود ندارد"
        tableId="comments-table"
        isLoading={isLoading}
      />
    </div>
  );
};

export default CommentsTable;
