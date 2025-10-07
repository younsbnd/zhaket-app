"use client";
import React, { useCallback, useMemo, useState, useEffect } from "react";
import { useParams, useSearchParams, useRouter, notFound } from "next/navigation";
import useSWR from "swr";

// Local modules
import { fetcher } from "@/lib/api/fetcher";
import { logger } from "@/lib/utils/logger";
import BreadcrumbSection from "./category-filtering/breadcrumbsection/BreadcrumbSection";
import NavbarFiltering from "./category-filtering/navbar-filtering/NavbarFiltering";
import SidebarFiltering from "./category-filtering/sidebar-filtering/SidebarFiltering";
import ProductCardsGrid from "../home/product-card/ProductCardsGrid";
import PaginationExact from "@/components/common/Pagination";
import ProductSkeleton from "@/components/skeletons/main/catgory/category-filtering/ProductSkeleton";
 

/**
 * Handles category/all-products listing with sorting, view modes, filtering, and pagination.
 */
export default function CategoryLogic() {
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [viewMode, setViewMode] = useState("grid");
  const [isMobile, setIsMobile] = useState(false);
  const isAllProducts = !slug;

  /** Detect mobile & enforce grid mode */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 1023px)");
    const handleChange = (e) => {
      setIsMobile(e.matches);
      setViewMode(e.matches ? "grid" : "list");
    };
    setIsMobile(mq.matches);
    setViewMode(mq.matches ? "grid" : "list");

    mq.addEventListener?.("change", handleChange);
    mq.addListener?.(handleChange);
    return () => {
      mq.removeEventListener?.("change", handleChange);
      mq.removeListener?.(handleChange);
    };
  }, []);

  /** Query params */
  const sortBy = searchParams.get("sortBy") || "createdAt";
  const sortOrder = searchParams.get("sortOrder") || "desc";
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "5";

  /** API URL */
  const apiUrl = useMemo(() => {
    const base = isAllProducts
      ? `/api/main/products`
      : `/api/main/category/category-filtering/${slug}`;
    return `${base}?sortBy=${sortBy}&sortOrder=${sortOrder}&page=${page}&limit=${limit}`;
  }, [slug, sortBy, sortOrder, page, limit, isAllProducts]);

  /** Fetch data via SWR */
  const { data, error, isLoading } = useSWR(apiUrl, fetcher, {
    keepPreviousData: true,
    revalidateOnFocus: false,
    dedupingInterval: 5000,
    onSuccess: (res) => logger.info("[SWR Success]", { url: apiUrl, count: res?.data?.length }),
    onError: (err) => logger.error("[SWR Error]", { url: apiUrl, msg: err.message })
  });

  /** 404 handling for missing category */
  if (error && error.status === 404 && !isAllProducts) notFound();

  /** Helpers */
  const pushParams = (paramsObj) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(paramsObj).forEach(([k, v]) => params.set(k, v));
    const url = isAllProducts
      ? `/category?${params}`
      : `/category/${slug}?${params}`;
    router.push(url, { scroll: false });
  };

  const handleSortChange = useCallback(
    (newSortBy, newSortOrder) => pushParams({ sortBy: newSortBy, sortOrder: newSortOrder, page: "1" }),
    [searchParams, slug]
  );

  const handleViewModeChange = useCallback((mode) => {
    if (!isMobile) setViewMode(mode);
  }, [isMobile]);

  const handleResetSort = useCallback(
    () => pushParams({ sortBy: "createdAt", sortOrder: "desc", page: "1" }),
    [searchParams, slug]
  );

  const hasActiveSort = useMemo(() => sortBy !== "createdAt" || sortOrder !== "desc", [sortBy, sortOrder]);

  /** Render */
  return (
    <main className="group/pending relative overflow-x-hidden">
      {/* Breadcrumb */}
      <BreadcrumbSection categoryData={isAllProducts ? null : data?.category} />

      {/* Divider */}
      <div className="bg-[#F4F5F6] h-px w-full hidden md:block"></div>

      <div className="w-full md:bg-white">
        <div className="max-w-[1279px] md:mx-auto md:flex md:gap-4 md:px-4 2xl:px-0">
          <aside className="md:w-1/4">
            <SidebarFiltering onResetSort={handleResetSort} hasActiveSort={hasActiveSort} />
          </aside>

          <div className="bg-[#F4F5F6] w-px"></div>

          <section className="w-full md:w-3/4 md:pb-4">
            <NavbarFiltering
              onSortChange={handleSortChange}
              currentSort={{ sortBy, sortOrder }}
              onViewModeChange={handleViewModeChange}
              viewMode={viewMode}
            />

            {/* Loading State */}
            {isLoading && (
              <ProductSkeleton viewMode={viewMode} count={parseInt(limit)} />
            )}

            {/* Products */}
            {!isLoading && !error && data?.data?.length > 0 && (
              <>
                <ProductCardsGrid products={data.data} viewMode={viewMode} />

                {/* Pagination — ONLY if totalPages > 1 */}
                {data?.pagination?.totalPages > 1 && (
                  <PaginationExact
                    currentPage={data.pagination.currentPage}
                    totalPages={data.pagination.totalPages}
                    baseUrl={isAllProducts ? "/category?page=" : `/category/${slug}?page=`}
                    siblingCount={1}
                    onPageChange={(pageNum) => pushParams({ page: pageNum.toString() })}
                  />
                )}
              </>
            )}

            {/* Empty state */}
            {!isLoading && !error && data?.data?.length === 0 && (
              <div className="text-center py-12 text-gray-500">No products found</div>
            )}

            {/* Error state */}
            {!isLoading && error && !error.status === 404 && (
              <div className="text-center py-12 text-red-500">
                خطا در بارگذاری محصولات. لطفاً دوباره تلاش کنید.
              </div>
            )}
          </section>
        </div>
      </div>

      <div className="bg-[#F4F5F6] h-px mb-9 hidden w-full md:block"></div>
    </main>
  );
}
