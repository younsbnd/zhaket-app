import CreateProductLogic from "@/components/admin/products/create/CreateProductLogic";
import React from "react";

// generate metadata for the page
export const generateMetadata = () => {
  return {
    title: "ایجاد محصول",
    description: "ایجاد محصول جدید",
  };
};

const CreateProductPage = () => {
  return (
    <div>
      <CreateProductLogic />
    </div>
  );
};

export default CreateProductPage;