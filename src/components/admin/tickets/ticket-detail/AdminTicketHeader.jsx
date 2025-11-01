"use client";

import React from "react";
import Link from "next/link";
import {
  FiClock,
  FiTag,
  FiPackage,
  FiUser,
  FiMail,
  FiPhone,
} from "react-icons/fi";
import { formatDate } from "@/lib/utils/formatDate";
import { Divider } from "@heroui/react";

const AdminTicketHeader = ({ ticket }) => {
  return (
    <div className="p-4 md:p-6 border-b border-white/10">
      {/* User Information */}
      <div className="mb-6 p-4 bg-white/5 rounded-lg text-right">
        <h3 className="text-lg font-semibold text-white mb-3">اطلاعات کاربر</h3>
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2 text-white/80">
            <FiUser className="text-blue-400" />
            <span>{ticket.user?.fullName || "نامشخص"}</span>
          </div>
          <Divider orientation="vertical" className="min-h-5 bg-white/10" />
          {ticket.user?.phoneNumber ? (
            <div className="flex items-center gap-2 text-white/80">
              <FiPhone className="text-blue-400" />
              <span>{ticket.user.phoneNumber}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-white/80">
              <FiMail className="text-blue-400" />
              <span>{ticket.user.email}</span>
            </div>
          )}
        </div>
      </div>

      {/* Ticket Information */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 text-right">
        <div className="space-y-2 md:space-y-5 flex-1">
          <h1 className="text-lg md:text-xl font-bold text-white">
            {ticket.title}
          </h1>
          <div className="flex flex-wrap items-center gap-2 md:gap-3 text-xs md:text-sm text-white/70">
            {/* ticket number */}
            <div className="flex items-center gap-1.5">
              <FiTag className="text-white/50" />
              <span>شماره تیکت: {ticket.ticketNumber}</span>
            </div>
            <span className="text-white/30">|</span>
            {/* ticket creation date */}
            <div className="flex items-center gap-1.5">
              <FiClock className="text-white/50" />
              <span>{formatDate(ticket.createdAt)}</span>
            </div>
            {ticket.product && (
              <>
                <span className="text-white/30">|</span>
                <div className="flex items-center gap-1.5">
                  <FiPackage className="text-white/50" />
                  <Link
                    href={`/product/${ticket.product.slug}`}
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    {ticket.product.title}
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTicketHeader;
