import SettingsLogic from "@/components/admin/settings/SettingsLogic";
import React from "react";

// generate metadata for the page
export const generateMetadata = () => {
  return {
    title: "تنظیمات سایت",
    description: "تنظیمات عمومی سایت",
  };
};

const SettingsPage = () => {
  return (
    <div>
      <SettingsLogic />
    </div>
  );
};

export default SettingsPage;

