import AuthFlow from "@/components/auth/AuthFlow";
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
    <div>
      <AuthFlow />
    </div>
  );
};

export default LoginPage;
