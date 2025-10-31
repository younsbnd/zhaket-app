"use client";
import React from "react";
import Link from "next/link";
import { formatDate } from "@/lib/utils/formatDate";
import { FaArrowLeftLong } from "react-icons/fa6";

const DashboardTicketItem = ({ ticket }) => {
  // status badge color based on ticket status
  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-500";
      case "ANSWERED":
        return "bg-green-500";
      case "CLOSED":
        return "bg-gray-500";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <div className="flex items-center justify-between gap-3 p-3 hover:bg-gray-50 transition-all duration-200 rounded-lg border-b border-gray-100 last:border-b-0">
      <div className="flex gap-3 flex-1">
        <div className={`w-1 rounded-md self-stretch ${getStatusColor(ticket?.status)}`}></div>
        <div className="flex flex-col gap-2 flex-1">
          {/* ticket title */}
          <Link href={`/panel/tickets/${ticket?._id}`}>
            <p className="text-sm font-bold text-gray-800 leading-5 hover:text-orange-400 transition-all line-clamp-1">
              {ticket?.title}
            </p>
          </Link>
          {/* ticket date */}
          <div className="flex items-center gap-2">
            <span className="bg-gray-200 w-1.5 h-1.5 rounded-full inline-block"></span>
            <p className="text-xs text-gray-500">
              {formatDate(ticket?.createdAt)}
            </p>
          </div>
        </div>
      </div>
      {/* go to ticket detail page */}
      <Link
        href={`/panel/tickets/${ticket?._id}`}
        className="flex items-center justify-center"
      >
        <FaArrowLeftLong className="w-4 h-4 text-gray-400 hover:text-gray-500 transition-all duration-300" />
      </Link>
    </div>
  );
};

export default DashboardTicketItem;

