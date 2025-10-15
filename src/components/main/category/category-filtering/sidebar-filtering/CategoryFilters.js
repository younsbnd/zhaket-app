"use client";

import { categories } from "@/constants/main/catgory/category-filtering/sidebar-filtering/filterOptions";
import React from "react";
import { CiMenuBurger } from "react-icons/ci";
import { HiCheck, HiChevronDown } from "react-icons/hi2";

/**
 * Checkbox icon with gradient background when checked
 */
const CheckboxIcon = React.memo(({ isChecked }) => (
  <div
    className={`flex h-4 w-4 cursor-pointer items-center justify-center rounded-sm border-2 border-i-gray ${isChecked ? "border-none bg-[linear-gradient(247.65deg,_#FFC107_-35.57%,_#FF9737_100%)]" : ""
      }`}
  >
    {isChecked && <HiCheck className="h-3 w-3 text-white" />}
  </div>
));

CheckboxIcon.displayName = "CheckboxIcon";

/**
 * Chevron icon with rotation animation
 */
const ChevronIcon = React.memo(({ isExpanded }) => (
  <HiChevronDown
    className={`h-4 w-4 text-[#5B5C60] transition-transform duration-200 ${isExpanded ? "rotate-180" : ""
      }`}
  />
));

ChevronIcon.displayName = "ChevronIcon";

/**
 * Single category item with checkbox and optional expand button
 */
const CategoryItem = React.memo(({ category, isChecked, isExpanded, onFilterToggle, onCategoryToggle }) => (
  <li className="my-2 text-[#5B5C60] first:mt-0 last:mb-0">
    <div className="flex w-full items-center justify-between">
      {/* Checkbox and label */}
      <div className="flex items-center gap-[10px]">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onFilterToggle(category.id);
          }}
          aria-label={`Toggle ${category.label} filter`}
        >
          <CheckboxIcon isChecked={isChecked} />
        </button>
        <p className="ml-4 mr-4 line-clamp-1 text-sm leading-7 text-i-typography transition duration-300">
          {category.label}
        </p>
      </div>

      {/* Expand button (only for categories with subcategories) */}
      {category.hasSubcategories && (
        <button
          type="button"
          onClick={() => onCategoryToggle(category.id)}
          className="p-2"
          aria-label={`${isExpanded ? "Collapse" : "Expand"} ${category.label}`}
        >
          <ChevronIcon isExpanded={isExpanded} />
        </button>
      )}
    </div>
  </li>
));

CategoryItem.displayName = "CategoryItem";

/**
 * CategoryFilters Component
 * Displays product categories with checkboxes and expandable subcategories
 */
const CategoryFilters = ({ activeFilters, expandedCategories, onFilterToggle, onCategoryToggle }) => {
  return (
    <>
      {/* Section header */}
      <div className="my-2 flex w-full items-center justify-start gap-3 pb-2">
        <CiMenuBurger className="text-xl text-[#FF9606]" />
        <span className="text-base text-bold transition duration-300">دسته بندی محصولات</span>
      </div>
      {/* Categories list */}
      <ul>
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            isChecked={activeFilters?.has?.(category.id)}
            isExpanded={expandedCategories?.has?.(category.id)}
            onFilterToggle={onFilterToggle}
            onCategoryToggle={onCategoryToggle}
          />
        ))}
      </ul>
    </>
  );
};

export default React.memo(CategoryFilters);
