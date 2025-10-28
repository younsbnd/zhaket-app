"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { HiChevronDown } from "react-icons/hi";

/**
 * Disclosure Component for Mobile Footer Accordion
 * 
 * Creates an expandable/collapsible section for mobile footer navigation.
 * Uses local state to manage open/closed state and provides smooth transitions.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to display when expanded
 * @param {string} props.title - Title text for the accordion header
 * @returns {JSX.Element} Accordion disclosure component
 */
function Disclosure({ children, title }) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const toggleAccordion = () => setIsExpanded(prev => !prev);

  return (
    <div className="w-full max-w-[480px]    mx-auto">
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
 * FooterAccordionSection Component
 * 
 * Renders mobile-friendly accordion-style navigation for footer links.
 * Each section can be expanded/collapsed independently to save space on mobile devices.
 * Uses Disclosure components for individual sections.
 * 
 * @param {Object} props - Component props
 * @param {Array} props.footerLinks - Array of footer link sections with title and links
 * @returns {JSX.Element} Mobile accordion footer section
 */
export default function FooterAccordionSection({ footerLinks }) {
  return (
    <div className="flex flex-col items-center  w-full gap-[10px] pt-6 md:hidden">
      {footerLinks.map((section) => (
        <Disclosure key={section.title} title={section.title}>
          <nav className="flex flex-col gap-2" aria-label={`${section.title} لینک‌ها`}>
            {section.links.map((link, linkIndex) => (
              <Link
                key={`${section.title}-${linkIndex}-${link.href}`}
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
