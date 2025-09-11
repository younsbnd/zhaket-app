"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * MostPopularSection component
 * Renders the "Most Popular" tab content with popular themes, plugins, and banner ads.
 * 
 * @param {Object[]} POPULAR_THEMES - List of popular WordPress themes.
 * @param {Object[]} POPULAR_PLUGINS - List of popular WordPress plugins.
 */
export default function MostPopularSection({ POPULAR_THEMES, POPULAR_PLUGINS }) {
  return (
    <div className="flex flex-col lg:flex-row">
      {/* Popular Themes and Plugins */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-[20px] lg:p-[30px] flex-1">

        {/* Popular Themes */}
        <div>
          <p className="text-base text-[#424244] font-medium pb-4 hover:text-[#FF9606] transition">
            <Link href="/search?sort_by=top_sales&categories=['5dcaacbfeaec37018b508a3b']">
              محبوب‌ترین قالب‌ها
            </Link>
          </p>
          <ul>
            {POPULAR_THEMES.map(item => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-sm text-[#76767C] hover:text-[#FF9606] block py-1"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Popular Plugins */}
        <div>
          <p className="text-base text-[#424244] font-medium pb-4 hover:text-[#FF9606] transition">
            <Link href="/search?sort_by=top_sales&categories=['5dcaacbfeaec37018b508a39']">
              محبوب‌ترین افزونه‌ها
            </Link>
          </p>
          <ul>
            {POPULAR_PLUGINS.map(item => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-sm text-[#76767C] hover:text-[#FF9606] block py-1"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Advertisement banners */}
      <div className="hidden lg:flex flex-col gap-3 max-w-[260px]">
        <Link href="">
          <Image
            alt="ad1"
            src="/images/header/67723f16966cc82e97038df3.png"
            width={260}
            height={200}
            className="rounded-[10px]"
          />
        </Link>
        <Link href="">
          <Image
            alt="ad2"
            src="/images/header/67724097e0240bc7cb0377a3.png"
            width={260}
            height={200}
            className="rounded-[10px]"
          />
        </Link>
      </div>
    </div>
  );
}
