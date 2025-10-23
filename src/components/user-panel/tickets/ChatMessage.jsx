import React from "react";
import { formatDate } from "@/lib/utils/formatDate";
import { FaUserCircle } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import Image from "next/image";
import { logger } from "@/lib/utils/logger";

const ChatMessage = ({ reply, isCurrentUser }) => {
  const isAdmin = reply?.user?.role === "admin";
  logger.debug("ChatMessage", { reply, isCurrentUser });

  return (
    <div
      className={`flex ${
        isCurrentUser ? "justify-start" : "justify-end"
      } mb-4 md:mb-6 animate-fadeIn`}
    >
      <div
        className={`flex ${
          isCurrentUser ? "flex-row-reverse" : "flex-row"
        } items-end gap-2 md:gap-3 max-w-[85%] md:max-w-[70%]`}
      >
        {/* Message Content */}
        <div className="flex flex-col gap-1 md:gap-1.5 max-w-full">
          {/* Header: Name and Date */}

          <div className={`flex items-center gap-2 flex-row`}>
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div
                className={`w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center ${
                  isAdmin
                    ? "bg-gradient-to-br from-blue-500 to-blue-600"
                    : "bg-gradient-to-br from-gray-400 to-gray-500"
                }`}
              >
                {isAdmin ? (
                  <RiAdminFill className="text-white text-sm md:text-lg" />
                ) : (
                  <FaUserCircle className="text-white text-sm md:text-lg" />
                )}
              </div>
            </div>
            {/* User Name */}
            <span
              className={`text-xs md:text-sm font-semibold ${
                isAdmin ? "text-blue-600" : "text-gray-600"
              }`}
            >
              {reply?.user?.fullName || "کاربر"}
            </span>

            {/* Date */}
            <span className="text-[10px] md:text-xs text-gray-400">
              {formatDate(reply?.createdAt)}
            </span>
          </div>

          {/* Message Bubble */}
          <div
            className={`rounded-2xl px-4 py-3 md:px-5 md:py-3.5 shadow-sm ${
              isCurrentUser
                ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-tr-sm"
                : isAdmin
                  ? "bg-gradient-to-br from-green-50 to-green-100 text-gray-800 border border-green-200 rounded-tr-sm"
                  : "bg-gray-100 text-gray-800 border border-gray-200 rounded-bl-sm"
            }`}
          >
            <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap break-words text-right">
              {reply?.message}
            </p>
          </div>

          {/* Admin Badge */}
          {isAdmin && !isCurrentUser && (
            <div className="flex items-center gap-1 mr-2">
              <span className="text-[10px] md:text-xs text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                پاسخ پشتیبانی
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
