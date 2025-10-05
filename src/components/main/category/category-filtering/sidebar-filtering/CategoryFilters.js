"use client";
import React from "react";
import { CiMenuBurger } from "react-icons/ci";
import { HiFolder, HiCheck, HiChevronDown } from "react-icons/hi2";

/**
 * Checkbox icon component with gradient background when checked
 * @param {Object} props - Component props
 * @param {boolean} props.isChecked - Whether the checkbox is checked
 * @returns {JSX.Element} Checkbox icon element
 */
const CheckboxIcon = React.memo(({ isChecked }) => (
  <div
    className={`border-i-gray flex items-center justify-center rounded-sm border-2 h-4 w-4 ${isChecked ? "border-none bg-[linear-gradient(247.65deg,_#FFC107_-35.57%,_#FF9737_100%)]" : ""
      }`}
  >
    {isChecked && <HiCheck className="h-3 w-3 text-white" />}
  </div>
));

CheckboxIcon.displayName = "CheckboxIcon";

/**
 * Expand/collapse chevron icon for categories with subcategories
 * @param {Object} props - Component props
 * @param {boolean} props.isExpanded - Whether the category is expanded
 * @returns {JSX.Element} Chevron icon element
 */
const ChevronIcon = React.memo(({ isExpanded }) => (
  <HiChevronDown
    className={`h-4 w-4 text-[#5B5C60] transition-transform duration-200 ${isExpanded ? "rotate-180" : ""
      }`}
  />
));

ChevronIcon.displayName = "ChevronIcon";

/**
 * Product categories configuration
 */
const CATEGORIES = [
  { id: "iranian", label: "محصولات ایرانی", hasSubcategories: false },
  { id: "script", label: "اسکریپت آماده", hasSubcategories: true },
  { id: "plugin", label: "افزونه وردپرس", hasSubcategories: true },
  { id: "template", label: "قالب وردپرس", hasSubcategories: true },
  { id: "html", label: "قالب HTML", hasSubcategories: true },
  { id: "bundle", label: "بسته های شگفت انگیز", hasSubcategories: false },
  { id: "website", label: "سایت آماده", hasSubcategories: false },
];

/**
 * Category filters component
 * Displays product categories with checkboxes and expandable subcategories
 * @param {Object} props - Component props
 * @param {Set} props.activeFilters - Set of active filter IDs
 * @param {Set} props.expandedCategories - Set of expanded category IDs
 * @param {Function} props.onFilterToggle - Callback when filter is toggled
 * @param {Function} props.onCategoryToggle - Callback when category is expanded/collapsed
 * @returns {JSX.Element} Category filters section
 */
const CategoryFilters = ({ activeFilters, expandedCategories, onFilterToggle, onCategoryToggle }) => {
  return (
    <>
      {/* Section header */}
      <div
        className="items-center flex w-full justify-start gap-3 pb-2 my-2"
        data-cy="data-cy-icon-text-combo"
      >
        <CiMenuBurger className="text-xl text-[#FF9606]" />
        <span className="transition duration-300 text-bold text-base">دسته بندی محصولات</span>
      </div>

      {/* Categories list */}
      <ul>
        {CATEGORIES.map((category) => (
          <li key={category.id} className="my-2 text-[#5B5C60] first:mt-0 last:mb-0">
            {category.hasSubcategories ? (
              // Category with subcategories
              <div
                className="cursor-pointer flex w-full items-center justify-between"
                data-cy="data-cy-stylish-accordion-button"
              >
                <div className="flex items-center justify-start gap-[10px]">
                  <div className="flex items-center">
                    <button
                      type="button"
                      data-cy="data-cy-check-box-item"
                      aria-label={`Toggle ${category.label} filter`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onFilterToggle(category.id);
                      }}
                    >
                      <CheckboxIcon isChecked={activeFilters.has(category.id)} />
                    </button>
                    <span className="mr-4 w-full">
                      <p className="transition duration-300 text-sm text-i-typography leading-7 ml-4 line-clamp-1">
                        {category.label}
                      </p>
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onCategoryToggle(category.id)}
                  className="p-2"
                  aria-label={`${expandedCategories.has(category.id) ? "Collapse" : "Expand"
                    } ${category.label}`}
                >
                  <ChevronIcon isExpanded={expandedCategories.has(category.id)} />
                </button>
              </div>
            ) : (
              // Category without subcategories
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => onFilterToggle(category.id)}
                  aria-label={`Toggle ${category.label} filter`}
                >
                  <CheckboxIcon isChecked={activeFilters.has(category.id)} />
                </button>
                <span className="mr-4 w-full">
                  <p className="transition duration-300 text-sm text-i-typography leading-7 ml-4 line-clamp-1">
                    {category.label}
                  </p>
                </span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default React.memo(CategoryFilters);
