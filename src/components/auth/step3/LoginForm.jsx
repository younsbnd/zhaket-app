import ControlledInput from "@/components/shared/forms/ControlledInput";
import { Button, Form, InputOtp } from "@heroui/react";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import ResendOtp from "./ResendOtp";
import Link from "next/link";
import { FiEye, FiEyeOff } from "react-icons/fi";

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
  isResetPassword,
  isOtpVerified,
  setIsResetPassword,
  setStep,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-4 w-full"
      >
        {!isUserExists && !isResetPassword && (
          // full name input for registration only
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
        {((withOtp && !isUserExists) || (isResetPassword && isOtpVerified)) && (
          // password input for registration with OTP or reset password after OTP verification
          <ControlledInput
            control={control}
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder={isResetPassword ? "رمز عبور جدید" : "رمز عبور"}
            errorMessage={errors.password?.message}
            isInvalid={!!errors.password}
            errors={errors}
            endContent={
              <button
                className="focus:outline-none transition-colors duration-200 hover:text-gray-600"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FiEyeOff className="text-xl text-default-400 pointer-events-none" />
                ) : (
                  <FiEye className="text-xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            rules={{
              required: "رمز عبور الزامی است",
              minLength: {
                value: 8,
                message: "رمز عبور باید حداقل 8 کاراکتر باشد",
              },
            }}
          />
        )}
        {!withOtp && !isResetPassword && (
          // password input for normal login
          <ControlledInput
            control={control}
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="رمز عبور"
            errorMessage={errors.password?.message}
            isInvalid={!!errors.password}
            errors={errors}
            endContent={
              <button
                className="focus:outline-none transition-colors duration-200 hover:text-gray-600"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FiEyeOff className="text-xl text-default-400 pointer-events-none" />
                ) : (
                  <FiEye className="text-xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            rules={{
              required: "رمز عبور الزامی است",
              minLength: {
                value: 8,
                message: "رمز عبور باید حداقل 8 کاراکتر باشد",
              },
            }}
          />
        )}
        {isResetPassword && isOtpVerified && (
          // confirm password input for reset password
          <ControlledInput
            control={control}
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            placeholder="تکرار رمز عبور جدید"
            errorMessage={errors.confirmPassword?.message}
            isInvalid={!!errors.confirmPassword}
            errors={errors}
            endContent={
              <button
                className="focus:outline-none transition-colors duration-200 hover:text-gray-600"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FiEyeOff className="text-xl text-default-400 pointer-events-none" />
                ) : (
                  <FiEye className="text-xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            rules={{
              required: "تکرار رمز عبور الزامی است",
              minLength: {
                value: 8,
                message: "رمز عبور باید حداقل 8 کاراکتر باشد",
              },
            }}
          />
        )}
        {((withOtp && !isResetPassword) ||
          (isResetPassword && !isOtpVerified)) && (
          <div className="flex flex-col gap w-full">
            <span className="text-[13px] font-medium ms-1 text-gray-500">
              {isResetPassword ? "کد بازیابی" : "کد یکبار مصرف"}
            </span>
            {/* otp input */}
            <Controller
              control={control}
              name="otp"
              rules={{
                required: isResetPassword
                  ? "کد بازیابی الزامی است"
                  : "کد یکبار مصرف الزامی است",
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
          {isResetPassword
            ? isOtpVerified
              ? "تغییر رمز عبور"
              : "تایید کد"
            : isUserExists
              ? "ورود"
              : "ثبت نام"}
        </Button>
      </Form>
      {/* resend otp */}
      {((withOtp && !isResetPassword) ||
        (isResetPassword && !isOtpVerified)) && (
        <ResendOtp
          identifier={identifier}
          withOtp={withOtp}
          setWithOtp={setWithOtp}
          isResetPassword={isResetPassword}
        />
      )}

      {/* forget password */}
      {!withOtp && isUserExists && !isResetPassword && (
        <button
          onClick={() => {
            setIsResetPassword(true);
            setStep(1);
          }}
          className="text-[9.7px] text-blue-500/95 cursor-pointer border-b-1 border-blue-500 border-dashed align-bottom inline-block"
        >
          فراموشی رمز عبور
        </button>
      )}
    </>
  );
};

export default LoginForm;
