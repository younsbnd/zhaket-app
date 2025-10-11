"use client";
import React, { memo } from "react";

/**
 * Category Data Interface
 * @typedef {Object} CategoryData
 * @property {string} name - Category display name
 * @property {string} [description] - Optional category description
 * @property {string} [slug] - URL-friendly category identifier
 */

const CategoryHeader = ({ categoryData }) => {
  // Guard clause - early return if no data provided
  if (!categoryData?.name) {
    return null;
  }

  const { name, description } = categoryData;

  return (
    <header className="mt-3">
      {/* Primary heading - important for SEO and accessibility */}
      <h1
        className="text-[22px] font-bold text-[#424244] md:text-2xl"
        data-nosnippet="true"
      >
        {name}
      </h1>

      {/* Optional description text - only renders if provided */}
      {description && (
        <p className="transition duration-300 text-[13px] font-medium text-[#878F9B] mt-2 leading-relaxed">
          {description}
        </p>
      )}
    </header>
  );
};

// Memoize component to prevent unnecessary re-renders
// Only re-renders when categoryData reference changes
export default memo(CategoryHeader);
