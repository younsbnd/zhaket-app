"use client";
import React, { useMemo, memo } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

import BreadcrumbNavigation from "./BreadcrumbNavigation";
import CategoryHeader from "./CategoryHeader";

const BreadcrumbSection = ({
  routeLabels = {},
  categoryData = null,
  showHome = true,
  homeText = "خانه",
  homeHref = "/",
}) => {
  const pathname = usePathname();

  /**
   * Generate breadcrumb trail based on current pathname
   * Only shows home link and category name (if exists)
   * Prevents intermediate segments from creating broken links
   * Returns array of breadcrumb objects: { label, href, isActive }
   */
  const breadcrumbs = useMemo(() => {
    const trail = [];

    // Add home link if enabled - this is the only always-visible link
    if (showHome) {
      trail.push({
        label: homeText,
        href: homeHref,
        isActive: !categoryData // Home is active only when no category exists
      });
    }

    // Add category-specific breadcrumb if category data exists
    // This is the final destination, so it's marked as active
    if (categoryData?.name) {
      trail.push({
        label: categoryData.name,
        href: `/category/${categoryData.slug}`,
        isActive: true
      });
    }

    return trail;
  }, [showHome, homeText, homeHref, categoryData]);

  return (
    <section className="relative">
      {/* Hero background image - covers top section with gradient overlay */}
      <Image
        alt="Category background"
        className="absolute top-0 right-0 -z-10 w-full h-[55vh] object-cover md:h-[50vh]"
        src="/images/main/category/category-bg.svg"
        fill
        priority
      />

      {/* Main content container with max-width and responsive padding */}
      <div className="mx-auto max-w-[1279px] md:px-4 2xl:px-0">
        <div className="gap-2 pb-2 pt-9 md:flex md:py-6">
          {/* Breadcrumb and category header section */}
          <div className="flex flex-col justify-center gap-1 px-4 md:flex-1 md:gap-3 md:p-0">
            {/* Breadcrumb navigation - shows only home and category */}
            <BreadcrumbNavigation breadcrumbs={breadcrumbs} />
            
            {/* Category header - displays category details when available */}
            {categoryData && <CategoryHeader categoryData={categoryData} />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(BreadcrumbSection);
