import CommentDetailLogic from "@/components/admin/comments/CommentDetailLogic";
import React from "react";

// generate metadata for the page
export const generateMetadata = () => {
  return {
    title: "جزئیات نظر",
    description: "جزئیات و پاسخ به نظر",
  };
};

const CommentDetailPage = () => {
  return (
    <div>
      <CommentDetailLogic />
    </div>
  );
};

export default CommentDetailPage;

