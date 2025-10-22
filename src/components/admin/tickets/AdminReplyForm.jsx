"use client";

import React from "react";
import { Button, addToast } from "@heroui/react";
import { FiSend } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { useCrud } from "@/hooks/useCrud";
import ControlledTextarea from "@/components/shared/forms/ControlledTextarea";

const AdminReplyForm = ({ ticketId, ticketStatus, onSuccess }) => {
  const { createRecord, isLoading: isSubmitting } = useCrud(`/admin/tickets/${ticketId}/reply`);
  
  // hook form useForm for form validation
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      message: "",
    },
  });

  // handle form submit
  const onSubmit = async (data) => {
    try {
      const response = await createRecord({ message: data.message.trim() });
      
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
      // show error toast
      addToast({
        description: error.message || "خطا در ارسال پاسخ",
        color: "danger",
        shouldShowTimeoutProgress: true,
      });
    }
  };

  // Disable form if ticket is closed
  const isDisabled = ticketStatus === "CLOSED" || isSubmitting;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* message textarea */}
      <ControlledTextarea
        name="message"
        control={control}
        label="پاسخ شما"
        placeholder={
          ticketStatus === "CLOSED"
            ? "این تیکت بسته شده است"
            : "پاسخ خود را اینجا بنویسید..."
        }
        rows={4}
        disabled={isDisabled}
        errors={errors}
        rules={{
          required: "لطفا پیام خود را وارد کنید",
          minLength: {
            value: 10,
            message: "پیام باید حداقل 10 کاراکتر باشد",
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
          isDisabled={isDisabled}
          className="bg-gradient-to-l from-blue-600 to-indigo-700 text-white"
          startContent={!isSubmitting && <FiSend />}
        >
          ارسال پاسخ
        </Button>
      </div>
    </form>
  );
};

export default AdminReplyForm;
