import AuthFlow from "@/components/auth/AuthFlow";
import AuthWrapper from "@/components/providers/AuthWrapper";
import { metadata } from "@/lib/seo/metadata";
import React from "react";

// generate metadata for the page
export const generateMetadata = () => {
  return metadata({
    title: "ورود / ثبت نام",
    description: "ورود / ثبت نام",
  });
};

const LoginPage = () => {
  return (
    <AuthWrapper>
      <AuthFlow />
    </AuthWrapper>
  );
};

export default LoginPage;
