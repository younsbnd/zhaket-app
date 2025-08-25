"use client";
import Image from "next/image";
import { Button, Input } from "@heroui/react";
import { LuUserRound } from "react-icons/lu";

const IdentifierForm = ({
  onSubmit,
  control,
  handleSubmit,
  errors,
  register,
  identifierValue,
  isLoading,
  isResetPasswordLoading,
  btnText,
}) => {
  // on submit
  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      {/* Input for user identifier */}
      <Input
        name="identifier"
        placeholder="شماره همراه یا ایمیل"
        variant="bordered"
        isInvalid={!!errors?.identifier}
        errorMessage={errors?.identifier?.message}
        {...register("identifier", {
          validate: (value) => {
            const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            const isMobile = /^(09\d{9})$/.test(value);

            // if phone number is valid return true
            if (value?.startsWith("09")) {
              if (!isMobile) {
                return "شماره موبایل باید 11 رقم و با 09 شروع شود";
              }
              return true;
            }
            // if email is valid return true
            if (value?.includes("@")) {
              if (!isEmail) {
                return "لطفا یک آدرس ایمیل معتبر وارد کنید";
              }
              return true;
            }
            return "لطفا یک ایمیل یا شماره موبایل معتبر وارد کنید";
          },
        })}
        // end content for iran flag
        endContent={
          identifierValue?.startsWith("09") ? (
            <div className="flex items-center gap-1 me-2 bg">
              <span className="text-gray-400 text-[12px] mt-0.5">98+</span>
              <Image
                src="/images/auth/ir.svg"
                alt="iran"
                width={10}
                height={10}
                className="w-5 h-5"
              />
            </div>
          ) : null
        }
        radius="sm"
        color="warning"
        size="lg"
        classNames={{
          input:
            "placeholder:text-gray-500/85 placeholder:text-[12px] placeholder:font-semibold text-[12px] text-gray-500",
        }}
        startContent={
          <LuUserRound className="text-gray-400 text-[16px] mb-0.5" />
        }
      />
      {/* Button for user identifier */}
      <Button
        isLoading={isLoading || isResetPasswordLoading}
        isDisabled={isLoading || isResetPasswordLoading}
        radius="sm"
        type="submit"
        color="warning"
        className="w-full text-white text-[12px] mt-3 py-6 font-semibold"
      >
        {btnText}
      </Button>
    </form>
  );
};

export default IdentifierForm;
