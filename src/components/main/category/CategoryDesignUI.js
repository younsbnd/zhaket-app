"use client";

import React from "react";
import BreadcrumbSection from "./category-filtering/breadcrumbsection/BreadcrumbSection";
import NavbarFiltering from "./category-filtering/navbar-filtering/NavbarFiltering";
import SidebarFilteringLogic from "./category-filtering/sidebar-filtering/sidebar-filtering-logic/SidebarFilteringLogic";
import ProductCardsGrid from "../home/product-card/ProductCardsGrid";
import CategoryFAQSection from "./faq/CategoryFAQSection";

import ProductSkeleton from "@/components/skeletons/main/catgory/category-filtering/ProductSkeleton";
import PaginationExact from "@/components/common/pagination/PaginationExact";

/**
 * Presentation-only component
 * Gets props from CategoryDesignLogic, stays stateless.
 */
export default function CategoryDesignUI({
  data,
  error,
  isLoading,
  limit,
  viewMode,
  handleSortChange,
  handleViewModeChange,
  handleResetSort,
  hasActiveSort,
  pushParams,
  slug,
  currentSort, // highlight controlled by this
}) {
  return (
    <div>
      {/* Breadcrumb navigation */}
      <BreadcrumbSection categoryData={data?.category} />
      <div className="bg-[#F4F5F6] h-px hidden md:block" /> {/* divider */}
      <div className="w-full md:bg-white">
        <div className="max-w-[1279px] md:mx-auto md:flex md:items-start md:gap-4 md:px-4 2xl:px-0">
          {/* Sidebar */}
          <aside className="md:w-1/4 md:sticky md:top-11 h-max">
            <SidebarFilteringLogic
              onResetSort={handleResetSort}
              hasActiveSort={hasActiveSort}
            />
          </aside>
          <div className="bg-[#F4F5F6] w-px hidden md:block" /> {/* divider */}
          {/* Product section */}
          <section className="w-full md:w-3/4 md:pb-4">
            <NavbarFiltering
              onSortChange={handleSortChange}
              currentSort={currentSort} //  highlight uses this props
              onViewModeChange={handleViewModeChange}
              viewMode={viewMode}
            />

            {/* if loading, show a skeleton */}
            {isLoading && (
              <ProductSkeleton viewMode={viewMode} count={parseInt(limit)} />
            )}

            {/* if there are products, show the products */}
            {!isLoading && !error && data?.data?.length > 0 && (
              <>
                <ProductCardsGrid products={data.data} viewMode={viewMode} />
                {data.pagination?.totalPages > 1 && (
                  <PaginationExact
                    currentPage={data.pagination.currentPage}
                    totalPages={data.pagination.totalPages}
                    baseUrl={`/category/${slug}?page=`}
                    siblingCount={1}
                    onPageChange={(pageNum) =>
                      pushParams({ page: pageNum.toString() })
                    }
                  />
                )}
              </>
            )}

            {/* if no products, show a message */}
            {!isLoading && !error && data?.data?.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                محصولی یافت نشد
              </div>
            )}

            {/* if there is an error, show a message */}
            {!isLoading && error && error.status !== 404 && (
              <div className="text-center py-12 text-red-500">
                خطا در بارگذاری محصولات. لطفا دوباره تلاش کنید.
              </div>
            )}
            {!isLoading &&
              data?.category?.faqs &&
              data.category.faqs.length > 0 && (
                <div className="max-w-[1279px] mx-auto px-4 2xl:px-0 mt-26 mb-8 ">
                  <CategoryFAQSection faqs={data.category.faqs} />
                </div>
              )}
          </section>
        </div>
      </div>
      <div className="bg-[#F4F5F6] h-px mb-9 hidden md:block" />{" "}
      {/* bottom divider */}
    </div>
  );
}
