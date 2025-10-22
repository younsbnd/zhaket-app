"use client";
import { TICKETS_TABS } from "@/constants/main/user/tickets/tabsNavigation";
import { Button } from "@heroui/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { FaRegSquarePlus } from "react-icons/fa6";

const TicketTabs = ({ counts = {} }) => {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const [activeTab, setActiveTab] = useState(status || "open");

  // keep active tab in sync with URL
  useEffect(() => {
    if (status) {
      setActiveTab(status);
    }
  }, [status]);

  // get tabs with counts
  const tabsWithCounts = useMemo(() => {
    return TICKETS_TABS.map((tab) => ({
      ...tab,
      count:
        tab.id === "open"
          ? (counts.open ?? tab.count)
          : tab.id === "in_progress"
            ? (counts.in_progress ?? tab.count)
            : tab.id === "answered"
              ? (counts.answered ?? tab.count)
              : tab.id === "closed"
                ? (counts.closed ?? tab.count)
                : tab.count,
    }));
  }, [counts]);

  return (
    <div className="flex flex-row justify-between items-center border-b border-gray-200 md:py-6 py-3.5 px-6">
      <div className="h-14 items-center rounded-md p-1 text-muted-foreground flex flex-1 flex-row md:gap-6.5 gap-1 md:justify-start justify-between bg-white">
        {/* Tabs */}
        {tabsWithCounts.map((tab) => (
          <Link
            href={`/panel/tickets?status=${tab.id}`}
            key={tab.id}
            className={`inline-flex md:flex-row flex-col justify-center whitespace-nowrap text-gray-400 md:text-normal text-xs font-medium transition-all border-b-2 border-transparent gap-2 items-center md:h-[104px] h-[86px] hover:text-gray-800/90 cursor-pointer ${activeTab == tab.id ? "!border-orange-400 text-gray-800/90" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {/* Tab Icon */}
            <div className="relative">
              <div
                className={`inline-flex items-center rounded-full !text-11 font-semibold transition-colors justify-center px-1 py-1 border-[1.5px] border-white absolute top-[-2px] right-[-4px] ${tab.bgColor}`}
              ></div>
              <tab.icon className="w-6 h-6" />
            </div>
            {/* Tab Label and Count */}
            <div className="md:gap-3 gap-1 flex flex-row md:min-w-16 text-sm font-bold items-center">
              {tab.label}
              <div
                className={`lg:inline-flex items-center border px-3 py-1.5 !text-11 transition-colors justify-center border-transparent max-w-2 h-6 font-yekan-bakh-faNum text-xs font-bold rounded-md hidden ${tab.color} ${tab.textColor}`}
              >
                {tab.count}
              </div>
            </div>
          </Link>
        ))}
      </div>
      {/* Add Ticket Button */}
      <Link
        href="/panel/tickets/new"
        className="items-center justify-center transition-all duration-300 whitespace-nowrap rounded-md leading-5 hover:text-white bg-blue-50 text-blue-500 hover:bg-blue-500 font-bold md:flex h-[44px] px-5 gap-1.5 text-[13px] hidden "
      >
        <FaRegSquarePlus className="w-4 h-4" />
        افزود تیکت
      </Link>
    </div>
  );
};

export default TicketTabs;
