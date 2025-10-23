"use client";

import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/api/fetcher";
import { useSession } from "next-auth/react";
import { Card, CardBody, addToast } from "@heroui/react";
import { useParams } from "next/navigation";
import Link from "next/link";
import AdminReplyForm from "./AdminReplyForm";
import AdminTicketDetailSkeleton from "@/components/skeletons/admin/AdminTicketDetailSkeleton";
import AdminStatusControls from "./ticket-detail/AdminStatusControls";
import AdminTicketHeader from "./ticket-detail/AdminTicketHeader";
import AdminEmptyMessages from "./ticket-detail/AdminEmptyMessages";
import AdminMessagesList from "./ticket-detail/AdminMessagesList";
import { useCrud } from "@/hooks/useCrud";
import { FiAlertTriangle } from "react-icons/fi";

const AdminTicketDetail = () => {
  const { data: session } = useSession();
  const params = useParams();
  const { id: ticketId } = params;
  const [selectedStatus, setSelectedStatus] = useState("");
  const { updateRecord, isLoading: isUpdating } = useCrud("/admin/tickets");

  // Fetch ticket data
  const { data, isLoading, error, mutate } = useSWR(
    ticketId
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/tickets/${ticketId}`
      : null,
    fetcher,
    {
      refreshInterval: 5000,
    }
  );

  const ticket = data?.ticket;
  const replies = data?.replies || [];

  // Set initial status
  useEffect(() => {
    if (ticket?.status) {
      setSelectedStatus(ticket.status);
    }
  }, [ticket]);

  // Handle status change
  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setSelectedStatus(newStatus);

    try {
      const response = await updateRecord(ticketId, { status: newStatus });
      if (response.ok) {
        addToast({
          description: "وضعیت تیکت با موفقیت تغییر یافت",
          color: "success",
          shouldShowTimeoutProgress: true,
        });
        mutate();
      } else {
        throw new Error("خطا در تغییر وضعیت");
      }
    } catch (error) {
      // show error toast
      addToast({
        description: "خطا در تغییر وضعیت تیکت",
        color: "danger",
        shouldShowTimeoutProgress: true,
      });
      setSelectedStatus(ticket.status);
    }
  };

  // If loading, show a skeleton
  if (isLoading) {
    return <AdminTicketDetailSkeleton />;
  }

  // If error or ticket not found, show a message
  if (error || !ticket) {
    return (
      <div className="text-slate-100 min-h-screen selection:bg-blue-600/30">
        <div className="mx-auto w-full max-w-7xl px-6 py-10">
          <Card className="glass">
            <CardBody className="p-6 md:p-8">
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center space-y-3">
                 <FiAlertTriangle className="w-16 h-16 md:w-20 md:h-20 text-red-300 mx-auto" />
                  <p className="text-white text-sm md:text-base font-semibold">
                    تیکت مورد نظر یافت نشد
                  </p>
                  <Link
                    href="/admin/tickets"
                    className="text-white text-sm md:text-base bg-gradient-to-l from-blue-600 to-indigo-700 px-4 py-2 rounded-md"
                  >
                    بازگشت به لیست تیکت‌ها
                  </Link>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }

  // if ticket is found, show the ticket detail
  return (
    <div className="text-slate-100 min-h-screen selection:bg-blue-600/30">
      <div className="mx-auto w-full max-w-7xl px-6 py-10">
        <Card className="glass">
          <CardBody className="p-0">
            {/* Ticket Header */}
            <AdminTicketHeader ticket={ticket} />
            <div className="px-4 md:px-6 pb-4">
              <AdminStatusControls
                status={ticket.status}
                selectedStatus={selectedStatus}
                onChange={handleStatusChange}
              />
            </div>

            {/* Messages Container */}
            <div className="p-4 md:p-6 bg-black/20 min-h-[500px] max-h-[calc(100vh-400px)] overflow-y-auto">
              {replies.length === 0 ? (
                <AdminEmptyMessages />
              ) : (
                <AdminMessagesList replies={replies} />
              )}
            </div>

            {/* Reply Form */}
            <div className="p-4 md:p-6 bg-white/5 border-t border-white/10">
              <AdminReplyForm ticketId={ticketId} ticketStatus={ticket.status} onSuccess={mutate} />
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default AdminTicketDetail;

