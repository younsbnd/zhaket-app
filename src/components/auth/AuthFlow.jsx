"use client";
import React, { useState } from "react";
import AuthLayout from "./AuthLayout";
import IdentifierStep from "./IdentifierStep";
import AuthMethodStep from "./AuthMethodStep";
import CredentialStep from "./CredentialStep";

const AuthFlow = () => {
  const [step, setStep] = useState(1);
  const [isEmail, setIsEmail] = useState(false);
  const [isUserExists, setIsUserExists] = useState();
  // const [title, setTitle] = useState(
  //   step === 1
  //     ? "ورود / ثبت نام"
  //     : step === 2
  //     ? "ورود با روش های مختلف"
  //     : "ورود با روش های مختلف"
  // );

  return (
    <div>
      <AuthLayout
        title={
          step === 1
            ? "ورود / ثبت نام"
            : step === 2
            ? "ورود"
            : "ورود با روش های مختلف"
        }
      >
        {step === 1 && (
          <IdentifierStep {...{ setStep, setIsEmail, setIsUserExists }} />
        )}
        {step === 2 && <AuthMethodStep />}
        {step === 3 && <CredentialStep />}
      </AuthLayout>
    </div>
  );
};

export default AuthFlow;
