"use client";

import React from "react";
import { Chip } from "@heroui/react";
import { FiUser, FiAlertTriangle } from "react-icons/fi";
import AdminTable from "@/components/shared/AdminTable";

/**
 * UsersTable component
 * Displays a list of users using the central AdminTable component
 * Includes error messages, empty state, and predefined table columns
 */
const UsersTable = ({
  users,
  isFetching,
  fetchError,
  activeDeletingId,
  deleteError,
  onCreate,
  onEdit,
  onDelete,
  setDeleteId,
}) => {
  // Ensure we have a valid data array
  const userList = users?.data || [];

  /**
   * Table columns configuration
   * Each column contains:
   * - header: Display title for the table header
   * - key: Fallback property to display when no render method is defined
   * - render: Custom render function to return JSX for each cell
   */
  const columns = [
    {
      header: "نام کامل",
      key: "fullName",
      render: (user) => (
        <div className="flex items-center gap-5">
          {/* Avatar container */}
          <div className="size-12 rounded-lg bg-blue-500/15 flex items-center justify-center">
            <FiUser className="text-blue-400 w-6 h-6" />
          </div>

          {/* Full name */}
          <div className="font-medium text-white text-[15px]">{user.fullName}</div>
        </div>
      ),
    },
    {
      header: "اطلاعات تماس",
      key: "contact",
      render: (user) => (
        <span className="text-slate-300 text-[14px]">
          {user.email && user.phoneNumber
            ? `${user.email} / ${user.phoneNumber}`
            : user.email || user.phoneNumber || "-"}
        </span>
      ),
    },
    {
      header: "نقش",
      key: "role",
      render: (user) => (
        <Chip
          size="md"
          color={user.role === "user" ? "success" : "primary"}
          className="capitalize font-semibold"
        >
          {user.role === "admin"
            ? "ادمین"
            : user.role === "user"
              ? "کاربر عادی"
              : "نامشخص"}
        </Chip>
      ),
    },
  ];

  /**
   * Custom empty state to show when there is no data
   */
  const emptyMessage = (
    <div className="text-center text-slate-400 py-12">
      <FiUser className="w-16 h-16 mx-auto mb-4 opacity-50" />
      <p className="text-lg font-medium">هیچ کاربری وجود ندارد</p>
      <p className="text-sm mt-2">برای شروع، کاربر جدیدی اضافه کنید</p>
    </div>
  );

  return (
    <div className="text-slate-100 min-h-screen selection:bg-blue-600/30">
      <div className="mx-auto w-full max-w-7xl px-6 py-10">
        {/* Page heading */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold flex items-center gap-4">
            <FiUser className="text-blue-400 w-7 h-7" />
            لیست کاربران
          </h2>
        </div>

        {/* Fetch error message */}
        {fetchError && (
          <div className="flex items-center gap-4 p-5 bg-red-500/10 border border-red-400/40 rounded-lg text-red-400 mb-8">
            <FiAlertTriangle className="w-7 h-7 shrink-0" />
            <span className="text-[15px]">
              خطا در بارگذاری کاربران: {fetchError}
            </span>
          </div>
        )}

        {/* Delete error message */}
        {deleteError && (
          <div className="flex items-center gap-4 p-5 bg-red-500/10 border border-red-400/40 rounded-lg text-red-400 mb-8">
            <FiAlertTriangle className="w-7 h-7 shrink-0" />
            <span className="text-[15px]">
              خطا در حذف کاربر: {deleteError}
            </span>
          </div>
        )}

        {/* Centralized AdminTable */}
        <AdminTable
          isLoading={isFetching}
          data={userList}
          columns={columns}
          createLink="/admin/users/create"
          createButtonText="کاربر جدید"
          editLinkPrefix="/admin/users/edit"
          onDelete={onDelete}
          deleteId={activeDeletingId}
          setDeleteId={setDeleteId}
          isLoadingDelete={isFetching}
          emptyMessage={emptyMessage}
          tableId="users-table"
        />
      </div>
    </div>
  );
};

export default UsersTable;
