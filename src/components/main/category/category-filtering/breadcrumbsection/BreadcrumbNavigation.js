"use client";
import React, { memo } from "react";
import Link from "next/link";

/**
 * Breadcrumb Item Interface
 * @typedef {Object} BreadcrumbItem
 * @property {string} label - Display text for the breadcrumb
 * @property {string} href - Navigation URL
 * @property {boolean} isActive - Whether this is the current/active page
 */

/**
 * BreadcrumbNavigation Component
 * 
 * Renders hierarchical breadcrumb navigation with SEO-friendly markup
 * Features:
 * - Semantic HTML with proper ARIA attributes
 * - Optimized with React.memo for performance
 * - Responsive design with Tailwind CSS
 * - Accessible navigation with keyboard support
 * 
 * @component
 * @param {Object} props - Component properties
 * @param {BreadcrumbItem[]} props.breadcrumbs - Array of breadcrumb navigation items
 * @returns {JSX.Element} Breadcrumb navigation component
 * 
 * @example
 * <BreadcrumbNavigation 
 *   breadcrumbs={[
 *     { label: 'Home', href: '/', isActive: false },
 *     { label: 'Products', href: '/products', isActive: true }
 *   ]} 
 * />
 */
const BreadcrumbNavigation = ({ breadcrumbs = [] }) => {
  // Early return for empty breadcrumbs
  if (!breadcrumbs?.length) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" role="navigation">
      <ul className="flex items-center gap-2 text-[#737373]">
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;
          
          return (
            <React.Fragment key={`breadcrumb-${item.href}-${index}`}>
              {/* Breadcrumb item */}
              <li>
                {item.isActive ? (
                  // Current page - non-clickable
                  <span
                    className="transition duration-300 text-[#4e4d4d] text-[13px] font-bold"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : (
                  // Clickable breadcrumb link
                  <Link
                    href={item.href}
                    data-cy="data-cy-bread-crumb"
                    className="text-[13px] font-bold hover:text-[#ff9606] transition-colors duration-300"
                    aria-label={`Navigate to ${item.label}`}
                  >
                    {item.label}
                  </Link>
                )}
              </li>

              {/* Separator - only show between items, not after last */}
              {!isLast && (
                <li aria-hidden="true" role="presentation">
                  <span className="text-[14px]">&gt;</span>
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ul>
    </nav>
  );
};

// Memoize component to prevent unnecessary re-renders
export default memo(BreadcrumbNavigation);
