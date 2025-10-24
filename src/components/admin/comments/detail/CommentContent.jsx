"use client";

import React from "react";
import { FiUser } from "react-icons/fi";
import { formatDate } from "@/lib/utils/formatDate";

const CommentContent = ({ comment }) => {
  return (
    <div className="p-4 md:p-6 bg-black/20">
      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
        {/* User Info */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white/10">
            <FiUser className="w-5 h-5 text-white/60" />
          </div>

          {/* user info */}
          <div>
            <p className="text-white font-semibold">
              {comment.user?.fullName || "کاربر"}
            </p>
            <p className="text-white/60 text-xs">
              {comment.user?.email || comment.user?.phoneNumber}
            </p>
          </div>
          {/* comment date */}
          <div className="mr-auto text-left">
            <p className="text-white/60 text-xs">
              {formatDate(comment.createdAt)}
            </p>
          </div>
        </div>

        {/* Parent Comment Reference */}
        {comment.parentComment && (
          <div className="mb-3 p-3 bg-white/5 rounded border-r-4 border-blue-500">
            <p className="text-white/60 text-xs mb-1">
              در پاسخ به نظر {comment.parentComment.user?.fullName}:
            </p>
            <p className="text-white/80 text-sm line-clamp-2">
              {comment.parentComment.text}
            </p>
          </div>
        )}

        {/* Comment Text */}
        <p className="text-white/90 text-base leading-7 text-start">
          {comment.text}
        </p>
      </div>
    </div>
  );
};

export default CommentContent;
