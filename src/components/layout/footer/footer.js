"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaLinkedin, FaTelegramPlane, FaTimes } from "react-icons/fa";
// Components
import FooterSkeleton from "@/components/skeletons/layout/footer/FooterSkleton";
import { footerLinks, socials } from "@/constants/footer/FooterConfig";
import FooterDesktopSection from "@/components/layout/footer/FooterDesktopSection";
import FooterAboutSection from "@/components/layout/footer/FooterAboutSection";
import FooterAccordionSection from "@/components/layout/footer/FooterAccordionSection";
const Footer = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <FooterSkeleton />;
  }

  return (
    <footer className="flex items-center justify-center relative mx-auto w-full max-w-[1279px] flex-col p-4 md:px-0 md:pt-0">
      {/* Mobile Social Section */}
      <div
        className="flex items-center w-full justify-between pt-10 md:hidden"
        data-cy="footer-social-media"
      >
        {/* Logo */}
        <Link href="/" aria-label="صفحه اصلی ژاکت">
          <div className="w-[60px] h-[60px] flex items-center justify-center text-white text-sm">
            <Image
              alt="لوگو ژاکت"
              width={60}
              height={60}
              src="/images/logo.svg"
              sizes="35"
              className="w-[60px] h-[60px] object-contain"
              priority
            />
          </div>
        </Link>

        {/* Social Icons */}
        <div className="flex gap-3">
          <Link
            href="http://instagram.com/zhaketcom"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="صفحه اینستاگرام ژاکت"
            className="group flex h-10 w-10 items-center justify-center rounded-md bg-[#F9FAFC] hover:bg-gray-100 transition-colors duration-200"
          >
            <FaInstagram
              size={27}
              className="text-[#C1C3C8] group-hover:text-[#FF9606] transition-colors duration-200"
            />
          </Link>

          <Link
            href="https://linkedin.com/company/zhaket"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="صفحه لینکدین ژاکت"
            className="group flex h-10 w-10 items-center justify-center rounded-md bg-[#F9FAFC] hover:bg-gray-100 transition-colors duration-200"
          >
            <FaLinkedin
              size={21}
              className="text-[#C1C3C8] group-hover:text-[#FF9606] transition-colors duration-200"
            />
          </Link>

          <Link
            href="https://t.me/s/zhaketcom"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="کانال تلگرام ژاکت"
            className="group flex h-10 w-10 items-center justify-center rounded-md bg-[#F9FAFC] hover:bg-gray-100 transition-colors duration-200"
          >
            <FaTelegramPlane
              size={20}
              className="text-[#C1C3C8] group-hover:text-[#FF9606] transition-colors duration-200"
            />
          </Link>
        </div>
      </div>

      {/* Mobile Accordion Links */}
      <FooterAccordionSection footerLinks={footerLinks} socials={socials} />

      {/* Desktop Links */}
      <FooterDesktopSection footerLinks={footerLinks} />

      {/* About Section */}
      <FooterAboutSection socials={socials} />

      {/* Bottom Bar */}
      <div
        className="flex items-center justify-center pt-6 pb-[10px] md:justify-between"
        data-cy="footer-policy"
      >
        <div className="flex flex-col-reverse items-center md:flex-row">
          <p className="text-sm leading-7 font-medium text-center text-[#7E899B] transition-colors duration-300">
            تمامی حقوق برای ژاکت محفوظ است
          </p>

          <div className="mx-2 hidden h-4 w-[1px] bg-[#E1E3E5] md:inline" />

          <div className="flex items-center">
            <p className="text-sm leading-7 font-medium text-center text-[#7E899B] transition-colors duration-300">
              میزبانی بر بستر سرورهای اختصاصی
            </p>

            <button
              className="font-semibold cursor-pointer flex items-center justify-center gap-[10px] rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#FF9606] focus:ring-opacity-50 h-10 py-3 bg-transparent px-2 text-sm text-[#FF9606] hover:text-[#EB8800] hover:bg-secondary/80"
              type="button"
              aria-label="درباره ژاکت کلود"
            >
              ژاکت کلود
            </button>
          </div>
        </div>

        {/* Desktop Social Icons */}
        <div className="hidden md:flex gap-3 py-2">
          <Link
            href="http://instagram.com/zhaketcom"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="صفحه اینستاگرام ژاکت"
            className="group flex h-10 w-10 items-center justify-center rounded-md bg-[#F9FAFC] hover:bg-gray-100 transition-colors duration-200"
          >
            <FaInstagram
              size={27}
              className="text-[#C1C3C8] group-hover:text-[#FF9606] transition-colors duration-200"
            />
          </Link>

          <Link
            href="https://linkedin.com/company/zhaket"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="صفحه لینکدین ژاکت"
            className="group flex h-10 w-10 items-center justify-center rounded-md bg-[#F9FAFC] hover:bg-gray-100 transition-colors duration-200"
          >
            <FaLinkedin
              size={21}
              className="text-[#C1C3C8] group-hover:text-[#FF9606] transition-colors duration-200"
            />
          </Link>

          <Link
            href="https://t.me/s/zhaketcom"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="کانال تلگرام ژاکت"
            className="group flex h-10 w-10 items-center justify-center rounded-md bg-[#F9FAFC] hover:bg-gray-100 transition-colors duration-200"
          >
            <FaTelegramPlane
              size={20}
              className="text-[#C1C3C8] group-hover:text-[#FF9606] transition-colors duration-200"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
