"use client";
import { notFound, useParams } from "next/navigation";
import React from "react";
import ProductTopFeature from "./ProductTopFeature";
import ProductContent from "./ProductContent";
import ProductLoadingSkeleton from "../../skeletons/main/product/ProductLoadingSkeleton";
import useSWR from "swr";
import { fetcher } from "@/lib/api/fetcher";

const ProductLogic = () => {
  const { "product-slug": productSlug } = useParams();

  // fetch product
  const { data: productResponse, isLoading, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/products/${productSlug}`,
    fetcher
  );

  // if error or product not found, show 404
  if (error || (!isLoading && !productResponse?.data)) {
    return notFound();
  }

  if (isLoading) return <ProductLoadingSkeleton />;

  return (
    <div className="bg-[#f9fafc] pb-8">
      <ProductTopFeature product={productResponse?.data} />
      <ProductContent product={productResponse?.data} />
    </div>
  );
};

export default ProductLogic;
