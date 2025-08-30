"use client";
 
// React and Next.js imports
import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "@heroui/react";

// Components and utilities
import ProductTagForm from "../productTagForm";
import { useCrud } from "@/hooks/useCrud";

/**
 * Logic component for creating new product tags
 * Handles form submission, validation, and API calls
 */
export default function CreateProductTagLogic() {
  const router = useRouter();
  const { createRecord, error } = useCrud("/tags");
  
  // Initialize form with react-hook-form
  const { control, handleSubmit, setError, formState: { errors } } = useForm({
    defaultValues: { name: "", slug: "", description: "" },
  });

  /**
   * Handle form submission for creating new tag
   * @param {Object} data - Form data containing tag information
   */
  const onSubmit = handleSubmit(async (data) => {
    try {
      // Create new tag via API
      await createRecord(data);
      
      // Show success toast notification using Hero UI
      toast("تگ با موفقیت ساخته شد", { type: "success" });
      
      // Redirect to tags list page
      router.push("/admin/tags");
    } catch (err) {
      // Handle validation errors from server
      if (err?.errors) {
        Object.entries(err.errors).forEach(([field, message]) => {
          setError(field, { message });
        });
      }
      
      // Show error toast notification with specific error details using Hero UI
      const errorMessage = err?.message || 
                          (typeof err === "string" ? err : "خطا در ساخت تگ");
      toast(`خطا در ساخت تگ: ${errorMessage}`, { type: "error" });
    }
  });

  // Render form component with all necessary props
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
