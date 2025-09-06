import EditProductLogic from "@/components/admin/products/edit/EditProductLogic";
import React from "react";

// generate metadata for the page
export const generateMetadata = () => {
  return {
    title: "ویرایش محصول",
    description: "ویرایش محصول",
  };
};

const EditProductPage = () => {
  return (
    <div>
      <EditProductLogic />
    </div>
  );
};

export default EditProductPage;
