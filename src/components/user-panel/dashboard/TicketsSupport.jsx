"use client";
import React from "react";
import Link from "next/link";
import { HiOutlineTicket } from "react-icons/hi2";
import { FaRegSquarePlus } from "react-icons/fa6";
import useSWR from "swr";
import { fetcher } from "@/lib/api/fetcher";
import DashboardTicketItem from "./DashboardTicketItem";

const TicketsSupport = () => {
  // fetch only first page to get recent tickets
  const { data: ticketsResponse, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/ticket?page=1`,
    fetcher
  );

  // get only first 3 tickets
  const tickets = ticketsResponse?.tickets?.slice(0, 3) || [];

  return (
    <div className="shadow-[0px_25px_10px_0px_#5B5E6812] bg-white rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        {/* title and icon */}
        <div className="flex items-center gap-2">
          <HiOutlineTicket className="w-8 h-8 text-orange-300" />
          <p className="font-bold">تیکت و پشتیبانی</p>
        </div>
        {/* add ticket and view all tickets */}
        <div className="flex items-center gap-2">
          <Link
            href="/panel/tickets/new"
            className="text-blue-500 transition-all duration-300 flex items-center gap-1 text-xs hover:bg-blue-400 hover:text-white rounded-md px-2 py-[10px]"
          >
            <FaRegSquarePlus className="w-4 h-4" />
            افزودن تیکت
          </Link>
          <Link
            className="bg-orange-100/80 text-amber-500 rounded-lg hover:bg-amber-500 hover:text-white transition-all duration-300 h-fit px-4 py-2 text-sm"
            href="/panel/tickets"
          >
            مشاهده همه
          </Link>
        </div>
      </div>
      {/* tickets list */}
      <div className="min-h-[150px]">
        {/* show loading skeleton while tickets are loading */}
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-400"></div>
          </div>
        ) : tickets.length > 0 ? (
          <div className="space-y-1">
            {/* map tickets */}
            {tickets.map((ticket) => (
              <DashboardTicketItem key={ticket._id} ticket={ticket} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-32">
            <p className="text-gray-400 text-sm">هنوز تیکتی ثبت نکرده‌اید</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketsSupport;
