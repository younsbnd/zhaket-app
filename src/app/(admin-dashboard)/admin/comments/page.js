import CommentsTableLogic from "@/components/admin/comments/table/CommentsTableLogic";
import React from "react";

// generate metadata for the page
export const generateMetadata = () => {
  return {
    title: "مدیریت نظرات",
    description: "مدیریت نظرات کاربران",
  };
};

const CommentsPage = () => {
  return (
    <div>
      <CommentsTableLogic />
    </div>
  );
};

export default CommentsPage;

