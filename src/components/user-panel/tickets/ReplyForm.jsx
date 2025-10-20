"use client";

import React from "react";
import { Button } from "@heroui/react";
import { FiSend } from "react-icons/fi";
import { FaLock } from "react-icons/fa";
import ControlledTextarea from "@/components/shared/forms/ControlledTextarea";

const ReplyForm = ({
  control,
  handleSubmit,
  errors,
  onSubmit,
  isLoading,
  ticketStatus,
}) => {
  const isClosed = ticketStatus === "CLOSED";

  // if ticket is closed, show a message
  if (isClosed) {
    return (
      <div className="bg-red-50 rounded-lg p-4 md:p-6">
        <div className="flex items-center justify-center gap-2 text-red-500">
          <FaLock className="text-red-500" />
          <span className="text-sm md:text-base font-semibold">
            این تیکت بسته شده است و امکان ارسال پیام جدید وجود ندارد
          </span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 md:space-y-4">
      {/* textarea */}
      <div>
        <ControlledTextarea
          name="message"
          control={control}
          placeholder="پیام خود را بنویسید..."
          minRows={3}
          rules={{
            required: "پیام نمی‌تواند خالی باشد",
            minLength: {
              value: 10,
              message: "پیام باید حداقل 10 کاراکتر باشد",
            },
          }}
          errors={errors}
          disabled={isLoading}
          classNames={{
            input: "text-sm md:text-base text-right",
            inputWrapper:
              "bg-white border-2 border-gray-200 hover:border-blue-300 data-[focus=true]:border-blue-500 transition-colors",
            errorMessage: "text-right",
          }}
        />
      </div>

      {/* submit button */}
      <div className="flex justify-start">
        <Button
          type="submit"
          radius="sm"
          isLoading={isLoading}
          isDisabled={isLoading}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
          startContent={!isLoading && <FiSend className="text-lg" />}
        >
          {isLoading ? "در حال ارسال..." : "ارسال پیام"}
        </Button>
      </div>
    </form>
  );
};

export default ReplyForm;
