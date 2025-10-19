import ControlledInput from "@/components/shared/forms/ControlledInput";
import React from "react";

const ProductBasicInfo = ({ control, errors }) => {
  return (
    <>
      <div className="flex flex-col gap-4 w-full md:flex-row">
        {/* title and slug */}
        <ControlledInput
          name={"title"}
          control={control}
          label={"عنوان محصول"}
          rules={{
            required: "عنوان محصول الزامی است",
            minLength: {
              value: 3,
              message: "عنوان محصول باید حداقل 3 کاراکتر باشد",
            },
          }}
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
          name={"slug"}
          control={control}
          label={"نامک محصول"}
          errors={errors}
          rules={{
            required: "نامک محصول الزامی است",
            minLength: {
              value: 3,
              message: "نامک محصول باید حداقل 3 کاراکتر باشد",
            },
          }}
          variant="bordered"
          color="primary"
          classNames={{
            base: "w-full bg-slate-800 p-2 rounded-md border-0",
            inputWrapper:
              "w-full  bg-slate-800 p-2 rounded-md border-slate-600",
          }}
        />
      </div>

      <div className="flex flex-col gap-4 w-full md:flex-row">
        {/* price and discount */}
        <ControlledInput
          name={"price"}
          control={control}
          label={"قیمت (تومان)"}
          type="number"
          rules={{
            required: "قیمت الزامی است",
            min: {
              value: 1,
              message: "قیمت باید بیشتر از 0 باشد",
            },
          }}
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
          name={"discount"}
          control={control}
          label={"تخفیف (تومان)"}
          type="number"
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

export default ProductBasicInfo;
