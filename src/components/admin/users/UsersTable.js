"use client";

import React from "react";
import { Chip } from "@heroui/react";
import { FiUser, FiAlertTriangle } from "react-icons/fi";
import AdminTable from "@/components/shared/AdminTable";
 
 
/**
 * UsersTable component
 * Displays a list of users with details and action buttons using AdminTable structure
 *
 * @param {Object} props - Component props
 * @param {Array} props.users - List of user objects
 * @param {boolean} props.isFetching - Indicates if data is currently loading
 * @param {string|null} props.fetchError - Error message for loading users
 * @param {string|null} props.activeDeletingId - ID of the user currently being deleted
 * @param {string|null} props.deleteError - Error message for deleting user
 * @param {Function} props.onCreate - Callback to create a new user
 * @param {Function} props.onEdit - Callback to edit a user
 * @param {Function} props.onDelete - Callback to delete a user
 * @param {Function} props.setDeleteId - Function to set the ID of user being deleted
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
  const userList = users?.data || [];

  /**
   * Define table columns configuration
   * Each column defines how to display user data
   */
  const columns = [
    {
      header: "نام کامل",
      key: "fullName",
      render: (user) => (
        <div className="flex items-center gap-5">
          <div className="size-12 rounded-lg bg-blue-500/15 flex items-center justify-center">
            <FiUser className="text-blue-400 w-6 h-6" />
          </div>
          <div>
            <div className="font-medium text-white text-[15px]">{user.fullName}</div>
          </div>
        </div>
      ),
    },
    {
      header: "ایمیل",
      key: "email",
      render: (user) => (
        <span className="text-slate-300 text-[14px]">{user.email || "-"}</span>
      ),
    },
    {
      header: "شماره موبایل",
      key: "phoneNumber",
      render: (user) => (
        <span className="text-slate-300 text-[14px]">{user.phoneNumber || "-"}</span>
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
          {user.role === "admin" ? "ادمین" : user.role === "user" ? "کاربر عادی" : "نامشخص"}
        </Chip>
      ),
    },
  ];

  /**
   * Custom empty state message for when no users exist
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
      {/* Background layers for styling */}
      <div className="fixed inset-0 -z-20 bg-cover bg-center" />
      <div className="fixed inset-0 -z-10" />

      <main className="mx-auto w-full max-w-7xl px-6 py-10">
        {/* Page Header */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold flex items-center gap-4">
            <FiUser className="text-blue-400 w-7 h-7" />
            لیست کاربران
          </h2>
        </div>

        {/* Error Messages */}
        {/* Display fetch error if data loading failed */}
        {fetchError && (
          <div className="flex items-center gap-4 p-5 bg-red-500/10 border border-red-400/40 rounded-lg text-red-400 mb-8">
            <FiAlertTriangle className="w-7 h-7 shrink-0" />
            <span className="text-[15px]">خطا در بارگذاری کاربران: {fetchError}</span>
          </div>
        )}

        {/* Display delete error if user deletion failed */}
        {deleteError && (
          <div className="flex items-center gap-4 p-5 bg-red-500/10 border border-red-400/40 rounded-lg text-red-400 mb-8">
            <FiAlertTriangle className="w-7 h-7 shrink-0" />
            <span className="text-[15px]">خطا در حذف کاربر: {deleteError}</span>
          </div>
        )}

        {/* Users Table using AdminTable component */}
        <AdminTable
          // Data configuration
          data={userList}
          columns={columns}
          
          // Create button configuration
          createLink="/admin/users/create"
          createButtonText="کاربر جدید"
          
          // Edit/Delete configuration
          editLinkPrefix="/admin/users/"
          onDelete={onDelete}
          deleteId={activeDeletingId}
          setDeleteId={setDeleteId}
          isLoadingDelete={isFetching}
          
          // Table customization
          emptyMessage={emptyMessage}
          tableId="users-table"
        />
      </main>
    </div>
  );
};

export default UsersTable;
