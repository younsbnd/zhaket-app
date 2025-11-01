import React from "react";
import NewTicket from "@/components/user-panel/tickets/new-ticket/NewTicket";
import { metadata } from "@/lib/seo/metadata";

// generate metadata for seo the page
export const generateMetadata = () => {
  return metadata({
    title: "ثبت تیکت جدید",
    description: "ثبت تیکت جدید",
    noindex: true,
  });
};

const NewTicketPage = () => {
  return (
    <div>
      <NewTicket />
    </div>
  );
};

export default NewTicketPage;
