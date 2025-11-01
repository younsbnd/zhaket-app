import React from "react";
import Link from "next/link";
import { FiClock, FiTag, FiPackage } from "react-icons/fi";
import { formatDate } from "@/lib/utils/formatDate";
import StatusBadge from "./StatusBadge";

const TicketHeader = ({ ticket }) => {
  return (
    <div className="bg-white p-4 md:p-6 border-b border-gray-200">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-2 md:space-y-3">
            {/* ticket title */}
          <h1 className="text-lg md:text-2xl font-bold text-gray-800 text-right">
            {ticket.title}
          </h1>
          {/* ticket info */}
          <div className="flex flex-wrap items-center gap-2 md:gap-3 text-xs md:text-sm text-gray-600">
            {/* ticket number */}
            <div className="flex items-center gap-1.5">
              <FiTag className="text-gray-400" />
              <span>شماره تیکت: {ticket.ticketNumber}</span>
            </div>
            {/* ticket date and hour */}
            <span className="text-gray-300">|</span>
            <div className="flex items-center gap-1.5">
              <FiClock className="text-gray-400" />
              <span>{formatDate(ticket.createdAt)}</span>
            </div>
            {/* ticket product link */}
            {ticket.product && (
              <>
                <span className="text-gray-300">|</span>
                <div className="flex items-center gap-1.5">
                  <FiPackage className="text-gray-400" />
                  <Link
                    href={`/product/${ticket.product.slug}`}
                    className="text-blue-600 hover:text-blue-700 underline"
                  >
                    {ticket.product.title}
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={ticket.status} />
        </div>
      </div>
    </div>
  );
};

export default TicketHeader;


