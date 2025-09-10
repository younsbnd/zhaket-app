import React from "react";
import FilesTableLogic from "@/components/admin/files/table/FilesTableLogic";

// generate metadata
export const generateMetadata = () => {
  return {
    title: "فایل ها",
    description: "فایل ها",
  };
};

const FilesPage = () => {
  return (
    <div>
      <FilesTableLogic />
    </div>
  );
};

export default FilesPage;
