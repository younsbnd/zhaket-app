"use client";

import React, { useState, useMemo } from "react";
import useSWR from "swr";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Skeleton,
} from "@heroui/react";
import { TbCategory } from "react-icons/tb";
import { FaChevronDown } from "react-icons/fa";
import Link from "next/link";
import { fetcher } from "@/lib/api/fetcher";
import Image from "next/image";

// get safe url (if url is not valid, return #)
const getSafeUrl = (url) => {
  if (!url || url === "#") return "#";
  if (url.startsWith("/") || url.startsWith("http")) return url;
  return `/${url}`;
};

// chunk array to chunks of size
const chunkArray = (array, size) => {
  const chunked = [];
  if (!array) return chunked;
  let index = 0;
  while (index < array.length) {
    chunked.push(array.slice(index, size + index));
    index += size;
  }
  return chunked;
};

// mega menu component
export default function MegaMenu() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [activeTabId, setActiveTabId] = useState(null);

  // fetch menu data
  const { data: menuData, error } = useSWR("/api/menus/mega-menu", fetcher, {
    onSuccess: (data) => {
      if (data && data.items && data.items.length > 0 && !activeTabId) {
        setActiveTabId(data.items[0]._id);
      }
    },
  });

  // get active item
  const activeItem = useMemo(() => {
    if (!menuData || !activeTabId) return null;
    return menuData.items.find((item) => item._id === activeTabId);
  }, [menuData, activeTabId]);

  // get columns
  const columns = useMemo(() => {
    if (!activeItem || !activeItem.children) return [];
    return chunkArray(activeItem.children, 10);
  }, [activeItem]);

  // show loading if menu data is loading
  if (error) return null;
  if (!menuData) return <Skeleton className="w-24 h-4 rounded-md" />;

  const { menu, items } = menuData;

  if (!items || items.length === 0) return null;

  return (
    <div
      onMouseEnter={() => setIsPopoverOpen(true)}
      onMouseLeave={() => setIsPopoverOpen(false)}
      onFocus={() => setIsPopoverOpen(true)}
      onBlur={() => setIsPopoverOpen(false)}
      tabIndex={0}
      className="outline-none"
    >
      <Popover
        placement="bottom-end"
        showArrow
        offset={8}
        isOpen={isPopoverOpen}
        onOpenChange={setIsPopoverOpen}
        trigger="manual"
      >
        {/* popover trigger */}
        <PopoverTrigger>
          <Button className="flex items-center gap-[9px] font-bold text-[15px] text-[#424244] hover:text-[#FF9606] bg-transparent p-0 h-auto">
            <TbCategory color="#FF9606" size={20} />
            <span className="hover:text-[#FF9606]">دسته بندی ها</span>
            <FaChevronDown color="#FF9606" />
          </Button>
        </PopoverTrigger>

        {/* popover content */}
        <PopoverContent className="p-[5px] w-[95vw] max-w-[1200px] rounded-[10px] bg-white shadow-[0px_20px_60px_-15px_rgba(0,0,0,0.15)] hidden md:block">
          <div className="flex flex-col md:flex-row min-h-[400px]">
            <div className="bg-[#F9FAFC] rounded-[10px] md:w-[190px] lg:w-[300px] xl:w-[320px] p-[5px] flex-shrink-0">
              <ul>
                {items.map((tab) => (
                  <li key={tab._id}>
                    <div
                      onMouseEnter={() => setActiveTabId(tab._id)}
                      className={`flex items-center gap-3 px-[15px] xl:px-[19px] py-3 xl:py-4 rounded-md cursor-pointer transition-all duration-200 ${
                        activeTabId === tab._id
                          ? "bg-white shadow-sm text-[#FF9606]"
                          : "text-[#5B5C60] hover:bg-white hover:shadow-sm"
                      }`}
                    >
                      {/* Icon can be added here later if needed */}
                      <span className="text-sm md:text-base">{tab.title}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-col md:flex-row w-full min-h-[400px]">
                <div
                  className={`flex-1 p-[20px] lg:p-[30px] w-full ${
                    activeItem &&
                    activeItem.children &&
                    activeItem.children.length > 0
                      ? ""
                      : "flex items-center justify-center"
                  }`}
                >
                  {activeItem &&
                  activeItem.children &&
                  activeItem.children.length > 0 ? (
                    <section
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[15px] lg:gap-[20px] xl:gap-[25px]"
                      aria-label="Mega menu links"
                    >
                      {/* columns content */}
                      {columns.map((col, idx) => (
                        <div key={`col-mega-${idx}`} className="space-y-3">
                          <nav aria-label={`Links column ${idx + 1}`}>
                            <ul className="space-y-2" role="list">
                              {col?.map((item, itemIdx) => (
                                <li
                                  key={`${item.title}-${itemIdx}`}
                                  role="listitem"
                                >
                                  <Link
                                    href={getSafeUrl(item.url)}
                                    className="block rounded"
                                    title={item.title}
                                  >
                                    <p className="transition-colors duration-300 text-sm leading-relaxed text-[#76767C] hover:text-[#FF9606] focus:text-[#FF9606] py-1 cursor-pointer whitespace-nowrap">
                                      {item.title}
                                    </p>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </nav>
                        </div>
                      ))}
                    </section>
                  ) : (
                    <div className="text-gray-500">
                      آیتمی برای نمایش وجود ندارد.
                    </div>
                  )}
                </div>
                {/* ads banners */}
                <div className="hidden md:flex flex-col justify-between items-end p-[20px] lg:p-[30px] w-full md:w-[260px] lg:w-[320px] flex-shrink-0">
                  <div className="flex flex-col overflow-hidden border border-[#F4F4F4] shadow-none border-none max-h-[124px] justify-center rounded-[10px] w-full">
                    <Link href="" className="group block">
                      <Image
                        alt="تبلیغ اول"
                        src="/images/header/67723f16966cc82e97038df3.png"
                        width={261}
                        height={124}
                        className="object-cover w-full group-hover:scale-105 transition-transform duration-300"
                        sizes="261px"
                        priority
                      />
                    </Link>
                  </div>

                  <div className="flex flex-col  overflow-hidden border border-[#F4F4F4] shadow-none border-none max-h-[194px] justify-center rounded-[10px] w-full">
                    <Link href="" className="group block">
                      <Image
                        alt="تبلیغ دوم"
                        src="/images/header/67724097e0240bc7cb0377a3.png"
                        width={261}
                        height={124}
                        className="object-cover w-full group-hover:scale-105 transition-transform duration-300"
                        sizes="261px"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
