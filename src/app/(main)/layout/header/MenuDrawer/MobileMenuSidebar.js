"use client";

import React, { useState } from "react";
import { FcExpand, FcNext } from "react-icons/fc";
import { AiOutlineClose} from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
import { POPULAR_PLUGINS, POPULAR_THEMES, TAB_CONTENT } from "@/constants/header/mainMenuData";
import { mainTabs } from "@/constants/header/mobileMenuData";



export default function MobileMenuSidebar({ isOpen, onClose }) {
  const [openAccordions, setOpenAccordions] = useState({});

  // Toggle accordion state for menu items
  const toggleAccordion = (id) => {
    setOpenAccordions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Render content for accordion sections
  const renderAccordionContent = (tabId) => {
    if (tabId === "most-popular") {
      return (
        <div className="px-2 py-3 bg-white rounded-md mt-2 shadow-sm">
          <div className="grid grid-cols-1 gap-4">
            {/* Popular themes section */}
            <div>
              <p className="text-sm text-[#424244] font-medium pb-2 border-b border-gray-100 mb-2">
                محبوب‌ترین قالب‌ها
              </p>
              <ul className="space-y-2">
                {POPULAR_THEMES.slice(0, 4).map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-[#76767C] hover:text-[#FF9606] transition block py-1"
                      onClick={onClose}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular plugins section */}
            <div>
              <p className="text-sm text-[#424244] font-medium pb-2 border-b border-gray-100 mb-2">
                محبوب‌ترین افزونه‌ها
              </p>
              <ul className="space-y-2">
                {POPULAR_PLUGINS.slice(0, 4).map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-[#76767C] hover:text-[#FF9606] transition block py-1"
                      onClick={onClose}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      );
    }

    const content = TAB_CONTENT[tabId];
    if (!content) return null;

    return (
      <div className="px-4 py-3 bg-white rounded-md mt-2 shadow-sm">
        <div className="grid grid-cols-1 gap-4">
          {content.map((col, idx) => (
            <div key={idx}>
              <ul className="space-y-2">
                {col.slice(0, 5).map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-[#76767C] hover:text-[#FF9606] transition block py-1"
                      onClick={onClose}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Mobile menu overlay - dark background when menu is open */}
      <div
        className={`fixed top-0 left-0 z-20 h-full w-full bg-[#00000033] transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Mobile menu sidebar */}
      <div
        className={`fixed top-0 right-0 z-30 h-full w-[370px] max-w-[90vw] transform-gpu overflow-y-auto bg-white px-[10px] py-5 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}
      >
        {/* Mobile menu header with logo and close button */}
        <div className="flex items-center justify-between rounded-md px-[20px]">
          <Link href="/" onClick={onClose} aria-label="Go to homepage">
            <Image
              alt="ژاکت"
              width={60}
              height={43}
              priority
              className="min-h-[31px] min-w-[44px]"
              src="/images/logo.svg"
            />
          </Link>

          <button
            data-cy="menu-close-button"
            type="button"
            aria-label="Close mobile menu"
            onClick={onClose}
            className="cursor-pointer flex items-center justify-center rounded-lg 
             bg-[#F7F8F9] text-[#5B5C60] hover:bg-[#EDEEEF] 
             transition duration-300 px-2 py-2 h-[33px] w-[33px]"
          >
            <AiOutlineClose size={18} />
          </button>
        </div>



        {/* Mobile menu categories with accordion functionality */}
        <div className="mt-6 flex w-full flex-col gap-[15px] rounded-[10px] bg-[#F9FAFC] p-2 px-[21px] py-[28px]" data-cy="menu-container">
          {mainTabs.map((tab) => (
            <div key={tab.id} className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0">
              <button
                className="cursor-pointer flex w-full items-center justify-between py-2"
                data-cy="stylish-accordion-button"
                type="button"
                onClick={() => toggleAccordion(tab.id)}
                aria-expanded={openAccordions[tab.id] || false}
                aria-controls={`accordion-content-${tab.id}`}
              >
                <div className="flex items-center justify-start gap-[10px]">
                  {tab.mobileIcon}
                  <p className="transition duration-300 text-base leading-7 text-[#5B5C60] font-medium">
                    {tab.label}
                  </p>
                </div>
                <div className="max-h-4 max-w-4">
                  {openAccordions[tab.id] ? <FcNext /> : <FcExpand />}
                </div>
              </button>

              {/* Expandable accordion content */}
              <div
                id={`accordion-content-${tab.id}`}
                className={`overflow-hidden transition-all duration-500 ease-in-out ${openAccordions[tab.id] ? 'max-h-[500px] opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'
                  }`}
              >
                {openAccordions[tab.id] && renderAccordionContent(tab.id)}
              </div>
            </div>
          ))}
        </div>

        {/* Static navigation links */}
        <div className="flex justify-center flex-col items-start gap-6 p-[20px]" data-cy="menu-container">
          <p className="transition duration-300 text-base leading-7 text-[#5B5C60] font-medium border-b border-gray-100 pb-2 w-full">
            <Link href="/blog" onClick={onClose}>بلاگ</Link>
          </p>

          <p className="transition duration-300 text-base leading-7 text-[#5B5C60] font-medium border-b border-gray-100 pb-2 w-full">
            <Link rel="nofollow" href="/academy" onClick={onClose}>ژاکت آکادمی</Link>
          </p>

          <p className="transition duration-300 text-base leading-7 text-[#5B5C60] font-medium border-b border-gray-100 pb-2 w-full">
            <Link rel="nofollow" href="/service" onClick={onClose}>ژاکت سرویس</Link>
          </p>

          <p className="transition duration-300 text-base leading-7 text-[#5B5C60] font-medium">
            <Link rel="follow" href="/ready-site" onClick={onClose}>سایت آماده</Link>
          </p>
        </div>
      </div>
    </>
  );
}
