"use client";
import React from "react";
import { FiUser } from "react-icons/fi";
import { Chip } from "@heroui/react";
import Image from "next/image";
import { logger } from "@/lib/utils/logger";

const CommentItem = ({ comment, level = 0 }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(date);
  };

  logger.debug("CommentItem", comment);

  return (
    <div className="relative">
      {/* Border line for admin replies */}
      <div
        className={`mb-5 overflow-hidden rounded-lg ${
          level === 0 ? "border-[1px] border-[#E9EBF1]" : ""
        } p-[15px] last:mb-0 ${level > 0 ? "pr-8 md:pr-4" : ""}`}
      >
        <div>
          <div className="flex items-center justify-between gap-2.5">
            <div className="flex items-center gap-1.5 md:gap-2 flex-wrap">
              {/* user icon */}
              <div className="flex items-center justify-center h-[30px] w-[30px] rounded-full bg-[#f9fafc]">
                <FiUser className="w-4 h-4 text-gray-400" />
              </div>

              {/* user name */}
              <span className="transition duration-300 text-base leading-7 font-bold text-[#4D4A4A]">
                {comment.user?.fullName || "کاربر"}
              </span>
              {/* comment date */}
              <span className="transition duration-300 text-xs leading-7 pt-0.5 text-[#ADADAD] md:pt-0">
                {formatDate(comment.createdAt)}
              </span>
              {/* admin chip */}
              {comment.user?.role === "admin" && (
                <Chip
                  size="sm"
                  variant="flat"
                  className="bg-gradient-to-r from-[#FFC107] to-[#FF9737] text-white text-[10px] h-5 px-2"
                >
                  ژاکت
                </Chip>
              )}
            </div>
          </div>
          {/* comment text */}
          <p className="py-2 text-[14px] font-medium text-[#5B5C60] md:pb-[13px]">
            {comment.text}
          </p>
        </div>
        {/* Admin replies - only one level */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="flex gap- mt-4">
            <div className="border-r h-8 w-4 border-b rounded-br-lg ms-3 border-gray-200"></div>
            {comment.replies.map((reply) => (
              <CommentItem key={reply._id} comment={reply} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
