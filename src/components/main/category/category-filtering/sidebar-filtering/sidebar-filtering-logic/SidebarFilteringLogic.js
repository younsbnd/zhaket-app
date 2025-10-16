"use client";
import React, { useState, useCallback, useMemo } from "react";
import SidebarFiltering from "../SidebarFiltering";

const SidebarFilteringLogic = ({
  onResetSort,
  hasActiveSort = false,
  onFilterChange // NEW: Add this prop
}) => {
  // Active filter IDs (brand, color, size, etc.)
  const [activeFilters, setActiveFilters] = useState(new Set());

  // Expanded category IDs in accordion
  const [expandedCategories, setExpandedCategories] = useState(new Set());

  // Toggle switches state (shared products, demo search, show unavailable)
  const [toggles, setToggles] = useState({
    sharedProducts: false,
    demoSearch: false,
    showUnavailable: false,
  });

  // Mobile filter modal open/close state
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  /**
   * Toggle individual filter on/off
   * Adds or removes filter ID from activeFilters set
   */
  const handleFilterToggle = useCallback((id) => {
    setActiveFilters((prev) => {
      const updated = new Set(prev);
      updated.has(id) ? updated.delete(id) : updated.add(id);
      return updated;
    });
    // Reset page to 1 when filter changes
    onFilterChange?.();
  }, [onFilterChange]);

  /**
   * Toggle category expansion in accordion
   * Expands or collapses category section
   */
  const handleCategoryToggle = useCallback((id) => {
    setExpandedCategories((prev) => {
      const updated = new Set(prev);
      updated.has(id) ? updated.delete(id) : updated.add(id);
      return updated;
    });
  }, []);

  /**
   * Handle toggle switch changes
   * Updates specific toggle state by name
   */
  const handleToggleChange = useCallback((name) => {
    setToggles((prev) => ({ ...prev, [name]: !prev[name] }));
    // Reset page to 1 when toggle changes
    onFilterChange?.();
  }, [onFilterChange]);

  /**
   * Clear all active filters
   * Resets filters and toggles to initial state
   */
  const clearAllFilters = useCallback(() => {
    setActiveFilters(new Set());
    setToggles({
      sharedProducts: false,
      demoSearch: false,
      showUnavailable: false,
    });
    // Reset page to 1 when clearing filters
    onFilterChange?.();
  }, [onFilterChange]);

  /**
   * Clear all filters and sorting
   * Resets both filters and active sort
   */
  const clearAllFiltersAndSort = useCallback(() => {
    clearAllFilters();
    if (hasActiveSort) onResetSort?.();
  }, [clearAllFilters, hasActiveSort, onResetSort]);

  // ============================================================================
  // COMPUTED VALUES
  // ============================================================================

  /**
   * Check if any filter is active
   * Returns true if filters or toggles are applied
   */
  const hasActiveFilters = useMemo(
    () => activeFilters.size > 0 || Object.values(toggles).some(Boolean),
    [activeFilters, toggles]
  );

  /**
   * Check if any filter or sort is active
   * Used to show/hide "Clear All" button
   */
  const hasAnyActiveFilterOrSort = useMemo(
    () => hasActiveFilters || hasActiveSort,
    [hasActiveFilters, hasActiveSort]
  );

  // ============================================================================
  // RENDER
  // ============================================================================

  // Pass all state and handlers to presentation component
  return (
    <SidebarFiltering
      activeFilters={activeFilters}
      expandedCategories={expandedCategories}
      toggles={toggles}
      isMobileModalOpen={isMobileModalOpen}
      hasAnyActiveFilterOrSort={hasAnyActiveFilterOrSort}
      onFilterToggle={handleFilterToggle}
      onCategoryToggle={handleCategoryToggle}
      onToggleChange={handleToggleChange}
      onClearAllFilters={clearAllFilters}
      onClearAllFiltersAndSort={clearAllFiltersAndSort}
      onOpenMobileModal={() => setIsMobileModalOpen(true)}
      onCloseMobileModal={() => setIsMobileModalOpen(false)}
    />
  );
};

export default React.memo(SidebarFilteringLogic);
