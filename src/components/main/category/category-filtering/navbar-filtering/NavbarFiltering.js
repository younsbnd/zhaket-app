"use client";
import React, { useCallback, useMemo } from "react";
import { TfiAlignCenter } from "react-icons/tfi";
import { SORT_OPTIONS } from "@/constants/main/category/category-filtering/filterOptions";

// Sort options are provided from centralized constants

/**
 * Grid view icon component
 * @param {Object} props - Component props
 * @param {boolean} props.isActive - Whether grid view is active
 * @returns {JSX.Element} Grid icon SVG
 */
const GridIcon = ({ isActive }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={isActive ? "*:fill-[#FF9606]" : "*:fill-[#9B9DA2]"}
  >
    <path
      d="M12.5013 18.9582H7.5013C2.9763 18.9582 1.04297 17.0248 1.04297 12.4998V7.49984C1.04297 2.97484 2.9763 1.0415 7.5013 1.0415H12.5013C17.0263 1.0415 18.9596 2.97484 18.9596 7.49984V12.4998C18.9596 17.0248 17.0263 18.9582 12.5013 18.9582ZM7.5013 2.2915C3.65964 2.2915 2.29297 3.65817 2.29297 7.49984V12.4998C2.29297 16.3415 3.65964 17.7082 7.5013 17.7082H12.5013C16.343 17.7082 17.7096 16.3415 17.7096 12.4998V7.49984C17.7096 3.65817 16.343 2.2915 12.5013 2.2915H7.5013Z"
      fill={isActive ? "#FF9606" : "#9B9DA2"}
    />
    <path
      d="M18.3331 7.7085H1.69141C1.34974 7.7085 1.06641 7.42516 1.06641 7.0835C1.06641 6.74183 1.34974 6.4585 1.69141 6.4585H18.3331C18.6747 6.4585 18.9581 6.74183 18.9581 7.0835C18.9581 7.42516 18.6747 7.7085 18.3331 7.7085Z"
      fill={isActive ? "#FF9606" : "#9B9DA2"}
    />
    <path
      d="M18.3331 13.5415H1.69141C1.34974 13.5415 1.06641 13.2582 1.06641 12.9165C1.06641 12.5748 1.34974 12.2915 1.69141 12.2915H18.3331C18.6747 12.2915 18.9581 12.5748 18.9581 12.9165C18.9581 13.2582 18.6747 13.5415 18.3331 13.5415Z"
      fill={isActive ? "#FF9606" : "#9B9DA2"}
    />
    <path
      d="M7.08984 18.9498C6.74818 18.9498 6.46484 18.6665 6.46484 18.3248V1.6748C6.46484 1.33314 6.74818 1.0498 7.08984 1.0498C7.43151 1.0498 7.71484 1.33314 7.71484 1.6748V18.3165C7.71484 18.6665 7.43984 18.9498 7.08984 18.9498Z"
      fill={isActive ? "#FF9606" : "#9B9DA2"}
    />
    <path
      d="M12.9258 18.9498C12.5841 18.9498 12.3008 18.6665 12.3008 18.3248V1.6748C12.3008 1.33314 12.5841 1.0498 12.9258 1.0498C13.2674 1.0498 13.5508 1.33314 13.5508 1.6748V18.3165C13.5508 18.6665 13.2758 18.9498 12.9258 18.9498Z"
      fill={isActive ? "#FF9606" : "#9B9DA2"}
    />
  </svg>
);

/**
 * List view icon component
 * @param {Object} props - Component props
 * @param {boolean} props.isActive - Whether list view is active
 * @returns {JSX.Element} List icon SVG
 */
const ListIcon = ({ isActive }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={isActive ? "*:fill-[#FF9606]" : "*:fill-[#9B9DA2]"}
  >
    <path
      d="M12.5013 18.9582H7.5013C2.9763 18.9582 1.04297 17.0248 1.04297 12.4998V7.49984C1.04297 2.97484 2.9763 1.0415 7.5013 1.0415H12.5013C17.0263 1.0415 18.9596 2.97484 18.9596 7.49984V12.4998C18.9596 17.0248 17.0263 18.9582 12.5013 18.9582ZM7.5013 2.2915C3.65964 2.2915 2.29297 3.65817 2.29297 7.49984V12.4998C2.29297 16.3415 3.65964 17.7082 7.5013 17.7082H12.5013C16.343 17.7082 17.7096 16.3415 17.7096 12.4998V7.49984C17.7096 3.65817 16.343 2.2915 12.5013 2.2915H7.5013Z"
      fill={isActive ? "#FF9606" : "#9B9DA2"}
    />
    <path
      d="M17.4087 10.8332H2.59389C2.08772 10.8332 1.66797 10.4554 1.66797 9.99984C1.66797 9.54428 2.08772 9.1665 2.59389 9.1665H17.4087C17.9149 9.1665 18.3346 9.54428 18.3346 9.99984C18.3346 10.4554 17.9149 10.8332 17.4087 10.8332Z"
      fill={isActive ? "#FF9606" : "#9B9DA2"}
    />
  </svg>
);

/**
 * Navbar filtering component for sorting and view mode selection
 * @param {Object} props - Component props
 * @param {Function} props.onSortChange - Callback when sort option is changed
 * @param {Object} props.currentSort - Current sorting configuration
 * @param {string} props.currentSort.sortBy - Current sort field
 * @param {string} props.currentSort.sortOrder - Current sort order
 * @param {Function} props.onViewModeChange - Callback when view mode is changed
 * @param {string} props.viewMode - Current view mode ('grid' or 'list')
 * @returns {JSX.Element} Navbar filtering section
 */
const NavbarFiltering = ({ 
  onSortChange, 
  currentSort = { sortBy: "createdAt", sortOrder: "desc" },
  onViewModeChange,
  viewMode = "grid"
}) => {

  /**
   * Handle sort option click
   * @param {Object} option - Selected sort option
   */
  const handleSortClick = useCallback(
    (option) => {
      onSortChange?.(option.sortBy, option.sortOrder);
    },
    [onSortChange]
  );

  /**
   * Handle view mode change
   * @param {string} mode - 'grid' or 'list'
   */
  const handleViewModeClick = useCallback((mode) => {
    onViewModeChange?.(mode);
  }, [onViewModeChange]);

  /**
   * Determine active sort ID based on current sort parameters
   * @returns {string} ID of the currently active sort option
   */
  const activeSortId = useMemo(() => {
    const currentOption = SORT_OPTIONS.find(
      (option) => option.sortBy === currentSort.sortBy && option.sortOrder === currentSort.sortOrder
    );
    return currentOption ? currentOption.id : "latest";
  }, [currentSort]);

  return (
    <div
      className="relative my-6 flex items-center bg-[#FFFFFF] pr-4 shadow-[0px_10px_25px_0px_#5B5E6812] md:rounded-sm"
      data-cy="data-cy-sort-container"
    >
        {/* Sort label */}
        <div
          className="items-center flex w-full justify-start gap-3 pb-2 max-w-[100px] text-[#424244]"
          data-cy="data-cy-icon-text-combo"
        >
          <TfiAlignCenter className="h-5 w-5 text-[#424244]" />
          <span className="transition duration-300 text-sm text-i-typography leading-7">
            مرتب‌سازی :
          </span>
        </div>

      {/* Sort options */}
      <div
        className="no-scrollbar flex max-w-fit gap-4 overflow-x-auto"
        data-cy="data-cy-archive-sort-item-container"
      >
        {SORT_OPTIONS.map((option) => (
          <div
            key={option.id}
            className={`min-w-fit cursor-pointer py-4 text-[15px] transition duration-300 first:mr-4 last:ml-4 hover:text-[#5B5C60] ${
              activeSortId === option.id
                ? "border-b-2 border-[#FF9606] font-bold text-[#5B5C60]"
                : "text-[#878F9B]"
            }`}
            data-cy="data-cy-archive-sort-item"
            onClick={() => handleSortClick(option)}
          >
            {option.label}
          </div>
        ))}
      </div>

      {/* View mode selector - Grid/List (show on laptop >= 1024px) */}
      <div className="items-center justify-center absolute left-0 hidden h-full p-[5px] xl:flex">
        <div className="flex h-[53px] w-[103px] items-center justify-center rounded-lg bg-[#F9FAFC]">
          <button
            type="button"
            className={`flex items-center justify-center h-11 w-11 cursor-pointer rounded-lg ${
              viewMode === "grid" ? "border-[1px] border-[#E5E8EB] bg-[#FFFFFF]" : ""
            }`}
            data-cy="data-cy-view-mode-grid"
            onClick={() => handleViewModeClick("grid")}
            aria-label="Grid view"
          >
            <GridIcon isActive={viewMode === "grid"} />
          </button>
          <button
            type="button"
            className={`flex items-center justify-center h-11 w-11 cursor-pointer rounded-lg ${
              viewMode === "list" ? "border-[1px] border-[#E5E8EB] bg-[#FFFFFF]" : ""
            }`}
            data-cy="data-cy-view-mode-list"
            onClick={() => handleViewModeClick("list")}
            aria-label="List view"
          >
            <ListIcon isActive={viewMode === "list"} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(NavbarFiltering);
