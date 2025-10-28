"use client";

import React from "react";
import Link from "next/link";
 
import { socialLinks } from "@/constants/footer/FooterConfig";

/**
 * SocialMediaIcons Component
 * Displays social media icons with consistent styling
 * 
 * @param {string} className - Additional CSS classes for the container
 * @param {boolean} isMobile - Whether to show mobile or desktop version
 */
export default function SocialMediaIcons({ className = "", isMobile = false }) {


  return (
    <div className={`flex gap-10 ${isMobile ? "" : "hidden md:flex py-2 lg:mr-[500px]"} ${className}`}>
      {socialLinks.map((social, index) => (
        <Link
          key={index}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
          className="group flex h-10 w-10 items-center justify-center rounded-md bg-[#F9FAFC] hover:bg-gray-100 transition-colors duration-200"
        >
          {social.icon}
        </Link>
      ))}
    </div>
  );
}
