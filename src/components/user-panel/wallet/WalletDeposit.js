"use client";

import React from "react";
import { Button, Card, CardBody } from "@heroui/react";
import { FiArrowUpCircle } from "react-icons/fi";
import ControlledInput from "@/components/shared/forms/ControlledInput";

const WalletDeposit = ({
  handleSubmit,
  onSubmit,
  errors,
  isLoading = false,
  control,
}) => {
  return (
    <Card className="shadow">
      <CardBody className="p-4 md:p-6">
        {/* deposit header */}
        <div className="flex items-center gap-2 mb-4 md:mb-6">
          <FiArrowUpCircle className="text-green-500 text-lg md:text-xl" />
          <span className="text-gray-700 font-semibold text-sm md:text-base">
            شارژ کیف پول
          </span>
        </div>

        {/* deposit form */}
        <form
          className="flex flex-col gap-3 md:gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <ControlledInput
            name="amount"
            control={control}
            label="مبلغ (تومان)"
            placeholder="مبلغ مورد نظر را وارد کنید"
            variant="bordered"
            color="warning"
            size="lg"
            type="number"
            errors={errors}
            rules={{
              required: "وارد کردن مبلغ الزامی است",
              min: {
                value: 10000,
                message: "حداقل مبلغ شارژ ۱۰,۰۰۰ تومان است",
              },
              max: {
                value: 100000000,
                message: "حداکثر مبلغ شارژ ۱۰۰,۰۰۰,۰۰۰ تومان است",
              },
            }}
            classNames={{
              input:
                "placeholder:text-gray-500/85 placeholder:text-[12px] text-[14px] text-gray-700",
              inputWrapper:
                "",
            }}
          />

          {/* deposit button */}
          <Button
            isLoading={isLoading}
            isDisabled={isLoading}
            radius="sm"
            type="submit"
            color="warning"
            className="w-full text-white text-[13px] md:text-[14px] py-5 md:py-6 font-semibold"
          >
            {isLoading ? "در حال پردازش..." : "شارژ کیف پول"}
          </Button>
        </form>

        {/* deposit footer */}
        <div className="mt-3 md:mt-4 p-2.5 md:p-3 bg-blue-50 rounded-lg">
          <p className="text-[11px] md:text-xs text-blue-600 text-start">
            پس از شارژ کیف پول، می‌توانید از موجودی خود برای خرید محصولات
            استفاده کنید.
          </p>
        </div>
      </CardBody>
    </Card>
  );
};

export default WalletDeposit;
