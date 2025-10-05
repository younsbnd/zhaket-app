"use client";
import React, { useCallback, useMemo, useState, useEffect } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/lib/api/fetcher";
import { logger } from "@/lib/utils/logger";
import BreadcrumbSection from "./category-filtering/breadcrumbsection/BreadcrumbSection";
import NavbarFiltering from "./category-filtering/navbar-filtering/NavbarFiltering";
import SidebarFiltering from "./category-filtering/sidebar-filtering/SidebarFiltering";
import ProductCardsGrid from "../home/product-card/ProductCardsGrid";
import BreadcrumbSkeleton from "@/components/skeletons/main/catgory/category-filtering/BreadcrumbSkeleton";
import FilteringSkeleton from "@/components/skeletons/main/catgory/category-filtering/FilteringSkeleton";
import ProductSkeleton from "@/components/skeletons/main/catgory/category-filtering/ProductSkeleton";
import Pagination from "@/components/common/Pagination";

/**
 * Category page logic component
 * Handles product listing, filtering, and sorting for a specific category
 */
const CategoryLogic = () => {
  // Get category slug from URL params
    const { slug } = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();
    
  // View mode state - 'grid' or 'list'
  // Default to grid to render vertical cards on mobile/tablet before hydration
  const [viewMode, setViewMode] = useState("grid");
  const [isMobile, setIsMobile] = useState(false);

  // Force list view on mobile screens
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 1023px)");
    const handleChange = (e) => {
      setIsMobile(e.matches);
      if (e.matches) {
        setViewMode("grid");
      }
    };

    // Initial check
    setIsMobile(mq.matches);
    setViewMode(mq.matches ? "grid" : "list");

    // Listen for viewport changes
    mq.addEventListener?.("change", handleChange);
    // Fallback for older browsers
    mq.addListener?.(handleChange);

    return () => {
      mq.removeEventListener?.("change", handleChange);
      mq.removeListener?.(handleChange);
    };
  }, []);

  // Extract query parameters with default values
  const sortBy = searchParams.get("sortBy") || "createdAt";
  const sortOrder = searchParams.get("sortOrder") || "desc";
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "12";

  // Check if this is "all products" page (no slug)
  const isAllProducts = !slug;

  // Memoized API URL to prevent unnecessary re-renders
  const apiUrl = useMemo(() => {
    // If no slug, it's the "all products" page
    if (isAllProducts) {
      return `/api/main/products?sortBy=${sortBy}&sortOrder=${sortOrder}&page=${page}&limit=${limit}`;
    }
    return `/api/main/category/category-filtering/${slug}?sortBy=${sortBy}&sortOrder=${sortOrder}&page=${page}&limit=${limit}`;
  }, [slug, sortBy, sortOrder, page, limit, isAllProducts]);

  // Fetch products data using SWR for caching and revalidation
  const { data: productsData, error: fetchError, isLoading: isFetching } = useSWR(apiUrl, fetcher, {
    revalidateOnFocus: false, // Don't revalidate on window focus
    revalidateOnReconnect: true, // Revalidate on reconnect
    dedupingInterval: 5000, // Dedupe requests within 5 seconds
    keepPreviousData: true, // Keep previous data while fetching new data
    onSuccess: (data) => {
      // Unified info log for successful fetches
      logger.info('[SWR Success]', {
        url: apiUrl,
        dataLength: data?.data?.length || 0,
        hasData: !!data,
        hasPagination: !!data?.pagination,
      });
    },
    onError: (error) => {
      // Unified error log for failed fetches
      logger.error('[SWR Error]', {
        url: apiUrl,
        message: error.message,
        status: error.status
      });
    }
  });

  // Handle fetch errors
    if (fetchError) {
    // Enhanced error logging
    if (process.env.NODE_ENV === 'development') {
      logger.error('[CategoryLogic Error]:', {
        message: fetchError.message || 'Unknown error',
        status: fetchError.status || 'N/A',
        info: fetchError.info || {},
        slug: slug || 'all products',
        apiUrl,
        isAllProducts,
        errorObject: fetchError
      });
    }
    
    logger.error("Failed to fetch products:", {
      message: fetchError.message || 'Unknown error',
      status: fetchError.status || 0,
      info: fetchError.info || {},
      slug,
      apiUrl,
      isAllProducts,
    });

    // Only trigger 404 for specific category pages, not for all products page
    if (fetchError.status === 404 && !isAllProducts) {
      notFound();
    }
  }

  // Log successful data fetch in development
  if (productsData) {
    logger.info('[CategoryLogic Success]', { count: productsData?.data?.length || 0, url: apiUrl });
  }

  /**
   * Handle sort option change
   * Updates URL params and navigates to new URL with sorting applied
   * @param {string} newSortBy - Sort field (e.g., 'price', 'createdAt')
   * @param {string} newSortOrder - Sort order ('asc' or 'desc')
   */
  const handleSortChange = useCallback(
    (newSortBy, newSortOrder) => {
      const params = new URLSearchParams(searchParams);
      params.set("sortBy", newSortBy);
      params.set("sortOrder", newSortOrder);
      params.set("page", "1"); // Reset to first page on sort change
      
      const url = !slug
        ? `/category?${params.toString()}` 
        : `/category/${slug}?${params.toString()}`;
      
      router.push(url, { scroll: false });
    },
    [searchParams, router, slug]
  );

  /**
   * Handle view mode change
   * @param {string} mode - 'grid' or 'list'
   */
  const handleViewModeChange = useCallback((mode) => {
    if (isMobile) {
      setViewMode("grid");
      return;
    }
    setViewMode(mode);
  }, [isMobile]);

  /**
   * Handle reset sort to default
   */
  const handleResetSort = useCallback(() => {
        const params = new URLSearchParams(searchParams);
    params.set("sortBy", "createdAt");
    params.set("sortOrder", "desc");
    params.set("page", "1");
    
    const url = !slug
      ? `/category?${params.toString()}` 
      : `/category/${slug}?${params.toString()}`;
    
    router.push(url, { scroll: false });
    }, [searchParams, router, slug]);

  /**
   * Check if non-default sort is active
   */
  const hasActiveSort = useMemo(() => {
    return sortBy !== "createdAt" || sortOrder !== "desc";
  }, [sortBy, sortOrder]);

  // Render skeleton on initial load
  if (isFetching && !productsData) {
    return (
      <main className="group/pending relative">
        <BreadcrumbSkeleton hasCategory={!isAllProducts} />
        <div className="bg-[#F4F5F6] h-[1px] w-full hidden md:block"></div>
        <div className="w-full md:bg-[#FFFFFF]">
          <div className="max-w-[1279px] md:mx-auto md:flex md:justify-between md:gap-4 md:px-4 2xl:px-0">
            {/* Sidebar skeleton (25%) */}
            <div className="md:relative md:w-[25%]">
              <FilteringSkeleton type="sidebar" />
            </div>

            <div className="bg-[#F4F5F6] w-[1px]"></div>

            {/* Main skeleton (75%) */}
            <div className="w-full md:w-[75%] md:pb-4">
              <FilteringSkeleton type="navbar" />
              <ProductSkeleton viewMode={viewMode} count={12} />
            </div>
          </div>
        </div>
      </main>
    );
  }

    return (
        <main className="group/pending relative overflow-x-hidden">
      <BreadcrumbSection categoryData={isAllProducts ? null : productsData?.category} />
            <div className="bg-[#F4F5F6] h-[1px] w-full hidden md:block"></div>

            <div className="w-full md:bg-[#FFFFFF]">
                <div className="max-w-[1279px] md:mx-auto md:flex md:justify-between md:gap-4 md:px-4 2xl:px-0">
          {/* Sidebar - 25% width */}
                    <div className="md:relative md:w-[25%]">
            <SidebarFiltering 
              onResetSort={handleResetSort} 
              hasActiveSort={hasActiveSort} 
            />
                    </div>

                    <div className="bg-[#F4F5F6] w-[1px]"></div>

          {/* Main content - 75% width */}
                    <div className="w-full md:w-[75%] md:pb-4">
                        <NavbarFiltering
                            onSortChange={handleSortChange}
                            currentSort={{ sortBy, sortOrder }}
              onViewModeChange={handleViewModeChange}
              viewMode={viewMode}
            />

            {/* Error state */}
            {fetchError && (
              <div className="text-center py-8">
                <div className="text-red-500 mb-2">خطا در بارگذاری محصولات</div>
                {fetchError.info?.message && (
                  <div className="text-sm text-gray-600">{fetchError.info.message}</div>
                )}
                {process.env.NODE_ENV === "development" && (
                  <div className="text-xs text-gray-400 mt-2">
                    Status: {fetchError.status} | Page: {isAllProducts ? 'all products' : slug}
                            </div>
                        )}
                            </div>
                        )}

            {/* Product grid */}
                        {!isFetching && !fetchError && (
              <>
                {productsData?.data?.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">محصولی یافت نشد</p>
                    {process.env.NODE_ENV === "development" && (
                      <p className="text-xs text-gray-400 mt-2">
                        API URL: {apiUrl}
                      </p>
                    )}
                  </div>
                ) : (
                  <>
                    <ProductCardsGrid 
                      products={productsData?.data || []} 
                      viewMode={viewMode} 
                    />
                    
                    {/* Pagination */}
                    {productsData?.pagination && productsData.pagination.totalPages > 1 && (
                      <Pagination
                        currentPage={productsData.pagination.currentPage}
                        totalPages={productsData.pagination.totalPages}
                        onPageChange={(page) => {
                          const params = new URLSearchParams(searchParams);
                          params.set("page", page.toString());
                          const url = isAllProducts 
                            ? `/category?${params.toString()}` 
                            : `/category/${slug}?${params.toString()}`;
                          router.push(url, { scroll: true });
                        }}
                      />
                    )}
                  </>
                )}
              </>
                        )}
                    </div>
                </div>
            </div>

            <div className="bg-[#F4F5F6] h-[1px] mb-9 hidden w-full md:block"></div>
        </main>
    );
};

export default CategoryLogic;
