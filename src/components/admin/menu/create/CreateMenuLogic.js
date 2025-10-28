"use client";
import { useCrud } from "@/hooks/useCrud";
import { addToast } from "@heroui/react";
import React from "react";
import { useForm } from "react-hook-form";
import MenuForm from "../menuForm";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/lib/api/fetcher";
import AdminFormSkeleton from "@/components/skeletons/admin/AdminFormSkeleton";

/**
 * Build hierarchical options for parent menu selection
 * @param {Array} menus - Array of menu objects
 * @returns {Array} Array of parent menu options
 */
const buildHierarchicalOptions = (menus) => {
  const options = [{ label: "بدون منوی والد", value: "" }];
  
  // Ensure menus is an array before processing
  if (!menus || !Array.isArray(menus) || menus.length === 0) {
    return options;
  }
  
  // Show ALL menus as parent options - including children
  menus.forEach((menu) => {
    if (menu && menu._id && menu.name) {
      options.push({ 
        label: `${menu.name}`,
        value: menu._id 
      });
    }
  });
  
  return options;
};

/**
 * CreateMenuLogic Component
 * 
 * Handles the logic for creating new menu items.
 * Manages form state, data fetching, validation, and submission.
 * 
 * @returns {JSX.Element} Create menu form component
 */
const CreateMenuLogic = () => {
    // useForm hook for form validation and state management
    const {
        handleSubmit,
        formState: { errors },
        setError,
        control,
    } = useForm({
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

    const router = useRouter();

    // Fetch menus for parent selection dropdown
    const {
        data: menusResponse,
        isLoading: isLoadingMenus,
        mutate: mutateMenus,
    } = useSWR(
        "/api/admin/menu",
        fetcher,
    );

    // useCrud hook for creating menu records
    const {
        createRecord: createMenu,
        isLoading,
        error,
    } = useCrud("/admin/menu");

    // Submit handler for creating new menu
    const onSubmit = async (data) => {
        try {
            // Process parent field - convert empty string to null
            const processedData = {
                ...data,
                parent: data.parent === "" ? null : data.parent,
            };

            const response = await createMenu(processedData);
            if (response.ok) {
                // Invalidate and revalidate menus cache to refresh data
                await mutateMenus();
                
                addToast({
                    description: response.data.message,
                    color: "success",
                    shouldShowTimeoutProgress: true,
                });
                router.push("/admin/menu");
            }
        } catch (error) {
            // Handle field-level validation errors from server
            if (error.errors) {
                Object.entries(error.errors).forEach(([fieldName, message]) => {
                    setError(fieldName, {
                        type: "server",
                        message: message.join(", "),
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

    if (isLoadingMenus) {
        return <AdminFormSkeleton inputsCount={6} hasTextarea={true} hasSwitch={true} />;
    }

    // Show ALL menus as parent options - including children
    const availableMenus = menusResponse?.data || []; 

    return (
        <div className="glass rounded-2xl p-5">
            <MenuForm
                {...{
                    handleSubmit,
                    errors,
                    onSubmit,
                    control,
                    btnText: "ایجاد منو",
                    isLoading,
                    menus: availableMenus,
                    currentMenuType: null,
                    buildHierarchicalOptions,
                }}
            />
        </div>
    );
};

export default CreateMenuLogic;