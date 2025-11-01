"use client";
import { useCrud } from "@/hooks/useCrud";
import { addToast } from "@heroui/react";
import React from "react";
import { useForm } from "react-hook-form";
import MenuForm from "../forms/MenuForm";
import { useRouter } from "next/navigation";

const CreateMenuLogic = () => {
  // useForm hook for form validation
  const {
    handleSubmit,
    formState: { errors },
    setError,
    control,
  } = useForm({
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  const router = useRouter();

  // useCrud hook for creating menu
  const { createRecord: createMenu, isLoading } = useCrud("/admin/menus");

  // submit handler for creating menu
  const onSubmit = async (data) => {
    try {
      const response = await createMenu(data);
      if (response.ok) {
        addToast({
          description: response.data.message,
          color: "success",
          shouldShowTimeoutProgress: true,
        });
        router.push("/admin/menus");
      }
    } catch (error) {
      // handle zod error
      if (error.errors) {
        Object.entries(error.errors).forEach(([fieldName, message]) => {
          setError(fieldName, {
            type: "server",
            message: message.join(", "),
          });
        });
      }
      // handle general error
      addToast({
        description: error?.error?.message || error.message,
        color: "danger",
        shouldShowTimeoutProgress: true,
      });
    }
  };

  return (
    <div className="glass rounded-2xl p-5">
      <MenuForm
        {...{
          handleSubmit,
          errors,
          onSubmit,
          isLoading,
          control,
          btnText: "ایجاد منو",
        }}
      />
    </div>
  );
};

export default CreateMenuLogic;

