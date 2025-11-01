import TicketsTableLogic from "@/components/admin/tickets/TicketsTableLogic";
import React from "react";

// Generate metadata for the page
export const generateMetadata = () => {
  return {
    title: "تیکت‌ها",
    description: "مدیریت تیکت‌های کاربران",
  };
};

const TicketsPage = () => {
  return (
    <div>
      <TicketsTableLogic />
    </div>
  );
};

export default TicketsPage;