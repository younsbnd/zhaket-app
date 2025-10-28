"use client";
import React from "react";
import { Skeleton } from "@heroui/react";

/**
 * FooterSkeleton
 * Precise skeleton loader for footer that matches exact layout.
 * No real text content, only Skeleton components.
 */
export default function FooterSkeleton() {
  return (
    <footer className="flex items-center justify-center relative mx-auto w-full max-w-[1279px] flex-col p-4 md:px-0 md:pt-0">
      {/* Mobile: Logo and social icons skeleton */}
      <div className="flex items-center w-full justify-between pt-10 md:hidden">
        <Skeleton className="h-[60px] w-[60px] rounded-md" />
        <div className="flex gap-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-10 rounded-md" />
          ))}
        </div>
      </div>

      {/* Mobile: Accordion skeletons */}
      <div className="flex flex-col items-center w-full gap-[10px] pt-6 md:hidden">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="w-full max-w-[480px] h-[51px] rounded-md" />
        ))}
      </div>

      {/* Desktop: Navigation and newsletter skeleton */}
      <div className="hidden md:flex w-full justify-between pt-[50px]">
        {/* Left side: Logo + Navigation */}
        <div className="flex w-[calc(100%_-_377px)] pt-[25px] gap-x-32">
          {/* Logo skeleton */}
          <Skeleton className="h-[43px] w-[60px] rounded-md" />
          
          {/* Navigation columns skeleton */}
          <div className="grid grid-cols-3 gap-x-16 flex-1 justify-start">
            {[...Array(3)].map((_, colIdx) => (
              <div key={colIdx} className="flex flex-col items-start gap-4">
                <Skeleton className="h-[17px] w-24 rounded" />
                <div className="flex flex-col gap-2">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-[14px] w-28 rounded" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side: Newsletter and contact */}
        <div className="flex flex-col w-[377px]">
          {/* Newsletter card skeleton */}
          <Skeleton className="h-[159px] rounded-xl w-full" />
          
          {/* Contact support skeleton */}
          <div className="flex items-center w-full justify-between pt-7">
            <div className="flex items-center gap-3">
              <Skeleton className="h-[30px] w-[30px] rounded-full" />
              <Skeleton className="h-[36px] w-[36px] rounded-full" />
              <div className="flex flex-col gap-1">
                <Skeleton className="h-4 w-32 rounded" />
                <Skeleton className="h-3 w-24 rounded" />
              </div>
            </div>
            <Skeleton className="h-10 w-20 rounded-md" />
          </div>
        </div>
      </div>

      {/* About section skeleton */}
      <div className="flex items-center justify-center pt-10 w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-[50px] rounded-lg bg-[#F9FAFC] p-[23px] w-full">
          <div className="flex-1 flex flex-col gap-2">
            <Skeleton className="h-4 w-64 rounded" />
            <Skeleton className="h-4 w-80 rounded" />
          </div>
          <Skeleton className="h-[71px] w-[58px] md:h-[82px] md:w-[67px] rounded-md" />
        </div>
      </div>

      {/* Bottom bar skeleton */}
      <div className="flex items-center justify-center pt-6 pb-[10px] md:justify-between w-full">
        <div className="flex flex-col-reverse items-center md:flex-row gap-2">
          <Skeleton className="h-4 w-40 rounded" />
          <div className="mx-2 hidden h-4 w-[1px] bg-[#E1E3E5] md:inline" />
          <Skeleton className="h-4 w-40 rounded" />
        </div>
        <div className="hidden md:flex gap-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-10 rounded-md" />
          ))}
        </div>
      </div>
    </footer>
  );
}