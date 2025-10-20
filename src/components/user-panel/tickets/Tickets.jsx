"use client";
import React from "react";
import TicketTabs from "./TicketTabs";
import PaginationTickets from "./PaginationTickets";
import TicketItem from "./TicketItem";
import useSWR from "swr";
import { fetcher } from "@/lib/api/fetcher";

const Tickets = () => {
  const { data: ticketsResponse, isLoading } = useSWR(
    process.env.NEXT_PUBLIC_API_BASE_URL + "/user/ticket",
    fetcher
  );

  return (
    <div className="p-4 md:py-0 min-h-[calc(100vh-200px)] mt-5">
      {/* tickets container */}
      <div>
        {/* tickets card */}
        <div className="rounded-lg bg-white text-card-foreground shadow-[0px_25px_10px_0px_#5B5E6812] mx-0">
          <div className="p-6.5 pt-0 px-0 flex flex-1 flex-col min-h-[calc(100vh-350px)]">
            {/* tabs */}
            <TicketTabs />
            <div className="ring-offset-background focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0">
              <div className="text-right py-6 bg-gray-100/50">
                {/* tickets list */}
                {ticketsResponse?.tickets?.map((ticket) => (
                  <TicketItem key={ticket._id} ticket={ticket} />
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center py-4">
            <div>
              {/* pagination */}
              <PaginationTickets />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tickets;
