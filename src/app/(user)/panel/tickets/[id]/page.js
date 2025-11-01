import TicketDetail from "@/components/user-panel/tickets/TicketDetail";
import { metadata } from "@/lib/seo/metadata";
import React from "react";

// generate metadata for seo the page
export const generateMetadata = () => {
  return metadata({
    title: "جزئیات تیکت",
    description: "مشاهده و پاسخ به تیکت پشتیبانی",
    noindex: true,
  });
};

const TicketDetailPage = () => {
  return (
    <div>
      <TicketDetail />
    </div>
  );
};

export default TicketDetailPage;
