import ProductLogic from "@/components/main/product/ProductLogic";
import connectToDb from "@/lib/utils/db";
import Product from "@/models/Product";
import { metadata } from "@/lib/seo/metadata";
import { notFound } from "next/navigation";
import React from "react";

// generate metadata for product page
export const generateMetadata = async ({ params }) => {
  try {
    const { "product-slug": productSlug } = await params;
    
    await connectToDb();
    const product = await Product.findOne({ slug: productSlug })
      .select('title description noIndex canonical')
      .lean();
    
    if (!product) {
      notFound();
    }
    
    return metadata({
      title: product?.title,
      description: product?.description,
      noindex: product?.noIndex,
      canonical: product?.canonical
    });
  } catch (error) {
    console.error("Error fetching product metadata:", error);
    notFound();
  }
};

const page = () => {
  return (
    <div>
      <ProductLogic />
    </div>
  );
};

export default page;
