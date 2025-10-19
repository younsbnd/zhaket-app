"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { addToast, useDisclosure } from "@heroui/react";
import { FiLock } from "react-icons/fi";
import ModalSecurityTips from "./ModalSecurityTips";
import { useCrud } from "@/hooks/useCrud";
import IdentifierForm from "../IdentifierForm";
import Link from "next/link";

const IdentifierStep = ({
  setStep,
  setIsEmail,
  setIsUserExists,
  setIdentifier,
  setIsResetPassword,
  isResetPassword,
  setWithOtp,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { createRecord, isLoading, error } = useCrud("/auth/user-exists");
  const {
    createRecord: createResetPasswordRecord,
    isLoading: isResetPasswordLoading,
  } = useCrud("/auth/send-reset-otp");

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
    if (isResetPassword) {
      try {
        const response = await createResetPasswordRecord(data);
        if (response.ok) {
          addToast({
            description: response.data.message,
            color: "success",
            shouldShowTimeoutProgress: true,
            timeout: 3000,
          });
          setStep(3);
          setWithOtp(true);
          setIsUserExists(true);
          setIdentifier(data.identifier);
          return;
        }
      } catch (error) {
        if (error && error.errors) {
          Object.entries(error.errors).forEach(([fieldName, message]) => {
            setError(fieldName, {
              type: "server",
              message: message.join(", "),
            });
          });
        }
        addToast({
          description: error.error?.message || error.message,
          color: "danger",
          shouldShowTimeoutProgress: true,
          timeout: 3000,
        });
        return;
      }
    }

    try {
      const response = await createRecord(data);
      if (response.ok) {
        setStep(2);
        setIsEmail(data.identifier.includes("@"));
        setIsUserExists(response.data.userExists);
        setIdentifier(data.identifier);
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
      {/* identifier form */}
      <IdentifierForm
        {...{
          control,
          handleSubmit,
          errors,
          register,
          onSubmit,
          identifierValue,
          isLoading,
          isResetPasswordLoading,
          btnText: isResetPassword ? "بازیابی رمز عبور" : "ورود یا ثبت نام",
        }}
      />
      {/* Button for security tips */}
      <div className="flex items-center gap-2 justify-between">
        <button
          onClick={onOpen}
          className="text-[9px] font-semibold mt-4 bg-gray-500/82 text-white flex px-[14.5px] rounded-md gap-1 pt-2 pb-[5px] cursor-pointer"
        >
          <FiLock className="text-[11px] text-white" />
          نکات امنیتی
        </button>

        <button
          className="text-[9.7px] text-blue-500/95 cursor-pointer border-b-1 border-blue-500 border-dashed align-bottom inline-block self-end"
          onClick={() => setIsResetPassword(!isResetPassword)}
        >
          {isResetPassword ? "ورود / ثبت نام" : "فراموشی رمز عبور"}
        </button>
      </div>
      <ModalSecurityTips isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
};

export default IdentifierStep;
