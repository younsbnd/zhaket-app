"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useCrud } from "@/hooks/useCrud";
import PasswordChangeForm from "./EditPasswordForm";
import PasswordFormSkeleton from "@/components/skeletons/user-panel/edit-profile/edit-password/passwordFormSkeleton";
import { addToast } from "@heroui/react";

export default function EditPasswordLogic() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // CRUD hook for updating user data
  const { updateRecord, isLoading: updating, error: updateError } = useCrud("/admin/users");

  // React Hook Form setup
  const {
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    watch,
    control
  } = useForm({
    defaultValues: {
      newPassword: "",
      confirmPassword: ""
    },
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/login");
    }
  }, [session, status, router]);

  // Handle form submission
  const onSubmit = async (formData) => {
    try {
      setIsSubmitting(true);

      // Prepare update data
      const updateData = {
        password: formData.newPassword
      };

      // Update password via API using user ID from session
      await updateRecord(session.user.id, updateData);

      // Show success message and redirect
      addToast({
        description: "رمز عبور با موفقیت تغییر یافت",
        color: "success",
        shouldShowTimeoutProgress: true
      });

      reset();
      router.push("/profile");
    } catch (err) {
      // Handle server validation errors
      if (err?.errors) {
        Object.entries(err.errors).forEach(([field, message]) => {
          setError(field, {
            type: "server",
            message: Array.isArray(message) ? message[0] : message,
          });
        });
      }

      // Show error message
      const errorMessage = err?.message ||
        (typeof err === "string" ? err : "خطا در تغییر رمز عبور");
      addToast({
        description: errorMessage,
        color: "danger",
        shouldShowTimeoutProgress: true
      });

    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading skeleton while session is loading
  if (status === "loading") {
    return <PasswordFormSkeleton />;
  }

  // Redirect if not authenticated
  if (!session) {
    return null;
  }

  // Only show update error if it's not a validation error
  const serverError = updateError && !updateError?.errors
    ? (typeof updateError === "string" ? updateError : updateError?.message)
    : null;

  // Render password change form
  return (
    <PasswordChangeForm
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      errors={errors}
      isLoading={updating || isSubmitting}
      serverError={serverError}
      control={control}
      watch={watch}
    />
  );
}
