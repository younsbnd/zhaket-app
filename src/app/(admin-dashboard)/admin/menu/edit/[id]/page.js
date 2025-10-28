import EditMenuLogic from "@/components/admin/menu/edit/EditMenuLogic";
import React from "react";

export const generateMetadata = () => {
  return {
    title: "ویرایش منو",
    description: "ویرایش منو",
  };
};

const EditMenuPage = () => {
  return (
    <div>
      <EditMenuLogic />
    </div>
  );
};

export default EditMenuPage;
