"use client";

import React, { useCallback } from "react";
import { TfiAlignCenter } from "react-icons/tfi";
import { BsGrid3X3Gap, BsListUl } from "react-icons/bs"; // View icons
import { SORT_OPTIONS } from "@/constants/main/catgory/category-filtering/sidebar-filtering/filterOptions";
 
 /**
 * NavbarFiltering Component
 * - Pure controlled component (no internal state)
 * - Handles sorting + view mode switching
 */
const NavbarFiltering = ({
  onSortChange,                // callback from logic to change sort
  currentSort = { sortBy: "createdAt", sortOrder: "desc" }, // current sort controlled by logic
  onViewModeChange,            // callback to switch grid/list mode
  viewMode = "grid",           // current view mode
}) => {

  /** Handle clicking a sort option */
  const handleSortClick = useCallback(
    (option) => {
      onSortChange?.(option.sortBy, option.sortOrder);
    },
    [onSortChange]
  );

  /** Handle changing view mode (grid/list) */
  const handleViewModeClick = useCallback(
    (mode) => {
      onViewModeChange?.(mode);
    },
    [onViewModeChange]
  );

  /** Compute if a sort option is active based on currentSort props */
  const isSortActive = (option) =>
    currentSort.sortBy === option.sortBy && currentSort.sortOrder === option.sortOrder;

  return (
    <div className="relative my-6 flex items-center bg-white pr-4 shadow-md md:rounded-sm">
      {/* Sort title */}
      <div className="flex items-center gap-3 pb-2 max-w-[100px] text-[#424244]">
        <TfiAlignCenter className="h-5 w-5" />
        <span className="text-sm leading-7">مرتب‌سازی :</span>
      </div>

      {/* Sort options bar */}
      <div className="no-scrollbar flex gap-4 overflow-x-auto max-w-fit">
        {SORT_OPTIONS.map((option) => (
          <div
            key={option.id}
            onClick={() => handleSortClick(option)}
            /** Controlled highlight styling */
            className={`min-w-fit cursor-pointer py-4 text-[15px] first:mr-4 last:ml-4 transition-colors ${
              isSortActive(option)
                ? "border-b-2 border-[#FF9606] font-bold text-[#5B5C60]" // active state
                : "text-[#878F9B] hover:text-[#5B5C60]" // inactive hover state
            }`}
          >
            {option.label}
          </div>
        ))}
      </div>

      {/* View mode toggle (visible on xl and above) */}
      <div className="absolute left-0 hidden xl:flex p-1 h-full items-center justify-center">
        <div className="flex h-[53px] w-[103px] items-center justify-center rounded-lg bg-[#F9FAFC]">
          {/* Grid mode */}
          <button
            type="button"
            aria-label="Grid view"
            onClick={() => handleViewModeClick("grid")}
            className={`flex items-center justify-center h-11 w-11 rounded-lg ${
              viewMode === "grid" ? "border border-[#E5E8EB] bg-white" : ""
            }`}
          >
            <BsGrid3X3Gap size={20} color={viewMode === "grid" ? "#FF9606" : "#9B9DA2"} />
          </button>

          {/* List mode */}
          <button
            type="button"
            aria-label="List view"
            onClick={() => handleViewModeClick("list")}
            className={`flex items-center justify-center h-11 w-11 rounded-lg ${
              viewMode === "list" ? "border border-[#E5E8EB] bg-white" : ""
            }`}
          >
            <BsListUl size={20} color={viewMode === "list" ? "#FF9606" : "#9B9DA2"} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(NavbarFiltering);
