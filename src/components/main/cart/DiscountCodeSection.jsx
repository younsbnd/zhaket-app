"use client";
import React from "react";
import { Form } from "@heroui/react";
import { TbCirclePercentage } from "react-icons/tb";
import ControlledInput from "@/components/shared/forms/ControlledInput";
import { useForm } from "react-hook-form";
import { logger } from "@/lib/utils/logger";

const DiscountCodeSection = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // check discount code
  const onSubmit = (data) => {
    logger.debug("Discount code submitted", data);
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center justify-start gap-2">
        <TbCirclePercentage className="w-6 h-6 text-sky-600" />
        <p className="transition duration-300 text-sm leading-7 font-bold text-[#424244]">
          کد تخفیف دارید؟
        </p>
      </div>
      <div className="flex items-center justify-center mt-3 w-full gap-[7px] md:justify-start">
        <div className="w-full md:max-w-[216px]">
          {/* discount code input */}
          <ControlledInput
            name="discountCode"
            control={control}
            placeholder="کد تخفیف"
            errors={errors}
            variant="bordered"
            color="warning"
          />
        </div>
        {/* submit button */}
        <button
          type="submit"
          className="font-semibold cursor-pointer flex items-center justify-center gap-[10px] rounded-lg transition duration-300 focus:outline-hidden focus:outline-0 px-4 py-3 text-xs hover:bg-sky-100 h-[45px] w-20 bg-[#F0F8FF] text-[#6097F3]"
        >
          <div className="flex items-center justify-center">ثبت کد</div>
        </button>
      </div>
    </Form>
  );
};

export default DiscountCodeSection;
