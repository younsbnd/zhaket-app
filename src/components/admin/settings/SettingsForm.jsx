import ControlledInput from "@/components/shared/forms/ControlledInput";
import ControlledTextarea from "@/components/shared/forms/ControlledTextarea";
import { Button, Form } from "@heroui/react";
import React from "react";

const SettingsForm = ({
  handleSubmit,
  errors,
  onSubmit,
  control,
  isLoading,
}) => {
  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="w-full">
      {/* Site Information Section */}
      <div className="mb-8 w-full">
        <h2 className="text-xl font-semibold text-blue-400 mb-4">
          اطلاعات سایت
        </h2>
        <div className="flex flex-col gap-4">
          <ControlledInput
            name={"siteName"}
            control={control}
            label={"نام سایت"}
            rules={{
              required: "نام سایت الزامی است",
              minLength: {
                value: 3,
                message: "نام سایت باید حداقل 3 کاراکتر باشد",
              },
            }}
            errors={errors}
            variant="bordered"
            color="primary"
            classNames={{
              base: "w-full bg-slate-800 p-2 rounded-md border-0",
              inputWrapper:
                "w-full bg-slate-800 p-2 rounded-md border-slate-600",
            }}
          />

          <ControlledTextarea
            name={"siteDescription"}
            control={control}
            label={"توضیحات سایت"}
            rules={{
              required: "توضیحات سایت الزامی است",
            }}
            errors={errors}
            variant="bordered"
            color="primary"
            rows={3}
            classNames={{
              base: "w-full bg-slate-800 p-2 rounded-md border-0",
              inputWrapper:
                "w-full bg-slate-800 p-2 rounded-md border-slate-600",
            }}
          />

          <div className="flex flex-col gap-4 w-full md:flex-row">
            <ControlledInput
              name={"logoUrl"}
              control={control}
              label={"آدرس لوگو"}
              errors={errors}
              variant="bordered"
              color="primary"
              classNames={{
                base: "w-full bg-slate-800 p-2 rounded-md border-0",
                inputWrapper:
                  "w-full bg-slate-800 p-2 rounded-md border-slate-600",
              }}
            />

            <ControlledInput
              name={"faviconUrl"}
              control={control}
              label={"آدرس فاویکون"}
              errors={errors}
              variant="bordered"
              color="primary"
              classNames={{
                base: "w-full bg-slate-800 p-2 rounded-md border-0",
                inputWrapper:
                  "w-full bg-slate-800 p-2 rounded-md border-slate-600",
              }}
            />
          </div>
        </div>
      </div>

      {/* Social Links Section */}
      <div className="mb-8 w-full">
        <h2 className="text-xl font-semibold text-blue-400 mb-4">
          شبکه‌های اجتماعی
        </h2>
        <div className="flex flex-col gap-4 w-full md:flex-row">
          <ControlledInput
            name={"socialLinks.instagram"}
            control={control}
            label={"اینستاگرام"}
            errors={errors}
            variant="bordered"
            color="primary"
            classNames={{
              base: "w-full bg-slate-800 p-2 rounded-md border-0",
              inputWrapper:
                "w-full bg-slate-800 p-2 rounded-md border-slate-600",
            }}
          />

          <ControlledInput
            name={"socialLinks.linkedin"}
            control={control}
            label={"لینکدین"}
            errors={errors}
            variant="bordered"
            color="primary"
            classNames={{
              base: "w-full bg-slate-800 p-2 rounded-md border-0",
              inputWrapper:
                "w-full bg-slate-800 p-2 rounded-md border-slate-600",
            }}
          />
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="mb-8 w-full">
        <h2 className="text-xl font-semibold text-blue-400 mb-4">
          اطلاعات تماس
        </h2>
        <div className="flex flex-col gap-4">
          <ControlledInput
            name={"contactInfo.address"}
            control={control}
            label={"آدرس"}
            errors={errors}
            variant="bordered"
            color="primary"
            classNames={{
              base: "w-full bg-slate-800 p-2 rounded-md border-0",
              inputWrapper:
                "w-full bg-slate-800 p-2 rounded-md border-slate-600",
            }}
          />

          <div className="flex flex-col gap-4 w-full md:flex-row">
            <ControlledInput
              name={"contactInfo.phone"}
              control={control}
              label={"شماره تماس"}
              errors={errors}
              variant="bordered"
              color="primary"
              classNames={{
                base: "w-full bg-slate-800 p-2 rounded-md border-0",
                inputWrapper:
                  "w-full bg-slate-800 p-2 rounded-md border-slate-600",
              }}
            />

            <ControlledInput
              name={"contactInfo.email"}
              control={control}
              label={"ایمیل"}
              errors={errors}
              variant="bordered"
              color="primary"
              classNames={{
                base: "w-full bg-slate-800 p-2 rounded-md border-0",
                inputWrapper:
                  "w-full bg-slate-800 p-2 rounded-md border-slate-600",
              }}
            />
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mb-8 w-full">
        <h2 className="text-xl font-semibold text-blue-400 mb-4">
          متن کپی رایت
        </h2>
        <ControlledInput
          name={"copyrightText"}
          control={control}
          label={"متن کپی رایت"}
          errors={errors}
          variant="bordered"
          color="primary"
          classNames={{
            base: "w-full bg-slate-800 p-2 rounded-md border-0",
            inputWrapper: "w-full bg-slate-800 p-2 rounded-md border-slate-600",
          }}
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full rounded-xl bg-gradient-to-l from-blue-600 to-indigo-700 px-3 py-2 text-white"
        isLoading={isLoading}
      >
        ذخیره تنظیمات
      </Button>
    </Form>
  );
};

export default SettingsForm;

