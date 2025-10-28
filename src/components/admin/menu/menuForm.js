import ControlledInput from "@/components/shared/forms/ControlledInput";
import ControlledSelect from "@/components/shared/forms/ControlledSelect";
import ControlledSwitch from "@/components/shared/forms/ControlledSwitch";
import ControlledTextarea from "@/components/shared/forms/ControlledTextarea";
import { Button, Form, Alert, addToast } from "@heroui/react";
import React from "react";
import { getMenuTypeOptions, DEFAULT_TARGET_OPTIONS } from "@/constants/admin/menu/menuLogic";

/**
 * MenuForm Component
 * 
 * Renders a form for creating and editing menu items with validation.
 * Includes fields for basic menu data, parent selection, menu type, and SEO fields.
 * 
 * @param {Object} props - Component props
 * @param {Function} props.handleSubmit - Form submission handler
 * @param {Object} props.errors - Form validation errors
 * @param {Function} props.onSubmit - Submit callback function
 * @param {Object} props.control - React Hook Form control object
 * @param {string} props.btnText - Text for submit button
 * @param {boolean} props.isLoading - Loading state
 * @param {string} props.serverError - Server error message
 * @param {string} props.currentMenuType - Current menu type for editing
 * @param {string} props.currentMenuId - Current menu ID for editing
 * @param {Array} props.menus - Array of available menus for parent selection
 * @param {Function} props.buildHierarchicalOptions - Function to build parent menu options
 * @returns {JSX.Element} Menu form component
 */
const MenuForm = ({ handleSubmit, errors, onSubmit, control, btnText, isLoading, serverError, currentMenuType, currentMenuId, menus, buildHierarchicalOptions }) => {
  // CSS class names for input styling
  const inputClassNames = {
    base: "w-full bg-slate-800 p-2 rounded-md border-0",
    inputWrapper: "w-full bg-slate-800 p-2 rounded-md border-slate-600",
  };
 
  // CSS class names for select styling
  const selectClassNames = {
    base: "w-full bg-slate-800 p-2 rounded-md border-0",
    trigger: "p-2 rounded-md border-slate-600",
  };

    return (
    <Form onSubmit={handleSubmit(onSubmit)} className="w-full">
      {/* Display server error if exists */}
      {serverError && 
        addToast({
        description: serverError || "خطا در ثبت منو",
          color: "danger",
          shouldShowTimeoutProgress: true,
        })
      } 

      {/* Name and Slug input fields */}
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
        <ControlledInput
          name="slug"
          control={control}
          label="نامک منو"
          rules={{ required: "نامک منو الزامی است", minLength: { value: 2, message: "حداقل 2 کاراکتر" } }}
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
          label="آیکون منو"
          errors={errors}
          variant="bordered"
          color="primary"
          classNames={inputClassNames}
        />
      </div>

      {/* Parent Menu, Menu Type and Target selection fields */}
      <div className="flex flex-col gap-4 w-full md:flex-row">
        <ControlledSelect
          name="parent"
          control={control}
          label="منوی والد"
          errors={errors}
          variant="bordered"
          color="primary"
          options={buildHierarchicalOptions ? buildHierarchicalOptions(menus) : [{ label: "بدون منوی والد", value: "" }]}
          renderValue={(items) => items[0] ? <span className="text-white">{items[0].textValue}</span> : null}
          classNames={selectClassNames}
        />
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
        <ControlledSelect
          name="target"
          control={control}
          label="نوع باز کردن"
          errors={errors}
          variant="bordered"
          color="primary"
          options={DEFAULT_TARGET_OPTIONS}
          renderValue={(items) => items[0] ? <span className="text-white">{items[0].textValue}</span> : null}
          classNames={selectClassNames}
        />
      </div>

      {/* Description textarea field */}
      <ControlledTextarea
        name="description"
        control={control}
        label="توضیحات"
        errors={errors}
        variant="bordered"
        color="primary"
        rows={3}
        classNames={inputClassNames}
      />

      {/* Menu active status switch */}
      <ControlledSwitch
        name="isActive"
        control={control}
        label="وضعیت منو"
        errors={errors}
        variant="bordered"
        color="primary"
        classNames={inputClassNames}
        labelClassName="text-blue-500"
      />

      {/* SEO fields section */}
      <div className="flex flex-col gap-4 w-full md:flex-row">
        <ControlledInput
          name="seoTitle"
          control={control}
          label="عنوان سئو"
          errors={errors}
          variant="bordered"
          color="primary"
          classNames={inputClassNames}
        />
        <ControlledInput
          name="canonical"
          control={control}
          label="لینک کانونیکال"
          errors={errors}
          variant="bordered"
          color="primary"
          classNames={inputClassNames}
        />
        </div>

      <ControlledTextarea
        name="metaDescription"
        control={control}
        label="توضیحات سئو"
        errors={errors}
        variant="bordered"
        color="primary"
        rows={3}
        classNames={inputClassNames}
      />

      <ControlledSwitch
        name="noIndex"
        control={control}
        label="وضعیت ایندکس"
        errors={errors}
        variant="bordered"
        color="primary"
        classNames={inputClassNames}
        labelClassName="text-blue-500"
      />

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