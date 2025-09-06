"use client";
import React, { useEffect } from "react";
import ProductForm from "../ProductForm";
import { notFound, useParams, useRouter } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/lib/api/fetcher";
import { useForm } from "react-hook-form";
import { useCrud } from "@/hooks/useCrud";
import { addToast, Alert } from "@heroui/react";
import ProductCategoriesFormSkeleton from "@/components/skeletons/product-categories/ProductCategoriesFormSkeleton";

const EditProductLogic = () => {
  const { id } = useParams();
  const router = useRouter();

  // fetch product
  const {
    data: productResponse,
    isLoading,
    error,
  } = useSWR(
    process.env.NEXT_PUBLIC_API_BASE_URL + `/admin/products/${id}`,
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

  // fetch tags
  const {
    data: tagsResponse,
    isLoading: isLoadingTags,
  } = useSWR(
    process.env.NEXT_PUBLIC_API_BASE_URL + "/tags",
    fetcher
  );

  // update product
  const { updateRecord, isLoading: isLoadingUpdate } = useCrud(
    "/admin/products"
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

  const onSubmit = async (data) => {
    try {
      const response = await updateRecord(id, data);
      if (response.ok) {
        addToast({
          description: response.data.message,
          color: "success",
          shouldShowTimeoutProgress: true,
        });
        router.push("/admin/products");
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

  // set the default values
  useEffect(() => {
    if (productResponse?.data) {
      const product = productResponse.data;
      reset({
        title: product.title || "",
        slug: product.slug || "",
        description: product.description || "",
        price: product.price || 0,
        discount: product.discount || 0,
        status: product.status || "DRAFT",
        imageUrl: product.images?.url || "",
        imageAlt: product.images?.alt || "",
        category: product.category?._id || "",
        tags: product.tags?.map(tag => tag._id) || [],
        seoTitle: product.seoTitle || "",
        metaDescription: product.metaDescription || "",
        canonical: product.canonical || "",
        noIndex: product.noIndex || false,
      });
    }
  }, [productResponse?.data, reset]);

  // show loading until all data are fetched
  if (isLoadingProductCategories || isLoading || isLoadingTags) {
    return <ProductCategoriesFormSkeleton />;
  }

  if (error) {
    return <Alert color="danger" title="خطا" description={error.message} />;
  }

  return (
    <div className="glass rounded-2xl p-5">
      <ProductForm
        handleSubmit={handleSubmit}
        errors={errors}
        onSubmit={onSubmit}
        control={control}
        btnText="ویرایش محصول"
        isLoading={isLoadingUpdate}
        productCategories={productCategoriesResponse?.data}
        tags={tagsResponse?.data}
      />
    </div>
  );
};

export default EditProductLogic;
