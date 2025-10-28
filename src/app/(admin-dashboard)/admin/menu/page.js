 
 import TableMenuLogic from "@/components/admin/menu/table/TableMenuLogic";
import React from "react";

// generate metadata for the page
export const generateMetadata = () => {
    return {
        title: "منوها",
        description: "منوها",
    };
};

  const MenuPage = () => {
        return (
        <div>
            <TableMenuLogic />
        </div>
    );
 };
 export default MenuPage;