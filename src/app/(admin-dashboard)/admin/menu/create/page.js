 
 import CreateMenuLogic from "@/components/admin/menu/create/CreateMenuLogic";
import React from "react";
 
// generate metadata for the page
export const generateMetadata = () => {
    return {
        title: "ساخت منو جدید",
        description: "ساخت منو جدید",
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