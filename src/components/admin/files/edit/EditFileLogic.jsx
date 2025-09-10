"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import FileForm from "../FileForm";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { addToast, Alert } from "@heroui/react";
import { fetcher } from "@/lib/api/fetcher";
import AdminFormSkeleton from "@/components/skeletons/admin/AdminFormSkeleton";

const EditFileLogic = () => {
  const { id } = useParams();
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);

  // fetch file data
  const { data: response, isLoading, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/files/${id}`,
    fetcher
  );

  // fetch products for dropdown
  const { data: productsResponse, isLoading: isLoadingProducts } = useSWR(
    process.env.NEXT_PUBLIC_API_BASE_URL + "/admin/products",
    fetcher
  );

  // form state management with react-hook-form
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      product: "",
      version: 0,
      releaseNotes: "",
    },
  });

  // populate form with fetched data
  useEffect(() => {
    if (response?.data) {
      reset({
        product: response.data.product?._id || response.data.product,
        version: response.data.version || 0,
        releaseNotes: response.data.releaseNotes || "",
      });
    }
  }, [response?.data, reset]);

  // form submit handler
  const onSubmit = async (data, selectedFile) => {
    try {
      setIsUpdating(true);
      const formData = new FormData();
      
      // add the form data
      formData.append("product", data.product);
      formData.append("version", data.version);
      formData.append("releaseNotes", data.releaseNotes);
      
      // add the selected file
      if (selectedFile) {
        formData.append("file", selectedFile);
      }
      
      // add the old file data
      if (!selectedFile) {
        formData.append("fileName", response.data.fileName);
        formData.append("filePath", response.data.filePath);
        formData.append("fileType", response.data.fileType);
        formData.append("fileSize", response.data.fileSize);
      }

      const updateResponse = await fetch(`/api/admin/files/${id}`, {
        method: "PUT",
        body: formData,
      });

      const result = await updateResponse.json();

      // handle success response
      if (updateResponse.ok) {
        addToast({
          description: result.message,
          color: "success",
          shouldShowTimeoutProgress: true,
        });
        router.push("/admin/files");
      } else {
        throw new Error(result.message || "خطا در ویرایش فایل");
      }
    } catch (error) {
      // handle validation errors
      if (error.errors) {
        Object.entries(error.errors).forEach(([fieldName, message]) => {
          setError(fieldName, { 
            message: Array.isArray(message) ? message.join(", ") : message 
          });
        });
      } else {
        // handle error response
        addToast({
          description: error.message || "خطا در ویرایش فایل",
          color: "danger",
          shouldShowTimeoutProgress: true,
        });
      }
    } finally {
      setIsUpdating(false);
    }
  };

  // show loading while fetching data
  if (isLoading || isLoadingProducts) {
    return <AdminFormSkeleton />;
  }

  // show error if fetch failed
  if (error) {
    return <Alert color="danger" title="خطا" description={error.message} />;
  }

  return (
    <div className="glass rounded-2xl p-5">
      <FileForm
        products={productsResponse?.data || []}
        control={control}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        isEditMode={true}
        btnText="ویرایش فایل"
        fileInfo={response?.data}
        isUploading={isUpdating}
      />
    </div>
  );
};

export default EditFileLogic;
