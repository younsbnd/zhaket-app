"use client";

// React and Next.js imports
import React, { useEffect, useMemo, useState } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

// SWR and API utilities
import useSWR from "swr";
import { fetcher } from "@/lib/api/fetcher";
import { useCrud } from "@/hooks/useCrud";

// Components
import UserForm from "../userForm";
import UserFormSkeleton from "@/components/skeletons/users/UserFormSkeleton";

/**
 * Logic component for editing existing users
 * Handles data fetching, form initialization, and update operations
 * Supports flexible contact information (email and/or phone number)
 */
export default function EditUserLogic() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const params = useParams();

    // Track submission state to prevent double submissions
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Extract user ID from URL parameters
    const userId = useMemo(
        () => searchParams.get("id") || params?.id || null,
        [searchParams, params]
    );

    // Initialize CRUD hook for update operations
    const { updateRecord, isLoading: updating, error: updateError } = useCrud("/admin/users");

    // Fetch existing user data using SWR
    const {
        data: userData,
        error: fetchError,
        isLoading: loadingUser,
        mutate,
    } = useSWR(userId ? `/api/admin/users/${userId}` : null, fetcher);

    // Initialize form with react-hook-form
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        setError,
        watch,
    } = useForm({
        defaultValues: { fullName: "", email: "", phoneNumber: "", role: "" },
    });

    // Watch email and phoneNumber values for conditional validation
    const watchedEmail = watch("email");
    const watchedPhoneNumber = watch("phoneNumber");

    // Populate form with fetched data when available
    useEffect(() => {
        if (userData?.data) {
            reset({
                fullName: userData.data.fullName || "",
                email: userData.data.email || "",
                phoneNumber: userData.data.phoneNumber || "",
                role: userData.data.role || "",
            });
        }
    }, [userData, reset]);

    /**
     * Handle form submission for updating user
     * Validates that at least one contact method exists before submission
     * @param {Object} formData - Updated user data from form
     */
    const onSubmit = async (formData) => {
        try {
            setIsSubmitting(true);

            // Ensure at least one contact method is provided
            if (!formData.email && !formData.phoneNumber) {
                setError("email", {
                    type: "manual",
                    message: "حداقل یکی از فیلدهای ایمیل یا شماره موبایل الزامی است"
                });
                setError("phoneNumber", {
                    type: "manual",
                    message: "حداقل یکی از فیلدهای ایمیل یا شماره موبایل الزامی است"
                });
                return;
            }

            // Update user via API
            await updateRecord(userId, formData);

            // Redirect to users list page on success
            router.push("/admin/users");
        } catch (err) {
            // Handle server-side validation errors
            if (err?.errors) {
                Object.entries(err.errors).forEach(([field, message]) => {
                    setError(field, {
                        type: "server",
                        message: Array.isArray(message) ? message[0] : message,
                    });
                });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    // Show loading skeleton while fetching user data
    if (loadingUser) return <UserFormSkeleton />;

    // Determine server error message for display
    const serverError = fetchError
        ? "خطا در بارگیری داده‌های کاربر"
        : !userData?.data && !loadingUser
            ? "کاربر پیدا نشد"
            : updateError && !updateError?.errors
                ? typeof updateError === "string"
                    ? updateError
                    : updateError?.message
                : null;

    // Render form component with all necessary props
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
