"use client";
import React from "react";
import { HiXMark } from "react-icons/hi2";

/**
 * MobileFiltersModal
 * Simple mobile modal/drawer container for sidebar filters
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal is visible
 * @param {Function} props.onClose - Close handler
 * @param {React.ReactNode} props.children - Modal content (filters)
 */
const MobileFiltersModal = ({ isOpen = false, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="absolute right-0 top-0 h-full w-[88%] max-w-[420px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.15)] animate-in slide-in-from-right">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#F4F5F6]">
          <p className="font-bold text-[16px] text-[#424244]">فیلترها</p>
          <button
            type="button"
            aria-label="بستن فیلترها"
            className="flex items-center gap-2 rounded-md p-2 text-[#76767C] hover:bg-[#F9FAFC]"
            onClick={onClose}
          >
            <HiXMark className="h-5 w-5" />
            بستن
          </button>
        </div>

        {/* Content */}
        <div className="h-[calc(100%-60px)] overflow-y-auto p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default React.memo(MobileFiltersModal);


