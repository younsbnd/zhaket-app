import Tickets from "@/components/user-panel/tickets/Tickets";
import { metadata } from "@/lib/seo/metadata";
import React from "react";

// generate metadata for seo the page
export const generateMetadata = () => {
  return metadata({
    title: "  فهرست تیکت ها",
    description: "تیکت ها",
    noindex: true,
  });
};

const TicketsPage = () => {
  return (
    <div>
      <Tickets />
    </div>
  );
};

export default TicketsPage;
