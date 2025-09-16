"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * MostPopularSection Component
 * Displays the "Most Popular" tab content with popular themes, plugins, and promotional banners
 * Shows advertisement banners on tablet and desktop with proper flex layout
 * 
 * @param {Object[]} POPULAR_THEMES - Array of popular WordPress themes with label and href
 * @param {Object[]} POPULAR_PLUGINS - Array of popular WordPress plugins with label and href
 */
export default function MostPopularSection({ POPULAR_THEMES, POPULAR_PLUGINS }) {
  return (
    <div className="flex flex-col md:flex-row w-full min-h-[400px]">

      {/* Popular Themes and Plugins Content - Always visible */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 p-[20px] lg:p-[30px]">

        {/* Popular Themes Section */}
        <div className="space-y-3">
          <h3 className="text-base text-[#424244] font-medium hover:text-[#FF9606] transition-colors duration-200 pb-2">
            <Link href="/search?sort_by=top_sales&categories=['5dcaacbfeaec37018b508a3b']">
              محبوب‌ترین قالب‌ها
            </Link>
          </h3>
          <ul className="space-y-2">
            {POPULAR_THEMES.map(item => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-sm text-[#76767C] hover:text-[#FF9606] block py-1 transition-colors duration-200 leading-relaxed"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Popular Plugins Section */}
        <div className="space-y-3">
          <h3 className="text-base text-[#424244] font-medium hover:text-[#FF9606] transition-colors duration-200 pb-2">
            <Link href="/search?sort_by=top_sales&categories=['5dcaacbfeaec37018b508a39']">
              محبوب‌ترین افزونه‌ها
            </Link>
          </h3>
          <ul className="space-y-2">
            {POPULAR_PLUGINS.map(item => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-sm text-[#76767C] hover:text-[#FF9606] block py-1 transition-colors duration-200 leading-relaxed"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Advertisement Banners - Tablet and Desktop */}
      <div className="hidden md:flex flex-col justify-between items-end p-[20px] lg:p-[30px] w-full md:w-[260px] lg:w-[320px] flex-shrink-0">

        {/* First Advertisement Banner */}
        <div className="flex flex-col overflow-hidden border border-[#F4F4F4] shadow-none border-none max-h-[124px] justify-center rounded-[10px] w-full">
          <Link href="" className="group block">
            <Image
              alt="تبلیغ اول"
              src="/images/header/67723f16966cc82e97038df3.png"
              width={261}
              height={124}
              className="object-cover w-full group-hover:scale-105 transition-transform duration-300"
              sizes="261px"
              priority
            />
          </Link>
        </div>

        {/* Second Advertisement Banner */}
        <div className="flex flex-col  overflow-hidden border border-[#F4F4F4] shadow-none border-none max-h-[194px] justify-center rounded-[10px] w-full">
          <Link href="" className="group block">
            <Image
              alt="تبلیغ دوم"
              src="/images/header/67724097e0240bc7cb0377a3.png"
              width={261}
              height={124}
              className="object-cover w-full group-hover:scale-105 transition-transform duration-300"
              sizes="261px"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
