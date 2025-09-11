import ControlledInput from "@/components/shared/forms/ControlledInput";
import ControlledSwitch from "@/components/shared/forms/ControlledSwitch";
import ControlledTextarea from "@/components/shared/forms/ControlledTextarea";
import React from "react";

const ProductSeoForm = ({
  control,
  errors,
}) => {
  return (
    <>
      {/* seo title */}
      <ControlledInput
        name={"seoTitle"}
        control={control}
        label={"عنوان سئو"}
        errors={errors}
        variant="bordered"
        color="primary"
        classNames={{
          base: "w-full bg-slate-800 p-2 rounded-md border-0",
          inputWrapper: "w-full  bg-slate-800 p-2 rounded-md border-slate-600",
        }}
      />

      {/* canonical */}
      <ControlledInput
        name={"canonical"}
        control={control}
        label={"لینک کانونیکال"}
        errors={errors}
        variant="bordered"
        color="primary"
        classNames={{
          base: "w-full bg-slate-800 p-2 rounded-md border-0",
          inputWrapper: "w-full  bg-slate-800 p-2 rounded-md border-slate-600",
        }}
      />

      {/* meta description */}
      <ControlledTextarea
        name={"metaDescription"}
        control={control}
        label={"توضیحات سئو"}
        errors={errors}
        variant="bordered"
        color="primary"
        rows={3}
        classNames={{
          base: "w-full bg-slate-800 p-2 rounded-md border-0",
          inputWrapper: "w-full  bg-slate-800 p-2 rounded-md border-slate-600",
        }}
      />

      {/* no index */}
      <ControlledSwitch
        name={"noIndex"}
        control={control}
        label={"وضعیت ایندکس"}
        errors={errors}
        variant="bordered"
        color="primary"
        classNames={{
          base: "w-full bg-slate-800 p-2 rounded-md border-0",
          inputWrapper: "w-full  bg-slate-800 p-2 rounded-md border-slate-600",
        }}
        labelClassName="text-blue-500"
      />
    </>
  );
};

export default ProductSeoForm;
