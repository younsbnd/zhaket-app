"use client";

import { useMemo, useCallback } from "react";
import PaginationView from "./PaginationView";

/**
 * PaginationExact - Logic Component
 * Handles pagination calculation and state management
 */
export default function PaginationExact({
  currentPage,
  totalPages,
  baseUrl,
  siblingCount = 2,
  onPageChange,
}) {
  /**
   * Calculate visible page numbers with ellipsis
   * Returns array of page numbers and "..." strings
   */
  const pages = useMemo(() => {
    // Hide pagination if only one page exists
    if (totalPages <= 1) return [];

    // Show all pages if total is 7 or less
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Calculate range boundaries around current page
    const leftBound = Math.max(2, currentPage - siblingCount);
    const rightBound = Math.min(totalPages - 1, currentPage + siblingCount);

    // Start with first page
    const pageRange = [1];

    // Add left ellipsis if there's a gap after page 1
    if (leftBound > 2) {
      pageRange.push("...");
    }

    // Add pages in the visible range (excluding first and last)
    for (let i = leftBound; i <= rightBound; i++) {
      if (i !== 1 && i !== totalPages) {
        pageRange.push(i);
      }
    }

    // Add right ellipsis if there's a gap before last page
    if (rightBound < totalPages - 1) {
      pageRange.push("...");
    }

    // End with last page
    pageRange.push(totalPages);

    return pageRange;
  }, [currentPage, totalPages, siblingCount]);

  /**
   * Handle page click event
   * Calls onPageChange callback or allows default navigation
   */
  const handlePageClick = useCallback(
    (page) => (e) => {
      // Only prevent default if callback exists and page is different
      if (onPageChange && page !== currentPage) {
        e.preventDefault();
        onPageChange(page);
      }
    },
    [onPageChange, currentPage]
  );

  // Don't render anything if no pages to show
  if (!pages.length) return null;

  // Render view component with calculated data
  return (
    <PaginationView
      pages={pages}
      currentPage={currentPage}
      totalPages={totalPages}
      baseUrl={baseUrl}
      onPageClick={handlePageClick}
    />
  );
}
