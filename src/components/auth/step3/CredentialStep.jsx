"use client";
import React, { useEffect } from "react";
import LoginForm from "./LoginForm";
import { useForm } from "react-hook-form";
import useResetPasswordHandler from "./ResetPasswordHandler";
import useLoginHandler from "./LoginHandler";
import useRegistrationHandler from "./RegistrationHandler";

const CredentialStep = ({
  identifier,
  isUserExists,
  withOtp,
  setWithOtp,
  isResetPassword,
  setIsResetPassword,
  setStep,
}) => {
  // form state management with react-hook-form
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      fullName: "",
      password: "",
      confirmPassword: "",
      otp: "",
    },
  });

  // Custom hooks for different operations
  const resetPasswordHandler = useResetPasswordHandler({
    identifier,
    setIsResetPassword,
    setStep,
    setError,
    reset,
  });

  const loginHandler = useLoginHandler();
  const registrationHandler = useRegistrationHandler();

  // Reset form and OTP verification state when component props change
  useEffect(() => {
    if (!isResetPassword) {
      reset();
    }
  }, [isResetPassword, reset]);

  // on submit handler for form submission
  const onSubmit = async (data) => {
    // Password Reset Flow
    if (isResetPassword) {
      await resetPasswordHandler.handleResetPassword(data);
      return;
    }

    // Regular Login/Register Flow
    if (isUserExists) {
      await loginHandler.handleLogin(identifier, data, withOtp);
    } else {
      await registrationHandler.handleRegistration(
        identifier,
        data,
        withOtp,
        setError
      );
    }
  };

  return (
    <div>
      <LoginForm
        {...{
          control,
          handleSubmit,
          errors,
          setError,
          onSubmit,
          isUserExists,
          withOtp,
          identifier,
          setWithOtp,
          isResetPassword,
          setIsResetPassword,
          setStep,
        }}
        isLoading={
          resetPasswordHandler.isLoading || registrationHandler.isLoading
        }
        isResetPassword={isResetPassword}
        isOtpVerified={resetPasswordHandler.isOtpVerified}
      />
    </div>
  );
};

export default CredentialStep;
