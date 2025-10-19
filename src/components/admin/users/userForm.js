"use client";

import ControlledInput from "@/components/shared/forms/ControlledInput";
import ControlledSelect from "@/components/shared/forms/ControlledSelect";
import UserFormSkeleton from "@/components/skeletons/users/UserFormSkeleton";

import { Button, Form } from "@heroui/react";
import React from "react";
import { FiSave, FiEdit, FiUser, FiLock, FiMail, FiPhone } from "react-icons/fi";

// Available user roles
const USER_ROLES = [
  { value: "admin", label: "ادمین" },
  { value: "user", label: "کاربر عادی" },
];

/**
 * UserForm component
 * Used for both creating and editing user data
 * Handles conditional field creation based on user input
 */
const UserForm = ({
  control,
  handleSubmit,
  onSubmit,
  errors,
  isEditMode = false,
  title,
  isLoading = false,
  serverError,
  watchedEmail,
  watchedPhoneNumber,
}) => {

  return (
    <div className="text-slate-100 min-h-screen selection:bg-blue-600/30">
      {/* Background layers */}
      <div className="fixed inset-0 -z-20 bg-cover bg-center" />
      <div className="fixed inset-0 -z-10" />

      {/* Main container */}
      <div className="mx-auto w-full max-w-7xl px-4 py-8">
        <div className="glass rounded-2xl p-5">
          {/* Header */}
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            {isEditMode ? (
              <>
                <FiEdit className="text-emerald-400" />
                {title || "ویرایش کاربر"}
              </>
            ) : (
              <>
                <FiUser className="text-blue-400" />
                {title || "ساخت کاربر جدید"}
              </>
            )}
          </h2>

          {/* Server error display */}
          {serverError && (
            <div className="mb-4 rounded-lg border border-red-400/30 bg-red-500/20 text-red-200 px-4 py-2 text-sm">
              {serverError}
            </div>
          )}

          {/* User form */}
          <Form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Full name input */}
            <ControlledInput
              name="fullName"
              control={control}
              label="نام کامل"
              placeholder="نام کامل کاربر را وارد کنید"
              rules={{
                required: "وارد کردن نام کامل الزامی است",
                minLength: {
                  value: 3,
                  message: "نام باید حداقل ۳ کاراکتر باشد",
                },
              }}
              errors={errors}
              variant="bordered"
              color="primary"
              className="w-full rounded-xl border-0 bg-white/5 px-3 py-2.5 text-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600/50"
            />

            {/* Email input - with conditional validation */}
            <ControlledInput
              name="email"
              control={control}
              label="ایمیل"
              placeholder="آدرس ایمیل را وارد کنید"
              type="email"
              rules={{
                validate: (value) => {
                  // If neither email nor phone is provided, show error
                  if (!value?.trim() && !watchedPhoneNumber?.trim()) {
                    return "حداقل یکی از ایمیل یا شماره موبایل باید وارد شود";
                  }
                  // If email is provided, validate format
                  if (value?.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    return "فرمت ایمیل صحیح نیست";
                  }
                  return true;
                },
              }}
              errors={errors}
              variant="bordered"
              color="primary"
              className="w-full rounded-xl border-0 bg-white/5 px-3 py-2.5 text-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600/50"
              startContent={<FiMail className="text-slate-400" />}
            />

            {/* Phone number input - with conditional validation */}
            <ControlledInput
              name="phoneNumber"
              control={control}
              label="شماره موبایل"
              placeholder="مثال: 09123456789"
              rules={{
                validate: (value) => {
                  // If neither phone nor email is provided, show error
                  if (!value?.trim() && !watchedEmail?.trim()) {
                    return "حداقل یکی از ایمیل یا شماره موبایل باید وارد شود";
                  }
                  // If phone is provided, validate format
                  if (value?.trim() && !/^09[0-9]{9}$/.test(value)) {
                    return "شماره موبایل باید با 09 شروع شده و 11 رقم باشد";
                  }
                  return true;
                },
              }}
              errors={errors}
              variant="bordered"
              color="primary"
              className="w-full rounded-xl border-0 bg-white/5 px-3 py-2.5 text-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600/50"
              startContent={<FiPhone className="text-slate-400" />}
            />

            {/* Password input */}
            <ControlledInput
              name="password"
              control={control}
              label="رمز عبور"
              placeholder={
                isEditMode
                  ? "برای تغییر رمز عبور، مقدار جدید را وارد کنید (اختیاری)"
                  : "رمز عبور را وارد کنید"
              }
              type="password"
              rules={{
                required: !isEditMode ? "رمز عبور الزامی است" : false,
                minLength: {
                  value: 8,
                  message: "رمز عبور باید حداقل ۸ کاراکتر باشد",
                },
              }}
              errors={errors}
              variant="bordered"
              color="primary"
              className="w-full rounded-xl border-0 bg-white/5 px-3 py-2.5 text-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600/50"
              startContent={<FiLock className="text-slate-400" />}
            />

            {/* Role selection */}
            <ControlledSelect
              name="role"
              control={control}
              label="نقش کاربر"
              placeholder="نقش کاربر را انتخاب کنید"
              options={USER_ROLES}
              rules={{
                required: "انتخاب نقش کاربر الزامی است",
              }}
              errors={errors}
              variant="bordered"
              className="w-full rounded-xl border-0 bg-white/5 px-3 py-2.5 text-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600/50"
              color="primary"
              renderValue={(items) => {
                const selectedItem = items[0];
                if (!selectedItem) return null;
                return <span className="text-white">{selectedItem.textValue}</span>;
              }}
            />

            {/* Submit button */}
            <Button
              isLoading={isLoading}
              disabled={isLoading}
              type="submit"
              size="sm"
              className={`w-full flex items-center justify-center gap-2 rounded-xl py-1.5 text-sm font-medium text-white ${isEditMode
                ? "bg-gradient-to-l from-emerald-500 to-green-400"
                : "bg-gradient-to-l from-blue-600 to-indigo-700"
                }`}
            >
              {isEditMode ? (
                <>
                  <FiEdit className="w-5 h-5" />
                  ذخیره تغییرات
                </>
              ) : (
                <>
                  <FiSave className="w-5 h-5" />
                  ساخت کاربر
                </>
              )}
            </Button>
          </Form>

        </div>
      </div>
    </div>
  );
};

export default UserForm;
