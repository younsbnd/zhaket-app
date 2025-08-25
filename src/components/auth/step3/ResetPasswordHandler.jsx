"use client";
import React, { useState } from "react";
import { useCrud } from "@/hooks/useCrud";
import { addToast } from "@heroui/react";

const useResetPasswordHandler = ({
  identifier,
  setIsResetPassword,
  setStep,
  setError,
  reset,
}) => {
  const { createRecord, isLoading } = useCrud("/auth/reset-password");
  const { createRecord: verifyOtp, isLoading: isVerifyingOtp } = useCrud(
    "/auth/verify-reset-otp"
  );

  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const handleResetPassword = async (data) => {
    if (!isOtpVerified) {
      // Step 1: Verify OTP
      try {
        const response = await verifyOtp({
          identifier,
          otp: data.otp,
        });

        if (response.ok) {
          addToast({
            title: response.data.message,
            color: "success",
          });
          setIsOtpVerified(true);
          // Clear OTP field after verification
          reset({
            fullName: "",
            password: "",
            confirmPassword: "",
            otp: "",
          });
        }
      } catch (err) {
        addToast({
          title: err.error?.message || err.message,
          color: "danger",
        });
      }
    } else {
      // Step 2: Reset Password
      // Validate password confirmation
      if (data.password !== data.confirmPassword) {
        setError("confirmPassword", {
          type: "manual",
          message: "رمز عبور و تکرار آن یکسان نیستند",
        });
        return;
      }

      try {
        const response = await createRecord({
          identifier,
          password: data.password,
        });

        if (response.ok) {
          addToast({
            title: response.data.message,
            color: "success",
            timeout: 3000,
          });
          // Redirect to login page after successful password reset
          setTimeout(() => {
            setIsResetPassword(false);
            setStep(1);
          }, 1000);
        }
      } catch (err) {
        addToast({
          title: err.error?.message || err.message,
          color: "danger",
        });
      }
    }
  };

  return {
    handleResetPassword,
    isOtpVerified,
    isLoading: isLoading || isVerifyingOtp,
  };
};

export default useResetPasswordHandler;
