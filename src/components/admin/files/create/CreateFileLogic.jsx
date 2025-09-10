"use client";
import { addToast } from "@heroui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FileForm from "../FileForm";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/lib/api/fetcher";
import ProductCategoriesFormSkeleton from "@/components/skeletons/product-categories/ProductCategoriesFormSkeleton";

const CreateFileLogic = () => {
  const [isUploading, setIsUploading] = useState(false);

  // useForm hook for form validation
  const {
    formState: { errors },
    control,
    getValues,
    handleSubmit,
  } = useForm({
    defaultValues: {
      version: 0,
      releaseNotes: "",
      product: "",
    },
  });

  const router = useRouter();

  // fetch products for selection
  const { data: productsResponse, isLoading: isLoadingProducts } = useSWR(
    process.env.NEXT_PUBLIC_API_BASE_URL + "/admin/products",
    fetcher
  );

  // change handleFileUpload to onSubmit
  const onSubmit = async (data, selectedFile) => {
    if (!selectedFile) {
      addToast({
        description: "لطفا فایل را انتخاب کنید",
        color: "warning",
        shouldShowTimeoutProgress: true,
      });
      return;
    }

    setIsUploading(true);

    try {
      const uploadFormData = new FormData();
      uploadFormData.append("file", selectedFile);
      uploadFormData.append("productId", data.product);
      uploadFormData.append("version", data.version || 0);
      uploadFormData.append("releaseNotes", data.releaseNotes || "");

      const response = await fetch("/api/admin/files/upload", {
        method: "POST",
        body: uploadFormData,
      });

      const result = await response.json();

      // if response is ok
      if (response.ok) {
        addToast({
          description: "فایل با موفقیت آپلود شد",
          color: "success",
          shouldShowTimeoutProgress: true,
        });
        router.push("/admin/files");
      } else {
        throw new Error(result.message || "خطا در آپلود فایل");
      }
    } catch (error) {
      // if error is zod error
      if (error.errors) {
        Object.entries(error.errors).forEach(([fieldName, message]) => {
          setError(fieldName, {
            type: "server",
            message: message.join(", "),
          });
        });
      }
      // if error is general error
      addToast({
        description: error.message,
        color: "danger",
        shouldShowTimeoutProgress: true,
      });
    } finally {
      setIsUploading(false);
    }
  };

  if (isLoadingProducts) {
    return <ProductCategoriesFormSkeleton />;
  }

  return (
    <div className="glass rounded-2xl p-5">
      <FileForm
        products={productsResponse?.data || []}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        isUploading={isUploading}
        control={control}
        errors={errors}
        btnText={"آپلود فایل"}
        isEditMode={false}
      />
    </div>
  );
};

export default CreateFileLogic;
