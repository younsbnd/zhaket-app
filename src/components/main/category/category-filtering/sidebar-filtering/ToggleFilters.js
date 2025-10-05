"use client";
import React from "react";
import { CiShop } from "react-icons/ci";
import { LuMonitor } from "react-icons/lu";
import { AiOutlineInfoCircle } from "react-icons/ai";

/**
 * Toggle switch component for on/off states
 * @param {Object} props - Component props
 * @param {boolean} props.isOn - Current state of the toggle
 * @param {Function} props.onChange - Callback when toggle is clicked
 * @returns {JSX.Element} Toggle switch element
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
    ></span>
  </button>
));

ToggleSwitch.displayName = "ToggleSwitch";

/**
 * Toggle filters component
 * Displays toggle switches for additional filtering options
 * @param {Object} props - Component props
 * @param {Object} props.toggles - Toggle states object
 * @param {boolean} props.toggles.sharedProducts - Shared products toggle state
 * @param {boolean} props.toggles.demoSearch - Demo search toggle state
 * @param {boolean} props.toggles.showUnavailable - Show unavailable products toggle state
 * @param {Function} props.onToggleChange - Callback when toggle is changed
 * @returns {JSX.Element} Toggle filters section
 */
const ToggleFilters = ({ toggles, onToggleChange }) => {
  return (
    <>
      {/* Shared products toggle */}
      <div className="flex items-center justify-between">
        <div className="ml-4">
          <div
            className="items-center flex w-full justify-start gap-3 my-2 pb-0"
            data-cy="data-cy-icon-text-combo"
          >
           <CiShop className="text-[#FF9606] text-2xl " />
            <span className="transition duration-300 text-i-typography text-base font-bold">
              محصولات اشتراکی
            </span>
          </div>
        </div>
        <ToggleSwitch isOn={toggles.sharedProducts} onChange={() => onToggleChange("sharedProducts")} />
      </div>

      {/* Demo search toggle */}
      <div className="flex items-center justify-between">
        <div className="ml-4">
          <div className="flex items-center gap-2">
            <div
              className="items-center flex w-full justify-start gap-3 my-2 pb-0"
              data-cy="data-cy-icon-text-combo"
            >
          <LuMonitor className="text-[#FF9606] text-xl "/>
              <span className="transition duration-300 text-i-typography text-base font-bold">
                جستجوی دمو
              </span>
            </div>
            <div className="z-10">
              {/* Info tooltip icon for demo search (react-icons) */}
              <AiOutlineInfoCircle className="text-[#878F9B]" size={16} aria-hidden />
            </div>
          </div>
        </div>
        <ToggleSwitch isOn={toggles.demoSearch} onChange={() => onToggleChange("demoSearch")} />
      </div>

      {/* Show unavailable products toggle */}
      <div className="flex items-center justify-between">
        <div className="ml-4">
          <div
            className="items-center flex w-full justify-start gap-3 my-2 pb-0"
            data-cy="data-cy-icon-text-combo"
          >
          <CiShop className="text-[#FF9606] text-2xl "/>
            <span className="transition duration-300 text-i-typography text-base font-bold">
              نمایش محصولات ناموجود
            </span>
          </div>
        </div>
        <ToggleSwitch isOn={toggles.showUnavailable} onChange={() => onToggleChange("showUnavailable")} />
      </div>
    </>
  );
};

export default React.memo(ToggleFilters);
