"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

/**
 * Product cards grid/list component
 * @param {Object} props - Component props
 * @param {Array} props.products - Array of products to display
 * @param {string} props.viewMode - View mode: 'grid' or 'list' (default: 'grid')
 * @returns {JSX.Element} Product cards in grid or list layout
 */
const ProductCardsGrid = ({ products = [], viewMode = "grid" }) => {
  // Force grid (vertical card) layout on mobile/tablet (<1024px)
  const [forceGrid, setForceGrid] = useState(true);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 1023px)");
    const handler = (e) => setForceGrid(e.matches);
    setForceGrid(mq.matches);
    mq.addEventListener?.("change", handler);
    mq.addListener?.(handler);
    return () => {
      mq.removeEventListener?.("change", handler);
      mq.removeListener?.(handler);
    };
  }, []);

  const effectiveViewMode = forceGrid ? "grid" : viewMode;
  // Validation
  if (!Array.isArray(products)) {
    return (
      <div className="text-center py-8 text-gray-500">
        خطا در بارگذاری محصولات
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        محصولی یافت نشد
      </div>
    );
  }

  // Dynamic container classes based on view mode
  const containerClasses = effectiveViewMode === "list" 
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

