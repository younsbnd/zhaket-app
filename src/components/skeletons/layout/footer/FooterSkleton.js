"use client";
import React from "react";
import { Skeleton } from "@heroui/react";
import { FaInstagram, FaLinkedin, FaTelegramPlane } from "react-icons/fa";

/**
 * FooterSkeleton
 * Skeleton loader for the footer, both mobile and desktop layouts.
 * Uses HeroUI Skeleton and React Icons, only Tailwind classes, no inline styles.
 * All comments are in English and professional.
 */
export default function FooterSkeleton() {
  return (
    <footer className="w-full max-w-[1279px] mx-auto flex flex-col items-center p-4 md:px-0 md:pt-0">
      {/* Mobile: Logo and social icons skeleton */}
      <div className="flex items-center w-full justify-between pt-10 md:hidden">
        <Skeleton className="min-h-[39px] min-w-[55px] rounded-md">
          <div className="h-[39px] w-[55px]" />
        </Skeleton>
        <div className="flex gap-3">
          {[FaInstagram, FaLinkedin, FaTelegramPlane].map((Icon, i) => (
            <Skeleton key={i} className="h-10 w-10 rounded-md flex items-center justify-center">
              <Icon className="text-[#C1C3C8]" size={22} />
            </Skeleton>
          ))}
        </div>
      </div>

      {/* Mobile: Accordion skeletons */}
      <div className="flex flex-col items-center w-full gap-[10px] pt-6 md:hidden">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="w-full max-w-[480px] h-[51px] rounded-md" />
        ))}
      </div>

      {/* Desktop: Navigation columns and newsletter skeleton */}
      <div className="hidden md:flex w-full justify-between pt-[50px]">
        {/* Navigation columns skeleton */}
        <div className="grid grid-cols-3 w-[calc(100%_-_377px)] pt-[25px] gap-x-10">
          {[...Array(3)].map((_, colIdx) => (
            <div key={colIdx} className="flex flex-col items-start gap-4 w-full">
              {/* Logo skeleton in first column */}
              {colIdx === 0 && (
                <Skeleton className="min-h-[31px] min-w-[44px] rounded-md">
                  <div className="h-[31px] w-[44px]" />
                </Skeleton>
              )}
              {/* Section title skeleton */}
              <Skeleton className={`h-5 w-24 rounded ${colIdx === 0 ? "hidden" : "block"}`} />
              {/* Section links skeletons */}
              {[...Array(4)].map((_, linkIdx) => (
                <Skeleton key={linkIdx} className="h-4 w-28 rounded" />
              ))}
            </div>
          ))}
        </div>
        {/* Newsletter and contact skeleton */}
        <div className="flex flex-col md:w-[377px] gap-6">
          {/* Newsletter card skeleton */}
          <Skeleton className="h-[159px] rounded-xl w-full" />
          {/* Contact support skeleton */}
          <div className="flex items-center w-full justify-between pt-7">
            <div className="flex items-center gap-3">
              {/* Avatar skeletons */}
              <Skeleton className="h-[30px] w-[30px] rounded-full" />
              <Skeleton className="h-[36px] w-[36px] rounded-full" />
              {/* Contact text skeletons */}
              <div className="flex flex-col gap-1">
                <Skeleton className="h-4 w-32 rounded" />
                <Skeleton className="h-3 w-24 rounded" />
              </div>
            </div>
            {/* Contact button skeleton */}
            <Skeleton className="h-10 w-20 rounded-md" />
          </div>
        </div>
      </div>

      {/* About section skeleton (both mobile and desktop) */}
      <div className="flex items-center justify-center pt-10 w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-[50px] rounded-lg bg-[#F9FAFC] p-[23px] w-full">
          {/* About text skeletons */}
          <div className="flex-1 flex flex-col gap-2">
            <Skeleton className="h-4 w-64 rounded" />
            <Skeleton className="h-4 w-80 rounded" />
          </div>
          {/* Trust badge skeleton */}
          <Skeleton className="h-[71px] w-[58px] md:h-[82px] md:w-[67px] rounded-md" />
        </div>
      </div>

      {/* Bottom bar skeleton (copyright, hosting, social icons) */}
      <div className="flex items-center justify-center pt-6 pb-[10px] md:justify-between w-full">
        <div className="flex flex-col-reverse items-center md:flex-row gap-2">
          <Skeleton className="h-4 w-40 rounded" />
          <div className="mx-2 hidden h-4 w-[1px] bg-[#E1E3E5] md:inline" />
          <Skeleton className="h-4 w-40 rounded" />
        </div>
        {/* Desktop social icons skeleton */}
        <div className="hidden md:flex gap-3">
          {[FaInstagram, FaLinkedin, FaTelegramPlane].map((Icon, i) => (
            <Skeleton key={i} className="h-10 w-10 rounded-md flex items-center justify-center">
              <Icon className="text-[#C1C3C8]" size={22} />
            </Skeleton>
          ))}
        </div>
      </div>
    </footer>
  );
}