"use client";

import React, { useState, useEffect } from "react";

 
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaLinkedin, FaTelegramPlane, FaTimes } from "react-icons/fa";
import FooterAboutSection from "./FooterAboutSection";
import { footerLinks, socials } from "@/constants/footer/FooterConfig";
import FooterAccordionSection from "./FooterAccordionSection";
import FooterSkeleton from "@/components/skeletons/layout/footer/FooterSkleton";
import FooterDesktopSection from "./FooterDesktopSection";
 
export default function Footer() {
  // State to control the floating rating panel visibility
  const [showRatingPanel, setShowRatingPanel] = useState(false);
  // Loading state for skeleton
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay (replace with real logic as needed)
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <FooterSkeleton />;
  }

  return (
    <>
      {/* div footer wrapper */}
      <footer className="flex items-center justify-center relative mx-auto w-full max-w-[1279px] flex-col p-4 *:w-full md:px-0 md:pt-0">
        {/* Mobile social section (pixel-perfect, matches provided HTML) */}
        <div className="flex items-center w-full justify-between pt-10 md:hidden" data-cy="data-cy-footer-social_media">
          {/* Logo section */}
          <Link href="/">
            <Image
    alt="ژاکت"
    width={60}
    height={60}
    src="/images/logo.svg"
    priority
    className="w-auto h-auto max-w-[60px] max-h-[60px]"
  />
          </Link>
          {/* Social icons (Instagram, LinkedIn, Telegram) */}
          <div className="flex gap-3">
            {/* Instagram icon */}
            <Link
              target="_blank"
              aria-label="instagram"
              className="group/item flex h-10 w-10 items-center justify-center rounded-md bg-[#F9FAFC]"
              href="http://instagram.com/zhaketcom"
            >
              <FaInstagram size={27} color="#C1C3C8" className="group-hover/item:text-[#FF9606]!" />
            </Link>
            {/* LinkedIn icon */}
            <Link
              target="_blank"
              aria-label="linkedin"
              className="group/item flex h-10 w-10 items-center justify-center rounded-md bg-[#F9FAFC]"
              href="https://linkedin.com/company/zhaket"
            >
              <FaLinkedin size={21} color="#C1C3C8" className="group-hover/item:text-[#FF9606]!" />
            </Link>
            {/* Telegram icon */}
            <Link
              target="_blank"
              aria-label="telegram"
              className="group/item flex h-10 w-10 items-center justify-center rounded-md bg-[#F9FAFC]"
              href="https://t.me/s/zhaketcom"
            >
              <FaTelegramPlane size={20} color="#C1C3C8" className="group-hover/item:text-[#FF9606]!" />
            </Link>
          </div>
        </div>

        {/* Mobile accordion links section */}
        <FooterAccordionSection footerLinks={footerLinks} socials={socials} />

        {/* Desktop link columns, newsletter, and support message */}
        <FooterDesktopSection footerLinks={footerLinks} />

        {/* About section */}
        <FooterAboutSection socials={socials} />

        {/* Bottom bar with copyright, hosting, and social icons */}
        <div className="flex items-center justify-center pt-6 pb-[10px] md:justify-between" data-cy="data-cy-footer-policy">
          <div className="flex flex-col-reverse items-center md:flex-row">
            <p className="transition duration-300 text-sm leading-7 font-medium text-center text-[#7E899B]">
              تمامی حقوق برای ژاکت محفوظ است
            </p>
            <div className="mx-2 hidden h-4 w-[1px] bg-[#E1E3E5] md:inline"></div>
            <div className="flex items-center">
              <p className="transition duration-300 text-sm leading-7 font-medium text-center text-[#7E899B]">
                میزبانی بر بستر سرورهای اختصاصی
              </p>
              <button className="font-semibold cursor-pointer flex items-center justify-center gap-[10px] rounded-lg transition duration-300 focus:outline-hidden focus:outline-0 h-10   py-3 hover:bg-secondary/80 bg-transparent px-0.5! text-sm text-[#FF9606] hover:text-[#EB8800]" type="button">
                <div className="flex items-center justify-center">ژاکت کلود</div>
              </button>
            </div>
          </div>
          {/* Social icons (desktop only) */}
          <div className="hidden md:flex gap-3 md:py-2">
            <a target="_blank" aria-label="instagram" className="group/item flex h-10 w-10 items-center justify-center rounded-md bg-[#F9FAFC]" href="http://instagram.com/zhaketcom">
              <FaInstagram size={27} color="#C1C3C8" className="group-hover/item:text-[#FF9606]!" />
            </a>
            <a target="_blank" aria-label="linkedin" className="group/item flex h-10 w-10 items-center justify-center rounded-md bg-[#F9FAFC]" href="https://linkedin.com/company/zhaket">
              <FaLinkedin size={21} color="#C1C3C8" className="group-hover/item:text-[#FF9606]!" />
            </a>
            <a target="_blank" aria-label="telegram" className="group/item flex h-10 w-10 items-center justify-center rounded-md bg-[#F9FAFC]" href="https://t.me/s/zhaketcom">
              <FaTelegramPlane size={20} color="#C1C3C8" className="group-hover/item:text-[#FF9606]!" />
            </a>
          </div>
        </div>
      </footer>

      {/* Floating rating panel (sticky to bottom-left) */}
      {showRatingPanel && (
        <div className="flex flex-col justify-between overflow-hidden border-none fixed bottom-4 left-4 z-[99] w-[370px] rounded-md bg-white p-1 shadow-[0px_20px_60px_-15px_rgba(0,0,0,0.15)] transition-transform duration-300">
          {/* Panel header with title and close button (matches provided HTML) */}
          <div className="flex justify-between rounded-md bg-[linear-gradient(180deg,#6097f324_0%,rgba(96,151,243,0)_100%)] p-4">
            <div>
              <p className="transition duration-300 font-bold text-[15px] text-[#424244]">
                به محصولات خریداری شده، امتیاز دهید
              </p>
              <p className="transition duration-300 text-xs leading-7 text-[#76767C]">
                با ثبت امتیاز، به بهبود محصولات و خدمات کمک کنید.
              </p>
            </div>
            {/* Close button with Heroicons XMarkIcon */}
            <button
              onClick={() => setShowRatingPanel(false)}
              className="font-semibold cursor-pointer flex items-center justify-center gap-[10px] rounded-lg transition duration-300 focus:outline-hidden focus:outline-0 text-xs border border-[#E5E8EB] text-[#787676] hover:bg-[#76767c] hover:text-white group h-10 w-10 border-none bg-white p-0 shadow-none"
              aria-label="Close rating panel"
              type="button"
            >
              <span className="flex items-center justify-center">
                <FaTimes className="text-gray-100 transition duration-300 group-hover:text-white" height={22} width={22} />
              </span>
            </button>
          </div>
          {/* Panel div content (currently empty) */}
          <section className="p-4"></section>
          {/* Panel action buttons (matches provided HTML) */}
          <div className="p-4 flex items-center gap-2 pt-0">
            {/* "Later" button */}
            <button className="font-semibold cursor-pointer flex items-center justify-center gap-[10px] rounded-lg transition duration-300 focus:outline-hidden focus:outline-0 h-10 px-4 py-3 text-xs border border-[#E5E8EB] bg-white shadow-[0px_2px_6px_0px_rgba(126,137,155,0.08)] hover:bg-[#76767c] hover:text-white w-[84px] text-[#76767C]" type="button">
              <div className="flex items-center justify-center">بعدا لطفاً !</div>
            </button>
            {/* "Submit rating" button */}
            <button className="font-semibold cursor-pointer flex items-center justify-center gap-[10px] rounded-lg transition duration-300 focus:outline-hidden focus:outline-0 h-10 px-4 py-3 text-xs w-[84px] bg-[#6097F3] text-white hover:bg-[#F0F8FF] hover:text-[#6097F3]" type="button">
              <div className="flex items-center justify-center">ثبت امتیاز</div>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
