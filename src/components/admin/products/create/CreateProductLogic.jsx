"use client";
import { useCrud } from "@/hooks/useCrud";
import { addToast } from "@heroui/react";
import React from "react";
import { useForm } from "react-hook-form";
import ProductForm from "../ProductForm";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/lib/api/fetcher";
import ProductCategoriesFormSkeleton from "@/components/skeletons/product-categories/ProductCategoriesFormSkeleton";

const CreateProductLogic = () => {
  // useForm hook for form validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    control,
  } = useForm({
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      price: 0,
      discount: 0,
      status: "DRAFT",
      imageUrl: "",
      imageAlt: "",
      category: "",
      tags: [],
      seoTitle: "",
      metaDescription: "",
      canonical: "",
      noIndex: false,
    },
  });

  const router = useRouter();

  // fetch product categories for selection
  const {
    data: productCategoriesResponse,
    isLoading: isLoadingProductCategories,
  } = useSWR(
    process.env.NEXT_PUBLIC_API_BASE_URL + "/admin/product-categories",
    fetcher
  );

  // fetch tags for selection
  const {
    data: tagsResponse,
    isLoading: isLoadingTags,
  } = useSWR(
    process.env.NEXT_PUBLIC_API_BASE_URL + "/tags",
    fetcher
  );

  // useCrud hook for creating product
  const {
    createRecord: createProduct,
    isLoading,
    error,
  } = useCrud("/admin/products");

  // submit handler for creating product
  const onSubmit = async (data) => {
    try {
      const response = await createProduct(data);
      if (response.ok) {
        addToast({
          description: response.data.message,
          color: "success",
          shouldShowTimeoutProgress: true,
        });
        router.push("/admin/products");
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

  if (isLoadingProductCategories || isLoadingTags) {
    return <ProductCategoriesFormSkeleton />;
  }

  return (
    <div className="glass rounded-2xl p-5">
      <ProductForm
        {...{
          register,
          handleSubmit,
          errors,
          onSubmit,
          isLoading,
          control,
          btnText: "ایجاد محصول",
          productCategories: productCategoriesResponse?.data,
          tags: tagsResponse?.data,
        }}
      />
    </div>
  );
};

export default CreateProductLogic;