"use client";

import { useState, useEffect } from "react";
import { useParams, useSearchParams, useRouter, notFound } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/lib/api/fetcher";
import CategoryDesignUI from "./CategoryDesignUI";

/**
 * CategoryDesignLogic - Manages URL parameters, data fetching, and view state
 * for category filtering and pagination.
 */
export default function CategoryDesignLogic() {
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [viewMode, setViewMode] = useState("grid");
  const [isMobile, setIsMobile] = useState(false);

  // Responsive view mode detection
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(max-width: 1023px)");

    const handleMediaChange = (e) => {
      const mobile = e.matches;
      setIsMobile(mobile);
      setViewMode(mobile ? "grid" : "list");
    };

    handleMediaChange(mediaQuery);
    mediaQuery.addEventListener("change", handleMediaChange);

    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  // Extract URL parameters with defaults
  const sortBy = searchParams.get("sortBy") || "createdAt";
  const sortOrder = searchParams.get("sortOrder") || "desc";
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "5";

  // Construct API URL
  const apiUrl = `/api/main/category/category-filtering/${slug}?sortBy=${sortBy}&sortOrder=${sortOrder}&page=${page}&limit=${limit}`;

  // Fetch category data
  const { data, error, isLoading } = useSWR(apiUrl, fetcher, {
    keepPreviousData: true,
    revalidateOnFocus: false,
    dedupingInterval: 5000,
  });

  if (error?.status === 404) notFound();

  /**
   * Updates URL parameters and triggers navigation
   * @param {Object} params - Key-value pairs to update in URL
   */
  const pushParams = (params) => {
    const newParams = new URLSearchParams(searchParams);

    Object.entries(params).forEach(([key, value]) => {
      newParams.set(key, value);
    });

    router.push(`/category/${slug}?${newParams.toString()}`, { scroll: false });
  };

  /**
   * Handles sort option changes
   * Note: Does not reset pagination to allow filtering on current page
   */
  const handleSortChange = (sort, order) => {
    pushParams({ sortBy: sort, sortOrder: order });
  };

  /**
   * Toggles view mode between grid and list
   * Only available on desktop devices
   */
  const handleViewModeChange = (mode) => {
    if (!isMobile) setViewMode(mode);
  };

  /**
   * Resets sorting to default values (newest first)
   */
  const handleResetSort = () => {
    pushParams({ sortBy: "createdAt", sortOrder: "desc" });
  };

  // Derived state
  const currentSort = { sortBy, sortOrder };
  const hasActiveSort = sortBy !== "createdAt" || sortOrder !== "desc";

  return (
    <CategoryDesignUI
      data={data}
      error={error}
      isLoading={isLoading}
      limit={limit}
      viewMode={viewMode}
      handleSortChange={handleSortChange}
      handleViewModeChange={handleViewModeChange}
      handleResetSort={handleResetSort}
      hasActiveSort={hasActiveSort}
      pushParams={pushParams}
      slug={slug}
      currentSort={currentSort}
    />
  );
}
