"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import UserForm from "../userForm";
import UserFormSkeleton from "@/components/skeletons/users/UserFormSkeleton";
import { useCrud } from "@/hooks/useCrud";
import { fetcher } from "@/lib/api/fetcher";
import { addToast } from "@heroui/react";


//  Email format validation
function isValidEmail(value) {
  return /^\S+@\S+\.\S+$/.test(value || "");
}

//Phone number format validation (Iran pattern)
function isValidPhone(value) {
  return /^09[0-9]{9}$/.test(value || "");
}

export default function EditUserLogic() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);


  // Get user ID from either query param or route param
  const userId = useMemo(
    () => searchParams.get("id") || params?.id || null,
    [searchParams, params]
  );

  // CRUD hook for update
  const { updateRecord, isLoading: updating, error: updateError } =
    useCrud("/admin/users");

  // Fetch user data
  const {
    data: userData,
    error: fetchError,
    isLoading: loadingUser
  } = useSWR(userId ? `/api/admin/users/${userId}` : null, fetcher);

  // React Hook Form setup
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    clearErrors,
    watch
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
      role: ""
    }
  });

  const watchedEmail = watch("email");
  const watchedPhoneNumber = watch("phoneNumber");

  // Load fetched user data into the form
  useEffect(() => {
    if (userData?.data) {
      reset({
        fullName: userData.data.fullName || "",
        email: userData.data.email || "",
        phoneNumber: userData.data.phoneNumber || "",
        password: "",
        role: userData.data.role || ""
      });
    }
  }, [userData, reset]);

  //  Form submission logic
  const onSubmit = async (formData) => {
    setIsSubmitting(true);
    clearErrors();

    // Safe casting to string before trimming
    const trimmedEmail = String(formData.email || "").trim();
    const trimmedPhone = String(formData.phoneNumber || "").trim();

    // Validation: at least one contact field required
    if (!trimmedEmail && !trimmedPhone) {
      const msg = "حداقل یکی از فیلدهای ایمیل یا شماره موبایل باید پر باشد";
      setError("email", { message: msg });
      setError("phoneNumber", { message: msg });
      setIsSubmitting(false);
      return;
    }

    // Validate email format
    if (trimmedEmail && !isValidEmail(trimmedEmail)) {
      setError("email", { message: "فرمت ایمیل صحیح نیست" });
      setIsSubmitting(false);
      return;
    }

    // Validate phone format
    if (trimmedPhone && !isValidPhone(trimmedPhone)) {
      setError("phoneNumber", {
        message: "شماره موبایل باید با 09 شروع شده و 11 رقم باشد"
      });
      setIsSubmitting(false);
      return;
    }

    // Build payload for API
    const payload = {
      fullName: String(formData.fullName || "").trim(),
      role: formData.role || "",
      email: trimmedEmail || null,
      phoneNumber: trimmedPhone || null
    };

    // Include password only if entered
    if (String(formData.password || "").trim()) {
      payload.password = formData.password.trim();
    }

    try {
      await updateRecord(userId, payload);

      //  Show success toast on successful update
      addToast({
        description: "اطلاعات کاربر با موفقیت ویرایش شد",
        color: "success",
        shouldShowTimeoutProgress: true
      });

      router.push("/admin/users");
    } catch (err) {
      // If API returns field-level validation errors
      if (err?.errors) {
        Object.entries(err.errors).forEach(([field, message]) => {
          setError(field, { message });
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading skeleton while fetching
  if (loadingUser) return <UserFormSkeleton />;

  // Handle errors from fetching or updating
  const serverError = fetchError
    ? "خطا در بارگذاری اطلاعات کاربر"
    : !userData?.data
      ? "کاربر یافت نشد"
      : updateError && !updateError?.errors
        ? typeof updateError === "string"
          ? updateError
          : updateError?.message
        : null;

  return (
    <UserForm
      control={control}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      errors={errors}
      isLoading={updating || isSubmitting}
      isEditMode={true}
      title="ویرایش کاربر"
      serverError={serverError}
      watchedEmail={watchedEmail}
      watchedPhoneNumber={watchedPhoneNumber}
    />
  );
}
