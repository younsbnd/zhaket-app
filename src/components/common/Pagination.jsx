"use client";
import React, { useMemo } from "react";
import Link from "next/link";

/**
 * PaginationExact Component
 * - Pixel-perfect pagination matching provided HTML/CSS structure
 * - Uses exact gradient colors and hover effects
 * - Includes ellipsis (...) for large page ranges
 *
 * Props:
 * @param {number} currentPage        - Active page number
 * @param {number} totalPages         - Total number of pages
 * @param {string} baseUrl            - Base URL before page number (e.g., "/search/page/")
 * @param {number} siblingCount       - Number of pages to show on each side of current (default: 2)
 * @param {function} onPageChange     - Optional callback when a page is clicked
 */
export default function PaginationExact({
  currentPage,
  totalPages,
  baseUrl,
  siblingCount = 2,
  onPageChange
}) {
  /**
   * Generate array of page numbers with ellipsis logic
   */
  const pages = useMemo(() => {
    const pageList = [];
    
    // Always show first page
    pageList.push(1);
    
    // Calculate range around current page
    const startPage = Math.max(2, currentPage - siblingCount);
    const endPage = Math.min(totalPages - 1, currentPage + siblingCount);
    
    // Add left ellipsis if needed
    if (startPage > 2) {
      pageList.push('ellipsis-left');
    }
    
    // Add pages in range
    for (let p = startPage; p <= endPage; p++) {
      pageList.push(p);
    }
    
    // Add right ellipsis if needed
    if (endPage < totalPages - 1) {
      pageList.push('ellipsis-right');
    }
    
    // Always show last page if more than 1 page
    if (totalPages > 1) {
      pageList.push(totalPages);
    }
    
    return pageList;
  }, [currentPage, totalPages, siblingCount]);

  /**
   * Handle page click
   */
  const handleClick = (pageNum, e) => {
    e.preventDefault();
    if (pageNum !== currentPage && onPageChange) {
      onPageChange(pageNum);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center my-8">
      <ul
        className="flex items-center justify-center bg-[#F9FAFC] p-1 gap-3 md:gap-[7px] rounded-md"
        role="navigation"
        aria-label="Pagination"
      >
        {/* Previous button */}
        {currentPage > 1 && (
          <li className="previous">
            <Link
              href={`${baseUrl}${currentPage - 1}`}
              onClick={(e) => onPageChange ? handleClick(currentPage - 1, e) : null}
              tabIndex={0}
              role="button"
              aria-disabled="false"
              aria-label="Previous page"
              rel="prev"
            >
              <button
                className="cursor-pointer flex items-center justify-center gap-[10px] rounded-lg transition duration-300 focus:outline-hidden focus:outline-0 h-10 hover:bg-secondary/80 relative ml-2.5 bg-[#FFFFFF] px-5 py-2 text-[12px] font-medium text-[#8E8E8E] shadow-[0px_2px_8px_-2px_#B0B0B038]"
                type="button"
              >
                <div className="flex items-center justify-center">
                  قبلی
                  <div className="absolute inset-0 flex h-full w-full items-center justify-center rounded-lg bg-[linear-gradient(247.65deg,_#FFC107_-35.57%,_#FF9737_100%)] font-medium text-[#FFFFFF] opacity-0 transition-all duration-300 hover:opacity-100">
                    قبلی
                  </div>
                </div>
              </button>
            </Link>
          </li>
        )}

        {/* Page numbers */}
        {pages.map((pageNum, index) => {
          // Handle ellipsis
          if (typeof pageNum === 'string' && pageNum.startsWith('ellipsis')) {
            return (
              <li key={pageNum} className="text-[#5B5C60]">
                <a role="button" tabIndex={0} aria-label="Jump forward">
                  ...
                </a>
              </li>
            );
          }

          const isActive = pageNum === currentPage;
          const isPrev = pageNum === currentPage - 1;
          const isNext = pageNum === currentPage + 1;

          return (
            <li
              key={pageNum}
              className={`text-[#5B5C60] cursor-pointer! w-9 h-9 text-[13px] font-medium rounded-[3px] flex items-center justify-center transition duration-300 hover:bg-[#878F9B] hover:text-white ${
                isActive
                  ? "bg-[linear-gradient(247.65deg,_#FFC107_-35.57%,_#FF9737_100%)] text-[#FFFFFF] font-bold!"
                  : ""
              }`}
            >
              <Link
                href={`${baseUrl}${pageNum}`}
                onClick={(e) => onPageChange ? handleClick(pageNum, e) : null}
                className="w-full text-center h-full leading-9"
                tabIndex={isActive ? -1 : 0}
                aria-label={
                  isActive
                    ? `Page ${pageNum} is your current page`
                    : `Page ${pageNum}`
                }
                rel={
                  isActive
                    ? "canonical"
                    : isPrev
                    ? "prev"
                    : isNext
                    ? "next"
                    : undefined
                }
                aria-current={isActive ? "page" : undefined}
              >
                {pageNum}
              </Link>
            </li>
          );
        })}

        {/* Next button */}
        {currentPage < totalPages && (
          <li className="next">
            <Link
              href={`${baseUrl}${currentPage + 1}`}
              onClick={(e) => onPageChange ? handleClick(currentPage + 1, e) : null}
              tabIndex={0}
              role="button"
              aria-disabled="false"
              aria-label="Next page"
              rel="next"
            >
              <button
                data-cy="data-cy-page-number-next"
                className="cursor-pointer flex items-center justify-center gap-[10px] rounded-lg transition duration-300 focus:outline-hidden focus:outline-0 h-10 hover:bg-secondary/80 relative mr-2.5 bg-[#FFFFFF] px-6 py-2 text-[12px] font-medium text-[#8E8E8E] shadow-[0px_2px_8px_-2px_#B0B0B038]"
                type="button"
              >
                <div className="flex items-center justify-center">
                  بعدی
                  <div className="absolute inset-0 flex h-full w-full items-center justify-center rounded-lg bg-[linear-gradient(247.65deg,_#FFC107_-35.57%,_#FF9737_100%)] font-medium text-[#FFFFFF] opacity-0 transition-all duration-300 hover:opacity-100">
                    بعدی
                  </div>
                </div>
              </button>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}
