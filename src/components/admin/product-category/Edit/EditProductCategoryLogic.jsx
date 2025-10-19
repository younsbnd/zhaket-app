"use client";
import React, { useEffect, useState } from "react";
import ProductCategoryForm from "../ProductCategoryForm";
import { notFound, useParams, useRouter } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/lib/api/fetcher";
import { useForm } from "react-hook-form";
import { useCrud } from "@/hooks/useCrud";
import { addToast, Alert } from "@heroui/react";
import ProductCategoriesFormSkeleton from "@/components/skeletons/product-categories/ProductCategoriesFormSkeleton";

const EditProductCategoryLogic = () => {
  const { id } = useParams();
  const router = useRouter();
  const [productCategories, setProductCategories] = useState([]);

  // fetch category
  const {
    data: categoryResponse,
    isLoading,
    error,
  } = useSWR(
    process.env.NEXT_PUBLIC_API_BASE_URL + `/admin/product-categories/${id}`,
    fetcher
  );

  // fetch product categories
  const {
    data: productCategoriesResponse,
    isLoading: isLoadingProductCategories,
  } = useSWR(
    process.env.NEXT_PUBLIC_API_BASE_URL + "/admin/product-categories",
    fetcher
  );

  // update category
  const { updateRecord, isLoading: isLoadingUpdate } = useCrud(
    "/admin/product-categories"
  );

  // form state management with react-hook-form
  const {
    handleSubmit,
    control,
    setError,
    reset,
    formState: { errors },
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

  const onSubmit = async (data) => {
    try {
      const response = await updateRecord(id, data);
      if (response.ok) {
        addToast({
          description: response.data.message,
          color: "success",
          shouldShowTimeoutProgress: true,
        });
        router.push("/admin/product-categories");
      }
    } catch (error) {
      if (error.errors) {
        Object.entries(error.errors).forEach(([fieldName, message]) => {
          setError(fieldName, {
            type: "server",
            message: message.join(", "),
          });
        });
      }
      addToast({
        description: error?.error?.message || error.message,
        color: "danger",
        shouldShowTimeoutProgress: true,
      });
    }
  };

  // set the product categories
  useEffect(() => {
    if (productCategoriesResponse?.data) {
      setProductCategories(
        productCategoriesResponse?.data.filter(
          (category) => category._id !== id
        )
      );
    }
  }, [productCategoriesResponse?.data]);

  // set the default values
  useEffect(() => {
    if (categoryResponse?.data && productCategoriesResponse?.data) {
      reset({
        ...categoryResponse?.data,
        imageUrl: categoryResponse?.data?.image?.url,
        imageAlt: categoryResponse?.data?.image?.alt,
        parent: categoryResponse?.data?.parent,
      });
    }
  }, [categoryResponse?.data, productCategoriesResponse?.data, reset]);

  // show loading until both data are fetched
  if (isLoadingProductCategories || isLoading ) {
    return <ProductCategoriesFormSkeleton />;
  }

  if (error) {
    return <Alert color="danger" title="خطا" description={error.message} />;
  }

  return (
    <div>
      <ProductCategoryForm
        handleSubmit={handleSubmit}
        errors={errors}
        onSubmit={onSubmit}
        control={control}
        btnText="ویرایش"
        isLoading={isLoadingUpdate}
        productCategories={productCategories}
      />
    </div>
  );
};

export default EditProductCategoryLogic;
