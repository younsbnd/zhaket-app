"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaInstagram, FaLinkedinIn, FaTelegramPlane } from "react-icons/fa";

/**
 * FooterUser
 * Responsive footer for user panel using TailwindCSS.
 * Layout:
 * - On desktop (md+): left copyright text & right social icons in a horizontal row
 * - On mobile: social icons at top, copyright text at bottom (stacked vertically)
 */
export default function FooterUser() {
  return (
    <footer className="w-full bg-transparent">
      {/* Main container - responsive flex direction */}
      <div className="text-center md:text-right mx-auto w-full max-w-[1279px] flex flex-col-reverse md:flex-row justify-between items-center px-4 mt-6 gap-4 md:gap-0">
        
        {/* Left section: Icon + copyright text */}
        <div className="flex flex-row gap-3.5 items-center text-gray-400 order-2 md:order-1">
          {/* Inline SVG icon */}
          <Image
            src="/images/user-layout/footer/copyright-doc.svg"
            alt="copyright-icon"
            width={26}
            height={26}
          />
          
          <p className="!text-small font-medium text-gray-800 tracking-tighter leading-5">
            تمامی حقوق برای ژاکت محفوظ است
          </p>
        </div>

        {/* Right section: Social links */}
        <div className="flex flex-row items-center gap-6 md:gap-8 order-1 md:order-2">
          {/* Instagram */}
          <Link
            href="http://instagram.com/zhaketcom"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-[#878F9B] hover:text-pink-500 transition-colors"
          >
            <FaInstagram className="w-[21px] h-[21px]" />
          </Link>

          {/* LinkedIn */}
          <Link
            href="https://www.linkedin.com/company/zhaket"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-[#878F9B] hover:text-blue-600 transition-colors"
          >
            <FaLinkedinIn className="w-[18px] h-[18px]" />
          </Link>

          {/* Telegram */}
          <Link
            href="https://t.me/zhaketcom"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
            className="text-[#878F9B] hover:text-blue-500 transition-colors"
          >
            <FaTelegramPlane className="w-[20px] h-[20px]" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
