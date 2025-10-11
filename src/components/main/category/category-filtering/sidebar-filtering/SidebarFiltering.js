"use client";

import React from "react";
import { HiXMark } from "react-icons/hi2";
import { FiFilter } from "react-icons/fi";
import CategoryFilters from "./CategoryFilters";
import ToggleFilters from "./ToggleFilters";
import MedalFilters from "./MedalFilters";
import MobileFiltersModal from "./mobilesidebar/MobileFiltersModal";

const SidebarFilteringUI = ({
  activeFilters,
  expandedCategories,
  toggles,
  isMobileModalOpen,
  hasAnyActiveFilterOrSort,
  onFilterToggle,
  onCategoryToggle,
  onToggleChange,
  onClearAllFilters,
  onClearAllFiltersAndSort,
  onOpenMobileModal,
  onCloseMobileModal
}) => (
  <>
    {/* Mobile trigger */}
    <div className="flex justify-center px-4 md:hidden">
      <button
        className="flex items-center gap-2 px-4 py-3 my-2 h-[54px] w-full rounded-lg border font-bold text-[15px] 
                   border-[#FF9606] text-[#FF9606] bg-white hover:bg-secondary hover:text-white transition"
        onClick={onOpenMobileModal}
      >
        <FiFilter size={20} />
        مشاهده فیلترها
      </button>
    </div>

    {/* Desktop sidebar */}
    <div className="sticky top-0 hidden p-4 md:block">
      {hasAnyActiveFilterOrSort && (
        <button
          className="flex items-center gap-2 h-10 mb-4 text-xs font-semibold text-[#76767C]
                    border-b-2 border-dashed hover:opacity-70 transition"
          onClick={onClearAllFiltersAndSort}
        >
          <HiXMark className="h-5 w-5" />
          حذف همه فیلترها
        </button>
      )}

      <CategoryFilters
        activeFilters={activeFilters}
        expandedCategories={expandedCategories}
        onFilterToggle={onFilterToggle}
        onCategoryToggle={onCategoryToggle}
      />

      <hr className="my-5 border-[#F4F5F6]" />

      <ToggleFilters toggles={toggles} onToggleChange={onToggleChange} />

      <hr className="my-5 border-[#F4F5F6]" />

      <MedalFilters activeFilters={activeFilters} onFilterToggle={onFilterToggle} />
    </div>

    {/* Mobile modal */}
    <MobileFiltersModal isOpen={isMobileModalOpen} onClose={onCloseMobileModal}>
      {hasAnyActiveFilterOrSort && (
        <button
          className="flex items-center gap-2 h-10 mb-4 text-xs font-semibold text-[#76767C]
                    border-b-2 border-dashed hover:bg-secondary/80 transition"
          onClick={() => {
            onClearAllFiltersAndSort();
            onCloseMobileModal();
          }}
        >
          <HiXMark className="h-5 w-5" />
          حذف فیلترهای فعال
        </button>
      )}

      <CategoryFilters
        activeFilters={activeFilters}
        expandedCategories={expandedCategories}
        onFilterToggle={onFilterToggle}
        onCategoryToggle={onCategoryToggle}
      />
      <hr className="my-5 border-[#F4F5F6]" />
      <ToggleFilters toggles={toggles} onToggleChange={onToggleChange} />
      <hr className="my-5 border-[#F4F5F6]" />
      <MedalFilters activeFilters={activeFilters} onFilterToggle={onFilterToggle} />
      <div className="h-6" />
    </MobileFiltersModal>
  </>
);
export default React.memo(SidebarFilteringUI);
