"use client";
import { useCrud } from "@/hooks/useCrud";
import { addToast, Button } from "@heroui/react";
import React from "react";

const AuthMethodStep = ({ isUserExists, setStep, identifier, setWithOtp }) => {
  const { createRecord, isLoading } = useCrud("/auth/send-otp");

  // send otp to user
  const onSendOtp = async () => {
    setWithOtp(true);
    try {
      const response = await createRecord({ identifier });

      if (response.ok) {
        addToast({
          title: response.data.message,
          color: response.data.expiresAt ? "warning" : "success",
          timeout: response.data.expiresAt ? 8000 : 3000,
          shouldShowTimeoutProgress: true,
        });
        setStep(3);
      }
    } catch (err) {
      addToast({
        title: err.message,
        color: "danger",
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* send otp button */}
      <Button
        className="w-full text-[12px] font-semibold"
        color="warning"
        variant="flat"
        radius="sm"
        onPress={onSendOtp}
        isDisabled={isLoading}
        isLoading={isLoading}
      >
        {isUserExists ? "ورود با کد یکبار مصرف" : "ثبت نام با کد یکبار مصرف"}
      </Button>
      {/* login with password button */}
      <Button
        className="w-full text-[12px] font-semibold"
        variant="flat"
        color="warning"
        radius="sm"
        onPress={() => {
          setWithOtp(false);
          setStep(3);
        }}
      >
        {isUserExists ? "ورود با رمز عبور" : "ثبت نام با رمز عبور"}
      </Button>
    </div>
  );
};

export default AuthMethodStep;
