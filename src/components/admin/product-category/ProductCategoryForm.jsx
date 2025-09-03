import ControlledInput from "@/components/shared/forms/ControlledInput";
import ControlledSelect from "@/components/shared/forms/ControlledSelect";
import ControlledSwitch from "@/components/shared/forms/ControlledSwitch";
import ControlledTextarea from "@/components/shared/forms/ControlledTextarea";
import { Button, Form, form } from "@heroui/react";
import React from "react";

const ProductCategoryForm = ({
  handleSubmit,
  errors,
  onSubmit,
  control,
  btnText,
  isLoading,
  productCategories,
}) => {
  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="flex flex-col gap-4 w-full md:flex-row">
        {/* name and slug */}
        <ControlledInput
          name={"name"}
          control={control}
          label={"نام دسته بندی"}
          rules={{
            required: "نام دسته بندی الزامی است",
            minLength: {
              value: 3,
              message: "نام دسته بندی باید حداقل 3 کاراکتر باشد",
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
          label={"نامک دسته بندی"}
          errors={errors}
          rules={{
            required: "نامک دسته بندی الزامی است",
            minLength: {
              value: 3,
              message: "نامک دسته بندی باید حداقل 3 کاراکتر باشد",
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
      {/* parent */}
      <ControlledSelect
        name={"parent"}
        control={control}
        label={"دسته بندی والد"}
        errors={errors}
        variant="bordered"
        color="primary"
        options={(productCategories || []).map((category) => ({
          label: category.name,
          value: category._id,
        }))}
        renderValue={(items) => {
          const selectedItem = items[0];
          if(!selectedItem) return null;
          return <span className="text-white">{selectedItem.textValue}</span>;
        }}
        classNames={{
          base: "w-full bg-slate-800 p-2 rounded-md border-0 ",
          trigger: "p-2 rounded-md border-slate-600",
        }}
      />

      {/* description */}
      <ControlledTextarea
        name={"description"}
        control={control}
        label={"توضیحات"}
        errors={errors}
        variant="bordered"
        color="primary"
        rows={5}
        classNames={{
          base: "w-full bg-slate-800 p-2 rounded-md border-0",
          inputWrapper: "w-full  bg-slate-800 p-2 rounded-md border-slate-600",
        }}
      />

      {/* is active */}
      <ControlledSwitch
        name={"isActive"}
        control={control}
        label={"وضعیت دسته بندی"}
        errors={errors}
        variant="bordered"
        color="primary"
        classNames={{
          base: "w-full bg-slate-800 p-2 rounded-md border-0",
          inputWrapper: "w-full  bg-slate-800 p-2 rounded-md border-slate-600",
        }}
        labelClassName="text-blue-500"
      />

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
        label={" وضعیت ایندکس"}
        errors={errors}
        variant="bordered"
        color="primary"
        classNames={{
          base: "w-full bg-slate-800 p-2 rounded-md border-0",
          inputWrapper: "w-full  bg-slate-800 p-2 rounded-md border-slate-600",
        }}
        labelClassName="text-blue-500"
      />

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

export default ProductCategoryForm;
