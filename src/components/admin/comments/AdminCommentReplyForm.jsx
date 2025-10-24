"use client";

import React from "react";
import { Button, addToast } from "@heroui/react";
import { FiSend } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { useCrud } from "@/hooks/useCrud";
import ControlledTextarea from "@/components/shared/forms/ControlledTextarea";

const AdminCommentReplyForm = ({ commentId, onSuccess }) => {

  // use crud to create comment reply
  const { createRecord, isLoading: isSubmitting } = useCrud(
    `/admin/comments/${commentId}/reply`
  );

  // hook form useForm for form validation
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

  // handle form submit
  const onSubmit = async (data) => {
    try {
      const response = await createRecord({ text: data.text.trim() });

      if (response.ok) {
        addToast({
          description: "پاسخ شما با موفقیت ارسال شد",
          color: "success",
          shouldShowTimeoutProgress: true,
        });
        reset();
        if (onSuccess) {
          onSuccess();
        }
      } else {
        throw new Error("خطا در ارسال پاسخ");
      }
    } catch (error) {
      if (error.errors) {
        // Zod validation errors
        Object.values(error.errors).forEach((errArray) => {
          errArray.forEach((err) =>
            addToast({
              description: err,
              color: "danger",
              shouldShowTimeoutProgress: true,
            })
          );
        });
      } else {
        addToast({
          description: error.message || "خطا در ارسال پاسخ",
          color: "danger",
          shouldShowTimeoutProgress: true,
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* text textarea */}
      <ControlledTextarea
        name="text"
        control={control}
        label="پاسخ شما"
        placeholder="پاسخ خود را اینجا بنویسید..."
        rows={4}
        disabled={isSubmitting}
        errors={errors}
        rules={{
          required: "لطفا پاسخ خود را وارد کنید",
          minLength: {
            value: 3,
            message: "پاسخ باید حداقل 3 کاراکتر باشد",
          },
          maxLength: {
            value: 1000,
            message: "پاسخ باید حداکثر 1000 کاراکتر باشد",
          },
        }}
        classNames={{
          base: "w-full",
          input: " text-white",
          inputWrapper: "bg-white/10 border-white/20 text-white",
          label: "!text-white/80",
        }}
      />
      {/* submit button */}
      <div className="flex justify-start">
        <Button
          type="submit"
          isLoading={isSubmitting}
          isDisabled={isSubmitting}
          className="bg-gradient-to-l from-blue-600 to-indigo-700 text-white"
          startContent={!isSubmitting && <FiSend />}
        >
          ارسال پاسخ
        </Button>
      </div>
    </form>
  );
};

export default AdminCommentReplyForm;

