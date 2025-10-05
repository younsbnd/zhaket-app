"use client";
import React, { useMemo, memo, useCallback } from "react";
import Link from "next/link";

/**
 * Pagination Component
 * 
 * Feature-rich pagination with smart ellipsis and hover animations
 * Built according to Next.js and React best practices
 * 
 * Features:
 * - Smart ellipsis for large page counts
 * - Hover animations with gradient overlay
 * - Full accessibility (ARIA labels, keyboard navigation)
 * - SEO-friendly with rel attributes (prev/next/canonical)
 * - Performance optimized with useMemo and useCallback
 * - Maximum 100 pages limit for performance
 * - Responsive design with Tailwind CSS
 * 
 * @component
 * @param {Object} props - Component properties
 * @param {number} [props.currentPage=1] - Current active page number (1-indexed)
 * @param {number} [props.totalPages=1] - Total number of available pages
 * @param {Function} [props.onPageChange] - Callback fired when page changes
 * @param {string} [props.baseUrl=""] - Base URL for generating page links
 * @param {number} [props.siblingCount=1] - Number of page siblings to display on each side
 * @param {number} [props.maxPages=100] - Maximum pages allowed for navigation
 * @returns {JSX.Element|null} Pagination UI or null if single page
 * 
 * @example
 * <Pagination 
 *   currentPage={5}
 *   totalPages={20}
 *   onPageChange={(page) => router.push(`/products?page=${page}`)}
 * />
 */
const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  baseUrl = "",
  siblingCount = 1,
  maxPages = 100,
}) => {
  /**
   * Generate page numbers array with smart ellipsis
   * 
   * Algorithm:
   * 1. If total pages < threshold, show all pages
   * 2. Otherwise, show: first + siblings + current + siblings + last
   * 3. Insert ellipsis (...) for gaps > 1
   * 
   * Performance: Memoized to recalculate only when dependencies change
   * 
   * @returns {Array<number|string>} Array of page numbers and "..." for ellipsis
   */
  const pageNumbers = useMemo(() => {
    const effectiveTotalPages = Math.min(totalPages, maxPages);
    const totalNumbers = siblingCount * 2 + 5; // siblings + current + first + last + 2

    // Simple case: show all pages if count is small
    if (effectiveTotalPages <= totalNumbers) {
      return Array.from({ length: effectiveTotalPages }, (_, i) => i + 1);
    }

    // Calculate sibling boundaries
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, effectiveTotalPages);

    // Determine if ellipsis should be shown
    const shouldShowLeftEllipsis = leftSiblingIndex > 2;
    const shouldShowRightEllipsis = rightSiblingIndex < effectiveTotalPages - 1;

    // First and last page indices
    const FIRST_PAGE = 1;
    const LAST_PAGE = effectiveTotalPages;

    // Pattern: [1, 2, 3, 4, 5, ..., 100]
    if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, "...", LAST_PAGE];
    }

    // Pattern: [1, ..., 96, 97, 98, 99, 100]
    if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => LAST_PAGE - rightItemCount + i + 1
      );
      return [FIRST_PAGE, "...", ...rightRange];
    }

    // Pattern: [1, ..., 45, 46, 47, ..., 100]
    if (shouldShowLeftEllipsis && shouldShowRightEllipsis) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      );
      return [FIRST_PAGE, "...", ...middleRange, "...", LAST_PAGE];
    }

    return [];
  }, [currentPage, totalPages, siblingCount, maxPages]);

  /**
   * Generate page URL for Link href
   * @param {number} page - Target page number
   * @returns {string} Formatted URL string
   */
  const getPageUrl = useCallback(
    (page) => (baseUrl ? `${baseUrl}${page}` : `?page=${page}`),
    [baseUrl]
  );

  /**
   * Handle page navigation click
   * Prevents default behavior and triggers callback if provided
   * @param {number} page - Target page number
   */
  const handlePageClick = useCallback(
    (page) => {
      if (onPageChange && page !== currentPage && page >= 1 && page <= totalPages) {
        onPageChange(page);
      }
    },
    [onPageChange, currentPage, totalPages]
  );

  // Guard clause: hide pagination if only one page exists
  if (totalPages <= 1) {
    return null;
  }

  // Calculate pagination state
  const effectiveTotalPages = Math.min(totalPages, maxPages);
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < effectiveTotalPages;

  return (
    <div className="flex items-center justify-center my-8">
      <ul
        className="flex items-center justify-center bg-[#F9FAFC] p-1 gap-3 md:gap-[7px] rounded-md"
        role="navigation"
        aria-label="Pagination"
      >
        {/* Previous Button */}
        {hasPrevious && (
          <li className="previous">
            <Link
              href={getPageUrl(currentPage - 1)}
              onClick={(e) => {
                if (onPageChange) {
                  e.preventDefault();
                  handlePageClick(currentPage - 1);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label="Previous page"
              rel="prev"
              className="block"
            >
              <button
                className="cursor-pointer flex items-center justify-center gap-[10px] rounded-lg transition duration-300 focus:outline-hidden focus:outline-0 h-10 hover:bg-secondary/80 relative ml-2.5 bg-[#FFFFFF] px-5 py-2 text-[12px] font-medium text-[#8E8E8E] shadow-[0px_2px_8px_-2px_#B0B0B038] group"
                type="button"
              >
                <div className="flex items-center justify-center relative">
                  <span className="relative z-10 group-hover:opacity-0 transition-opacity duration-300">Previous</span>
                  <div className="absolute inset-0 flex h-full w-full items-center justify-center rounded-lg bg-[linear-gradient(247.65deg,_#FFC107_-35.57%,_#FF9737_100%)] font-medium text-[#FFFFFF] opacity-0 transition-all duration-300 group-hover:opacity-100">
                    Previous
                  </div>
                </div>
              </button>
            </Link>
          </li>
        )}

        {/* Page Numbers */}
        {pageNumbers.map((pageNumber, index) => {
          if (pageNumber === "...") {
            return (
              <li key={`ellipsis-${index}`} className="text-[#5B5C60]">
                <span role="button" tabIndex={0} aria-label="Jump forward">
                  ...
                </span>
              </li>
            );
          }

          const isActive = pageNumber === currentPage;
          const isPrev = pageNumber === currentPage - 1;
          const isNext = pageNumber === currentPage + 1;

          return (
            <li
              key={pageNumber}
              className={`text-[#5B5C60] cursor-pointer w-9 h-9 text-[13px] font-medium rounded-[3px] flex items-center justify-center transition duration-300 hover:bg-[#878F9B] hover:text-white ${
                isActive
                  ? "bg-[linear-gradient(247.65deg,_#FFC107_-35.57%,_#FF9737_100%)] text-[#FFFFFF] font-bold"
                  : ""
              }`}
            >
              <Link
                href={getPageUrl(pageNumber)}
                onClick={(e) => {
                  if (onPageChange) {
                    e.preventDefault();
                    handlePageClick(pageNumber);
                  }
                }}
                className="w-full text-center h-full leading-9"
                tabIndex={isActive ? -1 : 0}
                aria-label={
                  isActive
                    ? `Page ${pageNumber} is your current page`
                    : `Page ${pageNumber}`
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
                {pageNumber}
              </Link>
            </li>
          );
        })}

        {/* Next Button */}
        {hasNext && (
          <li className="next">
            <Link
              href={getPageUrl(currentPage + 1)}
              onClick={(e) => {
                if (onPageChange) {
                  e.preventDefault();
                  handlePageClick(currentPage + 1);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label="Next page"
              rel="next"
              className="block"
            >
              <button
                data-cy="data-cy-page-number-next"
                className="cursor-pointer flex items-center justify-center gap-[10px] rounded-lg transition duration-300 focus:outline-hidden focus:outline-0 h-10 hover:bg-secondary/80 relative mr-2.5 bg-[#FFFFFF] px-6 py-2 text-[12px] font-medium text-[#8E8E8E] shadow-[0px_2px_8px_-2px_#B0B0B038] group"
                type="button"
              >
                <div className="flex items-center justify-center relative">
                  <span className="relative z-10 group-hover:opacity-0 transition-opacity duration-300">Next</span>
                  <div className="absolute inset-0 flex h-full w-full items-center justify-center rounded-lg bg-[linear-gradient(247.65deg,_#FFC107_-35.57%,_#FF9737_100%)] font-medium text-[#FFFFFF] opacity-0 transition-all duration-300 group-hover:opacity-100">
                    Next
                  </div>
                </div>
              </button>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

// Memoize component to prevent unnecessary re-renders
// Only re-renders when props change
export default memo(Pagination);
