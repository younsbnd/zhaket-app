import ProductCategoryTableLogic from "@/components/admin/product-category/table/ProductCategoryTableLogic";
import React from "react";

// generate metadata for the page
export const generateMetadata = () => {
  return {
    title: "دسته بندی محصولات",
    description: "دسته بندی محصولات",
  };
};

const ProductCategoryPage = () => {
  return (
    <div>
      <ProductCategoryTableLogic />
    </div>
  );
};

export default ProductCategoryPage;
