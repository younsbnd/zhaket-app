import { formatDate } from "@/lib/utils/formatDate";
import Link from "next/link";
import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

const TicketItem = ({ ticket }) => {
  return (
    <div>
      <section className="bg-white mx-6 my-4 rounded-lg border border-gray-200/85 p-4 flex flex-row justify-between items-center gap-4">
        <div className="flex gap-3">
          <div className="bg-gray-500 w-1 rounded-md self-stretch"></div>
          <div className="flex flex-col gap-3 flex-1">
            {/* ticket title */}
            <div className="flex">
              <Link href={`/panel/tickets/${ticket?._id}`}>
                <p className="text-[17px] font-bold text-gray-800 leading-6 tracking-tight">
                  {ticket?.title}
                </p>
              </Link>
            </div>
            {/* ticket date and number */}
            <div className="flex items-center gap-2">
              {/* ticket date */}
              <span className="bg-gray-200 w-1.5 h-1.5 rounded-full inline-block"></span>
              <p className="text-xs text-gray-500">
                {formatDate(ticket?.createdAt)}
              </p>
              <span className="text-gray-300">|</span>
              {/* ticket number */}
              <p className="text-xs font-medium text-gray-600">
                شماره تیکت : <span>{ticket?.ticketNumber}</span>
              </p>
            </div>
          </div>
        </div>
        {/* go to ticket detail page */}
        <div>
          <Link
            href={`/panel/tickets/${ticket?._id}`}
            className="flex items-center justify-center"
          >
            <FaArrowLeftLong className="w-5 h-5 text-gray-400 hover:text-gray-500 transition-all duration-300" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default TicketItem;
