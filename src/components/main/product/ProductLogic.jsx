"use client";
import { useParams } from "next/navigation";
import React from "react";
import ProductTopFeature from "./ProductTopFeature";
import useSWR from "swr";
import { fetcher } from "@/lib/api/fetcher";

const ProductLogic = () => {
  const { "product-slug": productSlug } = useParams();

  // fetch product
  const { data: productResponse, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/products/${productSlug}`,
    fetcher
  );

  if (isLoading)
    return <div className="max-w-[1279px] mx-auto">Loading...</div>;

  return (
    <div>
      <ProductTopFeature product={productResponse?.data} />
    </div>
  );
};

export default ProductLogic;
