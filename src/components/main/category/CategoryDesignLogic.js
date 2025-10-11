"use client";

import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, useRouter, notFound } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/lib/api/fetcher";
import CategoryDesignUI from "./CategoryDesignUI";

/** CategoryDesignLogic — handles URL, fetch, and states. */
export default function CategoryDesignLogic() {
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [viewMode, setViewMode] = useState("grid");
  const [isMobile, setIsMobile] = useState(false);

  /** Responsive view detection */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 1023px)");
    const handle = (e) => {
      const mobile = e.matches;
      setIsMobile(mobile);
      setViewMode(mobile ? "grid" : "list");
    };
    handle(mq);
    mq.addEventListener("change", handle);
    return () => mq.removeEventListener("change", handle);
  }, []);

  /** Read params & set defaults */
  const sortBy = searchParams.get("sortBy") || "createdAt";
  const sortOrder = searchParams.get("sortOrder") || "desc";
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "5";

  const apiUrl = `/api/main/category/category-filtering/${slug}?sortBy=${sortBy}&sortOrder=${sortOrder}&page=${page}&limit=${limit}`;

  /** Fetch data */
  const { data, error, isLoading } = useSWR(apiUrl, fetcher, {
    keepPreviousData: true,
    revalidateOnFocus: false,
    dedupingInterval: 5000,
  });

  if (error?.status === 404) notFound();

  /** Update URL and refetch */
  const pushParams = (obj) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    Object.entries(obj).forEach(([k, v]) => params.set(k, v));
    router.push(`/category/${slug}?${params}`, { scroll: false });
  };

  /** Handlers */
  const handleSortChange = (sort, order) =>
    pushParams({ sortBy: sort, sortOrder: order, page: "1" });
  const handleViewModeChange = (mode) => !isMobile && setViewMode(mode);
  const handleResetSort = () =>
    pushParams({ sortBy: "createdAt", sortOrder: "desc", page: "1" });

  /** Derived props */
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
