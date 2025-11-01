"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { addToast } from "@heroui/react";
import { mutate } from "swr";
import ReplyForm from "./ReplyForm";
import { useCrud } from "@/hooks/useCrud";

const ReplyFormLogic = ({ ticketId, ticketStatus }) => {
  // useForm hook for form validation
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    defaultValues: {
      message: "",
    },
  });

  // useCrud hook for sending reply
  const { createRecord: sendReply, isLoading } = useCrud(
    `/user/ticket/${ticketId}/reply`
  );

  // on submit function to submit the form
  const onSubmit = async (data) => {
    try {
      const response = await sendReply(data);

      if (response.ok) {
        addToast({
          description: response?.data?.message || "پاسخ شما با موفقیت ارسال شد",
          color: "success",
          shouldShowTimeoutProgress: true,
        });

        // Reset form
        reset();

        // Refresh ticket data
        mutate(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/ticket/${ticketId}`
        );
      }
    } catch (err) {
      // handle validation errors
      if (err?.errors) {
        Object.entries(err.errors).forEach(([fieldName, message]) => {
          setError(fieldName, {
            type: "server",
            message: message.join(", "),
          });
        });
      }

      // handle general error
      addToast({
        description: err?.error?.message || err?.message || "خطا در ارسال پاسخ",
        color: "danger",
        shouldShowTimeoutProgress: true,
      });
    }
  };

  return (
    <ReplyForm
      control={control}
      handleSubmit={handleSubmit}
      errors={errors}
      onSubmit={onSubmit}
      isLoading={isLoading}
      ticketStatus={ticketStatus}
    />
  );
};

export default ReplyFormLogic;
