"use client";
import React from "react";
import { addToast } from "@heroui/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const useLoginHandler = () => {
  const router = useRouter();

  const handleLogin = async (identifier, data, withOtp) => {
    if (withOtp) {
      // sign in with OTP
      const result = await signIn("credentials-otp", {
        identifier,
        otp: data.otp,
        redirect: false,
        callbackUrl: "/",
      });
      if (result?.ok) {
        addToast({
          title: "ورود با موفقیت انجام شد",
          color: "success",
        });
        router.push("/");
      } else if (result?.error) {
        addToast({
          title: result.error,
          color: "danger",
        });
      }
    } else {
      // sign in with password
      const result = await signIn("credentials-password", {
        identifier,
        password: data.password,
        redirect: false,
        callbackUrl: "/",
      });
      if (result?.ok) {
        addToast({
          title: "ورود با موفقیت انجام شد",
          color: "success",
        });
        router.push("/");
      }

      if (result?.error) {
        addToast({
          title: result.error,
          color: "danger",
        });
      }
    }
  };

  return { handleLogin };
};

export default useLoginHandler;
