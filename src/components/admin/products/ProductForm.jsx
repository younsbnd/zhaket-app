import ControlledTipTap from "@/components/shared/forms/ControlledTipTap";
import { Button, Form } from "@heroui/react";
import React from "react";
import ProductSeoForm from "../../shared/forms/SeoForm";
import ProductBasicInfo from "./forms/ProductBasicInfo";
import ProductOrganization from "./forms/ProductOrganization";
import ProductMedia from "./forms/ProductMedia";

const ProductForm = ({
  handleSubmit,
  errors,
  onSubmit,
  control,
  btnText,
  isLoading,
  productCategories,
  tags,
}) => {
  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="w-full">
      {/* basic info */}
      <ProductBasicInfo control={control} errors={errors} />

      {/* media */}
      <ProductMedia control={control} errors={errors} />

      {/* organization */}
      <ProductOrganization
        control={control}
        errors={errors}
        productCategories={productCategories}
        tags={tags}
      />

      {/* description */}
      <ControlledTipTap
        name={"description"}
        control={control}
      
        errors={errors}
      />

      <ProductSeoForm control={control} errors={errors} />

      {/* submit button */}
      <Button
        type="submit"
        className="w-full rounded-xl bg-gradient-to-l from-blue-600 to-indigo-700 px-3 py-2  text-white"
        isLoading={isLoading}
      >
        {btnText}
      </Button>
    </Form>
  );
};

export default ProductForm;
