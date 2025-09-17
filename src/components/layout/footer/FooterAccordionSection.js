"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { HiChevronDown } from "react-icons/hi";

/**
 * Disclosure component for mobile footer accordion links
 */
function Disclosure({ children, title }) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const toggleAccordion = () => setIsExpanded(prev => !prev);

  return (
    <div className="w-full max-w-[480px] mx-auto">
      {/* Accordion header */}
      <button
        onClick={toggleAccordion}
        className="flex h-[51px] w-full items-center justify-between rounded-md bg-[#F9FAFC] p-[10px]"
        aria-expanded={isExpanded}
        aria-label={`${title} منو`}
      >
        <span className="text-base font-medium px-2 text-[#76767C]">
          {title}
        </span>
        <span className="flex items-center justify-center h-[30px] w-[30px] rounded-md border border-[#EEF0F4] bg-white">
          <HiChevronDown
            className={`w-4 h-4 text-[#878F9B] transition-transform duration-200 ${isExpanded ? "rotate-180" : ""
              }`}
          />
        </span>
      </button>

      {/* Accordion content */}
      {isExpanded && (
        <div className="mt-2 p-4 bg-white rounded-md shadow-sm">
          {children}
        </div>
      )}
    </div>
  );
}

/**
 * FooterAccordionSection component
 * Renders accordion-style navigation for mobile footer
 */
export default function FooterAccordionSection({ footerLinks, socials }) {
  return (
    <div className="flex flex-col items-center w-full gap-[10px] pt-6 md:hidden">
      {footerLinks.map((section) => (
        <Disclosure key={section.title} title={section.title}>
          <nav className="flex flex-col gap-2" aria-label={`${section.title} لینک‌ها`}>
            {section.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[#76767C] hover:text-[#FF9606] transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </Disclosure>
      ))}
    </div>
  );
}
