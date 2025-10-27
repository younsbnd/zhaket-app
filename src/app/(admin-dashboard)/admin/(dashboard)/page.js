import { metadata } from "@/lib/seo/metadata";
import React from "react";

// generate metadata for the page
export const generateMetadata = () => {
  return metadata({
    title: "داشبورد ادمین",
    description: "داشبورد مدیریت فروشگاه",
  });
};

const DashboardPage = () => {
  return <div></div>;
};

export default DashboardPage;
