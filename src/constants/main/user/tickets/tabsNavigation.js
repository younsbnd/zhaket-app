import { LuTickets, LuTicketCheck, LuTicket, LuTicketX } from "react-icons/lu";

// tabs navigation for tickets
export const TICKETS_TABS = [
  {
    id: "open",
    label: "تیکت باز",
    icon: LuTicket,
    count: 0,
    color: "bg-pink-50",
    bgColor: "bg-pink-500",
    textColor: "text-pink-500",
  },
  {
    id: "in_progress",
    label: "درحال بررسی",
    icon: LuTickets,
    count: 0,
    color: "bg-blue-50",
    bgColor: "bg-blue-400",
    textColor: "text-blue-500",
  },
  {
    id: "answered",
    label: "پاسخ داده شده",
    icon: LuTicketCheck,
    count: 0,
    color: "bg-green-50",
    bgColor: "bg-green-400",
    textColor: "text-green-500",
  },
  {
    id: "closed",
    label: "بسته‌ شده",
    icon: LuTicketX,
    count: 16,
    color: "bg-gray-50",
    bgColor: "bg-gray-400",
    textColor: "text-gray-500",
  },
];
