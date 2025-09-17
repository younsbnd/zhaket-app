"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useCrud } from "@/hooks/useCrud";
import UserForm from "../userForm";
import UserFormSkeleton from "@/components/skeletons/users/UserFormSkeleton";
import { addToast } from "@heroui/react";


export default function CreateUserLogic() {
  const router = useRouter();
  const { createRecord, error } = useCrud("/admin/users");
  const [isInitialLoading, setIsInitialLoading] = useState(true);


  const {
    control,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting }
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

  useEffect(() => {
    const timer = setTimeout(() => setIsInitialLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    // Trim inputs to avoid accidental spaces
    const trimmedEmail = data.email?.trim();
    const trimmedPhone = data.phoneNumber?.trim();

    // Client-side rule: at least one contact method is required
    if (!trimmedEmail && !trimmedPhone) {
      const msg = "حداقل یکی از ایمیل یا شماره موبایل باید وارد شود";
      setError("email", { message: msg });
      setError("phoneNumber", { message: msg });
      return;
    }

    // Build payload dynamically – remove unused fields completely
    const payload = {
      fullName: data.fullName.trim(),
      role: data.role,
      password: data.password?.trim()
    };

    // Only add email if entered
    if (trimmedEmail) payload.email = trimmedEmail;

    // Only add phone number if entered
    if (trimmedPhone) payload.phoneNumber = trimmedPhone;

    try {
      await createRecord(payload);

      //  Show toast after successful creation
      addToast({
        description: "کاربر جدید با موفقیت ساخته شد",
        color: "success",
        shouldShowTimeoutProgress: true
      });

      router.push("/admin/users");
    } catch (err) {
      if (err?.errors) {
        Object.entries(err.errors).forEach(([field, message]) => {
          setError(field, { message });
        });
      }
    }
  });

  if (isInitialLoading) return <UserFormSkeleton />;

  return (
    <UserForm
      control={control}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      errors={errors}
      isEditMode={false}
      title="ساخت کاربر جدید"
      isLoading={isSubmitting}
      serverError={
        !error?.errors &&
        (typeof error === "string" ? error : error?.message)
      }
      watchedEmail={watchedEmail}
      watchedPhoneNumber={watchedPhoneNumber}
    />
  );
}
