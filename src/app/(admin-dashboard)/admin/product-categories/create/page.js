import CreateProductCategoryLogic from "@/components/admin/product-category/create/CreateProductCategoryLogic";
import React from "react";

// generate metadata for the page
export const generateMetadata = () => {
  return {
    title: "ایجاد دسته بندی محصول",
    description: "ایجاد دسته بندی محصول",
  };
};

const CreateProductCategoryPage = () => {
  return (
    <div>
      <CreateProductCategoryLogic />
    </div>
  );
};

export default CreateProductCategoryPage;
