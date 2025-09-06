import ProductTableLogic from "@/components/admin/products/table/ProductTableLogic";
import React from "react";

// generate metadata for the page
export const generateMetadata = () => {
  return {
    title: "محصولات",
    description: "محصولات",
  };
};

const ProductsPage = () => {
  return (
    <div>
      <ProductTableLogic />
    </div>
  );
};

export default ProductsPage;