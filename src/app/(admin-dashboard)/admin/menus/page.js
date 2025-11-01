import MenusTableLogic from "@/components/admin/menus/MenusTableLogic";
import React from "react";

// generate metadata for the page
export const generateMetadata = () => {
  return {
    title: "مدیریت منوها",
    description: "مدیریت منوها",
  };
};

const MenusPage = () => {
  return (
    <div>
      <MenusTableLogic />
    </div>
  );
};

export default MenusPage;
