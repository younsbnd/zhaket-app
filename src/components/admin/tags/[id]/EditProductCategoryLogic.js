"use client";

// React and Next.js imports
import React, { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
 

// SWR and API utilities
import useSWR from "swr";
import { fetcher } from "@/lib/api/fetcher";
import { useCrud } from "@/hooks/useCrud";

// Components
import ProductTagForm from "../productTagForm";
import TagFormSkeleton from "@/components/skeletons/tags/productTagSkeleton";

/**
 * Logic component for editing existing product tags
 * Handles data fetching, form initialization, and update operations
 */
export default function EditProductTagLogic() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();

  // Track submission state to prevent double submissions
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Extract tag ID from URL parameters
  const tagId = useMemo(
    () => searchParams.get("id") || params?.id || null,
    [searchParams, params]
  );

  // Initialize CRUD hook for update operations
  const { updateRecord, isLoading: updating, error: updateError } = useCrud("/tags");

  // Fetch existing tag data using SWR
  const { data: tagData, error: fetchError, isLoading: loadingTag, mutate } = useSWR(
    tagId ? `/api/tags/${tagId}` : null,
    fetcher
  );

  // Initialize form with react-hook-form
  const { control, handleSubmit, formState: { errors }, reset, setError } = useForm({
    defaultValues: { name: "", slug: "", description: "" },
  });

  // Populate form with fetched data when available
  useEffect(() => {
    if (tagData?.data) {
      reset({
        name: tagData.data.name || "",
        slug: tagData.data.slug || "",
        description: tagData.data.description || "",
      });
    }
  }, [tagData, reset]);

  /**
   * Handle form submission for updating tag
   * @param {Object} formData - Updated tag data from form
   */
  const onSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      
      // Update tag via API
      await updateRecord(tagId, formData);
      
   
      // Redirect to tags list page
      router.push("/admin/tags");
    } catch (err) {
      // Handle validation errors from server
      if (err?.errors) {
        Object.entries(err.errors).forEach(([field, message]) => {
          setError(field, {
            type: "server",
            message: Array.isArray(message) ? message[0] : message,
          });
        });
      }
      
    
      const errorMessage = err?.message || 
                          (typeof err === "string" ? err : "خطا در ویرایش تگ");
     
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading skeleton while fetching data
  if (loadingTag) return <TagFormSkeleton isEditMode={true} />;

  // Determine server error message for display
  const serverError = fetchError
    ? "خطا در بارگیری داده‌های تگ"
    : !tagData?.data && !loadingTag
    ? "تگ پیدا نشد"
    : updateError && !updateError?.errors
    ? (typeof updateError === "string" ? updateError : updateError?.message)
    : null;

  // Render form component with all necessary props
  return (
    <ProductTagForm
      control={control}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      errors={errors}
      isLoading={updating || isSubmitting}
      isEditMode={true}
      title="ویرایش تگ"
      serverError={serverError}
    />
  );
}
