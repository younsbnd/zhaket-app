"use client";
 
import React from "react";
import ProductTagForm from "../productTagForm";
import { useForm } from "react-hook-form";
import { useCrud } from "@/hooks/useCrud";
import { useRouter } from "next/navigation";
import { addToast } from "@heroui/react"; // Import addToast function

// Logic component for creating new product tags
// Handles form submission, validation, and API calls
export default function CreateProductTagLogic() {
  const router = useRouter();
  const { createRecord, error } = useCrud("/tags");
  
  // Initialize form with react-hook-form
  const { control, handleSubmit, setError, formState: { errors } } = useForm({
    defaultValues: { name: "", slug: "", description: "" },
  });

  // Handle form submission
  const onSubmit = handleSubmit(async (data) => {
    try {
      // Create new tag via API
      await createRecord(data);
      
      // Show success toast notification
      addToast({
        title: "موفق",
        description: "تگ با موفقیت ساخته شد",
        color: "success",
        timeout: 3000
      });
      
      // Redirect to tags list page
      router.push("/admin/tags");
    } catch (err) {
      // Handle validation errors from server
      if (err?.errors) {
        Object.entries(err.errors).forEach(([field, message]) => {
          setError(field, { message });
        });
      }
      
      // Show error toast notification
      addToast({
        title: "خطا",
        description: "خطا در ساخت تگ",
        color: "danger",
        timeout: 3000
      });
    }
  });

  return (
    <ProductTagForm
      control={control}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      errors={errors}
      isEditMode={false}
      title="ساخت تگ جدید"
      serverError={!error?.errors && (typeof error === "string" ? error : error?.message)}
    />
  );
}
