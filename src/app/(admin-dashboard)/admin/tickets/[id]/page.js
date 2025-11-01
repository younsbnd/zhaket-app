import AdminTicketDetail from "@/components/admin/tickets/AdminTicketDetail";
import React from "react";

// Generate metadata for the page
export const generateMetadata = () => {
  return {
    title: "جزئیات تیکت",
    description: "مشاهده و پاسخ به تیکت کاربر",
  };
};

const AdminTicketDetailPage = () => {
  return (
    <div>
      <AdminTicketDetail />
    </div>
  );
};

export default AdminTicketDetailPage;

