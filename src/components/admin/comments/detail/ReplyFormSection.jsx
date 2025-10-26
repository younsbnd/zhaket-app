"use client";

import React from "react";
import AdminCommentReplyForm from "../AdminCommentReplyForm";

// reply form section 
const ReplyFormSection = ({ commentId, onSuccess }) => {
  return (
    <div className="p-4 md:p-6 bg-white/5 border-t border-white/10">
      <h2 className="text-lg font-bold text-white mb-4 text-start">
        پاسخ به این نظر
      </h2>
      <AdminCommentReplyForm commentId={commentId} onSuccess={onSuccess} />
    </div>
  );
};

export default ReplyFormSection;
