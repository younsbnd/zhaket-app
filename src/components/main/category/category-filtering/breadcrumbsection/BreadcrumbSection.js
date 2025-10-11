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
   * Returns array of breadcrumb objects: { label, href, isActive }
   */
  const breadcrumbs = useMemo(() => {
    // Split pathname into segments and remove empty strings
    const segments = pathname.split("/").filter(Boolean);
    const trail = [];

    // Add home link if enabled
    if (showHome) {
      trail.push({
        label: homeText,
        href: homeHref,
        isActive: false
      });
    }

    // Build breadcrumb trail from path segments
    let currentPath = "";
    segments.forEach((seg, i) => {
      currentPath += `/${seg}`;
      const isLastSegment = i === segments.length - 1;

      // Handle special "category" segment
      if (seg === "category") {
        trail.push({
          label: "دسته‌بندی",
          href: "/category",
          isActive: false
        });
      }
      // Handle labeled routes from routeLabels map
      else if (routeLabels[seg]) {
        trail.push({
          label: routeLabels[seg],
          href: currentPath,
          isActive: isLastSegment
        });
      }
    });

    // Add category-specific breadcrumb if category data exists
    if (categoryData?.name && segments.includes("category")) {
      trail.push({
        label: categoryData.name,
        href: `/category/${categoryData.slug}`,
        isActive: true
      });
    }

    return trail;
  }, [pathname, showHome, homeText, homeHref, categoryData, routeLabels]);

  return (
    <section className="relative">
      {/* Hero background image */}
      <Image
        alt="Category background"
        className="absolute top-0 right-0 -z-10 w-full h-[55vh] object-cover md:h-[50vh]"
        src="/images/main/category/category-bg.svg"
        fill
        priority
      />

      {/* Content container */}
      <div className="mx-auto max-w-[1279px] md:px-4 2xl:px-0">
        <div className="gap-2 pb-2 pt-9 md:flex md:py-6">
          <div className="flex flex-col justify-center gap-1 px-4 md:flex-1 md:gap-3 md:p-0">
            {/* Breadcrumb navigation */}
            <BreadcrumbNavigation breadcrumbs={breadcrumbs} />
            {/* Category header (conditional) */}
            {categoryData && <CategoryHeader categoryData={categoryData} />}
          </div>
        </div>
      </div>
    </section>
  );
};
export default memo(BreadcrumbSection);
