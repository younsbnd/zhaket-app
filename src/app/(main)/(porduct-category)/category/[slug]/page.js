import CategoryDesignLogic from "@/components/main/category/CategoryDesignLogic";
import { metadata } from "@/lib/seo/metadata";
import React from "react";

// generate metadata for the page
export const generateMetadata = async ({ params }) => {
  const { slug } = await params;

  return metadata({
    title: `دسته‌بندی ${slug}`,
    description: `محصولات دسته‌بندی ${slug}`,
  });
};

const CategoryPage = () => {
  return (
    <div>
      <CategoryDesignLogic />
    </div>
  );
};

export default CategoryPage;