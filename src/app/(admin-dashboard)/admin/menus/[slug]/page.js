import MenuItemsLogic from "@/components/admin/menus/items/MenuItemsLogic";
import React from "react";

// generate metadata for the page
export const generateMetadata = ({ params }) => {
  return {
    title: `مدیریت آیتم‌های منو`,
    description: "مدیریت آیتم‌های منو",
  };
};

const MenuItemsPage = () => {
  return (
    <div>
      <MenuItemsLogic />
    </div>
  );
};

export default MenuItemsPage;

