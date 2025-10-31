"use client";
import { useCrud } from "@/hooks/useCrud";
import { addToast } from "@heroui/react";
import React from "react";
import { useForm } from "react-hook-form";
import MenuForm from "../menuForm";
import { useRouter } from "next/navigation";

/**
 * CreateMenuLogic Component
 * 
 * Handles the logic for creating new menu items.
 * Manages form state, validation, and submission.
 */
const CreateMenuLogic = () => {
  const {
    handleSubmit,
    formState: { errors },
    setError,
    control,
  } = useForm({
    defaultValues: {
      name: "",
      path: "",
      icon: "",
      menuType: "header-menu",
      children: [],
    },
  });

  const router = useRouter();

  // useCrud hook for creating menu records
  const {
    createRecord: createMenu,
    isLoading,
  } = useCrud("/admin/menu");

  // Submit handler for creating new menu
  const onSubmit = async (data) => {
    try {
      // Clean data - remove empty icons
      let processedData = {
        name: data.name,
        path: data.path,
        menuType: data.menuType,
        children: data.children || [],
      };
      
      // Auto-set to mega-menu if name is  
      if (data.name === "دسته بندی ها " ) {
        processedData.menuType = "mega-menu";
      }
      
      // Only include icon if it has a value
      if (data.icon && data.icon.trim() !== "") {
        processedData.icon = data.icon.trim();
      }
      
      const response = await createMenu(processedData);
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
      // Handle general error messages
      addToast({
        description: error?.error?.message || error.message,
        color: "danger",
        shouldShowTimeoutProgress: true,
      });
    }
  };

  return (
    <div className="glass rounded-2xl p-5">
      <MenuForm
        handleSubmit={handleSubmit}
        errors={errors}
        onSubmit={onSubmit}
        control={control}
        btnText="ایجاد منو"
        isLoading={isLoading}
        currentMenuType={null}
      />
    </div>
  );
};

export default CreateMenuLogic;