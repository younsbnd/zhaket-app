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
 * Build hierarchical options for parent menu selection
 * @param {Array} menus - Array of menu objects
 * @returns {Array} Array of parent menu options
 */


/**
 * EditMenuLogic Component
 * 
 * Handles the logic for editing existing menu items.
 * Manages form state, data fetching, validation, and submission.
 * 
 * @returns {JSX.Element} Edit menu form component
 */
const EditMenuLogic = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const params = useParams();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Get menu ID from URL parameters (searchParams or params)
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

    // Fetch all menus for parent selection dropdown
    const { data: allMenusResponse, isLoading: isLoadingAllMenus, mutate: mutateMenus } = useSWR(
        "/api/admin/menu", 
        fetcher,
   
    );

    // Form setup with default values
    const { control, handleSubmit, formState: { errors }, reset, setError } = useForm({
        defaultValues: {
            name: "",
            slug: "",
            path: "",
            icon: "",
            description: "",
            isActive: true,
            parent: "",
            menuType: "mega-menu",
            target: "_self",
            seoTitle: "",
            metaDescription: "",
            canonical: "",
            noIndex: false,
        },
    });

    // Populate form fields when menu data is loaded
    useEffect(() => {
        if (currentMenuResponse?.data) {
            const menu = currentMenuResponse.data;
            reset({
                name: menu.name || "",
                slug: menu.slug || "",
                path: menu.path || "",
                icon: menu.icon || "",
                description: menu.description || "",
                isActive: menu.isActive ?? true,
                parent: menu.parent?._id || "",
                menuType: menu.menuType || "mega-menu",
                target: menu.target || "_self",
                seoTitle: menu.seoTitle || "",
                metaDescription: menu.metaDescription || "",
                canonical: menu.canonical || "",
                noIndex: menu.noIndex ?? false,
            });
        }
    }, [currentMenuResponse, reset]);

    // Handle form submission and validation
    const handleFormSubmit = async (formData) => {
        try {
            setIsSubmitting(true);

            // Process form data: convert empty parent string to null
            const processedData = {
                ...formData,
                parent: formData.parent === "" ? null : formData.parent,
            };

            const response = await updateRecord(menuId, processedData);

            if (response.ok) {
                // Invalidate and revalidate menus cache to refresh data
                await mutateMenus();
                
                // Show success message and redirect to menu list
                addToast({
                    description: response.data.message,
                    color: "success",
                    shouldShowTimeoutProgress: true,
                });
                router.push("/admin/menu");
            }
        } catch (error) {
            // Handle field-level validation errors from server
            if (error.errors && error.errors.length > 0) {
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
    // Build hierarchical options for parent menu selection
    const buildHierarchicalOptions = (menus) => {
        const options = [{ label: "بدون منوی والد", value: "" }];
        
        // Ensure menus is an array before processing
        if (!menus || !Array.isArray(menus) || menus.length === 0) {
          return options;
        }
        
        // Show ALL menus as parent options - including children
        if(allMenusResponse.length > 0) {
          allMenusResponse.forEach((menu) => {
          if (menu && menu._id && menu.name) {
            options.push({ 
              label: `${menu.name}`,
              value: menu._id 
            });
          }
        });
        
        return options;
      }}
    // Show loading skeleton while fetching data
    if (isLoadingCurrentMenu || isLoadingAllMenus) {
        return <AdminFormSkeleton inputsCount={6} hasTextarea={true} hasSwitch={true} />;
    }

    // Determine server error message for display
    const serverError = fetchMenuError
        ? "خطا در بارگیری داده‌های منو"
        : !currentMenuResponse?.data && !isLoadingCurrentMenu
            ? "منو پیدا نشد"
            : updateError && !updateError?.errors
                ? (typeof updateError === "string" ? updateError : updateError?.message)
                : null;

    // Filter available parent menus (exclude current menu and only root menus)
    const availableMenus = allMenusResponse?.data ||
        [];

    return (
        <div className="glass rounded-2xl p-5">
            <MenuForm
                control={control}
                handleSubmit={handleSubmit}
                onSubmit={handleFormSubmit}
                errors={errors}
                btnText="ویرایش منو"
                isLoading={isUpdating || isSubmitting}
                menus={availableMenus}
                serverError={serverError}
                currentMenuType={currentMenuResponse?.data?.menuType}
                buildHierarchicalOptions={buildHierarchicalOptions}
            />
        </div>
    );
};

export default EditMenuLogic;