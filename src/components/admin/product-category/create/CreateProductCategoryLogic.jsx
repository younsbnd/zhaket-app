"use client";
import { useCrud } from "@/hooks/useCrud";
import { addToast } from "@heroui/react";
import React from "react";
import { useForm } from "react-hook-form";
import ProductCategoryForm from "../ProductCategoryForm";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/lib/api/fetcher";
import ProductCategoriesFormSkeleton from "@/components/skeletons/product-categories/ProductCategoriesFormSkeleton";

const CreateProductCategoryLogic = () => {
  // useForm hook for form validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    control,
  } = useForm({
    defaultValues: {
      name: "",
      slug: "",
      isActive: false,
      imageUrl: "",
      imageAlt: "",
      description: "",
      seoTitle: "",
      metaDescription: "",
      canonical: "",
      noIndex: false,
      parent: null,
    },
  });

  const router = useRouter();

  // fetch product categories for parent selection
  const {
    data: productCategoriesResponse,
    isLoading: isLoadingProductCategories,
  } = useSWR(
    process.env.NEXT_PUBLIC_API_BASE_URL + "/admin/product-categories",
    fetcher
  );

  // useCrud hook for creating product category
  const {
    createRecord: createProductCategory,
    isLoading,
    error,
  } = useCrud("/admin/product-categories");

  // submit handler for creating product category
  const onSubmit = async (data) => {
    try {
      const response = await createProductCategory(data);
      if (response.ok) {
        addToast({
          description: response.data.message,
          color: "success",
          shouldShowTimeoutProgress: true,
        });
        router.push("/admin/product-categories");
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
    }
  };

  if (isLoadingProductCategories) {
    return <ProductCategoriesFormSkeleton />;
  }

  return (
    <div className="glass rounded-2xl p-5">
      <ProductCategoryForm
        {...{
          register,
          handleSubmit,
          errors,
          onSubmit,
          isLoading,
          control,
          btnText: "ایجاد دسته بندی",
          productCategories: productCategoriesResponse?.data,
        }}
      />
    </div>
  );
};

export default CreateProductCategoryLogic;
