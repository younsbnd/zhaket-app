"use client";

// React and Next.js imports
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

// Components and utilities
import UserForm from "../userForm";
import { useCrud } from "@/hooks/useCrud";
import UserFormSkeleton from "@/components/skeletons/users/UserFormSkeleton";
 
/**
 * Logic component for creating new users
 * Handles form submission, validation, API calls, and loading states
 */
export default function CreateUserLogic() {
  const router = useRouter();
  const { createRecord, error } = useCrud("/admin/users");
  
  // State for managing initial loading skeleton
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  
  // Initialize form with react-hook-form
  const { 
    control, 
    handleSubmit, 
    setError, 
    watch,
    formState: { errors, isSubmitting } 
  } = useForm({
    defaultValues: { 
      fullName: "", 
      email: "", 
      phoneNumber: "", 
      password: "", 
      role: "" 
    },
  });

  // Watch email and phone for conditional validation
  const watchedEmail = watch("email");
  const watchedPhoneNumber = watch("phoneNumber");

  // Effect to manage initial loading state
  useEffect(() => {
    // Simulate natural loading time (e.g., fetching data, initial setup, etc.)
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 800); // Appropriate time for user experience

    return () => clearTimeout(timer);
  }, []);

  /**
   * Handle form submission for creating new user
   * @param {Object} data - Form data containing user information
   */
  const onSubmit = handleSubmit(async (data) => {
    try {
      // Create new user via API
      await createRecord(data);
      
      // Redirect to users list page on success
      router.push("/admin/users");
    } catch (err) {
      // Handle validation errors from server
      if (err?.errors) {
        Object.entries(err.errors).forEach(([field, message]) => {
          setError(field, { message });
        });
      }
      
      console.error("Error creating user:", err);
    }
  });

  // Show skeleton during initial loading state
  if (isInitialLoading) {
    return <UserFormSkeleton />;
  }

  // Render form component with all necessary props
  return (
    <UserForm
      control={control}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      errors={errors}
      isEditMode={false}
      title="ساخت کاربر جدید"
      isLoading={isSubmitting}
      serverError={!error?.errors && (typeof error === "string" ? error : error?.message)}
      watchedEmail={watchedEmail}
      watchedPhoneNumber={watchedPhoneNumber}
    />
  );
}
