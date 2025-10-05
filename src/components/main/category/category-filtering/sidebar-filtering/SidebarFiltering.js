"use client";
import React, { useState, useCallback, useMemo } from "react";
import { HiXMark } from "react-icons/hi2";
import CategoryFilters from "./CategoryFilters";
import ToggleFilters from "./ToggleFilters";
import MedalFilters from "./MedalFilters";
import MobileFiltersModal from "./mobilesidebar/MobileFiltersModal";
 
  
    
/**
 * Sidebar filtering component for produ              ct categories and medals
 * Main container that manages filter states and orchestrates child filter components
 * @param {Object} props - Component props
 * @param {Function} props.onResetSort - Callback to reset sorting
 * @param {boolean} props.hasActiveSort - Whether non-default sort is active
 * @returns {JSX.Element} Sidebar filtering section
 */
const SidebarFiltering = ({ onResetSort, hasActiveSort = false }) => {
  // Active filters state - stores IDs of selected filters
  const [activeFilters, setActiveFilters] = useState(new Set());
  
  // Expanded categories state - tracks which categories are expanded
  const [expandedCategories, setExpandedCategories] = useState(new Set());
  
  // Toggle switches state for additional filter options
  const [toggles, setToggles] = useState({
    sharedProducts: false,
    demoSearch: false,
    showUnavailable: false,
  });

  // Mobile modal visibility
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  /**
   * Handles filter toggle action
   * @param {string} filterId - ID of the filter to toggle
   */
  const handleFilterToggle = useCallback((filterId) => {
    setActiveFilters((prev) => {
      const newSet = new Set(prev);
      newSet.has(filterId) ? newSet.delete(filterId) : newSet.add(filterId);
      return newSet;
    });
  }, []);

  /**
   * Handles category expand/collapse toggle
   * @param {string} categoryId - ID of the category to expand/collapse
   */
  const handleCategoryToggle = useCallback((categoryId) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      newSet.has(categoryId) ? newSet.delete(categoryId) : newSet.add(categoryId);
      return newSet;
    });
  }, []);

  /**
   * Handles toggle switch state change
   * @param {string} toggleName - Name of the toggle to change
   */
  const handleToggleChange = useCallback((toggleName) => {
    setToggles((prev) => ({ ...prev, [toggleName]: !prev[toggleName] }));
  }, []);

  /**
   * Clears all active filters and resets toggle switches
   */
  const clearAllFilters = useCallback(() => {
    setActiveFilters(new Set());
    setToggles({ sharedProducts: false, demoSearch: false, showUnavailable: false });
  }, []);

  /**
   * Clear all filters and reset sort
   */
  const clearAllFiltersAndSort = useCallback(() => {
    clearAllFilters();
    if (hasActiveSort) {
      onResetSort?.();
    }
  }, [clearAllFilters, hasActiveSort, onResetSort]);

  /**
   * Checks if there are any active filters or toggles enabled
   * @returns {boolean} True if any filter or toggle is active
   */
  const hasActiveFilters = useMemo(
    () =>
      activeFilters.size > 0 ||
      toggles.sharedProducts ||
      toggles.demoSearch ||
      toggles.showUnavailable,
    [activeFilters, toggles]
  );

  /**
   * Check if any filter or sort is active
   */
  const hasAnyActiveFilterOrSort = useMemo(
    () => hasActiveFilters || hasActiveSort,
    [hasActiveFilters, hasActiveSort]
  );

  return (
    <>
      {/* Mobile trigger */}
      <div className="flex items-center justify-center px-4 md:hidden md:max-w-[1200px]" data-cy="data-cy-filter-in-mobile">
        <button
          className="cursor-pointer flex items-center justify-center gap-[10px] rounded-lg transition duration-300 focus:outline-hidden focus:outline-0 px-4 py-3 hover:bg-secondary border hover:text-white my-2 h-[54px] w-full border-[#FF9606] bg-[#FFFFFF] text-[15px] font-bold text-[#FF9606] md:hidden"
          type="button"
          onClick={() => setIsMobileModalOpen(true)}
        >
          <svg stroke="currentColor" fill="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M21 3H5a1 1 0 0 0-1 1v2.59c0 .523.213 1.037.583 1.407L10 13.414V21a1.001 1.001 0 0 0 1.447.895l4-2c.339-.17.553-.516.553-.895v-5.586l5.417-5.417c.37-.37.583-.884.583-1.407V4a1 1 0 0 0-1-1zm-6.707 9.293A.996.996 0 0 0 14 13v5.382l-2 1V13a.996.996 0 0 0-.293-.707L6 6.59V5h14.001l.002 1.583-5.71 5.71z"></path></svg>
          <div className="flex items-center justify-center">مشاهده فیلترها</div>
        </button>
      </div>

      {/* Desktop sidebar */}
      <div className="sticky top-0 hidden p-4 md:block" data-cy="data-cy-filter-in-desktop">
      {/* Clear all button - shown when any filter or sort is active */}
      {hasAnyActiveFilterOrSort && (
        <button
          type="button"
          className="font-semibold cursor-pointer flex items-center justify-center gap-[10px] focus:outline-hidden focus:outline-0 h-10 text-xs hover:opacity-70 mb-4 rounded-none border-b-2 border-dashed bg-transparent p-0 transition-opacity duration-300 ease-in-out text-[#76767C] opacity-100"
          onClick={clearAllFiltersAndSort}
          aria-label="حذف همه فیلترها و مرتب‌سازی"
        >
          <div className="flex items-center justify-center">
            <HiXMark className="h-5 w-5" />
            حذف همه فیلترها
          </div>
        </button>
      )}

      {/* Category filters section */}
      <CategoryFilters
        activeFilters={activeFilters}
        expandedCategories={expandedCategories}
        onFilterToggle={handleFilterToggle}
        onCategoryToggle={handleCategoryToggle}
      />

      {/* Divider */}
      <div className="bg-[#F4F5F6] h-[1px] w-full my-5" role="separator"></div>

      {/* Toggle filters section */}
      <ToggleFilters toggles={toggles} onToggleChange={handleToggleChange} />

      {/* Divider */}
      <div className="bg-[#F4F5F6] h-[1px] w-full my-5" role="separator"></div>

      {/* Medal filters section */}
      <MedalFilters activeFilters={activeFilters} onFilterToggle={handleFilterToggle} />
      </div>

      {/* Mobile modal with filters content */}
      <MobileFiltersModal isOpen={isMobileModalOpen} onClose={() => setIsMobileModalOpen(false)}>
        {hasAnyActiveFilterOrSort && (
          <button
            type="button"
            className="font-semibold cursor-pointer flex items-center justify-center gap-[10px] focus:outline-hidden focus:outline-0 h-10 text-xs hover:bg-secondary/80 mb-4 rounded-none border-b-2 border-dashed bg-transparent p-0 transition-opacity duration-300 ease-in-out text-[#76767C] opacity-100"
            onClick={() => {
              clearAllFiltersAndSort();
              setIsMobileModalOpen(false);
            }}
            aria-label="حذف همه فیلترها و مرتب‌سازی"
          >
            <div className="flex items-center justify-center">
              <HiXMark className="h-5 w-5" />
              حذف فیلترهای فعال
            </div>
          </button>
        )}

        <CategoryFilters
          activeFilters={activeFilters}
          expandedCategories={expandedCategories}
          onFilterToggle={handleFilterToggle}
          onCategoryToggle={handleCategoryToggle}
        />

        <div className="bg-[#F4F5F6] h-[1px] w-full my-5" role="separator"></div>

        <ToggleFilters toggles={toggles} onToggleChange={handleToggleChange} />

        <div className="bg-[#F4F5F6] h-[1px] w-full my-5" role="separator"></div>

        <MedalFilters activeFilters={activeFilters} onFilterToggle={handleFilterToggle} />

        <div className="h-6" />
      </MobileFiltersModal>
    </>
  );
};

export default SidebarFiltering;
