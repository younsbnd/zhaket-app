"use client";
import React from "react";
import { TfiCommentAlt } from "react-icons/tfi";
import { LuUser } from "react-icons/lu";
import ControlledTextarea from "@/components/shared/forms/ControlledTextarea";
import { useForm } from "react-hook-form";
import { addToast, Button, Form } from "@heroui/react";
import { useCrud } from "@/hooks/useCrud";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AddComment = ({
  productId,
  parentCommentId = null,
  onSuccess,
  onCancel,
  compact = false,
}) => {
  const { data: session } = useSession();
  const router = useRouter();

  // use form to handle the comment data
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      text: "",
    },
  });

  // use crud to create the comment
  const { createRecord, isLoading } = useCrud(
    `/products/${productId}/comments`
  );

  // on submit handler for the comment
  const onSubmit = async (data) => {
    if (!session) {
      addToast({
        title: "برای ثبت دیدگاه باید وارد شوید",
        color: "danger",
        shouldShowTimeoutProgress: true,
      });
      router.push("/login");
      return;
    }

    try {
      const commentData = {
        text: data.text,
        parentComment: parentCommentId,
      };

      const response = await createRecord(commentData);

      if (response.ok) {
        addToast({
          title:
            response.data.message ||
            "دیدگاه شما با موفقیت ثبت شد و پس از تایید مدیر نمایش داده خواهد شد",
          color: "success",
          shouldShowTimeoutProgress: true,
        });
        reset();
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error) {
      if (error.errors) {
        // Zod validation errors
        Object.values(error.errors).forEach((errArray) => {
          errArray.forEach((err) => toast.error(err));
        });
      } else {
        addToast({
          title: error.message || "خطا در ثبت دیدگاه. لطفا دوباره تلاش کنید.",
          color: "danger",
          shouldShowTimeoutProgress: true,
        });
      }
    }
  };

  return (
    <div className="border-t pt-7 border-gray-100 my-[30px] flex flex-col gap-8">
      <div className="flex items-center justify-start">
        {/* comment icon */}
        <div className="flex items-center justify-center h-11 w-11 rounded-full bg-white shadow-[0px_5px_20px_0px_rgba(219,146,78,0.3)] z-10">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#81CF33] bg-none">
            <TfiCommentAlt className="w-4 h-4 text-white" />
          </div>
        </div>
        {/* user icon */}
        <div className="flex items-center justify-center -mr-4 h-11 w-11 rounded-full shadow-[0px_2px_8px_0px_#00000017]">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#f9fafc]">
            <LuUser className="w-4 h-4 text-gray-400" />
          </div>
        </div>
        <p className="text-base font-bold text-gray-600 ps-4">افزودن دیدگاه</p>
      </div>
      {/* comment form */}
      <div>
        <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {/* comment textarea */}
          <ControlledTextarea
            name="text"
            control={control}
            placeholder="دیدگاه خود را وارد کنید"
            errors={errors}
            rules={{
              required: "دیدگاه الزامی است",
              minLength: {
                value: 3,
                message: "دیدگاه باید حداقل 3 کاراکتر باشد",
              },
              maxLength: {
                value: 1000,
                message: "دیدگاه باید حداکثر 1000 کاراکتر باشد",
              },
            }}
            rows={7}
            variant="bordered"
            color="default"
            radius="sm"
          />
          {/* comment buttons */}
          <div className="flex items-center gap-2 self-end">
            {onCancel && (
              <Button
                type="button"
                radius="sm"
                variant="bordered"
                onPress={onCancel}
                className="font-semibold cursor-pointer"
                isDisabled={isLoading}
              >
                انصراف
              </Button>
            )}
            <Button
              type="submit"
              radius="sm"
              isLoading={isLoading}
              className="font-semibold cursor-pointer flex items-center justify-center gap-[10px] rounded-lg text-white duration-300 focus:outline-hidden focus:outline-0 h-10 px-4 py-3 text-xs bg-[#81CF33] transition-all hover:bg-[#F5FBED] hover:text-[#81CF33]"
            >
              ارسال دیدگاه
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddComment;
