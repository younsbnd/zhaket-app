"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
 
import FooterSkeleton from "@/components/skeletons/layout/footer/FooterSkleton";
import { footerLinks, socials } from "@/constants/footer/FooterConfig";
import FooterDesktopSection from "@/components/layout/footer/FooterDesktopSection";
import FooterAboutSection from "@/components/layout/footer/FooterAboutSection";
import FooterAccordionSection from "@/components/layout/footer/FooterAccordionSection";
import FooterMenuProvider from "@/components/layout/footer/FooterMenuProvider";
import SocialMediaIcons from "@/components/layout/footer/SocialMediaIcons";
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
        <SocialMediaIcons isMobile={true} />
      </div>

      {/* Mobile Accordion Links */}
      <FooterMenuProvider fallbackLinks={footerLinks}>
        {({ footerLinks: processedFooterLinks }) => (
          <FooterAccordionSection
            footerLinks={processedFooterLinks}
            socials={socials}
          />
        )}
      </FooterMenuProvider>

      {/* Desktop Links */}
      <FooterMenuProvider fallbackLinks={footerLinks}>
        {({ footerLinks: processedFooterLinks }) => (
          <FooterDesktopSection
            footerLinks={processedFooterLinks}
          />
        )}
      </FooterMenuProvider>

      {/* About Section */}
      <FooterAboutSection socials={socials} />

      {/* Bottom Bar */}
      <div
        className="flex items-center  justify-between pt-6 pb-[10px] md:justify-between"
        data-cy="footer-policy"
      >
        <div className="flex  flex-col-reverse items-center md:flex-row">
          <p className="text-sm leading-7 font-medium text-center text-[#7E899B] transition-colors duration-300">
            تمامی حقوق برای ژاکت محفوظ است
          </p>

          <div className="mx-2 hidden h-4 w-[1px] bg-[#E1E3E5] md:inline" />

          <div className="flex items-center">
            <p className="text-sm leading-7 font-medium text-center text-[#7E899B] transition-colors duration-300">
              میزبانی بر بستر سرورهای اختصاصی
            </p>

            <button
              className="font-semibold cursor-pointer flex items-center justify-center gap-[10px] rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2   focus:ring-opacity-50 h-10 py-3 bg-transparent px-2 text-sm text-[#FF9606]   "
              type="button"
              aria-label="درباره ژاکت کلود"
            >
              ژاکت کلود
            </button>
          </div>
        </div>

        {/* Desktop Social Icons */}
        <SocialMediaIcons isMobile={false} />
      </div>
    </footer>
  );
};

export default Footer;
