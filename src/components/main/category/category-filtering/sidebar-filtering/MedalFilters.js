"use client";
import React from "react";
import { HiArrowNarrowDown } from "react-icons/hi";
import { HiCheck } from "react-icons/hi2";
import { FaStar } from "react-icons/fa";
import { MEDAL_CATEGORIES } from "@/constants/main/category/category-filtering/filterOptions";
import Image from "next/image";

/**
 * Checkbox icon component with gradient background when checked
 * @param {Object} props - Component props
 * @param {boolean} props.isChecked - Whether the checkbox is checked
 * @returns {JSX.Element} Checkbox icon element
 */
const CheckboxIcon = React.memo(({ isChecked }) => (
  <div
    className={`border-i-gray flex items-center justify-center rounded-sm border-2 h-4 w-4 ${
      isChecked ? "border-none bg-[linear-gradient(247.65deg,_#FFC107_-35.57%,_#FF9737_100%)]" : ""
    }`}
  >
    {isChecked && <HiCheck className="h-3 w-3 text-white" />}
  </div>
));

CheckboxIcon.displayName = "CheckboxIcon";

// Medal categories are provided from centralized constants to avoid duplication

/**
 * Medal filters component
 * Displays product quality badges/medals as filter options
 * @param {Object} props - Component props
 * @param {Set} props.activeFilters - Set of active filter IDs
 * @param {Function} props.onFilterToggle - Callback when filter is toggled
 * @returns {JSX.Element} Medal filters section
 */
const MedalFilters = ({ activeFilters, onFilterToggle }) => {
  return (
    <>
      {/* Section header */}
      <div
        className="items-center flex w-full justify-start gap-3 pb-2 my-2"
        data-cy="data-cy-icon-text-combo"
      >
        <FaStar className="h-4 w-4 text-[#f9cf51]" />
        <span className="transition duration-300 text-sm text-i-typography leading-7">
          بر اساس مدال
        </span>
      </div>

      {/* Medal-based filtering list */}
      <ul>
        {MEDAL_CATEGORIES.map((medal) => (
          <li key={medal.id} className="my-2 text-[#5B5C60]">
            <div className="flex items-center">
              <button
                type="button"
                data-cy="data-cy-check-box-item"
                onClick={() => onFilterToggle(medal.id)}
                role="checkbox"
                tabIndex={0}
                aria-checked={activeFilters.has(medal.id)}
                aria-label={`Toggle ${medal.label} filter`}
              >
                <CheckboxIcon isChecked={activeFilters.has(medal.id)} />
              </button>
              <span className="mr-4 w-full">
                <div className="flex items-center justify-between">
                  <p className="transition duration-300 text-sm text-i-typography leading-7">
                    {medal.label}
                  </p>
                  {/* Decorative icon for the medal item (uses static SVG asset) */}
                  <Image
                    alt={medal.label}
                    loading="lazy"
                    width={36}
                    height={36}
                    decoding="async"
                    src={medal.icon}
                    className="select-none"
                  />
                </div>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default React.memo(MedalFilters);
