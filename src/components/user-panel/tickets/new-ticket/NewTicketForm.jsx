import ControlledInput from "@/components/shared/forms/ControlledInput";
import ControlledSelect from "@/components/shared/forms/ControlledSelect";
import ControlledTextarea from "@/components/shared/forms/ControlledTextarea";
import { Button, Form } from "@heroui/react";
import React from "react";

const NewTicketForm = ({
  control,
  handleSubmit,
  errors,
  products,
  section,
  reportType,
  onSubmit,
  isLoading,
}) => {
  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <section className="flex flex-col md:flex-row md:justify-between gap-4 w-full">
          {/* section selection */}
          <div className="flex flex-col gap-2 w-full">
            <p className="text-[13px] text-gray-500 truncate">
              لطفا بخش مورد نظر خود را انتخاب کنید
            </p>
            <ControlledSelect
              name="section"
              control={control}
              label="یک مورد را نتخاب کنید"
              options={[
                {
                  label: "ارتباط با ژاکت",
                  value: "SUPPORT_ZHAKET",
                },
              ]}
              errors={errors}
              rules={{
                required: "انتخاب  بخش مورد نظر الزامی است",
              }}
              radius="sm"
            />
          </div>
          {/* report type selection */}
          <div className="flex flex-col gap-2 w-full">
            <p className="text-[13px] text-gray-500 truncate">
              لطفا نوع گزارش خود را انتخاب کنید
            </p>
            <ControlledSelect
              name="reportType"
              control={control}
              label="یک مورد را نتخاب کنید"
              options={
                section
                  ? [
                      {
                        label: " راهنمایی در رابطه با محصول",
                        value: "PRODUCT_SUPPORT",
                      },
                      {
                        label: "مشاره خرید محصول",
                        value: "BUY_PRODUCT",
                      },
                      {
                        label: " سایر موارد",
                        value: "OTHER_REPORT",
                      },
                    ]
                  : []
              }
              errors={errors}
              radius="sm"
              rules={{
                required: "انتخاب نوع گزارش الزامی است",
              }}
            />
          </div>
          {/* product selection */}
          <div className="flex flex-col gap-2 w-full">
            {reportType !== "BUY_PRODUCT" && (
              <>
                <p className="text-[13px] text-gray-500 truncate flex flex-row gap-1 items-center">
                  لطفا محصول مورد نظر را انتخاب کنید
                  {reportType !== "PRODUCT_SUPPORT" && (
                    <span className="text-[10px] font-semibold text-gray-500">
                      (اختیاری)
                    </span>
                  )}
                </p>
                <ControlledSelect
                  name="product"
                  control={control}
                  label="یک مورد را نتخاب کنید"
                  options={
                    reportType === "PRODUCT_SUPPORT" ||
                    reportType === "OTHER_REPORT"
                      ? products.map((product) => ({
                          label: product.title,
                          value: product._id,
                        }))
                      : []
                  }
                  errors={errors}
                  radius="sm"
                  rules={
                    reportType === "PRODUCT_SUPPORT"
                      ? {
                          required: "انتخاب محصول الزامی است",
                        }
                      : undefined
                  }
                />
              </>
            )}
          </div>
        </section>
        {/* title input */}
        <div className="w-full">
          <ControlledInput
            name="title"
            control={control}
            label="عنوان تیکت"
            errors={errors}
            radius="sm"
            rules={{
              required: "عنوان تیکت الزامی است",
              minLength: {
                value: 3,
                message: "عنوان تیکت باید حداقل 3 کاراکتر باشد",
              },
            }}
          />
        </div>
        {/* description textarea */}
        <div className="w-full">
          <ControlledTextarea
            name="description"
            control={control}
            label="محتوای تیکت"
            errors={errors}
            radius="sm"
            rows={6}
            rules={{
              required: "محتوای تیکت الزامی است",
              minLength: {
                value: 10,
                message: "محتوای تیکت باید حداقل 10 کاراکتر باشد",
              },
            }}
          />
        </div>
        {/* submit button */}
        <Button
          type="submit"
          isLoading={isLoading}
          isDisabled={isLoading}
          radius="sm"
          className="bg-lime-500 text-white w-46 h-14 font-medium text-[14px] hover:bg-lime-50 hover:text-lime-600"
        >
          ارسال تیکت
        </Button>
      </Form>
    </div>
  );
};

export default NewTicketForm;
