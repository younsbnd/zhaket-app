"use client";
import React from "react";
import { Chip } from "@heroui/react";
import AdminTable from "@/components/shared/AdminTable";
import { formatDate } from "@/lib/utils/formatDate";

const TicketsTable = ({
  tickets,
  isLoading,
  onOpenChange,
  isLoadingDelete,
  deleteId,
  setDeleteId,
}) => {
  // Get status config for ticket status
  const getStatusConfig = (status) => {
    switch (status) {
      case "OPEN":
        return { color: "success", text: "باز" };
      case "PENDING":
        return { color: "warning", text: "در انتظار پاسخ" };
      case "ANSWERED":
        return { color: "primary", text: "پاسخ داده شده" };
      case "CLOSED":
        return { color: "danger", text: "بسته شده" };
      default:
        return { color: "default", text: "نامشخص" };
    }
  };

  // Get report type text
  const getReportTypeText = (reportType) => {
    switch (reportType) {
      case "PRODUCT_SUPPORT":
        return "پشتیبانی محصول";
      case "BUY_PRODUCT":
        return "خرید محصول";
      case "OTHER_REPORT":
        return "سایر موارد";
      default:
        return "نامشخص";
    }
  };

  // Columns configuration
  const columns = [
    {
      key: "ticketNumber",
      header: "شماره تیکت",
      render: (ticket) => (
        <span className="font-medium text-white">{ticket.ticketNumber}</span>
      ),
    },
    {
      key: "title",
      header: "عنوان",
      render: (ticket) => (
        <span className="text-white/90 line-clamp-1">{ticket.title}</span>
      ),
    },
    {
      key: "user",
      header: "کاربر",
      render: (ticket) => (
        <div className="flex flex-col gap-1">
          <span className="text-white/90 text-sm">
            {ticket.user?.fullName || "نامشخص"}
          </span>
          {ticket.user?.email && (
            <span className="text-white/60 text-xs">{ticket.user.email}</span>
          )}
        </div>
      ),
    },
    {
      key: "reportType",
      header: "نوع درخواست",
      render: (ticket) => (
        <span className="text-white/80 text-sm">
          {getReportTypeText(ticket.reportType)}
        </span>
      ),
    },
    {
      key: "status",
      header: "وضعیت",
      render: (ticket) => {
        const statusConfig = getStatusConfig(ticket.status);
        return (
          <Chip
            color={statusConfig.color}
            variant="flat"
            radius="sm"
            size="sm"
            className="text-[14px] text-white"
          >
            {statusConfig.text}
          </Chip>
        );
      },
    },
    {
      key: "createdAt",
      header: "تاریخ ایجاد",
      render: (ticket) => (
        <span className="text-white/70 text-sm">
          {formatDate(ticket.createdAt)}
        </span>
      ),
    },
  ];

  return (
    <AdminTable
      data={tickets}
      columns={columns}
      editLinkPrefix="/admin/tickets"
      editButtonText="مشاهده"
      onDelete={onOpenChange}
      deleteId={deleteId}
      setDeleteId={setDeleteId}
      isLoadingDelete={isLoadingDelete}
      emptyMessage="تیکتی وجود ندارد"
      tableId="tickets-table"
    />
  );
};

export default TicketsTable;

