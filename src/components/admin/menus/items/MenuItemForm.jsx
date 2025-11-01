"use client";
import React, { useEffect } from "react";
import { Button, Input, Form } from "@heroui/react";
import { BiX } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { BsPencilSquare } from "react-icons/bs";


const MenuItemForm = ({ item, parentItem, onClose, isOpen, onSubmit, isLoading }) => {
  const isEditing = !!item;
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: item?.title || "",
      url: item?.url || "",
      icon: item?.icon || "",
    },
  });

  // Reset form when item changes
  useEffect(() => {
    if (item) {
      reset({
        title: item.title || "",
        url: item.url || "",
        icon: item.icon || "",
      });
    } else {
      reset({
        title: "",
        url: "",
        icon: "",
      });
    }
  }, [item, reset]);

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  // show empty state if form is not open
  if (!isOpen) {
    return (
      <div className="glass rounded-2xl p-5">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="text-6xl text-gray-600 mb-4">
            <BsPencilSquare className="text-gray-600" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            افزودن یا ویرایش آیتم
          </h3>
          <p className="text-sm text-gray-400">
            برای افزودن یا ویرایش آیتم، روی دکمه مربوطه کلیک کنید
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-5 sticky top-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">
          {isEditing ? "ویرایش آیتم" : "افزودن آیتم جدید"}
        </h3>
        <Button
          size="sm"
          isIconOnly
          variant="flat"
          color="danger"
          className="rounded-lg"
          onPress={onClose}
        >
          <BiX className="text-xl" />
        </Button>
      </div>

      {/* show parent item if it is a child item */}
      {parentItem && (
        <div className="mb-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
          <p className="text-xs text-gray-400 mb-1">زیرمنو برای:</p>
          <p className="text-sm text-blue-400 font-medium">{parentItem.title}</p>
        </div>
      )}

      {/* Form */}
      <Form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {/* title */}
        <Input
          label="عنوان"
          placeholder="مثال: صفحه اصلی"
          {...register("title", {
            required: "عنوان الزامی است",
            minLength: {
              value: 2,
              message: "عنوان باید حداقل 2 کاراکتر باشد",
            },
          })}
          isInvalid={!!errors.title}
          errorMessage={errors.title?.message}
          variant="bordered"
          classNames={{
            base: "w-full",
            inputWrapper: "bg-slate-800 border-slate-600",
          }}
        />

        {/* url */}
        <Input
          label="آدرس (URL)"
          placeholder="مثال: /home"
          {...register("url", {
            required: "آدرس الزامی است",
            minLength: {
              value: 1,
              message: "آدرس الزامی است",
            },
          })}
          isInvalid={!!errors.url}
          errorMessage={errors.url?.message}
          variant="bordered"
          classNames={{
            base: "w-full",
            inputWrapper: "bg-slate-800 border-slate-600",
          }}
        />

        {/* icon */}
        <Input
          label="آیکون (اختیاری)"
          placeholder="مثال: home"
          {...register("icon")}
          variant="bordered"
          classNames={{
            base: "w-full",
            inputWrapper: "bg-slate-800 border-slate-600",
          }}
        />

        {/* action buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            type="submit"
            className="flex-1 rounded-xl bg-gradient-to-l from-blue-600 to-indigo-700 text-white"
            isLoading={isLoading}
            isDisabled={isLoading}
          >
            {isEditing ? "ذخیره تغییرات" : "افزودن آیتم"}
          </Button>
          <Button
            variant="flat"
            color="default"
            className="rounded-xl text-gray-900"
            onPress={onClose}
            isDisabled={isLoading}
          >
            انصراف
          </Button>
        </div>
      </Form>

      {/* hint */}
      <div className="mt-6 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
        <p className="text-xs text-yellow-400">
          💡 نکته: می‌توانید با کلیک بر روی دکمه "+" در کنار هر آیتم، زیرمنو برای آن ایجاد کنید.
        </p>
      </div>
    </div>
  );
};

export default MenuItemForm;

