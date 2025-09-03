import EditProductCategoryLogic from "@/components/admin/product-category/Edit/EditProductCategoryLogic";
import React from "react";

// generate metadata for the page
export const generateMetadata = () => {
  return {
    title: "ویرایش دسته بندی محصول",
    description: "ویرایش دسته بندی محصول",
  };
};

const EditProductCategoryPage = () => {
  return (
    <div>
      <EditProductCategoryLogic />
    </div>
  );
};

export default EditProductCategoryPage;
