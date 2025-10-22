"use client";

import React, { useEffect, useRef } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/api/fetcher";
import ReplyFormLogic from "./ReplyFormLogic";
import { useSession } from "next-auth/react";
import { Card, CardBody } from "@heroui/react";
import { useParams } from "next/navigation";
import TicketDetailSkeleton from "@/components/skeletons/user-panel/TicketDetailSkeleton";
import TicketHeader from "./ticket-detail/TicketHeader";
import EmptyMessages from "./ticket-detail/EmptyMessages";
import MessagesList from "./ticket-detail/MessagesList";
import Link from "next/link";
import { RiFileWarningLine } from "react-icons/ri";

const TicketDetail = () => {
  const { data: session } = useSession();
  const messagesEndRef = useRef(null);
  const params = useParams();
  const { id: ticketId } = params;

  // fetch ticket data
  const { data, isLoading, error } = useSWR(
    ticketId
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/ticket/${ticketId}`
      : null,
    fetcher,
    {
      refreshInterval: 10000,
    }
  );

  const ticket = data?.ticket;
  const replies = data?.replies || [];

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [replies]);

  // if loading, show a skeleton
  if (isLoading) {
    return <TicketDetailSkeleton />;
  }

  // if error or ticket not found, show a message
  if (error || !ticket) {
    return (
      <div className="p-4 md:py-0 min-h-[calc(100vh-200px)] mt-5">
        <Card className="shadow-[0px_25px_10px_0px_#5B5E6812]">
          <CardBody className="p-6 md:p-8">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center space-y-3">
                <RiFileWarningLine className="w-16 h-16 md:w-20 md:h-20 text-red-300 mx-auto" />
                <p className="text-gray-600 text-sm md:text-base font-semibold">
                  تیکت مورد نظر یافت نشد
                </p>
                <Link
                  href="/panel/tickets"
                  className="text-amber-700 hover:text-amber-800 transition duration-300 text-sm md:text-base bg-amber-50 px-4 py-2 rounded-md hover:bg-amber-100"
                >
                  بازگشت به لیست تیکت‌ها
                </Link>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 md:py-0 min-h-[calc(100vh-200px)] mt-5">
      <Card className="shadow-[0px_25px_10px_0px_#5B5E6812]">
        <CardBody className="p-0">
          {/* Ticket Header */}
          <TicketHeader ticket={ticket} />

          {/* Messages Container */}
          <div className="p-4 md:p-6 bg-gray-50/50 min-h-[500px] max-h-[calc(100vh-400px)] overflow-y-auto">
            {replies.length === 0 ? (
              <EmptyMessages />
            ) : (
              <MessagesList
                replies={replies}
                currentUserId={session?.user?.id}
              />
            )}
          </div>

          {/* Reply Form */}
          <div className="p-4 md:p-6 bg-white border-t border-gray-200">
            <ReplyFormLogic ticketId={ticketId} ticketStatus={ticket.status} />
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default TicketDetail;
