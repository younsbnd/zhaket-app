"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { fetcher } from "@/lib/api/fetcher";
import { useCrud } from "@/hooks/useCrud";
import { addToast } from "@heroui/react";
import MenuForm from "../menuForm";
import AdminFormSkeleton from "@/components/skeletons/admin/AdminFormSkeleton";

/**
 * EditMenuLogic Component
 * 
 * Handles the logic for editing existing menu items.
 * Manages form state, data fetching, validation, and submission.
 */
const EditMenuLogic = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get menu ID from URL parameters
  const menuId = useMemo(() => {
    return searchParams.get("id") || params?.id || null;
  }, [searchParams, params]);

  // CRUD hook for updating menu records
  const { updateRecord, isLoading: isUpdating, error: updateError } = useCrud("/admin/menu");

  // Fetch current menu data to populate form fields
  const { data: currentMenuResponse, error: fetchMenuError, isLoading: isLoadingCurrentMenu } = useSWR(
    menuId ? `/api/admin/menu/${menuId}` : null,
    fetcher,
  );

  // Form setup with default values
  const { control, handleSubmit, formState: { errors }, reset, setError } = useForm({
    defaultValues: {
      name: "",
      path: "",
      icon: "",
      menuType: "header-menu",
      children: [],
    },
  });

  // Populate form fields when menu data is loaded
  useEffect(() => {
    if (currentMenuResponse?.data) {
      const menu = currentMenuResponse.data;
      reset({
        name: menu.name || "",
        path: menu.path || "",
        icon: menu.icon || "",
        menuType: menu.menuType || "header-menu",
        children: menu.children || [],
      });
    }
  }, [currentMenuResponse, reset]);

  // Handle form submission and validation
  const handleFormSubmit = async (formData) => {
    try {
      setIsSubmitting(true);

      // Clean data - remove empty icons
      let processedData = {
        name: formData.name,
        path: formData.path,
        menuType: formData.menuType,
        children: formData.children || [],
      };
      
      // Auto-set to mega-menu if name is دسته بندی ها
      if (formData.name === "دسته بندی ها") {
        processedData.menuType = "mega-menu";
      }
      
      // Only include icon if it has a value, otherwise send null to remove it
      if (formData.icon && formData.icon.trim() !== "") {
        processedData.icon = formData.icon.trim();
      } else {
        processedData.icon = null; // Explicitly set to null to remove from DB
      }

      const response = await updateRecord(menuId, processedData);

      if (response.ok) {
        addToast({
          description: response.data.message,
          color: "success",
          shouldShowTimeoutProgress: true,
        });
        router.push("/admin/menu");
      }
    } catch (error) {
      // Handle field-level validation errors from server
      if (error.errors && Object.keys(error.errors).length > 0) {
        Object.entries(error.errors).forEach(([fieldName, message]) => {
          setError(fieldName, {
            type: "server",
            message: Array.isArray(message) ? message.join(", ") : message,
          });
        });
      }

      // Show general error message to user
      addToast({
        description: error?.error?.message || error.message,
        color: "danger",
        shouldShowTimeoutProgress: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading skeleton while fetching data
  if (isLoadingCurrentMenu) {
    return <AdminFormSkeleton inputsCount={4} />;
  }

  // Determine server error message for display
  const serverError = fetchMenuError
    ? "خطا در بارگیری داده‌های منو"
    : !currentMenuResponse?.data && !isLoadingCurrentMenu
      ? "منو پیدا نشد"
      : updateError && !updateError?.errors
        ? (typeof updateError === "string" ? updateError : updateError?.message)
        : null;

  return (
    <div className="glass rounded-2xl p-5">
      <MenuForm
        control={control}
        handleSubmit={handleSubmit}
        onSubmit={handleFormSubmit}
        errors={errors}
        btnText="ویرایش منو"
        isLoading={isUpdating || isSubmitting}
        serverError={serverError}
        currentMenuType={currentMenuResponse?.data?.menuType}
      />
    </div>
  );
};

export default EditMenuLogic;