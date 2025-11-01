import CreateMenuLogic from "@/components/admin/menus/create/CreateMenuLogic";
import React from "react";

// generate metadata for the page
export const generateMetadata = () => {
  return {
    title: "ایجاد منو",
    description: "ایجاد منو جدید",
  };
};

const CreateMenuPage = () => {
  return (
    <div>
      <CreateMenuLogic />
    </div>
  );
};

export default CreateMenuPage;

