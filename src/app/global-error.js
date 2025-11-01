"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  IoWarningOutline,
  IoRefreshOutline,
  IoHomeOutline,
} from "react-icons/io5";
import { logger } from "@/lib/utils/logger";
import { logErrorToServer } from "@/lib/utils/logErrorToServer";

export default function GlobalError({ error, reset }) {

  // log the error to the server
  useEffect(() => {
    const errorData = {
      message: error?.message || "Unknown critical error",
      name: error?.name || "CriticalError",
      stack: error?.stack,
      digest: error?.digest,
      cause: error?.cause,
      timestamp: new Date().toISOString(),
      userAgent:
        typeof window !== "undefined" ? window.navigator.userAgent : "N/A",
      url: typeof window !== "undefined" ? window.location.href : "N/A",
      severity: "CRITICAL",
      context: "Root Layout Error",
      errorType: "Global Critical Error",
    };

    // log the error in development mode
    if (process.env.NODE_ENV === "development") {
      logger.error("Critical Global Error Boundary Triggered", errorData);
    }

    logErrorToServer(errorData);
  }, [error]);

  return (
    <html lang="fa" dir="rtl">
      <body
        style={{ fontFamily: "IranYekan, sans-serif", margin: 0, padding: 0 }}
      >
        <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-[#F9FAFC] to-[#E5E8EB] flex-col gap-2 text-[#1F2025] relative overflow-hidden">
          {/* Content */}
          <div className="flex items-center justify-center z-20 flex-col px-4 max-w-2xl">
            {/* Logo */}
            <Link
              href="/"
              className="mb-8 transition-transform hover:scale-105 duration-300"
            >
              <Image
                alt="ژاکت"
                width={114}
                height={82}
                className="min-h-[82px] min-w-[114px] object-contain"
                src="/images/logo.svg"
                priority
              />
            </Link>

            {/* Error Icon with Animation */}
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-[#FFAE11] opacity-20 rounded-full blur-xl animate-pulse"></div>
              <div className="relative bg-white rounded-full p-6 shadow-lg">
                <IoWarningOutline className="h-16 w-16 text-[#FFAE11]" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-[#1F2025] text-2xl md:text-3xl font-bold text-center mb-3">
              خطای بحرانی در سیستم!
            </h1>

            {/* Description */}
            <p className="transition duration-300 text-sm md:text-base leading-7 text-[#424244] text-center mb-2 px-4">
              متاسفانه مشکل جدی در بارگذاری سایت پیش آمده است.
            </p>
            <p className="transition duration-300 text-xs md:text-sm leading-6 text-[#76767C] text-center mb-8 px-4">
              لطفاً صفحه را رفرش کنید یا چند لحظه بعد مجدداً تلاش کنید.
            </p>

            {/* Error Details (Development Mode) */}
            {process.env.NODE_ENV === "development" && error?.message && (
              <div className="w-full max-w-xl mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-xs text-red-800 font-mono break-words text-center">
                  <strong>Error Message:</strong> {error.message}
                </p>
                {error?.digest && (
                  <p className="text-xs text-red-700 font-mono mt-2 text-center">
                    <strong>Error Digest:</strong> {error.digest}
                  </p>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Retry Button */}
              <button
                onClick={() => reset()}
                className="flex items-center justify-center h-[55px] w-[186px] rounded-lg bg-[#FFAE11] text-base font-bold text-white transition duration-300 hover:bg-[#EB8800] cursor-pointer shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <IoRefreshOutline className="h-5 w-5 ml-2" />
                تلاش مجدد
              </button>

              {/* Refresh Button */}
              <button
                onClick={() => window.location.reload()}
                className="flex items-center justify-center h-[55px] w-[186px] rounded-lg bg-white border-2 border-[#FFAE11] text-base font-bold text-[#FFAE11] transition duration-300 hover:bg-[#FFF5E6] cursor-pointer shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <IoRefreshOutline className="h-5 w-5 ml-2" />
                رفرش صفحه
              </button>
            </div>

            {/* Home Link */}
            <div className="mt-6">
              <Link
                href="/"
                className="text-sm text-[#6097F3] hover:text-[#4a7cd1] transition duration-300 underline flex items-center justify-center"
              >
                <IoHomeOutline className="h-4 w-4 ml-1" />
                بازگشت به صفحه اصلی ژاکت
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
