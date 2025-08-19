"use client";
import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { addToast, Button, Input, useDisclosure } from "@heroui/react";
import { LuUserRound } from "react-icons/lu";
import { FiLock } from "react-icons/fi";
import ModalSecurityTips from "./ModalSecurityTips";
import Image from "next/image";
import { useCrud } from "@/hooks/useCrud";

const IdentifierStep = ({ setStep, setIsEmail, setIsUserExists }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { createRecord, isLoading, error } = useCrud("/auth/user-exists");

  // hook form useForm for form validation
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    setError,
    watch,
  } = useForm({
    mode: "all",
  });

  const identifierValue = watch("identifier");

  // on submit function
  const onSubmit = async (data) => {
    try {
      const response = await createRecord(data);
      if (response.ok) {
        setStep(2);
        setIsEmail(data.identifier.includes("@"));
        setIsUserExists(response.data.userExists);
      }
    } catch (err) {
      // if error is zod error
      if (err && err.errors) {
        Object.entries(err.errors).forEach(([fieldName, message]) => {
          setError(fieldName, {
            type: "server",
            message: message.join(", "),
          });
        });
      } else {
        // add toast for general error
        addToast({
          title: "خطا",
          description: err.error?.message || err.message,
          color: "danger",
          shouldShowTimeoutProgress: true,
          timeout: 3000,
        });
      }
    }
  };

  return (
    <div className="flex flex-col">
      {error && <p className="text-red-500 text-[12px]">{error}</p>}
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        {/* Input for user identifier */}
        <Input
          name="identifier"
          placeholder="شماره همراه یا ایمیل"
          variant="bordered"
          isInvalid={!!errors.identifier}
          errorMessage={errors.identifier?.message}
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
          isLoading={isLoading}
          isDisabled={isLoading}
          radius="sm"
          type="submit"
          color="warning"
          className="w-full text-white text-[12px] mt-3 py-6 font-semibold"
        >
          ورود یا ثبت نام
        </Button>
      </form>
      {/* Button for security tips */}
      <div className="">
        <button
          onClick={onOpen}
          className="text-[9px] font-semibold mt-4 bg-gray-500/82 text-white flex px-[14.5px] rounded-md gap-1 pt-2 pb-[5px] cursor-pointer"
        >
          <FiLock className="text-[11px] text-white" />
          نکات امنیتی
        </button>
      </div>
      <ModalSecurityTips isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
};

export default IdentifierStep;
