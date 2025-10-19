import CreateFileLogic from "@/components/admin/files/create/CreateFileLogic";
import React from "react";

// generate metadata for the page
export const generateMetadata = () => {
  return {
    title: "ایجاد فایل",
    description: "ایجاد فایل جدید",
  };
};

const CreateFilePage = () => {
  return (
    <div>
      <CreateFileLogic />
    </div>
  );
};

export default CreateFilePage;
