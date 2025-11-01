import EditMenuLogic from "@/components/admin/menus/edit/EditMenuLogic";
import React from "react";

// generate metadata for the page
export const generateMetadata = () => {
  return {
    title: "ویرایش منو",
    description: "ویرایش منو",
  };
};

const EditMenuPage = ({ params }) => {
  return (
    <div>
      <EditMenuLogic id={params.id} />
    </div>
  );
};

export default EditMenuPage;

