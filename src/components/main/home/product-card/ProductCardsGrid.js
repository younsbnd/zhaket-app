"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

// ============================================================================
// CONSTANTS
// ============================================================================

const MOBILE_BREAKPOINT = "(max-width: 1023px)";
const DEFAULT_VIEW_MODE = "grid";

// ============================================================================
// PRODUCT CARDS GRID COMPONENT
// ============================================================================

/**
 * ProductCardsGrid Component
 * Renders products in grid or list layout with responsive behavior
 * Automatically switches to grid view on mobile devices
 */
const ProductCardsGrid = ({ products = [], viewMode = DEFAULT_VIEW_MODE }) => {
  // Force grid layout on mobile/tablet screens
  const [isMobileView, setIsMobileView] = useState(true);

  // Responsive view detection
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(MOBILE_BREAKPOINT);

    const handleViewportChange = (event) => setIsMobileView(event.matches);

    // Initialize
    handleViewportChange(mediaQuery);

    // Listen for changes
    mediaQuery.addEventListener("change", handleViewportChange);

    return () => mediaQuery.removeEventListener("change", handleViewportChange);
  }, []);

  // Determine effective view mode
  const effectiveViewMode = isMobileView ? "grid" : viewMode;

  // Validation: Invalid products array
  if (!Array.isArray(products)) {
    return (
      <div className="text-center py-8 text-gray-500" role="alert">
        خطا در بارگذاری محصولات
      </div>
    );
  }

  // Empty state
  if (products.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500" role="status">
        محصولی یافت نشد
      </div>
    );
  }

  // Dynamic container classes
  const containerClasses =
    effectiveViewMode === "list"
      ? "flex flex-col gap-4 p-4 md:p-6"
      : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4";

  return (
    <div className={containerClasses} role="list">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          viewMode={effectiveViewMode}
        />
      ))}
    </div>
  );
};

export default React.memo(ProductCardsGrid);
