"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { HiChevronDown } from "react-icons/hi";
 


// Accordion component for mobile footer links
function Disclosure({ children, title }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="w-full max-w-[480px] mx-auto">
      {/* Accordion header */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="flex h-[51px] w-full items-center justify-between rounded-md bg-[#F9FAFC] p-[10px]"
      >
        <span className="text-base font-medium px-2 text-[#76767C]">{title}</span>
        <span className="flex items-center justify-center h-[30px] w-[30px] rounded-md border border-[#EEF0F4] bg-white">
          <HiChevronDown
            className={`w-4 h-4 text-[#878F9B] transition-transform duration-200 ${isOpen ? "rotate-180" : ""
              }`}
          />
        </span>
      </button>

      {/* Accordion content */}
      {isOpen && <div className="mt-2 p-4 bg-white rounded-md">{children}</div>}
    </div>
  );
}

export default function FooterAccordionSection({ footerLinks, socials }) {
  return (
    <>
      {/* Logo + socials (mobile only) */}
      {/* Social media section (mobile) - uses React Icons, Tailwind, HeroUI, and exact margin/gap */}
    {/* Mobile footer social section and logo are now rendered only in FooterAboutSection for mobile. Removed duplicate here. */}

      {/* Accordion navigation sections */}
      <div className="flex flex-col items-center w-full gap-[10px] pt-6 md:hidden">
        {footerLinks.map((section) => (
          <Disclosure key={section.title} title={section.title}>
            <div className="flex flex-col gap-2">
              {section.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[#76767C] hover:text-[#FF9606]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </Disclosure>
        ))}
      </div>
    </>
  );
}
