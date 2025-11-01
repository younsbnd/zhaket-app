import React from "react";

// status badge for tickets in ticket detail page
const StatusBadge = ({ status }) => {
  const statusConfig = {
    OPEN: {
      text: "باز",
      color: "bg-green-100 text-green-700 border-green-200",
    },
    PENDING: {
      text: "در انتظار پاسخ",
      color: "bg-yellow-100 text-yellow-700 border-yellow-200",
    },
    ANSWERED: {
      text: "پاسخ داده شده",
      color: "bg-blue-100 text-blue-700 border-blue-200",
    },
    CLOSED: {
      text: "بسته شده",
      color: "bg-red-100 text-red-700 border-red-200",
    },
  };

  const config = statusConfig[status] || statusConfig.OPEN;

  return (
    <span
      className={`text-xs md:text-sm font-semibold px-3 py-1 rounded-full border ${config.color}`}
    >
      {config.text}
    </span>
  );
};

export default StatusBadge;
