"use client";
import React from "react";
import LoginForm from "./LoginForm";
import { useCrud } from "@/hooks/useCrud";
import { useForm } from "react-hook-form";
import { addToast } from "@heroui/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const CredentialStep = ({ identifier, isUserExists, withOtp, setWithOtp }) => {
  const router = useRouter();
  const { createRecord, isLoading } = useCrud(
    !isUserExists && "/auth/register"
  );

  // form state management with react-hook-form
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      password: "",
      otp: "",
    },
  });

  // on submit handler for form submission
  const onSubmit = async (data) => {
    if (isUserExists && withOtp) {
      // sign in with credentials
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
    } else if (isUserExists && !withOtp) {
      // sign in with credentials
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
    } else if (!isUserExists) {
      const isEmail = identifier?.includes("@");
      let apiPayload = {
        isUserExists,
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
          addToast({
            title: response.data.message,
            color: "success",
          });
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
        }}
        isLoading={isLoading}
      />
    </div>
  );
};

export default CredentialStep;
