import EditFileLogic from "@/components/admin/files/edit/EditFileLogic";
import React from "react";

// generate metadata for the page
export const generateMetadata = () => {
  return {
    title: "ویرایش فایل",
    description: "ویرایش فایل",
  };
};

const EditFilePage = () => {
  return (
    <div>
      <EditFileLogic />
    </div>
  );
};

export default EditFilePage;
