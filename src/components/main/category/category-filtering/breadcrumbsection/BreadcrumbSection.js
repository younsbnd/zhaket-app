"use client";
import React, { useMemo, memo } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import BreadcrumbNavigation from "./BreadcrumbNavigation";
import CategoryHeader from "./CategoryHeader";

/**
 * BreadcrumbSection Component
 * 
 * Hero section with dynamic breadcrumb navigation and category information
 * Features:
 * - Automatic breadcrumb generation from URL path
 * - Responsive background image with SVG pattern
 * - Category header with title and description
 * - SEO-optimized semantic HTML structure
 * - Performance optimized with React.memo and useMemo
 * 
 * @component
 * @param {Object} props - Component properties
 * @param {string|null} [props.customTitle=null] - Override automatic title generation
 * @param {Object|null} [props.categoryData=null] - Category metadata (name, slug, description)
 * @param {boolean} [props.showHome=true] - Display home breadcrumb link
 * @param {string} [props.homeText="خانه"] - Home breadcrumb label text
 * @param {string} [props.homeHref="/"] - Home breadcrumb navigation URL
 * @returns {JSX.Element} Breadcrumb hero section
 * 
 * @example
 * <BreadcrumbSection 
 *   categoryData={{ name: 'Templates', slug: 'templates', description: '...' }}
 *   showHome={true}
 * />
 */
const BreadcrumbSection = ({ 
  customTitle = null,
  categoryData = null,
  showHome = true,
  homeText = "خانه",
  homeHref = "/",
}) => {
  const pathname = usePathname();

  /**
   * Generate breadcrumb trail from current URL pathname
   * 
   * Dynamically creates breadcrumb navigation based on route segments
   * Handles special routes: admin, category, product, settings, search
   * 
   * @returns {Array<{label: string, href: string, isActive: boolean}>} Breadcrumb items array
   */
  const generateBreadcrumbs = useMemo(() => {
    // Parse URL into segments, removing empty strings
    const pathSegments = pathname.split("/").filter(Boolean);
    const breadcrumbs = [];

    // Add home breadcrumb as first item
    if (showHome) {
      breadcrumbs.push({
        label: homeText,
        href: homeHref,
        isActive: false,
      });
    }

    // Route label mapping for better maintainability
    const routeLabels = {
      admin: "پنل مدیریت",
      panel: "پنل کاربری",
      settings: "تنظیمات",
      product: "محصول",
      search: "جستجو",
    };

    // Build breadcrumb trail from path segments
    let currentPath = "";
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLastSegment = index === pathSegments.length - 1;

      // Handle category routes specially
      if (segment === "category") {
        const isAllProductsPage = pathSegments.length === 1;
        
        breadcrumbs.push({
          label: isAllProductsPage ? "همه محصولات" : "دسته‌بندی",
          href: "/category",
          isActive: isAllProductsPage,
        });
      } 
      // Handle other recognized routes
      else if (routeLabels[segment]) {
        breadcrumbs.push({
          label: routeLabels[segment],
          href: currentPath,
          isActive: isLastSegment,
        });
      }
    });

    // Append actual category name if available
    if (categoryData?.name && pathSegments.includes('category')) {
      breadcrumbs.push({
        label: categoryData.name,
        href: `/category/${categoryData.slug}`,
        isActive: true,
      });
    }

    return breadcrumbs;
  }, [pathname, showHome, homeText, homeHref, categoryData]);

  return (
    <section className="relative" data-cy="data-cy-info">
      {/* Hero background - SVG pattern with gradient overlay */}
      <Image
        alt="Zhaket"
        decoding="async"
        data-nimg="fill"
        className="absolute right-0 top-0 -z-10 w-full overflow-hidden bg-repeat-round object-cover h-[55vh] object-[75%_50%] md:h-[50vh]"
        src="/images/main/category/category-bg.svg"
        fill
        priority
      />

      {/* Main content wrapper - responsive max-width container */}
      <div className="mx-auto max-w-[1279px] md:px-4 2xl:px-0">
        <div className="gap-2 pb-2 pt-9 md:flex md:py-6">
          <div className="flex flex-col justify-center gap-1 px-4 md:flex-1 md:gap-3 md:p-0">
            {/* Breadcrumb navigation trail */}
            <BreadcrumbNavigation breadcrumbs={generateBreadcrumbs} />

            {/* Category metadata (title, description) - conditional render */}
            {categoryData && <CategoryHeader categoryData={categoryData} />}
          </div>
        </div>
      </div>
    </section>
  );
};

// Memoize to prevent re-renders when props haven't changed
export default memo(BreadcrumbSection);
