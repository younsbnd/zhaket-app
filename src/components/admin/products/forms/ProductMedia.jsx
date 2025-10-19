import ControlledInput from "@/components/shared/forms/ControlledInput";
import React from "react";

const ProductMedia = ({ control, errors }) => {
  return (
    <>
      {/* image and image alt */}
      <div className="flex flex-col gap-4 w-full md:flex-row">
        <ControlledInput
          name={"imageUrl"}
          control={control}
          label={"آدرس تصویر"}
          errors={errors}
          variant="bordered"
          color="primary"
          classNames={{
            base: "w-full bg-slate-800 p-2 rounded-md border-0",
            inputWrapper:
              "w-full  bg-slate-800 p-2 rounded-md border-slate-600",
          }}
        />

        <ControlledInput
          name={"imageAlt"}
          control={control}
          label={"متن جایگزین تصویر"}
          errors={errors}
          variant="bordered"
          color="primary"
          classNames={{
            base: "w-full bg-slate-800 p-2 rounded-md border-0",
            inputWrapper:
              "w-full  bg-slate-800 p-2 rounded-md border-slate-600",
          }}
        />
      </div>
    </>
  );
};

export default ProductMedia;
