import ProductLogic from "@/components/main/product/ProductLogic";
import { fetchServerData } from "@/lib/api/fetchServerData";
import { metadata } from "@/lib/seo/metadata";
import React from "react";

// generate metadata for product page
export const generateMetadata = async ({ params }) => {
  const { "product-slug": productSlug } = await params;
  const product = await fetchServerData(`/admin/products/${productSlug}`);
  return metadata({
    title: product?.data?.title,
    description: product?.data?.description,
    noindex: product?.data?.noIndex,
    canonical: product?.data?.canonical
  });
};

const page = () => {
  return (
    <div>
      <ProductLogic />
    </div>
  );
};

export default page;
