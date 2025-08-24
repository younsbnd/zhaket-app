import ControlledInput from "@/components/shared/forms/ControlledInput";
import { Button, Form, InputOtp } from "@heroui/react";
import React from "react";
import { Controller } from "react-hook-form";
import ResendOtp from "./ResendOtp";
import Link from "next/link";

const LoginForm = ({
  control,
  handleSubmit,
  errors,
  onSubmit,
  isLoading,
  isUserExists,
  withOtp,
  identifier,
  setWithOtp,
}) => {
  return (
    <>
      <Form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-4 w-full"
      >
        {!isUserExists && (
          // full name input
          <ControlledInput
            control={control}
            name="fullName"
            placeholder="نام و نام خانوادگی"
            errorMessage={errors.fullName?.message}
            isInvalid={!!errors.fullName}
            errors={errors}
            rules={{
              required: "نام و نام خانوادگی الزامی است",
              minLength: {
                value: 3,
                message: "نام و نام خانوادگی باید حداقل 3 کاراکتر باشد",
              },
            }}
          />
        )}
        {withOtp && !isUserExists && (
          // password input
          <ControlledInput
            control={control}
            name="password"
            placeholder="رمز عبور"
            errorMessage={errors.password?.message}
            isInvalid={!!errors.password}
            errors={errors}
            rules={{
              required: "رمز عبور الزامی است",
              minLength: {
                value: 8,
                message: "رمز عبور باید حداقل 8 کاراکتر باشد",
              },
            }}
          />
        )}
        {!withOtp && (
          // password input
          <ControlledInput
            control={control}
            name="password"
            placeholder="رمز عبور"
            errorMessage={errors.password?.message}
            isInvalid={!!errors.password}
            errors={errors}
            rules={{
              required: "رمز عبور الزامی است",
              minLength: {
                value: 8,
                message: "رمز عبور باید حداقل 8 کاراکتر باشد",
              },
            }}
          />
        )}
        {withOtp && (
          <div className="flex flex-col gap w-full">
            <span className="text-[13px] font-medium ms-1 text-gray-500">
              کد یکبار مصرف
            </span>
            {/* otp input */}
            <Controller
              control={control}
              name="otp"
              rules={{
                required: "کد یکبار مصرف الزامی است",
                minLength: {
                  value: 4,
                  message: "کد یکبار مصرف باید 4 رقم باشد",
                },
              }}
              render={({ field }) => (
                <InputOtp
                  {...field}
                  length={4}
                  dir="ltr"
                  color={errors.otp ? "danger" : "default"}
                  radius="sm"
                  variant="bordered"
                  className="mx-auto"
                  classNames={{
                    errorMessage: "text-red-500 text-right font-medium hidden",
                    segmentWrapper: "w-full",
                    segment: `w-full ${errors.otp && "border-red-500"}`,
                    base: "w-full",
                  }}
                />
              )}
            />
            <span className="text-red-500 text-right font-medium text-[12px] m-0">
              {errors.otp?.message}
            </span>
          </div>
        )}
        {/* submit button */}
        <Button
          type="submit"
          color="warning"
          fullWidth
          isLoading={isLoading}
          radius="sm"
          className="text-white"
        >
          {isUserExists ? "ورود" : "ثبت نام"}
        </Button>
      </Form>
      {/* resend otp */}
      {withOtp && (
        <ResendOtp
          identifier={identifier}
          withOtp={withOtp}
          setWithOtp={setWithOtp}
        />
      )}

      {/* forget password */}
      {!withOtp && isUserExists && (
        <Link
          href="/reset-password"
          className="text-[9.7px] text-blue-500/95 cursor-pointer border-b-1 border-blue-500 border-dashed align-bottom inline-block"
        >
          فراموشی رمز عبور
        </Link>
      )}
    </>
  );
};

export default LoginForm;
