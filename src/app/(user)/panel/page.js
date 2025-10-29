import UserDashboard from "@/components/user-panel/dashboard/UserDashboard";
import { metadata } from "@/lib/seo/metadata";
import React from "react";

// generate metadata for seo the page
export const generateMetadata = () => {
  return metadata({
    title: "داشبورد",
    description: "داشبورد",
    noindex: true,
  });
};

const page = () => {
  return (
    <div>
      <UserDashboard />
    </div>
  );
};

export default page;
