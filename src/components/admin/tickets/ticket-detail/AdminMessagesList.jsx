"use client";

import React, { useRef, useEffect } from "react";
import { formatDate } from "@/lib/utils/formatDate";
import { FaUserCircle } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";

const AdminMessagesList = ({ replies }) => {
  const endRef = useRef(null);

  // scroll to the bottom of the list when the list is updated
  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [replies]);

  return (
    <div className="space-y-4">
      {/* map through the replies and show the reply */}
      {replies.map((reply) => {
        const isAdmin = reply.user?.role === "admin";
        return (
          <div
            key={reply._id}
            className={`flex ${
              isAdmin ? "justify-start" : "justify-end"
            } mb-4 md:mb-6 animate-fadeIn`}
          >
            <div
              className={`flex ${
                isAdmin ? "flex-row-reverse" : "flex-row"
              } items-end gap-2 md:gap-3 max-w-[85%] md:max-w-[70%]`}
            >
              {/* Message Content */}
              <div className="flex flex-col gap-1 md:gap-1.5 max-w-full">
                {/* Header: Name and Date */}
                <div
                  className="flex items-center gap-2 
                    flex-row"
                >
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
                    className={`text-xs md:text-sm font-semibold text-white/90`}
                  >
                    {reply?.user?.fullName || "کاربر"}
                  </span>

                  {/* Date */}
                  <span className="text-[10px] md:text-xs text-white/60">
                    {formatDate(reply?.createdAt)}
                  </span>
                </div>

                {/* Message Bubble */}
                <div
                  className={`rounded-2xl px-4 py-3 md:px-5 md:py-3.5 shadow-sm ${
                    isAdmin
                      ? "bg-gradient-to-l from-blue-600 to-indigo-700 text-white rounded-tr-sm"
                      : "bg-white/10 text-white rounded-tr-sm"
                  }`}
                >
                  <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap break-words text-right">
                    {reply?.message}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div ref={endRef} />
    </div>
  );
};

export default AdminMessagesList;
