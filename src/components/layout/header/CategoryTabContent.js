"use client";

import React, { useMemo, useCallback } from "react";
import Link from "next/link";

/**
 * CategoryTabContent Component
 * 
 * Professional responsive grid component for displaying category tab content.
 * Optimized for performance with memoization and proper error handling.
 * 
 * @param {string} tabId - Active tab identifier
 * @param {Object} TAB_CONTENT - Content mapping object
 * @param {Function} [onLinkClick] - Optional link click handler
 */
export default function CategoryTabContent({
  tabId,
  TAB_CONTENT = {},
  onLinkClick
}) {

  // Performance: Memoize current tab content to prevent unnecessary re-renders
  const currentContent = useMemo(() => {
    if (!tabId || !TAB_CONTENT?.[tabId]) return [];
    return TAB_CONTENT[tabId];
  }, [tabId, TAB_CONTENT]);

  // Performance: Memoized click handler
  const handleLinkClick = useCallback((item) => {
    onLinkClick?.(item);
  }, [onLinkClick]);

  // Early return for empty content
  if (!currentContent.length) return null;

  return (
    <div
      className="flex-1 p-[20px] lg:p-[30px] w-full"
      role="tabpanel"
      aria-labelledby={`tab-${tabId}`}
    >
      {/* Responsive Grid Container */}
      <section
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[15px] lg:gap-[20px] xl:gap-[25px]"
        aria-label="Category links"
      >
        {/* Render each column */}
        {currentContent.map((col, idx) => (
          <div
            key={`col-${tabId}-${idx}`}
            className="space-y-3"
          >
            <nav aria-label={`Links column ${idx + 1}`}>
              <ul className="space-y-2" role="list">
                {/* Render items with proper accessibility */}
                {col?.map((item, itemIdx) => (
                  <li key={`${item.label}-${itemIdx}`} role="listitem">
                    <Link
                      href={item.href || '#'}
                      onClick={() => handleLinkClick(item)}
                      className="block focus:outline-none focus:ring-2 focus:ring-[#FF9606] focus:ring-opacity-50 rounded"
                      title={item.label}
                    >
                      <p className="transition-colors duration-300 text-sm leading-relaxed text-[#76767C] hover:text-[#FF9606] focus:text-[#FF9606] py-1 cursor-pointer">
                        {item.label}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        ))}
      </section>
    </div>
  );
}
