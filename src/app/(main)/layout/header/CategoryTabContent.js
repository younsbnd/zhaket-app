"use client";

import React from "react";
import Link from "next/link";

/**
 * CategoryTabContent component
 * Renders the tab content for selected category except "Most Popular" tab.
 * 
 * @param {string} tabId - The ID of the active tab.
 * @param {Object} TAB_CONTENT - An object mapping tab IDs to their respective link groups.
 */
export default function CategoryTabContent({ tabId, TAB_CONTENT }) {
  return (
    <div className="flex-1 p-[20px] lg:p-[30px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[15px] lg:gap-[20px]">
        {TAB_CONTENT[tabId]?.map((col, idx) => (
          <div key={idx} className="pr-0 lg:pr-[20px] pt-0 lg:pt-[15px]">
            <ul>
              {col.map(item => (
                <li key={item.label}>
                  <Link href={item.href}>
                    <p className="transition duration-300 text-sm leading-7 pb-3 text-[#76767C] hover:text-[#FF9606]">
                      {item.label}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
