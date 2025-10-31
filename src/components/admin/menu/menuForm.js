import ControlledInput from "@/components/shared/forms/ControlledInput";
import ControlledSelect from "@/components/shared/forms/ControlledSelect";
import { Button, Form, addToast } from "@heroui/react";
import React, { useEffect } from "react";
import { getMenuTypeOptions } from "@/constants/admin/menu/menuLogic";
import ChildrenManager from "./ChildrenManager";

/**
 * MenuForm Component
 * 
 * Renders a form for creating and editing menu items with validation.
 * Includes fields for basic menu data, menu type, and nested children.
 */
const MenuForm = ({ handleSubmit, errors, onSubmit, control, btnText, isLoading, serverError, currentMenuType }) => {
  const inputClassNames = {
    base: "w-full bg-slate-800 p-2 rounded-md border-0",
    inputWrapper: "w-full bg-slate-800 p-2 rounded-md border-slate-600",
  };

  const selectClassNames = {
    base: "w-full bg-slate-800 p-2 rounded-md border-0",
    trigger: "p-2 rounded-md border-slate-600",
  };

  // Display server error if exists
  useEffect(() => {
    if (serverError) {
      addToast({
        description: serverError || "خطا در ثبت منو",
        color: "danger",
        shouldShowTimeoutProgress: true,
      });
    }
  }, [serverError]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="w-full">
      {/* Name input field */}
      <div className="flex flex-col gap-4 w-full md:flex-row">
        <ControlledInput
          name="name"
          control={control}
          label="نام منو"
          rules={{ required: "نام منو الزامی است", minLength: { value: 2, message: "حداقل 2 کاراکتر" } }}
          errors={errors}
          variant="bordered"
          color="primary"
          classNames={inputClassNames}
        />
      </div>

      {/* Path and Icon input fields */}
      <div className="flex flex-col gap-4 w-full md:flex-row">
        <ControlledInput
          name="path"
          control={control}
          label="مسیر منو"
          rules={{ required: "مسیر منو الزامی است" }}
          errors={errors}
          variant="bordered"
          color="primary"
          classNames={inputClassNames}
        />
        <ControlledInput
          name="icon"
          control={control}
          label="آیکون منو (اختیاری)"
          errors={errors}
          variant="bordered"
          color="primary"
          classNames={inputClassNames}
        />
      </div>

      {/* Menu Type selection field */}
      <div className="flex flex-col gap-4 w-full md:flex-row">
        <ControlledSelect
          name="menuType"
          control={control}
          label="نوع منو"
          rules={{ required: "نوع منو الزامی است" }}
          errors={errors}
          variant="bordered"
          color="primary"
          options={getMenuTypeOptions(currentMenuType)}
          renderValue={(items) => items[0] ? <span className="text-white">{items[0].textValue}</span> : null}
          classNames={selectClassNames}
        />
      </div>

      {/* Children Manager */}
      <div className="mt-6">
        <ChildrenManager control={control} errors={errors} />
      </div>

      {/* Submit button */}
      <Button
        type="submit"
        className="w-full rounded-xl bg-gradient-to-l from-blue-600 to-indigo-700 px-3 py-2 text-white"
        isLoading={isLoading}
      >
        {btnText}
      </Button>
    </Form>
  );
};

export default MenuForm;