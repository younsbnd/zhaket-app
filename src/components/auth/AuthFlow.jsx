"use client";
import React, { useEffect, useState } from "react";
import AuthLayout from "./AuthLayout";
import IdentifierStep from "./step1/IdentifierStep";
import AuthMethodStep from "./step2/AuthMethodStep";
import CredentialStep from "./step3/CredentialStep";
import { IoIosArrowBack } from "react-icons/io";

// auth flow component for authentication
const AuthFlow = () => {
  const [step, setStep] = useState(1);
  const [isEmail, setIsEmail] = useState(false);
  const [isUserExists, setIsUserExists] = useState();
  const [title, setTitle] = useState("ورود / ثبت نام");
  const [identifier, setIdentifier] = useState();
  const [withOtp, setWithOtp] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);

  // set title based on step
  useEffect(() => {
    if (step === 1 && isResetPassword) {
      setTitle("بازیابی رمز عبور");
    } else if (step === 1 && !isResetPassword) {
      setTitle("ورود / ثبت نام");
    } else if (step === 2 && !isUserExists) {
      setTitle("ایجاد حساب کاربری جدید");
    } else if (step === 2 && isUserExists) {
      setTitle("ورود به حساب کاربری");
    } else if (step === 3 && withOtp && isResetPassword) {
      setTitle("بازیابی رمز عبور با کد تایید");
    } else if (step === 3 && withOtp && !isUserExists) {
      setTitle("ثبت نام با کد تایید");
    } else if (step === 3 && withOtp && isUserExists) {
      setTitle("ورود با کد تایید");
    } else if (step === 3 && !withOtp && !isUserExists) {
      setTitle("ثبت نام با رمز عبور");
    } else if (step === 3 && !withOtp && isUserExists) {
      setTitle("ورود با رمز عبور");
    } else {
      setTitle("ورود / ثبت نام");
    }
  }, [isUserExists, step, withOtp, isResetPassword]);

  return (
    <div>
      {/* auth layout component */}
      <AuthLayout title={title}>
        {step > 1 && (
          <IoIosArrowBack
            className="absolute top-4 left-4 text-3xl text-gray-500 cursor-pointer border-1 border-gray-200 p-1 rounded-md hover:bg-gray-500 hover:text-white transition-all duration-300"
            onClick={() => {
              if (step === 3 && withOtp && isUserExists && isResetPassword) {
                setStep(1);
              } else {
                setStep(step - 1);
              }
            }}
          />
        )}
        {step === 1 && (
          <IdentifierStep
            {...{
              setStep,
              setIsEmail,
              setIsUserExists,
              setIdentifier,
              setIsResetPassword,
              isResetPassword,
              setWithOtp,
              setIsUserExists,
            }}
          />
        )}
        {step === 2 && (
          <AuthMethodStep
            {...{ isUserExists, isEmail, setStep, identifier, setWithOtp }}
          />
        )}
        {step === 3 && (
          <CredentialStep
            {...{
              identifier,
              isUserExists,
              withOtp,
              setWithOtp,
              isResetPassword,
              setIsResetPassword,
              setStep,
            }}
          />
        )}
      </AuthLayout>
    </div>
  );
};

export default AuthFlow;
