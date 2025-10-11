"use client";
import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { filterItems } from "@/constants/main/catgory/category-filtering/sidebar-filtering/filterOptions";

/**
 * Toggle switch component for on/off states
 */
const ToggleSwitch = React.memo(({ isOn, onChange }) => (
  <button
    type="button"
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-hidden ${
      isOn ? "bg-[#FF9606]" : "bg-gray-200"
    }`}
    onClick={onChange}
    data-cy="data-cy-view-selector"
    dir="ltr"
    role="switch"
    aria-checked={isOn}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
        isOn ? "translate-x-6" : "translate-x-1"
      }`}
    />
  </button>
));

ToggleSwitch.displayName = "ToggleSwitch";

/**
 * Toggle item component - single reusable toggle row
 */
const ToggleItem = React.memo(({ Icon, iconClassName, label, isOn, onChange, showInfo }) => (
  <div className="flex items-center justify-between">
    <div className="ml-4">
      <div className="items-center flex w-full justify-start gap-3 my-2 pb-0" data-cy="data-cy-icon-text-combo">
        <Icon className={`text-[#FF9606] ${iconClassName}`} />
        <span className="transition duration-300 text-i-typography text-base font-bold">
          {label}
        </span>
        {showInfo && (
          <div className="z-10">
            <AiOutlineInfoCircle className="text-[#878F9B]" size={16} aria-hidden />
          </div>
        )}
      </div>
    </div>
    <ToggleSwitch isOn={isOn} onChange={onChange} />
  </div>
));

ToggleItem.displayName = "ToggleItem";

/**
 * Toggle filters component
 */
const ToggleFilters = ({ toggles, onToggleChange }) => {
  return (
    <>
      {filterItems.map(({ key, Icon, iconClassName, label, showInfo }) => (
        <ToggleItem
          key={key}
          Icon={Icon}
          iconClassName={iconClassName}
          label={label}
          isOn={toggles?.[key] ?? false}
          onChange={() => onToggleChange(key)}
          showInfo={showInfo}
        />
      ))}
    </>
  );
};

export default React.memo(ToggleFilters);
