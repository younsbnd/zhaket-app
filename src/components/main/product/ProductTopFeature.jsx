"use client";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/react";
import React from "react";
import ProductTopInfo from "./ProductTopInfo";
import ProductSellsInfo from "./ProductSellsInfo";
import KeyFeatures from "./KeyFeatures";
import ProductImage from "./ProductImage";
import ProductActionButtons from "./ProductActionButtons";

const ProductTopFeature = ({ product }) => {
  return (
    <div className="bg-white pb-7">
      <div className="max-w-[1279px] mx-auto bg-[#f9fafc]">
        <div className="md:flex md:items-end md:gap-[30px] bg-white">
          {/* Main content area - left side */}
          <div className="md:flex-1">
            {/* breadcrumbs */}
            <div className="p-5 rounded bg-white md:px-0">
              <Breadcrumbs size="sm">
                <BreadcrumbItem href={`/${product?.category?.slug}`}>
                  {product?.category?.name}
                </BreadcrumbItem>
                <BreadcrumbItem>{product?.title}</BreadcrumbItem>
              </Breadcrumbs>
            </div>

            {/* Product info grid */}
            <div className="md:grid md:max-h-[400px] md:min-h-[360px] md:grid-cols-3 md:items-stretch md:rounded-md md:bg-[#FFFFFF] md:shadow-[0px_10px_25px_0px_#CECECE40]">
              {/* Product Info - takes 2 columns */}
              <div className="productInfo border-l-[1px] border-l-[#F6F6F6] md:col-span-2 md:flex md:flex-col">
                <div className="p-5 mx-auto px-4 md:m-0 md:border-b-[1px] md:border-b-[#F5F6F9] md:p-[26px]">
                  <ProductTopInfo product={product} />
                </div>

                {/* Mobile Image */}
                <div className="block md:hidden">
                  <ProductImage product={product} />
                </div>

                <div>
                  <ProductSellsInfo product={product} />
                </div>

                {/* Action Buttons - Desktop only */}
                <ProductActionButtons product={product} />
              </div>

              {/* Key Features - takes 1 column */}
              <div className="hidden md:block">
                <KeyFeatures product={product} />
              </div>
            </div>
          </div>

          {/* Desktop Image - right side */}
          <div className="hidden md:block md:max-w-[360px] !bg-white">
            <ProductImage product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTopFeature;
