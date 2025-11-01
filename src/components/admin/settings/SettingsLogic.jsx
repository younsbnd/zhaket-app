"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { fetcher } from "@/lib/api/fetcher";
import { useCrud } from "@/hooks/useCrud";
import { addToast } from "@heroui/react";
import SettingsForm from "./SettingsForm";
import ProductCategoriesFormSkeleton from "@/components/skeletons/product-categories/ProductCategoriesFormSkeleton";

const SettingsLogic = () => {
  // fetch settings data
  const { data: response, isLoading: isLoadingSettings } = useSWR(
    process.env.NEXT_PUBLIC_API_BASE_URL + "/admin/settings",
    fetcher
  );

  const [isLoading, setIsLoading] = useState(false);

  // useForm hook for form validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    control,
    reset,
  } = useForm({
    defaultValues: {
      siteName: "",
      siteDescription: "",
      logoUrl: "",
      faviconUrl: "",
      socialLinks: {
        instagram: "",
        linkedin: "",
      },
      contactInfo: {
        address: "",
        phone: "",
        email: "",
      },
      copyrightText: "",
    },
  });

  // update form values when data is loaded
  React.useEffect(() => {
    if (response?.data) {
      reset(response.data);
    }
  }, [response, reset]);

  // submit handler for updating settings
  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/settings`,
        {
          method: "PUT",
          body: JSON.stringify({ siteId: "global", ...data }),
        }
      );
      const result = await response.json();
      if (response.ok) {
        addToast({
          description: result.message,
          color: "success",
          shouldShowTimeoutProgress: true,
        });
      }
    } catch (error) {
      // handle zod error
      if (error.errors) {
        Object.entries(error.errors).forEach(([fieldName, message]) => {
          setError(fieldName, {
            type: "server",
            message: message.join(", "),
          });
        });
      }
      // handle general error
      addToast({
        description: error?.error?.message || error.message,
        color: "danger",
        shouldShowTimeoutProgress: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingSettings) {
    return <ProductCategoriesFormSkeleton />;
  }

  return (
    <div className="glass rounded-2xl p-5">
      <SettingsForm
        {...{
          register,
          handleSubmit,
          errors,
          onSubmit,
          isLoading,
          control,
        }}
      />
    </div>
  );
};

export default SettingsLogic;
