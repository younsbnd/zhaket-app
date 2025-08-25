"use client";
import React from "react";
import { useCrud } from "@/hooks/useCrud";
import { addToast } from "@heroui/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const useRegistrationHandler = () => {
  const router = useRouter();
  const { createRecord, isLoading } = useCrud("/auth/register");

  const handleRegistration = async (identifier, data, withOtp, setError) => {
    const isEmail = identifier?.includes("@");
    let apiPayload = {
      isUserExists: false,
      withOtp,
      ...data,
    };

    // add identifier to api payload
    if (isEmail) {
      apiPayload.email = identifier;
    } else {
      apiPayload.phoneNumber = identifier;
    }

    // create record in database
    try {
      const response = await createRecord(apiPayload);
      if (response.ok) {
        // After successful registration, automatically sign in the user
        if (withOtp) {
          // Sign in with OTP for OTP-based registration
          const result = await signIn("credentials-otp", {
            identifier,
            otp: data.otp,
            redirect: false,
            callbackUrl: "/",
          });
          if (result?.ok) {
            addToast({
              title: "ثبت نام با موفقیت انجام شد",
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
          // Sign in with password for password-based registration
          const result = await signIn("credentials-password", {
            identifier,
            password: data.password,
            redirect: false,
            callbackUrl: "/",
          });
          if (result?.ok) {
            addToast({
              title: "ثبت نام با موفقیت انجام شد",
              color: "success",
            });
            router.push("/");
          } else if (result?.error) {
            addToast({
              title: result.error,
              color: "danger",
            });
          }
        }
      }
    } catch (err) {
      if (err.errors) {
        Object.entries(err.errors).forEach(([fieldName, message]) => {
          setError(fieldName, {
            type: "server",
            message: message.join(", "),
          });
        });
      } else {
        addToast({
          title: err.error?.message || err.message,
          color: "danger",
        });
      }
    }
  };

  return { handleRegistration, isLoading };
};

export default useRegistrationHandler;
