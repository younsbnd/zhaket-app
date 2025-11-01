"use client";
import { useCrud } from "@/hooks/useCrud";
import { addToast } from "@heroui/react";
import React from "react";
import { useForm } from "react-hook-form";
import MenuForm from "../forms/MenuForm";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/lib/api/fetcher";
import { IoCloseSharp } from "react-icons/io5";
import AdminFormSkeleton from "@/components/skeletons/admin/AdminFormSkeleton";

const EditMenuLogic = ({ id }) => {
  const router = useRouter();

  // fetch menu data
  const { data: response, isLoading: isLoadingMenu } = useSWR(
    process.env.NEXT_PUBLIC_API_BASE_URL + `/admin/menus/${id}`,
    fetcher
  );

  const menu = response?.data;

  // useForm hook for form validation
  const {
    handleSubmit,
    formState: { errors },
    setError,
    control,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  // Update form when menu data is loaded
  React.useEffect(() => {
    if (menu) {
      reset({
        name: menu.name,
        slug: menu.slug,
      });
    }
  }, [menu, reset]);

  // useCrud hook for updating menu
  const { updateRecord: updateMenu, isLoading } = useCrud("/admin/menus");

  // submit handler for updating menu
  const onSubmit = async (data) => {
    try {
      const response = await updateMenu(id, data);
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

  // show loading if menu is loading
  if (isLoadingMenu) {
    return (
      <AdminFormSkeleton 
        inputsCount={2} 
        hasTextarea={false} 
        hasSwitch={false} 
      />
    );
  }

  // show error if menu is not found
  if (!menu) {
    return (
      <div className="glass rounded-2xl p-5">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="text-4xl mb-4">
              <IoCloseSharp className="text-red-500" />
            </div>
            <p className="text-gray-400">منو یافت نشد</p>
          </div>
        </div>
      </div>
    );
  }

  // Check if menu is editable
  if (!menu.isEditable) {
    return (
      <div className="glass rounded-2xl p-5">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-lg font-semibold text-white mb-2">
              این منو قابل ویرایش نیست
            </h3>
            <p className="text-sm text-gray-400">
              این منو سیستمی است و فقط می‌توانید آیتم‌های آن را مدیریت کنید
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-5">
      <MenuForm
        {...{
          handleSubmit,
          errors,
          onSubmit,
          isLoading,
          control,
          btnText: "ویرایش منو",
        }}
      />
    </div>
  );
};

export default EditMenuLogic;

